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
      'jasmine',
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

    // plugins array seems to be filled 'automatically' if not defined.
    // plugins: [
    //     'karma-jasmine',
    //     'karma-junit-reporter',
    //     'karma-coverage',
    //     'karma-phantomjs-launcher',
    //     'karma-phantomjs-shim',
    //     'karma-ng-html2js-preprocessor',
    //     'karma-angular-filesort',
    //     'karma-es6-shim',
    //     'karma-html-reporter',
    //     'karma-jasmine-html-reporter'
    // ],
    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // test results reporter to use
    // possible values: 'dots', 'progress', 'coverage'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'/*, 'coverage'*/, 'kjhtml', 'mocha']
  };

  config.set(configuration);
};
