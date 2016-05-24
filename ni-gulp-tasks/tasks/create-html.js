var gulp            = require('gulp'),
// https://www.npmjs.com/package/gulp-nunjucks-html
    nunjucks        = require('gulp-nunjucks-html'),
// https://www.npmjs.com/package/gulp-data
    data            = require('gulp-data'),
// https://www.npmjs.com/package/gulp-front-matter
    frontMatter     = require('gulp-front-matter');

/**
 * render nunjacks template
 */

gulp.task('create:html', function() {

    var modes = ['ltr', 'rtl'], baseDepth = 2;

    for (var i in modes) {

        gulp.src([
            process.env.GULP_HTML_DEV_SOURCE,
            '!' + process.env.GULP_TEMPLATE_PATH + 'base.html',
            '!' + process.env.GULP_TEMPLATE_PATH + 'includes/**/*.html'
        ])
        .pipe(data(function(file) {
            var f = file.path.replace(file.cwd, '.'),
                folderDepth = f.split('/').length - baseDepth,
                folderPrefix = '';

            for (var i = 0; i < folderDepth; i++) {
               folderPrefix += '../';
            }

            return {
               folderPrefix: folderPrefix
            }
        }))
        .pipe(frontMatter())

        .pipe(nunjucks({
            searchPaths: [process.env.GULP_TEMPLATE_PATH],
            locals: {
                mode: modes[i]
            }
        }))
        .on('error', function (err) {
            console.log('###### Nunjucks ERROR! #####\n', err);
        })
        .pipe(gulp.dest(process.env.GULP_PROD_PATH + 'templates/' + modes[i]))

    }

    return true;
});
