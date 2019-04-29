#!/usr/bin/env node
const fs = require('fs');

const insertInFile = (filepath, insertPoint, newText) => {
    fs.readFile(filepath, "utf-8", (err, res) => {
        if(err) {
            throw new Error(err);
        }
        else {
            let file = res;
            let tempArray = file.split(insertPoint);
            let fileStart = tempArray[0];
            let fileEnd = insertPoint + tempArray.slice(1).join('');
            let newFile = fileStart + newText + fileEnd;
            fs.writeFile(filepath, newFile, (err, res) =>{
                if(err) console.log(err);
                else console.log(res);
            })
        }
    })
}          
module.exports = insertInFile;
