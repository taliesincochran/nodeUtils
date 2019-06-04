#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { makeNewFile, addExtension } = require('../');

const addModule = (newFile, pathName, importArray) => {
    pathName = addExtension(pathName, 'js');
    let fileText = '';
    importArray.forEach(name => {
        if(name.split('/')[0] === '.') {
            let moduleName = name.split('/')[1];
            fileText += `const ${moduleName} = require('${name}')
`
        }
        else {
            fileText += `const ${name} = require('${name}');
`
        }
        fileText += makeImport(importModule);
    })
    if(newFile) {
        makeNewFile(newFile, pathName, fileText)
        fs.readFile(pathName, "utf-8", (err, res) => {
            if (err) {
                throw new Error(err);
            }
            else {
                let fileText = fileText + res;
                fs.writeFile(pathName, fileText, (err, res) => {
                    if (err) console.log(err);
                    else console.log(res);
                })
            }
            console.log(err, res);
        })
    }

}
