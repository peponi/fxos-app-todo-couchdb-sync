var gulp  = require('gulp'),
// http://sassdoc.com/gulp
    sassdoc = require('sassdoc');

/**
 * Create SAS documentation files
 */

gulp.task('create:doc:sass', function () {
    return gulp.src(process.env.GULP_CSS_COMPRESS_SOURCE)
        .pipe(sassdoc({
            dest: process.env.GULP_SASSDOC_DEST_PATH,
            verbose: true,
            display: {
                access: ['public', 'private'],
                alias: true,
                watermark: true,
            }
        }));
});
