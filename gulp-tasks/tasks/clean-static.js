var gulp    = require('gulp'),
// https://www.npmjs.com/package/gulp-clean
    clean   = require('gulp-clean');

/**
 * Clean Static
 */

gulp.task('clean:static', function () {
    return gulp.src(process.env.GULP_WEBSITE_ROOT + 'build/')
        .pipe(clean());
});
