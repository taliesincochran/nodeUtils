#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const utils = require('../')
const {isNewFile, makeNewFile, addExtension, removeCharacter, processError, addRoute, restfulMethods } = utils;

const routesArray = process.argv.slice(3) || [];
let pathToFile = addExtension(process.argv[2], 'js');
// if(pathToFile.split('.').indexOf('js') === -1) {
//     pathToFile += '.js';
// }
const routeWriter = (filepath, routes) => {
    let newFile = isNewFile(filepath);
    let fileHead = '';
    let fileBody = '';
    let fileEnd = '';
    
    // A funciton in case the arguments do not conform to the requirements
    const argumentError = () => {
        return processError("Usage: " + __filename + "arguments = path/toFileToAddRoutes, (route type, /route path) * X ");
    };
    
    // Check the list of arguments to check if they conform 
    if (routes.length % 2 !== 0) {
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
    
//     const addRoute = (RESTfulOperator, route) => {
//         let newRoute = `
// router.${RESTfulOperator}('/${route}', (res, req) => {
//     res.sendStatus(200)
// });
// `
//         return newRoute;
//     }
    
    //This funciton removes the :/ added to the route if the user enters something like /routeToThing instead of routeToThing
    const removeColonSlash = str => {
        let tempString = str;
        tempString = removeCharacter(tempString, ':');
        tempString = removeCharacter(tempString, '/', -1);
        return tempString;
    }
    
    // Go through the array of routes and make one for every pair of two RESTful operator and route
    const callBack = (res, req) => {
        res.sendStatus(200);
    }
    routes.forEach((argument, i) => {
        if(i%2 === 0) {
            let route = routes[i + 1];
            if(route.split('').indexOf(':') !== -1) {
                route = removeColonSlash(route);
            }
            fileBody += addRoute('router', argument, route, callBack);
        }
    })

    let file = '';
    fileEnd += makeFileEnd();
    if(!newFile) {
        // console.log(err);
        fileHead += makeFileHead();
        const fileText = fileHead + fileBody + fileEnd;
        console.log('file does not exist', newFile, filepath, fileText);
        makeNewFile(newFile, filepath, fileText);
    }
    // fs.stat(filepath, (err, stats) => {
        else {
            let insertPoint = `
router.get('*', (req, res) => {
    res.sendStatus(404);
});
module.exports = router;`;
            insertInFile(filepath, insertPoint, fileBody);
        //     fs.readFile(filepath, "utf-8", (err, res) => {
        //         if(err) {
        //             throw new Error(err);
        //         }
        //         else {
        //             let file = res;
        //             let temp = file.split(
        //             let fileWithNewRoutes = temp + fileBody + fileEnd;
        //             fs.writeFile(filepath, fileWithNewRoutes, (err, res) =>{
        //                 if(err) console.log(err);
        //                 else console.log(res);
        //             })
        //         }
        //         console.log(err,res);
        //     })            
        }
//     });
};
routeWriter(pathToFile, routesArray);
module.exports = routeWriter;