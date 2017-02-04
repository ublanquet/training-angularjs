let notifier = require('node-notifier');
let path = require('path');

/**
 * Show OS level notification using node-notifier
 */
function notify(msg) {
  let notifyOptions = {
    sound: 'Bottle',
    contentImage: path.join(__dirname, 'gulp.png'),
    icon: path.join(__dirname, 'gulp.png'),
    msg: msg
  };
  notifier.notify(notifyOptions);
}

module.exports = notify;
