var gulp        = require('gulp'),
// https://www.npmjs.com/package/gulp-eslint
    eslint      = require('gulp-eslint');

/**
 * Lint Scripts
 */

/**
 * DOC:
 * https://eslint.org/docs/rules - rules are defined in .eslintrc
 * 
 * used in .eslintrc;
 * https://www.npmjs.com/package/eslint-plugin-no-unsafe-innerhtml
 * https://www.npmjs.com/package/eslint-plugin-scanjs-rules
 * https://www.npmjs.com/package/eslint-plugin-react
 * https://www.npmjs.com/package/eslint-config-airbnb
 */

gulp.task('lint:scripts', function () {
    return gulp.src(process.env.GULP_JS_DEV_SOURCE.split(","))
        .pipe(eslint({
            useEslintrc: true
        }))
        .pipe(eslint.format());
});
