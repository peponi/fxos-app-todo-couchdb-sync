var gulp            = require('gulp'),
// https://www.npmjs.com/package/gulp-if
    gulpif          = require('gulp-if'),
// https://www.npmjs.com/package/gulp-sass
    sass            = require('gulp-sass'),
// https://www.npmjs.com/package/gulp-sourcemaps
    sourcemaps      = require('gulp-sourcemaps'),
// https://www.npmjs.com/package/gulp-autoprefixer
    autoprefixer    = require('gulp-autoprefixer'),
// https://www.npmjs.com/package/gulp-minify-css
    minifyCSS       = require('gulp-minify-css');

/**
 * Compress Styles
 */

gulp.task('compress:styles', function () {    
    console.log(process.env.GULP_CSS_COMPRESS_SOURCE, process.env.GULP_CSS_PROD_PATH);
    gulp.src(process.env.GULP_CSS_COMPRESS_SOURCE)
        .pipe(
            gulpif(process.env.GULP_CSS_USE_MAPS,
                sourcemaps.init()
            )
        )
        .pipe(sass({
            onError: function (err) {
                console.log(err);
            }
        }))
	    .pipe(
            gulpif(process.env.GULP_CSS_USE_PREFIXER,
                autoprefixer({
                    browsers: process.env.GULP_CSS_PREFIXER_OPTIONS.split(","),
                    cascade: true
                })
            )
        )
        .pipe(
            gulpif(process.env.GULP_CSS_USE_MAPS,
                sourcemaps.write()
            )
        )
        .pipe(
            gulpif(process.env.GULP_ENVIRONMENT !== 'development',
                minifyCSS()
            )
        )
        .pipe(gulp.dest(process.env.GULP_CSS_PROD_PATH));    
});
