#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const restFulMethods = [
    'checkout',
    'copy',
    'delete',
    'get',
    'head',
    'lock',
    'merge',
    'mkactivity',
    'mkcol',
    'move',
    'notify',
    'options',
    'patch',
    'post',
    'purge',
    'put',
    'report',
    'search',
    'subscribe',
    'trace',
    'unlock',
    'unsubscribe'
]
const routes = process.argv.slice(3);
let filePath = path.join(__dirname + '/' + process.argv[2]);
if(filePath.split('.').indexOf('js') === -1) {
    filePath += '.js';
}

let newFile = false;
let fileHead = '';
let fileBody = '';
let fileEnd = '';

// A funciton in case the arguments do not conform to the requirements
const argumentError = () => {
    console.log("Usage: " + __filename + "arguments = path/toFileToAddRoutes, (route type, /route path) * X ");
    process.exit(-1);
}

// Check the list of arguments to check if they conform 
if (process.argv.length < 5 || routes.length % 2 !== 0) {
    argumentError();
}

// Funcitons to construct the file

const makeFileHead = () => {
    let newText = `
const express = require('express');
const router = express.Router();
`
    return newText;
}
const makeFileEnd = () => {
    let newText = `
router.get('*', (req, res) => {
    res.sendStatus(404);
});
module.exports = router;
`
    return newText;
}

const addRoute = (RESTfulOperator, route) => {
    let newRoute = `
    router.${RESTfulOperator}('/${route}', (res, req) => {
        res.sendStatus(200)
});
`
return newRoute;
}

//This funciton removes the :/ added to the route if the user enters something like /routeToThing instead of routeToThing
const removeColonSlash = str => {
    let tempString = str.split(":").join('').toLowerCase();
    if(tempString[tempString.length - 1] === '/') {
        tempString = tempString.slice(0, tempString.length - 1);
    }
    return tempString;
}

// Go through the array of routes and make one for every pair of two RESTful operator and route
routes.forEach((argument, i) => {
    if(i%2 === 0) {
        let RESTfulType = argument;
        let route = routes[i + 1];
        console.log(route.split('').indexOf(":"))
        if(route.split('').indexOf(':') !== -1) {
            route = removeColonSlash(route);
        }
        if (restFulMethods.indexOf(argument.toLowerCase()) && (routes[i +1] !== null)){
            fileBody += addRoute(RESTfulType, route);
        } else {
            argumentError();
        }
    }
})
const makeNewFile = (isNewFile, pathToFile, newFileText) => {
    console.log('makeNewFile', pathToFile, newFileText) 
    if(isNewFile) {
        fs.writeFileSync(pathToFile, newFileText, (err) => {
            if(err) {
                console.log('make file err', err);
            }
            else {
                console.log('sucess')
            }
        })
    }
}
fs.stat(filePath, (err, stats) => {
    if(err) {
        console.log(err);
        newFile = true;
        fileHead += makeFileHead();
        fileEnd += makeFileEnd();
        const fileText = fileHead + fileBody + fileEnd;
        console.log('file does not exist', newFile, filePath, fileText);
        return makeNewFile(newFile, filePath, fileText);
    }
    if(stats.isFile()) {
        return console.log('file exists');
    } else {
        return console.log('other');
    }
});

module.exports