var gulp        = require('gulp'),
    named       = require('vinyl-named'),
// https://www.npmjs.com/package/webpack-stream
    webpack     = require('webpack-stream');

/**
 * Bundle scripts with Webpack
 * this setup is for default usage
 * (there is only the main folder in scripts/bundles)
 */

/**
 * DOC: 
 * https://github.com/thejameskyle/babel-handbook
 *
 * used in .babelrc: 
 * https://www.npmjs.com/package/babel-preset-es2015
 * https://www.npmjs.com/package/babel-preset-react
 *
 * used in webpack:
 * https://www.npmjs.com/package/jsx-loader
 * https://www.npmjs.com/package/babel-loader
 * https://www.npmjs.com/package/babel-plugin-transform-react-jsx
 */
gulp.task('bundle:scripts:webpack', function() {
  return gulp.src(process.env.GULP_JS_BUNDLE_ENTRY_SOURCE.split(','))
    .pipe(named())
    .pipe(webpack({
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: "jsx-loader"
                },
                {
                    test: /\.jsx$/,
                    loader: "jsx-loader?insertPragma=React.DOM"
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                }
            ]
        }
    }))
    .pipe(gulp.dest(process.env.GULP_JS_BUNDLE_DEST_PATHS));
});