const gulp = require('gulp');
const tslint = require('gulp-tslint');
const jshint = require('gulp-jshint');
const eslint = require('gulp-eslint');
const jscs = require('gulp-jscs');
const jsStylish = require('gulp-jscs-stylish');
const conf = require('../../conf/gulp.conf');
const args = require('yargs').argv;
const merge = require('merge-stream');
const gutil = require('gulp-util');

gulp.task('vet:ts', vetTs);
gulp.task('vet:js', vetJs);
gulp.task('vet', gulp.series(gulp.parallel('vet:js', 'vet:ts')));

function vetTs() {
    let stream = gulp.src(conf.path.src('**/*.ts'));
    if (args.vet === false) {
        stream.pipe(gutil.noop());
    } else {
        stream.pipe(tslint())
            .pipe(tslint.report());
    }

    return stream;
}

function vetJs(cb) {

    let src = gulp.src([conf.path.src('**/*.js')]);
    let tasks = gulp.src(['gulpfile.js', conf.path.tasks('**/*.js')]);

    if (args.vet === false) {
        src.pipe(gutil.noop()).on('finish', cb);
        tasks.pipe(gutil.noop()).on('finish', cb);
    } else {
        src.pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .pipe(jshint('.jshintrc'))
            .pipe(jscs('.jscrc'))
            .pipe(jsStylish.combineWithHintResults())   // combine with jshint results
            .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
            .pipe(jshint.reporter('fail'))
            .pipe(jscs.reporter('fail'));

        tasks.pipe(jshint('.jshintrc'))
            .pipe(jscs('.jscrc'))
            .pipe(jsStylish.combineWithHintResults())   // combine with jshint results
            .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
            .pipe(jshint.reporter('fail'))
            .pipe(jscs.reporter('fail'));
    }

    return merge(tasks, src);
}
