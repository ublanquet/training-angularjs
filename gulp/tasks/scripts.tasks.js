const gulp = require('gulp');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const typescript = require('gulp-typescript');

const changed = require('gulp-changed');
const gulpInject = require('gulp-inject');

const browserSync = require('browser-sync');
const fs = require('fs-extra');
const wiredep = require('wiredep').stream;

const log = require('../log');
const debug = require('../debug');
const plugins = require('../plugins');
const cache = require('../cache');

const tsConf = require('../../conf/ts.conf.json').compilerOptions;
const conf = require('../../conf/gulp.conf');

gulp.task('scripts', gulp.series(env, scripts, injectKarma));

// process env files
function env(cb) {
    const paramsFile = conf.env.files()[1];
    if (!fs.existsSync(paramsFile)) {
        log.e(`script "${paramsFile}" not found!`);
        throw new Error('scripts conf ' + paramsFile + ' not found!');
    }
    log.i('injecting scripts with conf ' + conf.env.files());

    const injectTag = 'env';
    ts(conf.env.files(), injectTag, () => {
        return injectIndex(injectTag, false, cb);
    });
}

// process js|ts script files
function scripts(cb) {
    let includeSpec = conf.isTest();
    // append test files ?

    let jsPattern = conf.sourceOrder;
    jsPattern = jsPattern.concat(includeSpec ? '**/*.spec.{js,ts}' : '!**/*.spec.{js,ts}');
    let jsOrder = []
        .concat(conf.env.files())
        .concat(conf.path.config('**/*.js'))  // conf first
        .concat(makeOrder(jsPattern, includeSpec))   // then sources.
        // ignore all plugins, & include enabled ones
        .concat(plugins.files('**/*.{js,ts}'));

    log.debug('Script inject order: ' + jsOrder);
    const injectTag = 'scripts';
    return ts(jsOrder, injectTag, () => {
        return injectIndex(injectTag, true, cb);
    });
}

function ts(jsOrder, injectTag, cb) {

    return gulp.src(jsOrder, {base: '.'})
    // .pipe(changed(conf.path.tmp(), {extension: '.js'}))  // TODO uncomment when gulp is packaging ts with modules.
        .pipe(changed(conf.path.tmp()))
        .pipe(debug.tap('injecting: '))
        .pipe(sourcemaps.init())
        .pipe(plumber()) // exit gracefully if something fails after this
        .pipe(typescript(tsConf))
        .pipe(cache(injectTag, {
            dest: conf.path.tmp()
        }))
        .pipe(babel({
            extends: conf.path.rootDir('.babelrc')
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(conf.path.tmp()))
        .on('finish', cb);
}

function injectIndex(injectTag, reload, cb) {

    let injectOptions = {
        ignorePath: [conf.paths.src, conf.paths.tmp],
        addRootSlash: false
    };

    if (injectTag) {
        injectOptions.starttag = `<!-- inject:${injectTag}:{{ext}} -->`;
    }

    let srcIndex = conf.path.app('index.html');
    let dstIndex = conf.path.tmp('index.html');
    if (!fs.existsSync(dstIndex)) {
        fs.copySync(srcIndex, dstIndex);
    }

    return gulp.src(dstIndex)
    // .pipe(changed(conf.path.tmp()))
        .pipe(debug.tap('injectIndex'))
        .pipe(plumber()) // exit gracefully if something fails after this
        .pipe(gulpInject(gulp.src(cache.get(injectTag), {base: '.'}), injectOptions))
        .pipe(wiredep(Object.assign({}, conf.wiredep)))
        .pipe(gulp.dest(conf.paths.tmp))
        .pipe(reload ? browserSync.stream() : gutil.noop())
        .on('finish', cb);
}

function injectKarma(cb) {
    let injectOptions = {
        ignorePath: [conf.paths.src, conf.paths.tmp],
        addRootSlash: false,
        starttag: '[',
        endtag: ']',
        transform: function (filepath, file, i, length) {
            return `  "${filepath}"${(i + 1 < length) ? ',' : ''}`;
        }
    };

    let dstConf = conf.path.tmp('js-order.json');
    if (!fs.existsSync(dstConf)) {
        fs.writeFileSync(dstConf, '[\n]');
    }

    let jsOrder = []
        .concat(cache.get('env'))
        .concat(cache.get('scripts'));

    gulp.src(dstConf)
        .pipe(plumber()) // exit gracefully if something fails after this
        .pipe(gulpInject(gulp.src(jsOrder, {base: '.'}), injectOptions))
        .pipe(wiredep(Object.assign({}, conf.wiredep)))
        .pipe(gulp.dest(conf.path.tmp()))
        .on('finish', cb);
}

function makeOrder(jsOrder, includeSpec) {
    let scripts = [];
    let exclude = [];
    for (let o of jsOrder) {
        if (o[0] !== '!') {
            if (includeSpec) {
                scripts.push(conf.path.testHelpers(o));
            }
            scripts.push(conf.path.src(o));
        } else {
            o = o.substr(1);
            exclude.push(`!${conf.path.src(o)}`);
        }
    }

    return scripts.concat(exclude);
}
