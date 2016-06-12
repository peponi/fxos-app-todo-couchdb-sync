var gulp        = require('gulp'),
// https://www.npmjs.com/package/gulp-livereload
    livereload  = require('gulp-livereload');

/**
 * Livereload
 */

gulp.task('reload:page', function () {
	console.log('Page reloaded');
	livereload.reload();
});
