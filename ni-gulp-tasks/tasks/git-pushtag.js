/**
 * push a git tag to remote
 */

var gulp            = require('gulp'),
    exec            = require('child_process').exec;

// set a git tag & overwrite if already set
gulp.task('git:pushtag', function(cb) {
    if(process.argv[3] !== '--tag' ) {
        console.error('ERROR: no "--tag" parameter found');
    } else if (process.argv[4] == undefined ) {
        console.error('ERROR: no tag name found in parameter');
    } else {

        exec(   'git tag -d ' + process.argv[4] + 
                ';git push origin :refs/tags/' + process.argv[4] + 
                ';git tag ' + process.argv[4] + 
                ';git push --tags', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    }
});
