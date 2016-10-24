module.exports = function (config) {
  config.set({
    browserNoActivityTimeout: 40000,

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'app/tests/setup.js', included: true, served: true},
      {pattern: 'app/**/*.spec.js', included: true, served: true}
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [],

    customLaunchers: {
      android: {
        base: 'NS',
        platform: 'android'
      },
      ios: {
        base: 'NS',
        platform: 'ios'
      },
      ios_simulator: {
        base: 'NS',
        platform: 'ios',
        arguments: ['--emulator']
      }
    },
    /*
     * test results reporter to use
     *
     * possible values: 'dots', 'progress'
     * available reporters: https://npmjs.org/browse/keyword/karma-reporter
     */
    reporters: ['progress', 'junit'],

    /**
     * See https://github.com/karma-runner/karma-junit-reporter#configuration
     */
    junitReporter: {
      outputDir: '../../tmp/surefire-reports', // results will be saved as $outputDir/$browserName.xml
      outputFile: 'TEST-ToastDemoApp.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: 'Toast-Demo-MobileApp', // suite will become the package name attribute in xml testsuite element
      useBrowserName: true // add browser name to report and classes names
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
