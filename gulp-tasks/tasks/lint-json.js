var gulp         = require('gulp'),
// https://www.npmjs.com/package/gulp-jsonlint
    jsonlint     = require('gulp-jsonlint');

// lint all json-files in dev folder
gulp.task('lint:json', function() {
    gulp.src(process.env.GULP_JSON_DEV_PATH   + '**/*.json')
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
});