#!/usr/bin/env node
const {processError} = require('../');

const removeCharacter = (str, character, position, toLowerCase) => {
    let positionTemp = position || undefined;
    let tempString = str;
    if(character.length !== 1 || typeof str !== "string" || (position !== undefined && typeof position !== 'number')) {
        console.log('length', character.length, 'string', typeof str, 'position', position, 'toLowerCase', toLowerCase);
        processError("Remove Character Usage:  str = must be a string, character = must be a char, position = optional must be 'end' or a number");
        (error);
    }
    if(positionTemp === undefined) {
        tempString = tempString.split(`${character}`).join('');
    } else if(positonTemp < 0) {
        if(tempString[tempString.length - 1] === character) {
            tempString = tempString.slice(0, tempString.length + position);
        }
    } else {
        let tempStart = tempString.slice(0, position);
        let tempEnd = tempString.slice(position + 1);
        tempString = tempStart + tempEnd;
    }
    return tempString;
}
module.exports = removeCharacter;