'use strict';

/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

const path = require('path');
const gutil = require('gulp-util');

exports.ngModule = 'app';

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
    app: 'src',
    src: 'src/app',
    rootDir: path.join(__dirname, '../'),
    styles: 'src/styles',
    config: 'src/configuration',
    plugins: 'src/plugins',
    env: 'src/env',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e',
    tasks: 'gulp/tasks',
    fonts: 'bower_components/font-awesome/fonts/**/*.*',
    resources: 'src/resources',
    i18n: 'src/resources/i18n',
    lib: 'src/lib',
    testHelpers: 'src/test-helpers',
    typings: 'typings'
};

exports.imagemin = {
    level: 5
};

exports.htmlmin = {
    keepClosingSlash: true,
    collapseWhitespace: true
};

exports.i18n = {
    pattern: function (locale) {
        if (!locale) {
            locale = '+([a-z][a-z])';
        }
        return `i18n/${locale}.json`;
    }
};

exports.env = {
    flavor: '', // to pick up 'dev-conf.js' from env/
    files: function () {

        let files = ['conf.js'];

        if (exports.env.flavor.length > 0) {
            files = files.concat(`${exports.env.flavor}-conf.js`);
        }
        return files.concat('version.js')
            .map((file) => {
                return exports.path.env(file);
            });
    }
};

exports.path = {};
for (const pathName in exports.paths) {
    if (exports.paths.hasOwnProperty(pathName)) {
        exports.path[pathName] = function pathJoin() {
            const pathValue = exports.paths[pathName];
            const funcArgs = Array.prototype.slice.call(arguments);
            const joinArgs = [pathValue].concat(funcArgs);
            return path.join.apply(this, joinArgs);
        };
    }
}

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
    return function (err) {
        gutil.log(gutil.colors.red(`[${title}]`), err.toString());
        this.emit('end');
    };
};

exports.sourceOrder = [
    '**/*params.js',
    '**/app.module.{js,ts}',
    '**/*.module.{js,ts}',
    '**/*.constant.{js,ts}',
    '**/*.constants.{js,ts}',
    '**/*.value.{js,ts}',
    '**/*.provider.{js,ts}',
    '**/*.config.{js,ts}',
    '**/*.route.{js,ts}',
    '**/*.decorator.{js,ts}',
    '**/*.directive.{js,ts}',
    '**/*.component.{js,ts}',
    '**/*.model.{js,ts}',
    '**/*.mapper.{js,ts}',
    '**/*.factory.{js,ts}',
    '**/*.service.{js,ts}',
    '**/*.run.{js,ts}',
    '**/*.controller.{js,ts}',
    '**/*.{js,ts}'
];

function _isEnv(flavors) {
    return flavors.indexOf(exports.env.flavor) !== -1;
}

exports.isTest = function () {
    return _isEnv(['test']);
};

exports.isDev = function () {
    return _isEnv(['dev']);
};

exports.isDist = function () {
    return !exports.isDev();
};

