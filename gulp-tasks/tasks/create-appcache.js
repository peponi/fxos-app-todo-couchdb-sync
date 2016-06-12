var gulp            = require('gulp'),
// https://www.npmjs.com/package/gulp-manifest
    manifest        = require('gulp-manifest');

/**
 * Create Manifest Appcache
 */

gulp.task('create:appcache', function() {
    return gulp.src(process.env.GULP_PROD_PATH + '**/*')
    .pipe(manifest({
        timestamp: true,
        hash: true,
        preferOnline: true,
        network: ['*'],
        filename: 'manifest.appcache',
        exclude: ['manifest.appcache', process.env.GULP_JS_PROD_PATHS + 'tests']
    }))
    .pipe(gulp.dest(process.env.GULP_PROD_PATH));
});
