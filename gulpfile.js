const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const fs = require('fs-extra');
// const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');
const log = require('./gulp/log');
const browserSync = require('browser-sync');

// Load some files into the registry
let hub = new HubRegistry([conf.path.tasks('*.js')]);
const taskListing = require('./gulp/listing');
const cache = require('./gulp/cache');

// Tell gulp to use the tasks just loaded
// gulp.registry(hub);
// no need to register ? but hub is needed anyway. Avoid jshint warning
hub = hub;

gulp.task('help', taskListing);
gulp.task('default', gulp.series('help'));

// watch
gulp.task('watch', watch);

// build
gulp.task(`build`, gulp.series('clean:dist', 'clean', 'partials', 'resources', 'scripts', 'styles', 'vet', 'build'));
for (let flavor of flavorList()) {
    gulp.task(`build:${flavor}`, gulp.series(cb => setEnv(cb, flavor), 'build'));
}

// text
gulp.task('test', gulp.series(cb => setEnv(cb, 'test'), 'clean', 'scripts', 'partials', 'karma:single-run'));

// test auto
gulp.task('test:auto', gulp.series(cb => setEnv(cb, 'test'),
    'clean', 'scripts', 'partials', 'watch', 'karma:auto-run'));

// serve
gulp.task('serve', gulp.series('clean', cb => setEnv(cb, 'dev'), 'scripts', 'styles', 'resources:i18n',
    'watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('browsersync:dist'));

function reloadBrowserSync(cb) {
    log.debug('reload...');
    browserSync.reload();
    cb();
}

function watch(done) {

    // watch all html => BS
    gulp.watch([
            conf.path.app('**/*.html'),
            conf.path.resources('**'),
            `!${conf.path.app('index.html')}`
        ],
        reloadBrowserSync);

    // watch index.html => build
    gulp.watch(conf.path.app('index.html'), gulp.series('clean', 'scripts',  'styles', 'resources:i18n'),
        reloadBrowserSync);

    // watch d.ts => typings
    gulp.watch([
        conf.path.app('**/*.d.ts'),
        conf.path.typings('**/*.d.ts'),
        `!${conf.path.typings('**/*.d.ts')}`
    ], gulp.series('typings'));

    // watch scss => styles
    gulp.watch([
        conf.path.app('**/*.{scss,css}')
    ], gulp.series('styles'))
        .on('unlink', onDelete);

    // watch locales => resources:i18n
    gulp.watch([
        conf.path.app('**/' + conf.i18n.pattern())
    ], gulp.series('resources:i18n', reloadBrowserSync));

    // watch ts/js => scripts
    gulp.watch([
            conf.path.app('**/*.{ts,js}'),
            conf.path.config('**/*.{ts,js}'),
            conf.path.env('**/*.{ts,js}'),
            'bower.json'],
        gulp.series('scripts'))
        .on('unlink', onDelete);
    done();
}

function setEnv(cb, flavor) {
    if (flavor) {
        conf.env.flavor = flavor;
    }
    cb();
}

function flavorList() {
    return fs.readdirSync(conf.path.env())
        .map((filename) => {
            let match = /(.*?)-conf\.js/g.exec(filename);
            return match ? match[1] : undefined;
        })
        .filter((flavor) => {
            return !!flavor;
        });
}

function onDelete(file) {
    cache.remove(file);
}
