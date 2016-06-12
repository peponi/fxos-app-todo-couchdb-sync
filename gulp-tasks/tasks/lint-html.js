var gulp       	= require('gulp'),
// https://www.npmjs.com/package/gulp-htmllint
    htmllint   	= require('gulp-htmllint'),
// https://www.npmjs.com/package/gulp-cached
    cache      	= require('gulp-cached');

/**
 * Lint HTML
 */

gulp.task('lint:html', function() {
	console.log(process.env.GULP_HTML_DEV_SOURCE);
    return gulp.src(process.env.GULP_HTML_DEV_SOURCE)
        .pipe(cache('htmllint'))
        .pipe(htmllint());
});
