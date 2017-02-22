const gulp = require('gulp');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs-extra');
const gulpInject = require('gulp-inject');

const conf = require('../../conf/gulp.conf');
const plugins = require('../plugins');
const cache = require('../cache');
const plumber = require('gulp-plumber');

gulp.task('styles', gulp.series(makeCss, injectCss));

function makeCss(cb) {
    let files = [
        conf.path.src('**/*.{scss,css}'),
        conf.path.styles('**/*.{scss,css}')
    ].concat(plugins.files('**/*.{scss,css}'));

    return gulp.src(files, {base: '.'})
    // .pipe(changed(conf.path.tmp(), {extension: '.css'}))
        .pipe(plumber()) // exit gracefully if something fails after this
        .pipe(cache('styles', {
            dest: conf.path.tmp(),
            extension: '.css'
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded', includePaths: [conf.path.app()]})).on('error', conf.errorHandler('Sass'))
        .pipe(postcss([autoprefixer()])).on('error', conf.errorHandler('Autoprefixer'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(conf.path.tmp()))
        .pipe(browserSync.stream())
        .on('finish', cb);
}

function injectCss(cb) {
    const injectScripts = gulp.src([
        conf.path.tmp('**/*.css')
    ]);

    const injectOptions = {
        addRootSlash: false,
        addPrefix: '..'
    };

    let srcIndex = conf.path.app('index.html');
    let dstIndex = conf.path.tmp('index.html');
    if (!fs.existsSync(dstIndex)) {
        fs.copySync(srcIndex, dstIndex);
    }

    return gulp.src(dstIndex, {base: conf.path.tmp()})
        .pipe(gulpInject(injectScripts, injectOptions))
        .pipe(gulp.dest(conf.paths.tmp))
        // .pipe(browserSync.stream())
        .on('end', cb);
}
