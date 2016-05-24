var gulp            = require('gulp'),
// https://www.npmjs.com/package/gulp-html-replace
htmlreplace         = require('gulp-html-replace');

/**
 * replace market areas in HTML with following
 */

gulp.task('replace:html', function() {
  return gulp.src(process.env.GULP_HTML_DEV_SOURCE)
    .pipe(htmlreplace({
        'css': 'lib.css',
        'js': 'app.js',
        'appcache': {
            src: 'manifest.appcache',
            tpl: '<html manifest="%s">'
        }
    }))
    .pipe(gulp.dest(prodPath));
});
