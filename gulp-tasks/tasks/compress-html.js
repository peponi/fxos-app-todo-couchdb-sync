var gulp            = require('gulp'),
// https://www.npmjs.com/package/gulp-htmlmin
    htmlmin         = require('gulp-htmlmin');

/**
 * Compress HTML
 */

gulp.task('compress:html', function() {
  	gulp.src(process.env.GULP_PROD_PATH)
		// option: https://github.com/kangax/html-minifier
	    .pipe(htmlmin({
	        collapseWhitespace: true,
	        removeComments: true,
	        removeAttributeQuotes: true
	    }))
	    .pipe(gulp.dest(process.env.GULP_PROD_PATH));
});
