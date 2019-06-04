#!/usr/bin/env node
const fs = require('fs');
const utils = require('../');
const { addExtension } = utils;

const makeNewFile = (existing, pathToFile, newFileText) => {
    if(!existing) {
        fs.writeFileSync(pathToFile, newFileText, (err) => {
            if(err) {
                console.log('There was an error making a new file: ', new Error(err));
            }
            else {
                console.log('success')
            }
        })
    } else {
        console.log('file already exists');
        process.exit(-1); 
    }
};


module.exports = makeNewFile;