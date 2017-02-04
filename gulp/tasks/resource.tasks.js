const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const merge = require('gulp-merge-json');
const imagemin = require('gulp-imagemin');

const conf = require('../../conf/gulp.conf');

const debug = require('../debug');
const log = require('../log');
const plugins = require('../plugins');

const path = require('path');
const mergeStream = require('merge-stream');
let glob = require('glob');
const fs = require('fs-extra');

const pngquant = require('imagemin-pngquant');

gulp.task('resources:fonts', copyFonts);
gulp.task('resources:i18n', mergei18n);
gulp.task('resources:lib', copyLib);
gulp.task('resources:images', imagesMin);

gulp.task('resources',
    gulp.series(copyResources,
        gulp.parallel('resources:lib', 'resources:fonts', copyPlugins, 'resources:i18n'),
        'resources:images'
    )
);

/**
 * Copy fonts
 * @return {Stream}
 */
function copyFonts() {
    return gulp
        .src(conf.path.fonts())
        .pipe(gulp.dest(conf.path.dist('fonts')));
}

function copyLib() {
    return gulp
        .src(conf.path.lib('**/*'), {base: '.'})
        .pipe(gulp.dest(conf.path.dist()));
}

function copyResources() {
    return gulp
        .src(conf.path.resources('**/*'), {base: '.'})
        .pipe(gulp.dest(conf.path.dist()));
}

function copyPlugins() {
    return gulp
        .src(plugins.files('resources/**'), {base: '.'})
        .pipe(gulp.dest(conf.path.dist()));
}

/**
 * Compress images
 * @return {Stream}
 */
function imagesMin() {
    return gulp
        .src(conf.path.app('**/*.{jpg,png,gif}'), {base: '.'})
        .pipe(imagemin({
            optimizationLevel: conf.imagemin.level,
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(conf.path.dist()));
}

function mergei18n(cb) {
    if (!fs.existsSync(conf.path.i18n())) {
        cb();
        return;
    }

    let localsPath = conf.path.i18n(path.join('../**/', conf.i18n.pattern()));
    let localesFiles = glob.sync(localsPath, {
        noext: false
    });

    let dest = conf.isDist() ? conf.path.dist : conf.path.tmp;

    let streams = localesFiles.map((file) => {
        let regexp = new RegExp(conf.i18n.pattern().replace(/\//, '\/'));
        let locale = regexp.exec(file)[1];

        log.debug(`found locale : ${locale}`);

        let files = [
            conf.path.app(path.join('**', conf.i18n.pattern(locale)))
        ].concat(plugins.files(conf.i18n.pattern(locale)));

        log.debug(`merging files to dest : ${dest(conf.path.i18n('../${file}'))}`);
        return gulp.src(files, {base: '.'})
            .pipe(plumber()) // exit gracefully if something fails after this
            .pipe(debug.tap('`merging files'))
            .pipe(merge(conf.i18n.pattern(locale)))
            .pipe(gulp.dest(dest(conf.path.i18n('..'))));
    });

    if (!streams.length) {
        log.warn(`no locales found within folder ${conf.path.i18n()} that matches pattern ${conf.i18n.pattern()}`);
        return gutil.noop();
    }

    return mergeStream(streams);
}
