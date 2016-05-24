var gulp        = require('gulp'),
// https://www.npmjs.com/package/gulp-tinypng-compress
    tinypng     = require('gulp-tinypng-compress');

/**
 * Compress Images
 * 
 * compress over https://tinypng.com
 *
 * email: darvl46iy5@bks32.anonbox.net
 * api key: "Ul6vcVQnaIUVP7tw5Yd0nx1YwWBwiEq_"
 */

gulp.task('compress:images', function () {
    return gulp.src(process.env.GULP_IMG_DEV_SOURCE)
        .pipe(tinypng({
            key: 'Ul6vcVQnaIUVP7tw5Yd0nx1YwWBwiEq_',
            checkSigs: true,
            sigFile: process.env.GULP_ASSETS_DEV_PATH + '.tinypng-sigs',
            summarize: true,
            log: true
        }))
        .pipe(gulp.dest(process.env.GULP_ASSETS_PROD_PATH));
});
