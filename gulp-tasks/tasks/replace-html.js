var gulp            = require('gulp'),
// https://www.npmjs.com/package/gulp-html-replace
htmlreplace         = require('gulp-html-replace');

/**
 * replace market areas in HTML with following
 */

gulp.task('replace:html', function() {

    var opts = {
        'js-lib': '<script src="app/scripts/lib.js"></script>',
        'js-app': '<script src="app/scripts/app.js"></script>',
        'css': '<link rel="stylesheet" type="text/css" href="app/styles/bundle/lib.css"><link rel="stylesheet" type="text/css" href="app/styles/bundle/app.css">',
        'appcache': {
            src: 'manifest.appcache',
            tpl: '<html lang="en" manifest="%s">'
        }
    };

    if(process.argv[3] == '--no-appcache') {
        opts.appcache = {
            src: '',
            tpl: '<html lang="en">'
        };
    }

    return gulp.src(process.env.GULP_HTML_DEV_SOURCE)
        .pipe(htmlreplace(opts))
        .pipe(gulp.dest(process.env.GULP_WEBSITE_ROOT + 'build/'));
});
