var gulp        = require('gulp'),
// https://www.npmjs.com/package/gulp.spritesmith
    spritesmith = require('gulp.spritesmith');

/**
 * Create Sprites
 */

gulp.task('create:sprites', function() {
    var spriteData =
        gulp.src(process.env.GULP_ASSETS_DEV_PATH + 'images/sprite/**/*.png')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                retinaImgName: 'sprite-2x.png',
                retinaSrcFilter: [process.env.GULP_ASSETS_DEV_PATH + 'images/sprite/**/*-2x.*'],
                cssName: '_sprite.scss',
                cssTemplate: process.env.GULP_WEBSITE_ROOT + 'spritesmith-retina-mixins.template.mustache',
                imgPath: process.env.GULP_ASSETS_DEV_PATH + 'images/sprite.png',
                retinaImgPath: process.env.GULP_ASSETS_DEV_PATH + 'images/sprite-2x.png'
            }));
    spriteData.img.pipe(gulp.dest(process.env.GULP_ASSETS_PROD_PATH + 'images'));
    spriteData.css.pipe(gulp.dest(process.env.GULP_CSS_DEV_PATH + 'generic'));
});