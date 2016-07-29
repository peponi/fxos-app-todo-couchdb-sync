var gulp            = require('gulp'),
// https://www.npmjs.com/package/gulp-html-replace
htmlreplace         = require('gulp-html-replace');

/**
 * replace market areas in HTML with following
 */

gulp.task('replace:html', function() {
  return gulp.src(process.env.GULP_HTML_DEV_SOURCE)
    .pipe(htmlreplace({
        'js-lib': '<script src="app/scripts/lib.js"></script>',
        'js-app': '<script src="app/scripts/app.js"></script>',
        'css': '<link rel="stylesheet" type="text/css" href="app/styles/bundle/lib.css"><link rel="stylesheet" type="text/css" href="app/styles/bundle/app.css">',
        'appcache': {
            src: 'manifest.appcache',
            tpl: '<html manifest="%s">'
        }
    }))
    .pipe(gulp.dest(process.env.GULP_WEBSITE_ROOT + 'build/'));
});
