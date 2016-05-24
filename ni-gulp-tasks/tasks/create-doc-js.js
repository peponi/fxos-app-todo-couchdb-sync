var gulp  = require('gulp'),
// https://www.npmjs.com/package/gulp-jsdoc
    jsdoc = require('gulp-jsdoc');

/**
 * Create Javascript documentation files
 * 
 * DOC:
 * http://usejsdoc.org/
 *
 * INFO: 
 * replace this later by rfx + rtype when its finished
 * 
 * https://medium.com/javascript-scene/must-see-javascript-dev-tools-that-put-other-dev-tools-to-shame-aca6d3e3d925#0fc9
 * https://www.npmjs.com/package/rtype
 * https://www.npmjs.com/package/rfx
 */
gulp.task('create:doc:js', function () {
    return gulp.src(process.env.GULP_JS_DEV_SOURCE.split(','))
        .pipe(jsdoc(process.env.GULP_JSDOC_DEST_PATH))
});
