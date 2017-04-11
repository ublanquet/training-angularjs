const gulp = require('gulp');
const filter = require('gulp-filter');
const useref = require('gulp-useref');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
// jshint -W079
const inject = require('gulp-inject');
const $if = require('gulp-if');
const uglifySaveLicense = require('uglify-save-license');
const log = require('../log');
const args = require('yargs').argv;

const conf = require('../../conf/gulp.conf');

gulp.task('build', gulp.parallel(build, copyEnv));

function copyEnv() {
    let js = conf.env.files();
    js = js.map((filename) => {
        return conf.path.tmp(filename);
    });

    log.debug(`copying files : ${js}`);

    return gulp.src(js, {base: conf.path.tmp()})
        .pipe(gulp.dest(conf.path.dist()));
}

function build() {

    const useMaps = !conf.isDist();
    const useUglify = args.uglify || (conf.isDist() && args.uglify !== false);

    const partialsInjectFile = gulp.src(conf.path.tmp('templateCacheHtml.js'), {read: false});
    const partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: conf.paths.tmp,
        addRootSlash: false
    };

    const jsFilter = filter(conf.path.tmp('**/*.js'), {restore: true});
    const cssFilter = filter(conf.path.tmp('**/*.css'), {restore: true});

    return gulp.src(conf.path.tmp('/index.html'))
        .pipe(inject(partialsInjectFile, partialsInjectOptions))
        .pipe(useref())
        .pipe(jsFilter)
        .pipe($if(useMaps, sourcemaps.init()))
        .pipe($if(useUglify, uglify({preserveComments: uglifySaveLicense})
            .on('error', conf.errorHandler('Uglify')))
        )
        .pipe(rev())
        .pipe($if(useMaps, sourcemaps.write('maps')))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe($if(useMaps, sourcemaps.init()))
        .pipe(cssnano({zindex: false}))
        .pipe(rev())
        .pipe($if(useMaps, sourcemaps.write('maps')))
        .pipe(cssFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest(conf.path.dist()));
}
/*

 function copyHtml() {
 return gulp.src(conf.path.src('**!/!*.html'), {base: '.'})
 .pipe(htmlmin())
 .pipe(gulp.dest(conf.path.dist()));
 }
 */
