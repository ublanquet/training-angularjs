const gulp = require('gulp');
const conf = require('../../conf/gulp.conf');
const replace = require('gulp-replace');

const log = require('../log');
const notify = require('../notify');
const args = require('yargs').argv;
const $bump = require('gulp-bump');
const $zip = require('gulp-zip');
const md5 = require('gulp-md5');

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', gulp.series(() => bump('patch'), version));
gulp.task('bump:patch', gulp.series(() => bump('patch'), version));
gulp.task('bump:minor', gulp.series(() => bump('minor'), version));
gulp.task('bump:major', gulp.series(() => bump('major'), version));

gulp.task('zip', zip);
gulp.task('package', gulp.series('zip', (cb) => {
    notify({
        title: 'gulp build',
        subtitle: 'Deployed to the build folder',
        message: 'Running `gulp serve-build`'
    });
    cb();
}));

function zip() {
    let projectName = require(`${process.cwd()}/package.json`).name;
    let projectVersion = require(`${process.cwd()}/package.json`).name;

    return gulp.src(conf.path.dist('**/*'))
        .pipe($zip(conf.path.dist(`${projectName}-${projectVersion}.zip`)))
        .pipe(md5())
        .pipe(gulp.dest('.'));
}

function bump(type) {
    let msg = 'Bumping versions';
    type = type || 'patch';
    let version = args.version;
    let options = {};
    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' for a ' + type;
    }
    log.i(msg);

    return gulp
        .src(['./package.json', './bower.json'])
        .pipe($bump(options))
        .pipe(gulp.dest('.'));
}

function version() {
    let version = require(`${process.cwd()}/package.json`).version;
    log.i('Bumped \'' + conf.path.env('version.js') + ' to version ' + version);
    return gulp.src(conf.path.env('version.js'))
        .pipe(replace(/version = '\d*.\d*.\d*'/g, 'version = \'' + version + '\''))
        .pipe(gulp.dest(conf.path.env()));
}

