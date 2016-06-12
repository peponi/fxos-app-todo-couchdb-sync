var gulp        = require('gulp'),
// https://www.npmjs.com/package/gulp-if
    gulpif      = require('gulp-if'),
// https://www.npmjs.com/package/gulp-sourcemaps
    sourcemaps  = require('gulp-sourcemaps'),
// https://www.npmjs.com/package/gulp-util
    gutil       = require('gulp-util'),
// https://www.npmjs.com/package/browserify
    browserify  = require('browserify'),
// https://www.npmjs.com/package/watchify
    watchify    = require('watchify'), 
// https://www.npmjs.com/package/vinyl-source-stream
    source      = require('vinyl-source-stream'),
// https://www.npmjs.com/package/vinyl-buffer
    buffer      = require('vinyl-buffer');

/**
 * Bundle scripts with Browserify
 * this setup is for the case of seperat bundles are needed
 * (there is more then the main folder in scripts/bundles)
 */

var b = browserify({
    entries: process.env.GULP_JS_BUNDLE_ENTRY_SOURCE.split(","),
    cache: {},
    debug: true,
    packageCache: {}
});

// https://www.npmjs.com/package/gulp-babelify
b.transform('babelify');

b.plugin(watchify);

// https://www.npmjs.com/package/factor-bundle
b.plugin('factor-bundle', {
    outputs: process.env.GULP_JS_BUNDLE_OUTPUTS.split(",")
});

b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('common.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(
            gulpif( process.env.GULP_JS_USE_MAPS == true,
                sourcemaps.init({loadMaps: true})// loads map from browserify file
            ) 
        )
        // Add transformation tasks to the pipeline here.
        .pipe(
            gulpif( process.env.GULP_JS_USE_MAPS == true,
                sourcemaps.write() // writes .map file
            )
        )
        .pipe(gulp.dest(process.env.GULP_JS_BUNDLE_DEST_PATHS.split(",")));
}

gulp.task('bundle:scripts:browserify', bundle);
