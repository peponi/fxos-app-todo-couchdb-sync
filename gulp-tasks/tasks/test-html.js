var gulp  = require('gulp'),
    spawn = require('child_process').spawn;

/**
 * Create HTML live documentation
 *
 * DOC:
 * https://github.com/springernature/pa11y
 * https://github.com/springernature/pa11y-dashboard
 */

gulp.task('test:html', function () {

    var dest = (process.argv[3] == '--dest') ? process.argv[4] : 'http://localhost:8080';

    spawn('./node_modules/pa11y/bin/pa11y', ['-c', process.env.GULP_WEBSITE_ROOT + 'pa11y.json', '-e', './node_modules/phantomjs/bin/phantomjs', dest], {
        stdio: "inherit" // <== IMPORTANT: use this to hold the colored output
    });
});
