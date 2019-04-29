#!/usr/bin/env node
const fs = require('fs');
const addExtension = require('./addExtension');

const isNewFile = (pathToFile, callBackTrue, callBackFalse) => {
    let filePath = addExtension(pathToFile, 'js');
    let callBackIsTrue = callBackTrue || undefined;
    let callBackIsFalse = callBackFalse || undefined;
    if(callBackIsTrue === undefined) {
        callBackIsTrue = () => {
            console.log('This file exists');
            return true;
        }
    }
    if(callBackIsFalse === undefined) {
        callBackIsFalse = () => {
            console.log('This file does not exist');
            return false;
        }
    }
    return fs.stat(filePath, (err, stats) => {
        if (err) {
            callBackIsTrue();
        }
        if (stats.isFile()) {
            callBackIsFalse();
        } else {
            callBackIsTrue();
        }
    });
}
module.exports = isNewFile;