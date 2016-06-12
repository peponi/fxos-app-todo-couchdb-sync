var gulp            = require('gulp'),
// https://www.npmjs.com/package/gulp-jasmine
    jasmine         = require('gulp-jasmine');

/**
 * Unit Tests Jasmine
 */

/**
 * DOCS
 * https://www.npmjs.com/package/gulp-jasmine-phantom
 * http://jasmine.github.io/2.0/introduction.html
 */ 
gulp.task('test:unit:jasmine', function () {
    return gulp.src(process.env.GULP_JS_TEST_SOURCE + 'unit/**/test_jasmine_*')
        .pipe(jasmine());
});
