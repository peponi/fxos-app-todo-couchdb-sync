var gulp        = require('gulp'),
    //helper      = require('./ni-gulp-tasks/gulp-helper'),
    env         = process.env;

/**
 * DEFAULT SETTINGS
 */

/**
 * GENERAL VARIABLES
 */
env.GULP_ENVIRONMENT            = 'development'; // 'development' | 'stage' | 'live'
/**
 * GENERAL PATHS
 */
env.GULP_WEBSITE_ROOT           = '';
env.GULP_DEV_PATH               = env.GULP_WEBSITE_ROOT + 'app/';
env.GULP_PROD_PATH              = env.GULP_WEBSITE_ROOT + 'build/';
env.GULP_TEMPLATE_PATH          = env.GULP_DEV_PATH + 'templates/';
env.GULP_ASSETS_DEV_PATH        = env.GULP_DEV_PATH + 'assets/';
env.GULP_ASSETS_PROD_PATH       = env.GULP_PROD_PATH + 'assets/';
/**
 * CSS Variables
 */
env.GULP_CSS_DEV_PATH           = env.GULP_DEV_PATH + 'styles/scss/';
env.GULP_CSS_PROD_PATH          = env.GULP_DEV_PATH + 'styles/bundle/';
env.GULP_CSS_COMPRESS_SOURCE    = env.GULP_CSS_DEV_PATH + '**/*.scss';
env.GULP_CSS_DEV_SOURCE         = [
                                    env.GULP_CSS_COMPRESS_SOURCE,
                                ];
env.GULP_CSS_USE_MAPS           = true;
env.GULP_CSS_USE_PREFIXER       = true;
env.GULP_CSS_PREFIXER_OPTIONS   = ['last 2 versions', 'safari 5', 'ie 8', 'opera 12.1'];
env.GULP_CSS_USE_BLESS          = false;
env.GULP_CSS_BLESS_PATH         = env.GULP_CSS_PROD_PATH + '**/*-app.css'
/**
 * JS Variables
 */
env.GULP_JS_DEV_PATHS           = env.GULP_DEV_PATH + 'scripts/';
env.GULP_JS_TEST_SOURCE         = env.GULP_JS_DEV_PATHS + 'tests/';
env.GULP_JS_ES5_TEMP_PATH       = env.GULP_JS_DEV_PATHS + '6to5/';
env.GULP_JS_DEV_SOURCE          = [
                                    '!' + env.GULP_JS_DEV_PATHS + 'libs',
                                    env.GULP_JS_DEV_PATHS + '**/*.js'
                                ];
env.GULP_JS_PROD_PATHS          = env.GULP_PROD_PATH + 'scripts/';
env.GULP_JS_USE_MAPS            = true;
/**
 * HTML Variables
 */
env.GULP_HTML_DEV_SOURCE        = env.GULP_TEMPLATE_PATH +  '**/*.html';


// defauld environment variables will be overwritten by an existing ./env/<env-file> 
//helper.loadEnvVariablesWithPrefixFromFolder('GULP','./env/');


/**
 * Load Gulp Tasks
 */
var gulpTasksPath = './ni-gulp-tasks/tasks/';

require(gulpTasksPath + 'clean-static');
require(gulpTasksPath + 'compress-html');
require(gulpTasksPath + 'compress-scripts');
require(gulpTasksPath + 'compress-styles');
require(gulpTasksPath + 'create-appcache');
require(gulpTasksPath + 'format-styles');
require(gulpTasksPath + 'lint-html');
require(gulpTasksPath + 'lint-scripts');
require(gulpTasksPath + 'lint-styles');
// require(gulpTasksPath + 'reload-page');
require(gulpTasksPath + 'replace-html');
require(gulpTasksPath + 'symlink-assets');

/**
 * Combined Gulp Tasks
 */

gulp.task('default', ['watch']);

gulp.task('test:unit', ['test:unit:tap']);

gulp.task('test', [
    'test:unit',
]);

gulp.task('lint', [
    'lint:scripts'
]);

gulp.task('build:styles', [/*'format:styles',*/ 'compress:styles']);

gulp.task('build', [
    'clean:static',
    'build:styles'
]);

gulp.task('prod', [
    'build',
    'compress:html',
    'compress:scripts',
    'compress:styles'
]);

gulp.task('watch',['build:styles', 'lint:scripts'], function() {
    gulp.watch(env.GULP_CSS_COMPRESS_SOURCE, ['build:styles']);
    gulp.watch(env.GULP_JS_DEV_PATHS + 'apps/**/*', ['lint:scripts']);
});
