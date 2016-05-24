var gulp        = require('gulp'),
// https://www.npmjs.com/package/gulp-scss-lint
    scsslint    = require('gulp-scss-lint'),
// https://www.npmjs.com/package/gulp-cached
    cache       = require('gulp-cached');

/**
 * Lint SASS
 */

gulp.task('lint:styles', function() {
    return gulp.src(process.env.GULP_CSS_DEV_SOURCE.split(","))
        .pipe(cache('scsslint'))
        .pipe(scsslint({
            'bundleExec': true,
            'config': 'lint.yml'
        }))
});
