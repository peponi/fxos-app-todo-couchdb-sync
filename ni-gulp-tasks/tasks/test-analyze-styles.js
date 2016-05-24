var gulp            = require('gulp'),
	exec            = require('child_process').exec,
// https://github.com/macbre/analyze-css
    analyzer 		= require('analyze-css');

/**
 * Performance Tests for CSS bundle file
 * 
 * analyze-css is a CSS selectors complexity and performance analyzer
 */
gulp.task('test:analyze:styles', function(cb) {
     exec('analyze-css --file ' + process.env.GULP_CSS_ANALYZE_SOURCE + ' > analyzed-css-metrics.json');
});
