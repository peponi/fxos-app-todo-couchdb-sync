var gulp            = require('gulp'),
// https://www.npmjs.com/package/gulp-if
    gulpif          = require('gulp-if'),
// https://www.npmjs.com/package/gulp-uglify
    uglify          = require('gulp-uglify'),
// https://www.npmjs.com/package/gulp-strip-debug
    stripDebug      = require('gulp-strip-debug'),
// https://www.npmjs.com/package/gulp-sourcemaps
    sourcemaps      = require('gulp-sourcemaps');

/**
 * Compress Scripts
 */

gulp.task('compress:scripts', function () {

    gulp.src(process.env.GULP_JS_DEV_SOURCE.split(","))
        .pipe(
            gulpif(process.env.GULP_JS_USE_MAPS,
                sourcemaps.init()
            )
        )
        .pipe(stripDebug())
        .pipe(
            gulpif(process.env.GULP_ENVIRONMENT !== 'development',
                uglify()
            )
        )
        .pipe(
            gulpif(process.env.GULP_JS_USE_MAPS,
                sourcemaps.write()
            )
        )
        .pipe(gulp.dest(process.env.GULP_JS_PROD_PATHS));
});
