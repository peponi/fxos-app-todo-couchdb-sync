var gulp  = require('gulp'),
// https://www.npmjs.com/package/gulp-pa11y
    pa11y = require('gulp-pa11y');

/**
 * Create SAS documentation files
 *
 * DOC:
 * https://github.com/nature/pa11y
 */

gulp.task('create:doc:html', function () {
    pa11y({
        url: 'http://127.0.0.1:8000/templates/ltr/pages/p00-all-modules.html'
    });
});

