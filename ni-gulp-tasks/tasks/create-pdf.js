var gulp = require('gulp'),
    exec = require('child_process').exec,
    settings = require('../gulp-settings');

gulp.task('create:pdf', function(cb) {
    env.GULP_PDF_LIST.map(function(row) {
        exec('java -jar flying-saucer-pdf-gen-1.0.0.jar ' + env.GULP_PDF_PROD_PATH + row.inputFile + ' ' + env.GULP_PDF_PROD_PATH + row.outputFile);
    });
});
