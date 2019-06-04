#!/usr/bin/env node
let firstNum = process.argv[2];
let secondNum = process.argv[3];
let testArr = ['100000000000000000000000','20000000000000000000000000','30000000000000000000000', '400000000000000000000000000'];
let testJson = {
    'someField': 5000000000000000000000000000000, 
    'someOtherField': '50000000000000000000000006', 
    'otherThings': 5000000000000000000000
}

// If the numbers are of unequal sign, but are close in magnitude, the result will have zeros at the begining.
// This function just removes the zeros.  
const test0 = (numberString, i) => {
    
    //In the case that the numbers are all zeros, return one zero.
    if(i <= 0) {
        return 0;
    }
    else if(numberString[i] !== '0' && numberString[i] !== '-') {
        return numberString.slice(i);
    } else {
        test0(numberString, i - 1);
    }
}
const removeExponent = (num) => {
    let [base, exponent] = num.split('e');
    console.log('num', num, base, exponent)
    if(!exponent) {
        return num;
    } else if (exponent[0] === '+') {
        exponent = exponent.slice(1);
    }
    let decimalShift;
    let baseIndex = base.indexOf('.');
    exponent = parseInt(exponent);
    if(baseIndex !== -1) {
        decimalShift = baseIndex + exponent;
    } else {
        decimalShift = 0 + exponent;
    }
    if(decimalShift === 0) {
        console.log('no shift');
        return base;
    }
    let newString = base.split('.').join('');
    console.log('newString', newString, base)
    if(decimalShift < 0) {
        let temp = '0.';
        for(let i = decimalShift; i < 0; i++) {
            temp += '0';
        }
        newString = temp + newString;
        console.log('newString < 0', newString);
        return newString
    } else if(decimalShift > 0 && decimalShift > newString.legth) {
        for(let i = 0; i < decimalShift; i++) {
            newString += '0'
        }
        console.log('newString > 0 1' , newString);
        return newString;
    } else {
        newString = newString.split('')
        console.log('after split', newString)
        newString.splice(decimalShift, 0, '.');
        console.log('afterSplice', newString);
        
        newString = newString.join('');
        console.log('newString > 0 2', newString);
        return newString;
    } 
}
// Get the sign of the new number
const getNewSign = (numArr1, decArr1, sign1, numArr2, decArr2, sign2) => {
    console.log('getNewSign parameters', numArr1, sign1, numArr2, sign2);
    let length1 = numArr1.length;
    let length2 = numArr2.length;
    // If the signs are the same, the length of number 1 is larger than 2 (therefore a larger number), 
    // or the numbers are exactly equal return the sign of the first number;
    if (sign1 === sign2 || length1 > length2 || numArr1 === numArr2) {
        return sign1;
        // If the length of second number is greater than the first, return the sign of second number
    } else if (length2 > length1) {
        return sign2;
        // Otherwise you have to compare the numbers. 
    } else {
        // Go through each array, start at the last number (the highest value number).
        // Compare each number, if they are the equal, try the next number
        for (let j = length1 - 1; j >= 0; j--) {
            console.log('ohhhhhh 89')
            if (numArr1[j] > numArr2[j]) {
                return sign1;
            } else if (numArr2[j] > numArr1[j]) {
                return sign2;
                // if this ever gets called, the numbers are equal until the decimal, so compare them
            } else if (j === length1 - 1) {
                let decLength1 = decArr1.length;
                let decLength2 = decArr2.length;
                // Here we want the shorter of the two
                let lengthDec = decLength1 > decLength2?
                    decLength2
                    :
                    decLength1;
                for(let k = lengthDec - 1; k >= 0; k--) {
                    console.log('ohhhhhh 103')
                    if(parseInt(decArr1[k], 10) > parseInt(decArr2[k])) {
                        return sign1;
                    } else if (parseInt(decArr2[k]) > parseInt(decArr1[k])) {
                        return sign2;
                    // If this is ever true, all digits are the same up to 
                    // the point where one array has more decimal places. 
                    // Return which ever array is longer. 
                    } else if (k === lengthDec - 1) {
                        return (decLength1 > decLength2)?sign1:sign2
                    }
                }
            }
        }
        return fallBackSign;
    }
}

const getAndRemoveSign = (numArr) => {
    let integerArray = numArr;
    let sign = integerArray[0];
    if (sign === '-') {
        integerArray = integerArray.slice(1);
    } else {
        sign = '';
    }
    return {sign, integerArray};
}
    
/**
 * 
 * @param {number, string} num // Number to convert to array. Can be a number or a string
 * @param {*} i 
 */
const numToArray = (num, identifier) => {
    let numString = '';
    if(typeof num !== 'string') {
        numString = num.toString();
    } else {
        numString = num;
    }
    numString = removeExponent(num);
    let [int, dec] = numString.split('.');
    console.log('split int dec', int, dec)
    let intArray = int.split('');
    let decimalArray;
    if(dec) {
        decimalArray = dec.split('');
    } else {
        decimalArray = [''];
    }
    let { sign, integerArray } = getAndRemoveSign(intArray)
    console.log('sign, intArr, decArr', sign, integerArray, decimalArray, identifier)
    console.log('eeeeeeeeeee', integerArray, decimalArray, sign)
    return { [`integer${identifier}Array`]: integerArray, [`sign${identifier}`]: sign, [`decimal${identifier}Array`]: decimalArray};
}
const base10HalfAdder = (number1, number2, sign1, sign2, toNextNumber) => {
    console.log(number1, number2, sign1, sign2, toNextNumber)
    if(number1 === undefined) {
        number1 = 0;
    }
    if(number2 === undefined) {
        number2 = 0
    }
    if (sign1 === sign2) {
        return (parseInt(number1) + parseInt(number2) + toNextNumber);
    } else if(sign1 !== '-' && sign2 === '-') {
        return (parseInt(number1) - parseInt(number2) + toNextNumber);
    } else if(sign1 === '-' && sign2 !== '-') {
        return (parseInt(number2) - parseInt(number1) + toNextNumber);

    }
}
handleNext = (result, resultArray,  i, length) => {
    console.log(result, resultArray, i, length)
    if (result >= 10) {
        result = result - 10;
        resultArray[i] += result;
        resultArray[i + 1] += 1;
        return 1;
    } else if (result < -9) {
        resultArray[i] += result + 10
        return -1;
    } else if (result < 0 && result < -10 && i < length - 1) {
        resultArray[i] += result + 10;
        resultArray[i + 1] += 9;
        return -1;
    } else if (result < 0 && i === length - 1) {
        resultArray[i - 1] += 10 - resultArray[i - 1]
        resultArray[i] = 0;
        return 0;
    } else {
        resultArray[i] = result;
        return 0
    }
}
const handleAddition = (arr1, arr2) => {

}
const addBigNumbers = (numberToAdd1, numberToAdd2) => {
    let {sign1, integer1Array, decimal1Array} = numToArray(numberToAdd1, 1);
    let {sign2, integer2Array, decimal2Array} = numToArray(numberToAdd2, 2);
    console.log('add big', sign2, integer2Array, decimal2Array, sign1, integer1Array, decimal1Array)
    let newSign = getNewSign(integer1Array, decimal1Array, sign1, integer2Array, decimal2Array, sign2);
    let toNext = 0;
    let decimalResultArray = [];
    if(decimal1Array[0] || decimal2Array[0]) {
        let decLength1 = 0;
        let decLength2 = 0;
        if(decimal1Array) {
            decLength1  = decimal1Array.length;
        }
        if(decimal2Array) {
            decLength2 = decimal2Array.length || 0;
        } 
        let decimalLength = (decLength1 > decLength2)?
            decLength1
            :
            decLength2;
        do {
            
            if(decLength1 > decLength2) {
                decimal2Array.push('0');
            } else if(decLength2 > decLength1) {
                decimal1Array.push('0')
            }
        } while (decLength1 !== decLength2);
        let newDecimal = [];
        for(let i = decimalLength -1; i >= 0; i --) {
            console.log('ohhhhhsh 222')
            if (sign1 !== sign2) {
                handleNext(base10HalfAdder(decimal2Array[i], decimal1Array[i] , sign1, sign2, toNext));
            } else {
                handleNext(base10HalfAdder(decimal1Array[i], decimal2Array[i], sign1, sign2, toNext));
            }
        }
        if(newDecimal.length > decimalLength) {
            toNext = newDecimal[0];
            newDecimal = newDecimal.slice(1);
        }
    }
    let length = (integer1Array.length > integer2Array.length) ?
        integer1Array.length
        :
        integer2Array.length;
    let resultArray = [];
    let result = 0;
    integer1Array.reverse();
    integer2Array.reverse();
    for (var i = 0; i < length; i++) {
        console.log('ohhhhhh 244', integer1Array[i], integer2Array[i], i);
        let number1 = integer1Array[i]?parseInt(integer1Array[i]):0;
        let number2 = integer2Array[i]?parseInt(integer2Array[i]):0;
        if(sign1 !== sign2) {
            result = base10HalfAdder(number2, number1, sign1, sign2, toNext);
        } else {
            result = base10HalfAdder(number1, number2, sign1, sign2, toNext);
        }
        toNext = handleNext(result, resultArray, i, length);
        // if (result >= 10) {
        //     result = result - 10;
        //     toNext = 1;
        //     resultArray[i] = result;
        // } else if(result < -9) {
        //     resultArray[i] = result + 10
        //     toNext = -1;
        // } else if (result < 0 && result > (-1 * 10) && i < length - 1) {
        //     resultArray[i] = result + 10;
        //     toNext = -1;
        // } else if(result < 0 && i === length -1) {
        //     resultArray[i - 1] = 10 - resultArray[i - 1]
        //     resultArray[i] = '';
        //     newSign = '-'
        // } else {
        //     toNext = 0;
        //     resultArray[i] = result;
        // }
    }
    console.log('.,..,.,' , resultArray, toNext)
    if (toNext === 1) {
        resultArray.push(1);
    } 
    if(resultArray[resultArray.length - 1] > 10) {
        resultArray.pop();
        let temp = resultArray(resultArray.length - 2);
        resultArray[resultArray.length - 2] = 10 - temp;
    }
    console.log(resultArray[0])
    if(!resultArray[0]){
        resultArray[0] = '0';
    }
    resultArray.reverse();
    resultArray.unshift(newSign);
    // resultArray.reverse();
    // if(decimalResultArray.length > 0) {
        resultArray.push('.');
        resultArray.concat(decimalResultArray);
    // }
    let newNumber = resultArray.join('');
    if(newNumber[newNumber.length - 1] === '.') {
        newNumber = newNumber.slice(0, -1);
    }
    if(newNumber === '-') {
        newNumber = '0';
    }
    newNumber = newNumber.replace(/-0/, '-').replace(/--/, '-').replace(/\b0+/, '');
    
    if(newNumber === '-' || newNumber === '') {
        newNumber = 0;
    }
    return newNumber;
}
module.exports = addBigNumbers;
let accumulator = 0
let addArrOfBigNumbers = (accumulator, nextNumber) => {
    return addBigNumbers(accumulator, nextNumber)
}
console.log(addBigNumbers(process.argv[2], process.argv[3]));

