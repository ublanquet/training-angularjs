/*jshint node:true */

'use strict';

const rename = require('gulp-rename');
const fs = require('fs');
const path = require('path');

let cache = function(key, transform) {

  return rename(function (file) {
    let _path = `${file.dirname}/${file.basename}${file.extname}`;

    cache.pre[key] = cache.pre[key] || [];
    _putCache(key, _path, cache.pre);

    if (transform) {
      let orig = _path;

      if (typeof transform === 'function') {
        file = transform(file) || file;
      } else {
        file = {
          dirname: transform.dest ? path.join(transform.dest, file.dirname): file.dirname,
          basename: file.basename,
          extname: transform.extension || file.extname
        };
      }
      _path = `${file.dirname}/${file.basename}${file.extname}`;
      cache.post[key] = cache.post[key] || [];
      cache.transform[orig] = _path;

      _putCache(key, _path, cache.post);
    }

  });
};

cache.pre = {};
cache.post = {};
cache.transform = {};

cache.get = function(key) {
  return cache.post[key] || cache.pre[key];
};

cache.getPre = function(key) {
  return cache.pre[key];
};

cache.getPost = function(key) {
  return cache.post[key];
};

cache.remove = function(file) {

  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }

  if (cache.transform[file] && fs.existsSync(cache.transform[file])) {
    fs.unlinkSync(cache.transform[file]);
  }
};

function _putCache(key, path, cache) {
  cache[key] = cache[key] || [];
  if (cache[key].indexOf(path) < 0) {
    cache[key].push(path);
  }
}

module.exports = cache;
