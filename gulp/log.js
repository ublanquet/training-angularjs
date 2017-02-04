let util = require('gulp-util');
let debug = require('./debug');

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
let log = {};
log.i = log.info = (msg) => _log(msg, util.colors.cyan);
log.s = log.success = (msg) => _log(msg, util.colors.green);
log.w = log.warn = (msg) => _log(msg, util.colors.bgYellow);
log.e = log.error = (msg) => _log(msg, util.colors.bgRed);

if (debug.verbose) {
  log.d = log.debug = (msg) => _log(msg, util.colors.blue);
  log.v = log.verbose = (msg) => _log(msg, util.colors.blue);
} else {
  log.d = log.debug = log.verbose = () => {
    // NOOP
  };
}

function _log(msg, colorFunc) {
  if (typeof(msg) === 'object') {
    for (let item in msg) {
      if (msg.hasOwnProperty(item)) {
        util.log(colorFunc(msg[item]));
      }
    }
  } else {
    util.log(colorFunc(msg));
  }
}


module.exports = log;
