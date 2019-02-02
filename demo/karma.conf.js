module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'app/**/*.js',
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


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
            outputDir: 'target/junit-report', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'TEST-Fabric.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: 'Fabrc-Test-MobileApp', // suite will become the package name attribute in xml testsuite element
            useBrowserName: false, // add browser name to report and classes names
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    })
}