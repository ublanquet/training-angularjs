const conf = require('./gulp.conf');
const listFiles = require('./karma-files.conf');

module.exports = function (config) {
    const configuration = {
        basePath: '../',
        singleRun: false,
        autoWatch: true,
        logLevel: 'INFO',
        junitReporter: {
            outputDir: 'test-reports'
        },
        browsers: [
            'PhantomJS', 'Chrome'
        ],
        frameworks: [
            'phantomjs-shim',
            'mocha', 'chai', 'sinon',
            'es6-shim'
        ],
        files: listFiles(),
        preprocessors: {
            [conf.path.src('**/*.html')]: [
                'ng-html2js'
            ]
        },
        ngHtml2JsPreprocessor: {
            // stripPrefix: `${conf.paths.src}/`,
            moduleName: 'app'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // test results reporter to use
        // possible values: 'dots', 'progress', 'coverage'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'/*, 'coverage'*/, 'mocha'],

        client: {
            mocha: {
                reporter: 'html'
            }
        }
    };

    console.log(listFiles());
    config.set(configuration);
};
