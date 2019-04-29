#!/usr/bin/env node
const fs = require('fs');
const isNewFile = require('./isNewFile');
const addExtension = require('./addExtension');
let newFile = false;
console.log('process.argv', process.argv[2]);
let filepath = addExtension(process.argv[2], 'js');
// if(filepath.split('.')[1] === undefined) {
//     filepath += '.js';
// }
let newText = process.argv[3] || '';
const makeNewFile = (isNewFile, pathToFile, newFileText) => {
    console.log('makeNewFile', pathToFile, newFileText) 
    if(isNewFile) {
        fs.writeFileSync(pathToFile, newFileText, (err) => {
            if(err) {
                console.log('There was an error making a new file: ', new Error(err));
            }
            else {
                console.log('success')
            }
        })
    }
};

fs.stat(filepath, (err, stats) => {
    if (err) {
        console.log(err);
        newFile = true;
        return makeNewFile(newFile, filepath, newText);
    } else {
        console.log('file already exists');
        process.exit(-1); 
    }
});

module.exports = makeNewFile;