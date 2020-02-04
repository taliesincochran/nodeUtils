#!/usr/bin/env node
const path = require('path');

const addExtension = (pathToFile, extensionString) => {
    let newPath = pathToFile || "";
    let tempArray = newPath.split('.')
    if(newPath.split('.')[1] !== extensionString) {
        newPath = path.join(__dirname, tempArray[0]);
        newPath += '.';
        newPath += extensionString;
    }
    else {
        newPath = path.join(__dirname, newPath);
    }
    console.log('pathToFile', newPath);
    return newPath;
}
module.exports = addExtension;