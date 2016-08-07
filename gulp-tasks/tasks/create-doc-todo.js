/**
 * Create TODO.md file
 */

var gulp = require('gulp'),
// https://www.npmjs.com/package/gulp-todo
    todo = require('gulp-todo');

gulp.task('create:doc:todo', function() {
    gulp.src(process.env.GULP_JS_DEV_SOURCE.split(','))
        .pipe(todo())
        // -> Will output a TODO.md with your todos 
        .pipe(gulp.dest(process.env.GULP_WEBSITE_ROOT));
});
