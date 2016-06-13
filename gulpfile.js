var gulp        = require('gulp'),
//https://www.npmjs.com/package/gulp-sync
    gulpsync    = require('gulp-sync')(gulp),
//https://www.npmjs.com/package/gulp-concat
    concat      = require('gulp-concat'),
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
env.GULP_NODE_MODULES           = env.GULP_WEBSITE_ROOT  + 'node_modules/'
env.GULP_DEV_PATH               = env.GULP_WEBSITE_ROOT + 'app/';
env.GULP_PROD_PATH              = env.GULP_WEBSITE_ROOT + 'build/app/';
env.GULP_TEMPLATE_PATH          = env.GULP_DEV_PATH + 'templates/';
env.GULP_ASSETS_DEV_PATH        = env.GULP_DEV_PATH;
env.GULP_ASSETS_PROD_PATH       = env.GULP_PROD_PATH;
/**
 * CSS Variables
 */
env.GULP_CSS_DEV_PATH           = env.GULP_DEV_PATH + 'styles/scss/';
env.GULP_CSS_PROD_PATH          = env.GULP_DEV_PATH + 'styles/bundle/';
env.GULP_CSS_COMPRESS_SOURCE    = env.GULP_CSS_DEV_PATH + '**/*.scss';
env.GULP_CSS_DEV_SOURCE         = [
                                    '!' + env.GULP_CSS_DEV_PATH + '*/gaia/*',
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
env.GULP_HTML_DEV_SOURCE        = env.GULP_WEBSITE_ROOT +  'index.html';
env.GULP_APPCACHE_SOURCE        = [
    env.GULP_PROD_PATH + 'index.html',
    env.GULP_PROD_PATH + 'styles/bundle/lib.css',
    env.GULP_PROD_PATH + 'styles/bundle/app.css',
    env.GULP_PROD_PATH + 'scripts/lib.js',
    env.GULP_PROD_PATH + 'scripts/app.js',
    env.GULP_PROD_PATH + 'images/icons/png/menu62.png',
    env.GULP_PROD_PATH + 'images/input_areas/images/clear.png',
    env.GULP_PROD_PATH + 'images/input_areas/images/dialog.svg',
    env.GULP_PROD_PATH + 'styles/bundle/drawer/images/ui/pattern.png',
    env.GULP_PROD_PATH + 'styles/bundle/drawer/images/ui/header.png',
    env.GULP_PROD_PATH + 'styles/bundle/drawer/images/ui/separator.png',
    env.GULP_PROD_PATH + 'styles/bundle/drawer/images/ui/shadow_header.png',
    env.GULP_PROD_PATH + 'styles/bundle/drawer/images/ui/pattern_subheader.png',
    env.GULP_PROD_PATH + 'styles/bundle/drawer/images/ui/shadow.png',
    env.GULP_PROD_PATH + 'styles/bundle/headers/images/icons/back.png',
    env.GULP_PROD_PATH + 'styles/bundle/fonts/FiraSans/FiraSans-Light.eot',
    env.GULP_PROD_PATH + 'styles/bundle/fonts/FiraSans/FiraSans-Light.otf',
    env.GULP_PROD_PATH + 'styles/bundle/fonts/FiraSans/FiraSans-Light.ttf',
    env.GULP_PROD_PATH + 'styles/bundle/fonts/FiraSans/FiraSans-Light.woff',
    env.GULP_PROD_PATH + 'styles/bundle/fonts/FiraSans/FiraSans-Bold.eot',
    env.GULP_PROD_PATH + 'styles/bundle/fonts/FiraSans/FiraSans-Bold.otf',
    env.GULP_PROD_PATH + 'styles/bundle/fonts/FiraSans/FiraSans-Bold.ttf',
    env.GULP_PROD_PATH + 'styles/bundle/fonts/FiraSans/FiraSans-Bold.woff',
    env.GULP_PROD_PATH + 'styles/bundle/fonts/FiraSans/FiraSans-Regular.eot',
    env.GULP_PROD_PATH + 'styles/bundle/fonts/FiraSans/FiraSans-Regular.otf',
    env.GULP_PROD_PATH + 'styles/bundle/fonts/FiraSans/FiraSans-Regular.ttf',
    env.GULP_PROD_PATH + 'styles/bundle/fonts/FiraSans/FiraSans-Regular.woff',
    env.GULP_PROD_PATH + 'styles/bundle/input_areas/images/clear.png',
    env.GULP_PROD_PATH + 'styles/bundle/input_areas/images/dialog.svg',
    env.GULP_PROD_PATH + 'styles/bundle/switches/images/switch/background_off.png',
    env.GULP_PROD_PATH + 'styles/bundle/status/images/ui/pattern.png'
];


// defauld environment variables will be overwritten by an existing ./env/<env-file> 
//helper.loadEnvVariablesWithPrefixFromFolder('GULP','./env/');


/**
 * Load Gulp Tasks
 */
var gulpTasksPath = './gulp-tasks/tasks/';

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
 * Copy Tasks
 */

gulp.task('copy:manifest', function() {
    gulp.src(env.GULP_WEBSITE_ROOT + 'manifest.webapp')
        .pipe(gulp.dest(env.GULP_WEBSITE_ROOT + 'build/'));
});

gulp.task('copy:fonts', function() {
    gulp.src(env.GULP_ASSETS_DEV_PATH + 'fonts/**/*')
        .pipe(gulp.dest(env.GULP_ASSETS_PROD_PATH + 'fonts/'));
});

gulp.task('copy:images', function() {
    gulp.src(env.GULP_ASSETS_DEV_PATH + 'images/**/*')
        .pipe(gulp.dest(env.GULP_ASSETS_PROD_PATH + 'images/'));
});

gulp.task('copy:building-blocks:images', function() {
    gulp.src(env.GULP_ASSETS_DEV_PATH + 'images/**/*')
        .pipe(gulp.dest(env.GULP_PROD_PATH + 'styles/bundle/'));
});

gulp.task('copy:building-blocks:fonts', function() {

    gulp.src(env.GULP_ASSETS_DEV_PATH + 'building-blocks/fonts/**/*')
        .pipe(gulp.dest(env.GULP_PROD_PATH + 'styles/bundle/fonts/'));
});

gulp.task('concate:scripts:lib', function() {
    gulp.src([
        env.GULP_NODE_MODULES + 'fecha/fecha.min.js',
        env.GULP_NODE_MODULES + 'knockout/build/output/knockout-latest.js',
        env.GULP_NODE_MODULES + 'pouchdb/dist/pouchdb.min.js',
        env.GULP_WEBSITE_ROOT + 'app/building-blocks/js/status.js'])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(env.GULP_JS_PROD_PATHS));
});

gulp.task('concate:scripts:app', function() {
    gulp.src([
        env.GULP_JS_DEV_PATHS + 'models/pouchModel.js',
        env.GULP_JS_DEV_PATHS + 'models/todoModel.js',
        env.GULP_JS_DEV_PATHS + 'models/groupModel.js',
        env.GULP_JS_DEV_PATHS + 'viewModel.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(env.GULP_JS_PROD_PATHS));
});

gulp.task('concate:css', function() {
    gulp.src([
        env.GULP_WEBSITE_ROOT + 'app/building-blocks/style/buttons.css',
        env.GULP_WEBSITE_ROOT + 'app/building-blocks/style/headers.css',
        env.GULP_WEBSITE_ROOT + 'app/building-blocks/style/drawer.css',
        env.GULP_WEBSITE_ROOT + 'app/building-blocks/style/input_areas.css',
        env.GULP_WEBSITE_ROOT + 'app/building-blocks/style/switches.css',
        env.GULP_WEBSITE_ROOT + 'app/building-blocks/style/lists.css',
        env.GULP_WEBSITE_ROOT + 'app/building-blocks/style/status.css',
        env.GULP_WEBSITE_ROOT + 'app/building-blocks/transitions.css',
        env.GULP_WEBSITE_ROOT + 'app/building-blocks/util.css',
        env.GULP_WEBSITE_ROOT + 'app/building-blocks/fonts.css'])
        .pipe(concat('lib.css'))
        .pipe(gulp.dest(env.GULP_PROD_PATH + 'styles/bundle/'));
});





/**
 * Combined Gulp Tasks
 */

gulp.task('default', ['watch']);

gulp.task('test:unit', ['test:unit:tap']);

gulp.task('test', [
    'test:unit',
]);

gulp.task('lint', [
    'lint:scripts',
    'lint:styles',
    'lint:html'
]);

gulp.task('build:styles', [/*'format:styles',*/ 'compress:styles']);

gulp.task('build', [
    'clean:static',
    'build:styles'
]);

gulp.task('prod', gulpsync.sync([
    'build',
    [
        'copy:manifest',
        'copy:fonts',
        'copy:images',
        'copy:building-blocks:images',
        'copy:building-blocks:fonts'
    ], [
        'concate:scripts:lib',
        'concate:scripts:app',
        'concate:css'
    ], 
    'replace:html',
    [
        'compress:scripts',
        'compress:styles',
        'compress:html'
    ],
    'create:appcache'
]));

gulp.task('watch',['build:styles', 'lint:scripts'], function() {
    gulp.watch(env.GULP_CSS_COMPRESS_SOURCE, ['lint:styles', 'build:styles']);
    gulp.watch(env.GULP_JS_DEV_PATHS + 'apps/**/*', ['lint:scripts']);
});
