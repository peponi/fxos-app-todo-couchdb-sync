/**
 * Collect Bower Files
 */

var gulp            = require('gulp'),
// https://www.npmjs.com/package/main-bower-files
    mainBowerFiles  = require('main-bower-files');

gulp.task('collect-bower-files', function() {
    return gulp.src(mainBowerFiles(), {
            base: './bower_components'
        }).pipe(gulp.dest(process.env.GULP_PROD_PATH + '/bower_components'));
});