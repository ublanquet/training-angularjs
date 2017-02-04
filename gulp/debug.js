/*jshint node:true */

'use strict';

const args = require('yargs').argv;
const gutil = require('gulp-util');
const debug = require('gulp-debug');

module.exports.verbose = args.verbose || args.debug;
module.exports.tap = function(title) {
    if (module.exports.verbose) {
        return debug({
            title: title
        });
    } else {
        return gutil.noop();
    }
};

module.exports.withFilters = function(subtaskFilter, excludeFilter) {
    return help(subtaskFilter, excludeFilter);
};
