var gulp            = require('gulp'),
    exec            = require('child_process').exec;

/**
 * Functional Tests with Nightmare
 */

/**
 * DOCS
 * https://github.com/segmentio/nightmare
 */
gulp.task('test:functional', function() {
    exec('cd ' + process.env.GULP_JS_TEST_SOURCE + 'functional/; node --harmony test_nightmare_*', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

/**
 * ALTERNATIVE 
 * http://nightwatchjs.org/ 
 * http://docs.casperjs.org/en/latest/
 */
