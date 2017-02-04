const conf = require('./gulp.conf');

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.dist
      ],
      routes: {
        '/styles': 'styles',
        '/scripts': 'scripts',
        // '/app': 'app'
      }
    },
    open: false
  };
};
