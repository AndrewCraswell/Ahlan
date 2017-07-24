// Karma configuration
// Generated on Thu Aug 04 2016 13:16:25 GMT-0700 (Pacific Daylight Time)

module.exports = function (config) {
    'use strict';

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            './www/lib/ionic/js/ionic.bundle.min.js',

            './node_modules/angular-cache/dist/angular-cache.min.js',
            './node_modules/angular-mocks/angular-mocks.js',

            './www/js/**/*.module.js',
            './www/js/**/*.js'
        ],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './www/js/**/!(*.spec|*.mock).js': ['coverage'],
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'trx'],

        coverageReporter: {
            type: 'html',
            dir: './www/build/bin/coverage/',
            check: {
                global: {
                    statements: 0,
                    branches: 0,
                    functions: 0,
                    lines: 0
                },
                each: {
                    statements: 0,
                    branches: 0,
                    functions: 0,
                    lines: 0
                }
            }
        },

        // output the test results as a TFS compatible report
        trxReporter: {
            outputFile: './www/build/bin/test-runs/test-results.trx'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
