var gulp = require('gulp'),
    sass = require('gulp-sass'),
    bless = require('gulp-bless'),
    rename = require('gulp-rename'),
    settings = require('../gulp-settings');

// Compile SCSS to CSS files (with sourcemaps & linting)
gulp.task('compile:sass:pdf', function () {
    gulp.src(env.GULP_PDF_CSS_SOURCE)
        .pipe(sass({
            //sourceComments: true,
            onError: function (err) {
                console.log(err);
            }
        }))
        .pipe(gulp.dest(env.GULP_PDF_PROD_PATH));

    gulp.src(env.GULP_PDF_PROD_PATH + '*-pdf-*.css')
        .pipe(bless(({
            imports: false
        })))
        .pipe(gulp.dest(env.GULP_PDF_PROD_PATH));
});
