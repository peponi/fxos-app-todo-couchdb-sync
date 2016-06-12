var fs = require('fs');

exports.loadEnvVariablesWithPrefixFromFolder = function (prefix, dir) {

    var files = fs.readdirSync(dir),
        fileName = '',
        fileContent = '';

    files.forEach(function(fileName) {
        // ignore all file without leading gulp prefix
        if(fileName.indexOf(prefix) > -1) {

            fileContent = fs.readFileSync(dir + fileName);
            process.env[fileName] = fileContent.toString();

            console.log('\nfound Gulp enviroment variable file: env/' + fileName);
            console.log('\n\x1b[36m', 'SET: process.env.' + fileName + ' = "' + fileContent.toString() + '"','\x1b[0m\n');
        }
    });
};