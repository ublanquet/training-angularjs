const gulp = require('gulp');
const browserSync = require('browser-sync');
const fs = require('fs-extra');

const conf = require('../../conf/gulp.conf');
const plumber = require('gulp-plumber');

gulp.task('styles', gulp.series(makeCss, injectCss));

function makeCss(cb) {
    let files = [
        conf.path.src('**/*.css'),
        conf.path.styles('**/*.css')
    ];

    // TODO sass
    return gulp.src(files, {base: '.'})
        .pipe(plumber()) // exit gracefully if something fails after this
        .pipe(gulp.dest(conf.path.tmp()))
        .pipe(browserSync.stream())
        .on('finish', cb);
}

function injectCss(cb) {
    let srcIndex = conf.path.app('index.html');
    let dstIndex = conf.path.tmp('index.html');
    if (!fs.existsSync(dstIndex)) {
        fs.copySync(srcIndex, dstIndex);
    }

    // TODO use gulp-inject to wire up css in index.html
    return gulp.src(dstIndex, {base: conf.path.tmp()})
        .pipe(gulp.dest(conf.paths.tmp))
        .on('end', cb);
}
