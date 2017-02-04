const gulp = require('gulp');
const conf = require('../../conf/gulp.conf');
const gulpInject = require('gulp-inject');

gulp.task('typings', typings);

function typings(cb) {

    let injectOptions = {
        ignorePath: [conf.path.typings('index.d.ts')],
        addRootSlash: false,
        starttag: '// inject:d.ts',
        endtag: '// endinject',
        transform: function (filepath/* , file, i, length */) {
            return `/// <reference path="../${filepath}" />`;
        }
    };

    gulp.src(conf.path.typings('index.d.ts'))
        .pipe(gulpInject(gulp.src(
            [
                'node_modules/@types/**/*.d.ts',
                'bower_components/**/*.d.ts',
                conf.path.typings('**/*.d.ts'),
                `!${conf.path.typings('index.d.ts')}`
            ]
        ), injectOptions))
        .pipe(gulp.dest(conf.path.typings()))
        .on('finish', cb);
}
