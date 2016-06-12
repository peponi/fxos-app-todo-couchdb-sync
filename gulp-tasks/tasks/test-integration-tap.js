var gulp            = require('gulp'),
    cuke            = require('cuke-tap'),
    path            = require('path');

/**
 * Integration Tests with cuke-tap
 */

/**
 * DOCS
 * https://www.npmjs.com/package/cuke-tap
 * 
 * ALTERNATIVES
 * Mocha - https://github.com/acuminous/yadda
 * 
 * INFO
 * tried pioneerjs.com installs over 15 min and break up - dosen't work
 */
gulp.task('test:integration:tap', function() {
    var features = [ path.join(env.GULP_JS_TEST_SOURCE, 'integration/feature/*') ];
    var steps = [ require(env.GULP_JS_TEST_SOURCE + 'integration/steps') ];
 
    cuke(features, steps);    
});
