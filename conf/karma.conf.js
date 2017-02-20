const conf = require('./gulp.conf');
const listFiles = require('./karma-files.conf');

module.exports = function (config) {
    const configuration = {
        basePath: '../',
        singleRun: true,
        autoWatch: false,
        logLevel: 'INFO',
        junitReporter: {
            outputDir: 'test-reports'
        },
        browsers: [
            'PhantomJS'
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

        reporters: ['progress', 'mocha']

    };

    config.set(configuration);
};
