var gulp        = require('gulp'),
// https://www.npmjs.com/package/gulp-symlink
    symlink     = require('gulp-symlink');

/**
 * Symlink Assets
 */

gulp.task('symlink:assets', function () {
    return gulp.src(process.env.GULP_ASSETS_DEV_PATH )
        .pipe(symlink(process.env.GULP_ASSETS_PROD_PATH , {
            force: true
        }))
});
