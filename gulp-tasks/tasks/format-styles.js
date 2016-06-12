var gulp    	= require('gulp'),
// https://www.npmjs.com/package/gulp-csscomb
    csscomb 	= require('gulp-csscomb');

/**
 * Format SASS
 */

gulp.task('format:styles', function () {
    return gulp.src(process.env.GULP_CSS_DEV_SOURCE.split(","))
        .pipe(csscomb())
        .pipe(gulp.dest(process.env.GULP_CSS_DEV_PATH));
});
