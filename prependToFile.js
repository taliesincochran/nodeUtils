const fs = require('fs');

const prependToFile = (filepath, fileText) => {
    fs.stat(pathName, (err, stats) => {
        if (err) {
            console.log(err);
            newFile = true;
            return makeNewFile(newFile, pathName, fileText);
        }
        if (stats.isFile()) {
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
    })
};
module.exports = prependToFile;