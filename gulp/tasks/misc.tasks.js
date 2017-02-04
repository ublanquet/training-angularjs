const gulp = require('gulp');
const del = require('del');

const conf = require('../../conf/gulp.conf');

gulp.task('clean', clean);
gulp.task('clean:scripts', cleanScripts);
gulp.task('clean:styles', cleanStyles);
gulp.task('clean:dist', cleanDist);

function clean(done) {
    del.sync(conf.paths.tmp);
    done();
}

function cleanDist(done) {
    del.sync(conf.paths.dist);
    done();
}

function cleanScripts(done) {
    del.sync([conf.path.dist('**/*.js'), conf.path.tmp('**/*.js')]);
    done();
}

function cleanStyles(done) {
    del.sync([conf.path.dist('**/*.css'),
        conf.path.tmp('**/*.css')]);
    done();
}

