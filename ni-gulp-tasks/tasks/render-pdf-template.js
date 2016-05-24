var gulp = require('gulp'),
    nunjucks = require('gulp-nunjucks-html'),
    data = require('gulp-data'),
    frontMatter = require('gulp-front-matter'),
    settings = require('../gulp-settings');

// Render HTML Templates
gulp.task('render:pdf:template', function() {

    var modes = ['ltr', 'rtl'], baseDepth = 2;

    for (var i in modes) {

        gulp.src([
            env.GULP_PDF_TEMPLATE_PATH + '**/*.html'
        ])

        .pipe(data(function(file) {
            var f = file.path.replace(file.cwd, '.');
            var folderDepth = f.split('/').length - baseDepth;
            var folderPrefix = '';
            for (var i = 0; i < folderDepth; i++) {
               folderPrefix += '../';
            }
            return {
               folderPrefix: folderPrefix
            }
        }))
        .pipe(frontMatter())

        .pipe(nunjucks({
            searchPaths: [env.GULP_PDF_TEMPLATE_PATH],
            locals: {
                mode: modes[i]
            }
        }))
        .on('error', function (err) {
            console.log('###### Nunjucks ERROR! #####');
            console.log(err);
        })
        .pipe(gulp.dest(env.GULP_PDF_PROD_PATH))
    }

    return true;
});
