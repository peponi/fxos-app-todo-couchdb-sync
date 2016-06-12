var gulp        = require('gulp'),
// https://www.npmjs.com/package/babel
    babel       = require('gulp-babel');

/**
 * Transpile ES6/JSX to ES5
 */

/**
 * DOC: 
 * https://github.com/thejameskyle/babel-handbook
 */
gulp.task('transpile:es6', function() {
    return gulp.src(process.env.GULP_JS_DEV_SOURCE.split(","))
        .pipe(babel())
        .pipe(gulp.dest(process.env.GULP_JS_ES5_TEMP_PATH));
});
