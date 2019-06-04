#!/usr/bin/env node
const fs = require('fs');
const addExtension = require('../strings/addExtension');

const isNewFile = (pathToFile, callBackTrue, callBackFalse) => {
    let filePath = addExtension(pathToFile, 'js');
    let callBackIsTrue = callBackTrue || undefined;
    let callBackIsFalse = callBackFalse || undefined;
    if(callBackTrue === undefined) {
        callBackIsTrue = () => {
            console.log('This file exists');
            return true;
        }
    }
    if(callBackFalse === undefined) {
        callBackFalse = () => {
            console.log('This file does not exist');
            return false;
        }
    }
    return fs.stat(filePath, (err, stats) => {
        console.log()
        if (err) {
            callBackIsTrue(err);
        } else if (stats.isFile()) {
            callBackIsFalse(stats);
        } else {
            callBackIsTrue(stats);
        }
    });
}
module.exports = isNewFile;