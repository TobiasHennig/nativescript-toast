var fs = require('fs');
var path = require('path');
var prompt = require('prompt-lite');

const FABRIC_GRADLE_TOOLS = '1.+'
const FABRIC_ANDROID_CRASHLYTICS = '2.9.1';
const FABRIC_ANDROID_ANSWERS = '1.4.1';
const FABRIC_IOS_CRASHLYTICS = '3.10.1';
const FABRIC_IOS_FABRIC = '1.7.6';

// Default settings for using ios and android with Fabric
var usingiOS = false,
    usingAndroid = false;

// The directories where the Podfile and include.gradle are stored
var directories = {
    ios: './platforms/ios',
    android: './platforms/android'
};

console.log('NativeScript Fabric Plugin Installation');

var appRoot = "../../";
var packageJsonPath = path.join(appRoot, "app", "package.json");

console.log('Applying to app package.json: ' + packageJsonPath);

var pluginConfigFile = "fabric.json";
var pluginConfigPath = path.join(appRoot, pluginConfigFile);
var config = {};

function mergeConfig(result) {
    for (var key in result) {
        config[key] = result[key];
    }
}

function saveConfig() {
    fs.writeFileSync(pluginConfigPath, JSON.stringify(config, null, 4));
}

function readConfig() {
    try {
        config = JSON.parse(fs.readFileSync(pluginConfigPath));
    } catch (e) {
        console.log("Failed reading " + pluginConfigFile);
        console.log(e);
        config = {};
    }
}

function isInteractive() {
    return process.stdin && process.stdin.isTTY && process.stdout && process.stdout.isTTY;
}

// workaround for https://github.com/NativeScript/nativescript-cli/issues/2521 (2.5.0 only)
var nativeScriptVersion = "";
try {
    nativeScriptVersion = __webpack_require__( /*! child_process */ 2).execSync('nativescript --version');
} catch (err) {
    // On some environments nativescript is not in the PATH
    // Ignore the error
}

var isNativeScriptCLI250 = nativeScriptVersion.indexOf("2.5.0") !== -1;

// note that for CI builds you want a pluginConfigFile, otherwise the build will fail
if (process.argv.indexOf("config") === -1 && fs.existsSync(pluginConfigPath)) {
    readConfig();
    if (config.apiKey) {
        config.api_key = config.apiKey;
        delete config.apiKey;
        saveConfig();
    }
    if (config.apiSecret) {
        config.api_secret = config.apiSecret;
        delete config.apiSecret;
        saveConfig();
    }
    console.log("Config file exists (" + pluginConfigFile + ")");
    askiOSPromptResult(config);
    askAndroidPromptResult(config);
    promptQuestionsResult(config);
} else if (isNativeScriptCLI250 && process.argv.indexOf("setup") === -1) {
    console.log("*******************************************************************");
    console.log("*******************************************************************");
    console.log("************************** IMPORTANT: *****************************");
    console.log("*******************  with nativescript 2.5.0  *********************");
    console.log("************** now execute 'npm run setup' manually ***************");
    console.log("***** in the node_modules/nativescript-plugin-fabric folder *****");
    console.log("*******************************************************************");
    console.log("*******************************************************************");
} else if (!isInteractive()) {
    console.log("No existing " + pluginConfigFile + " config file found and terminal is not interactive! Default configuration will be used.");
} else {
    console.log("No existing " + pluginConfigFile + " config file found, so let's configure the Fabric plugin!");
    prompt.start();
    askiOSPrompt();
}

/**
 * Prompt the user if they are integrating Fabric with iOS
 */
function askiOSPrompt() {
    prompt.get({
        name: 'using_ios',
        description: 'Are you using iOS (y/n)',
        default: 'y'
    }, function(err, result) {
        if (err) {
            return console.log(err);
        }
        mergeConfig(result);
        askiOSPromptResult(result);
        askAndroidPrompt();
    });
}

function askiOSPromptResult(result) {
    if (isSelected(result.using_ios)) {
        usingiOS = true;
    }
}

/**
 * Prompt the user if they are integrating Fabric with Android
 */
function askAndroidPrompt() {
    prompt.get({
        name: 'using_android',
        description: 'Are you using Android (y/n)',
        default: 'y'
    }, function(err, result) {
        if (err) {
            return console.log(err);
        }
        mergeConfig(result);
        askAndroidPromptResult(result);
        if (usingiOS || usingAndroid) {
            promptQuestions();
        } else {
            askSaveConfigPrompt();
        }
    });
}

function askAndroidPromptResult(result) {
    if (isSelected(result.using_android)) {
        usingAndroid = true;
    }
}

/**
 * Prompt the user through the configurable Fabric add-on services
 */
function promptQuestions() {
    prompt.get([{
        name: 'api_key',
        description: 'Your Fabric API Key',
        default: ''
    }, {
        name: 'api_secret',
        description: 'Your Fabric API Secret',
        default: ''
    }], function(err, result) {
        if (err) {
            return console.log(err);
        }
        mergeConfig(result);
        promptQuestionsResult(result);
        askSaveConfigPrompt();
    });
}

function promptQuestionsResult(result) {
    if (usingiOS) {
        writePodFile(result);
        writeXcodeData(result);
    }
    if (usingAndroid) {
        writeGradleFile();
        writeFabricServiceGradleHook(result);
    }
    console.log('Fabric post install completed. To re-run this script, navigate to the root directory of `nativescript-fabric` in your `node_modules` folder and run: `npm run config`.');
}

function writeXcodeData(config) {

    console.log("Install Fabric-build-xcode hook.");

    try {
        if (!fs.existsSync(path.join(appRoot, "hooks"))) {
            fs.mkdirSync(path.join(appRoot, "hooks"));
        }
        if (!fs.existsSync(path.join(appRoot, "hooks", "after-prepare"))) {
            fs.mkdirSync(path.join(appRoot, "hooks", "after-prepare"));
        }
        var scriptContent =
            `
var path = require("path");
var fs = require("fs");
var xcode;
var plist;

module.exports = function($logger, $projectData, hookArgs) {
    var platform = hookArgs.platform.toLowerCase();
    if (platform === 'ios') {
        // hack for node resolution not working in some cases
        try {
            xcode = require("xcode");
        } catch (ignored) {
            xcode = require("../../node_modules/nativescript-fabric/node_modules/xcode/index.js");
        }
        // hack for node resolution not working in some cases
        try {
            plist = require("simple-plist");
        } catch (ignored) {
            plist = require("../../node_modules/nativescript-fabric/node_modules/simple-plist/simple-plist.js");
        }

        var appName = path.basename($projectData.projectDir);
        var sanitizedName = appName.split('').filter(function(c) { return /[a-zA-Z0-9]/.test(c); }).join('');
        var apiKey = "${config.api_key}";
        var apiSecret = "${config.api_secret}";
        var projectPath = path.join(__dirname, "..", "..", "platforms", "ios", appName + ".xcodeproj", "project.pbxproj");
        var plistPath = path.join(__dirname, "..", "..", "platforms", "ios", appName, appName + "-Info.plist");
        var podsPath = path.join(__dirname, "..", "..", "platforms", "ios", "Pods");
        if (fs.existsSync(projectPath)) {
            var projectPathContent = fs.readFileSync(projectPath).toString();

            // already added
            if (projectPathContent.indexOf('Configure Fabric') != -1) {
                return;
            }
            $logger.info('Configure Fabric for iOS');

            var xcodeProject = xcode.project(projectPath);
            xcodeProject.parseSync();
            var options = { shellPath: '/bin/sh', shellScript: podsPath + '/Fabric/run ' + apiKey + ' ' + apiSecret };
            var buildPhase = xcodeProject.addBuildPhase([], 'PBXShellScriptBuildPhase', 'Configure Fabric', xcodeProject.getFirstTarget().uuid, options).buildPhase;
            fs.writeFileSync(projectPath, xcodeProject.writeSync());
            $logger.trace('Updated Xcode project');

            var appPlist = plist.readFileSync(plistPath);
            plist.Fabric = {
                APIKey: apiKey,
                Kits: [{
                    KitInfo: '',
                    KiteName: 'Crashlytics'
                }, {
                    KitInfo: '',
                    KiteName: 'Answers'
                }]
            }
            plist.writeFileSync(plistPath, appPlist);
            $logger.trace('Updated Plist');
        }
    }
};
`;
        console.log("Writing 'nativescript-fabric-xcode.js' to " + appRoot + "hooks/after-prepare");
        var scriptPath = path.join(appRoot, "hooks", "after-prepare", "nativescript-fabric-xcode.js");
        fs.writeFileSync(scriptPath, scriptContent);
    } catch (e) {
        console.log("Failed to install nativescript-fabric-xcode hook.");
        console.log(e);
        throw e;
    }
}

function askSaveConfigPrompt() {
    prompt.get({
        name: 'save_config',
        description: 'Do you want to save the selected configuration. Reinstalling the dependency will reuse the setup from: ' + pluginConfigFile + '. CI will be easier. (y/n)',
        default: 'y'
    }, function(err, result) {
        if (err) {
            return console.log(err);
        }
        if (isSelected(result.save_config)) {
            saveConfig();
        }
    });
}

/**
 * Create the iOS PodFile for installing the Fabric iOS dependencies and service dependencies
 *
 * @param {any} result The answers to the micro-service prompts
 */
function writePodFile(result) {
    if (!fs.existsSync(directories.ios)) {
        fs.mkdirSync(directories.ios);
    }
    try {
        fs.writeFileSync(directories.ios + '/Podfile',
            `use_frameworks!
pod 'Fabric', '${FABRIC_IOS_FABRIC}'
pod 'Crashlytics', '${FABRIC_IOS_CRASHLYTICS}'
# Crashlytics works best without bitcode
post_install do |installer|
    installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
            config.build_settings['ENABLE_BITCODE'] = "NO"
        end
    end
end
`);
        console.log('Successfully created iOS (Pod) file.');
    } catch (e) {
        console.log('Failed to create iOS (Pod) file.');
        console.log(e);
        throw e;
    }
}

/**
 * Create the Android Gradle for installing the Fabric Android dependencies and service dependencies
 *
 * @param {any} result The answers to the micro-service prompts
 */
function writeGradleFile() {
    if (!fs.existsSync(directories.android)) {
        fs.mkdirSync(directories.android);
    }
    try {
        fs.writeFileSync(directories.android + '/include.gradle',
            `
android {

}

buildscript {
  repositories {
    maven { url 'https://maven.fabric.io/public' }
  }
}

repositories {
  mavenCentral()
  maven { url 'https://maven.fabric.io/public' }
}

dependencies {
  compile('com.crashlytics.sdk.android:crashlytics:${FABRIC_ANDROID_CRASHLYTICS}@aar') {
    transitive = true;
  }
  compile('com.crashlytics.sdk.android:answers:${FABRIC_ANDROID_ANSWERS}@aar') {
    transitive = true;
  }
}

`);
        console.log('Successfully created Android (include.gradle) file.');
    } catch (e) {
        console.log('Failed to create Android (include.gradle) file.');
        console.log(e);
        throw e;
    }
}

/**
 * Create dev tools gradle runtime entry
 */
function writeFabricServiceGradleHook(config) {
    console.log("Install Fabric-build-gradle hook.");
    try {
        if (!fs.existsSync(path.join(appRoot, "hooks"))) {
            fs.mkdirSync(path.join(appRoot, "hooks"));
        }
        if (!fs.existsSync(path.join(appRoot, "hooks", "after-prepare"))) {
            fs.mkdirSync(path.join(appRoot, "hooks", "after-prepare"));
        }
        var scriptContent =
            `
var path = require("path");
var fs = require("fs");
module.exports = function($logger, $projectData, hookArgs) {
  var platform = hookArgs.platform.toLowerCase();

  function updateAppGradleScript(file) {
    var appBuildGradleContent = fs.readFileSync(file).toString();
    if (!appBuildGradleContent.match(/.*fabric.*/)) {
      $logger.trace("Configuring Fabric for Android");
      var search = -1;

      search = appBuildGradleContent.indexOf("repositories {", 0);
      if (search == -1) {
          return;
      }
      appBuildGradleContent = appBuildGradleContent.substr(0, search + 14) + '	    maven { url "https://maven.fabric.io/public" }\\n' + appBuildGradleContent.substr(search + 14);

      // TODO add to buildTypes entry
      // appBuildGradleContent = appBuildGradleContent + '\\ndebug { \\n   ext.enableCrashlytics = false\\n}\\n';

      search = appBuildGradleContent.indexOf("apply plugin: \\"com.android.application\\"");
      if (search == -1) {
          return;
      }
      appBuildGradleContent = appBuildGradleContent.substr(0, search + 39) + '\\napply plugin: "io.fabric"\\n' + appBuildGradleContent.substr(search + 39);

      fs.writeFileSync(file, appBuildGradleContent);
      $logger.trace('Written build.gradle');

    }
    if (appBuildGradleContent.indexOf("buildMetadata.finalizedBy(copyMetadata)") === -1) {
      appBuildGradleContent = appBuildGradleContent.replace("ensureMetadataOutDir.finalizedBy(buildMetadata)", "ensureMetadataOutDir.finalizedBy(buildMetadata)\\n\\t\\tbuildMetadata.finalizedBy(copyMetadata)");
      appBuildGradleContent += \`
task copyMetadata {
  doLast {
    copy {
        from "$projectDir/src/main/assets/metadata"
        def toDir = project.hasProperty("release") ? "release" : "debug";
        if (new File("$projectDir/build/intermediates/assets").listFiles() != null) {
          toDir = new File("$projectDir/build/intermediates/assets").listFiles()[0].name
          if (toDir != 'debug' && toDir != 'release') {
            toDir += "/release"
          }
        }
        into "$projectDir/build/intermediates/assets/" + toDir + "/metadata"
    }
  }
}
\`;
      fs.writeFileSync(file, appBuildGradleContent);
      $logger.trace('Written build.gradle');
    }
  }

  function updateGradleScript(file) {
    var buildGradleContent = fs.readFileSync(file).toString();
    if (!buildGradleContent.match(/.*fabric.*/)) {
      $logger.trace("Configuring Fabric for Android");
      var search = -1;

      search = buildGradleContent.indexOf("repositories", 0);
      if (search == -1) {
          return;
      }
      search = buildGradleContent.indexOf("}", search);
      buildGradleContent = buildGradleContent.substr(0, search - 1) + '	    maven { url "https://maven.fabric.io/public" }\\n' + buildGradleContent.substr(search - 1);

      search = buildGradleContent.indexOf("dependencies", search);
      if (search == -1) {
          return;
      }
      search = buildGradleContent.indexOf("}", search);
      if (search == -1) {
          return;
      }
      buildGradleContent = buildGradleContent.substr(0, search - 1) + '	    classpath "io.fabric.tools:gradle:${FABRIC_GRADLE_TOOLS}"\\n' + buildGradleContent.substr(search - 1);

      fs.writeFileSync(file, buildGradleContent);
      $logger.trace('Written build.gradle');
    }
  }

  if (platform === 'android') {

      var apiKey = "${config.api_key}";
      var apiSecret = "${config.api_secret}";
      var androidPlatformDir = path.join(__dirname, "..", "..", 'platforms', 'android');
      var androidAppPlatformDir = path.join(__dirname, "..", "..", 'platforms', 'android', 'app');
      var gradleScript = path.join(androidPlatformDir, 'build.gradle');
      var gradleAppScript = path.join(androidAppPlatformDir, 'build.gradle');

      if (fs.existsSync(gradleAppScript)) {
        updateAppGradleScript(gradleAppScript);
        updateGradleScript(gradleScript);
      } else {
        updateGradleScript(gradleScript);
      }

      var settingsJson = path.join(__dirname, "..", "..", "platforms", "android", "app", "src", "main", "res", "fabric.properties");

      var propertiesContent = '# Contains API Secret used to validate your application. Commit to internal source control; avoid making secret public\\n';
      propertiesContent+='apiKey = ' + apiKey + '\\n';
      propertiesContent+='apiSecret = ' + apiSecret + '\\n';
      fs.writeFileSync(settingsJson, propertiesContent);
      $logger.trace('Written fabric.properties');

  }
};
`;
        console.log("Writing 'nativescript-fabric-gradle.js' to " + appRoot + "hooks/after-prepare");
        var scriptPath = path.join(appRoot, "hooks", "after-prepare", "nativescript-fabric-gradle.js");
        fs.writeFileSync(scriptPath, scriptContent);
    } catch (e) {
        console.log("Failed to install nativescript-fabric-gradle hook.");
        console.log(e);
        throw e;
    }
}

/**
 * Determines if the answer validates as selected
 *
 * @param {any} value The user input for a prompt
 * @returns {boolean} The answer is yes, {false} The answer is no
 */
function isSelected(value) {
    return value === true || (typeof value === "string" && value.toLowerCase() === 'y');
}

function isPresent(value) {
    return value !== undefined;
}