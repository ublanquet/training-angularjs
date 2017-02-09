const conf = require('./gulp.conf');
const wiredep = require('wiredep');
const fileOrder = require(`../${conf.path.tmp('js-order.json')}`);

module.exports = function listFiles() {
    const wiredepOptions = Object.assign({}, conf.wiredep, {
        dependencies: true,
        devDependencies: true
    });

    const patterns = wiredep(wiredepOptions).js
        .concat(fileOrder.map(pattern => (conf.path.tmp(pattern))))
        .concat(conf.path.tmp('templateCacheHtml.js'));

    const files = patterns.map(pattern => ({pattern}));
    files.push({
        pattern: conf.path.src('resources/**/*'),
        included: false,
        served: true,
        watched: false
    });

    files.push({
        pattern: conf.path.tmp('**/*.js.map'),
        included: false,
        served: true,
        watched: false
    });

    return files;
};
