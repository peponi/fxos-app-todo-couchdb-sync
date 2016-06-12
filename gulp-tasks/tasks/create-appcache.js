var gulp            = require('gulp'),
// https://www.npmjs.com/package/gulp-manifest
    manifest        = require('gulp-manifest');

/**
 * Create Manifest Appcache
 */

gulp.task('create:appcache', function() {
    console.log(process.env.GULP_APPCACHE_SOURCE.split(','));
    gulp.src(process.env.GULP_APPCACHE_SOURCE.split(','))
    .pipe(manifest({
        timestamp: true,
        hash: true,
        preferOnline: true,
        network: ['*'],
        filename: 'manifest.appcache'
    }))
    .pipe(gulp.dest(process.env.GULP_WEBSITE_ROOT + 'build/'));
});
