const args = require('yargs').argv;
const log = require('./log');
const conf = require('../conf/gulp.conf');
const fs = require('fs-extra');

let pluginNames = listPlugins();

function listPlugins() {
  let res = [];
  for (let plugin of Object.keys(args)) {
    if (fs.existsSync(conf.path.plugins(plugin))) {
      log.d(`found plugin ${plugin}`);
      res.push(plugin);
    }
  }
  return res;
}

function listFiles(files) {
  if (typeof files === 'string') {
    files = [files];
  }

  let res = [];
  let exclude = [];
  for (let p of pluginNames) {

    for (let f of files) {
      let filePath = `${p}/${f}`;

      if (f[0] !== '!') {
        res.push(conf.path.plugins(filePath));
      } else {
        f = f.substr(1);
        exclude.push(`!${conf.path.plugins(filePath)}`);
      }
    }
  }
  return res.concat(exclude);
}

module.exports = {
  name: listPlugins,
  files: listFiles
};
