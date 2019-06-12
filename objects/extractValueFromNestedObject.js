const extractValueFromNestedObject = (obj, keyArray) => {
    let result = '';
    const getNextLevel = (object, key) => {
        if (object) {
            if (Object.keys(object).indexOf(key) !== -1) {
                result = object[key];
                return object[key];
            } else return null;
        } else return null;
    };
    let length = keyArray.length;
    let tempObject = { ...obj };
    keyArray.forEach((nextKey, i) => {
        tempObject = getNextLevel(tempObject, nextKey);
        if(i === (length - 1)) {
            return tempObject;
        }
    });
    return result;
};
module.exports = extractValueFromNestedObject;