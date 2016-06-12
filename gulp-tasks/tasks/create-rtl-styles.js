var gulp            = require('gulp'),
// https://www.npmjs.com/package/gulp-bless
    bless           = require('gulp-bless'),
// https://www.npmjs.com/package/gulp-rename
    rename          = require('gulp-rename');

/**
 * Compress Styles
 */

gulp.task('create:rtl:styles', function () {   
    gulp.src(process.env.GULP_CSS_BLESS_PATH)
        .pipe(bless(({
            imports: false
        })))
        .pipe(rename({
            suffix: "-ie"
        }))
        .pipe(gulp.dest(process.env.GULP_CSS_PROD_PATH));
   
});
