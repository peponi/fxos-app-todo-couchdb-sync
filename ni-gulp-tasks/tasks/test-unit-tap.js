var gulp            = require('gulp'),
// https://www.npmjs.com/package/gulp-tape
    tape            = require('gulp-tape'),
// https://www.npmjs.com/package/gulp-tap-min
    reporter        = require('gulp-tap-min');

/**
 * Unit Tests with Tap
 */

/**
 * What’s Wrong with Mocha, Jasmine?
 * https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4#a076
 * 
 * DOC
 * https://github.com/substack/tape
 */
gulp.task('test:unit:tap', function() {
    return gulp.src(process.env.GULP_JS_TEST_SOURCE + 'unit/**/test_tap_*')
        .pipe(tape({
            reporter: reporter(),
            tapeOpts: { objectMode: true }
        }));
});
