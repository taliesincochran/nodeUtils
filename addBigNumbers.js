#!/usr/bin/env node
let firstNum = process.argv[2];
let secondNum = process.argv[3];
let arr = ['100000000000000000000000','20000000000000000000000000','30000000000000000000000', '400000000000000000000000000'];
const testSign = (testArray1, testArray2, i, sign1, sign2) => {
    let newSign = '';
    for(let j = i; j >= 0; j--) {
        if (j < 0) {
            return sign2
        } else if (testArray1[j] > testArray2[j]) {
            return sign1
        } else if (testArray2[j] > testArray1[j]) {
            return sign2;
        } else {
            newSign = '';
        }
    }
    return newSign;
}
const test0 = (numberString, i) => {
    if(i <= 0) {
        return 0;
    }
    else if(numberString[i] !== '0' && numberString[i] !== '-') {
        return numberString.slice(i);
    } else {
        test0(numberString, i - 1);
    }
}
const getNewSign = (numArr1, sign1, numArr2, sign2) => {
    let length1 = numArr1.length;
    let length2 = numArr2.length;
    if (sign1 === sign2 || length1 > length2 || numArr1 === numArr2) {
        return sign1;
    } else if (length2 > length1) {
        return sign2;
    } else {
        let sign = testSign(numArr1, numArr2, (length1 - 1), sign1, sign2);
        return sign;
    }
}

const getAndRemoveSign = (numArr) => {
    let tempArray = numArr;
    let sign = tempArray[0];
    if (sign === '-') {
        tempArray = tempArray.slice(1);
    } else {
        sign = '';
    }
    return {sign, numberArray: tempArray.reverse()};
}
const numToArray = (num, i) => {
    if(typeof num === 'string') {
        let numString = num.toString();
    }
    if (numString.indexOf('e') !== 0) {
        numString = removeExponent(numString);
    }
    let numArray = numString.split('');
    let { numberArray, sign } = getAndRemoveSign(numArray)
    return { [`num${i}Array`]: numberArray , [`sign${i}`]: sign };
}
const base10HalfAdder = (number1, number2, sign1, sign2, toNextNumber) => {
    if (sign1 === sign2) {
        return (number1 + number2 + toNextNumber);

    } else if(sign1 !== '-' && sign2 === '-') {
        return (number1 - number2 + toNextNumber);
    } else if(sign1 === '-' && sign2 !== '-') {
        return (number2 - number1 + toNextNumber);

    }
}
const removeExponent = (numberInScientificNotation) => {
    if(numberInScientificNotation.split('e+')[1] && typeof numberInScientificNotation === 'string') {
        const baseArray = numberInScientificNotation.split('e+');
        const baseNumber = baseArray[1];
        const exponent = parseInt(baseArray[2]);
        let newNumber = baseNumber;
        for(let i = 0; i < exponent; i++) {
            baseNumber = baseNumber + '0';
        }
        return newNumber;
    } else {
        return numberInScientificNotation;
    }
}
const addBigNumbers = (numberToAdd1, numberToAdd2) => {
    let num1 = numberToAdd1 || 0;
    let num2 = numberToAdd2 || 0;
    let {sign1, num1Array} = numToArray(num1, 1);

    let {sign2, num2Array} = numToArray(num2, 2);
    let newSign = getNewSign(num1Array, sign1, num2Array, sign2);
    let length = (num1Array.length > num2Array.length) ?
        num1Array.length
        :
        num2Array.length;
    let resultArray = [];
    let toNext = 0;
    let res = 0;
    for (var i = 0; i < length; i++) {
        let number1 = num1Array[i]?parseInt(num1Array[i]):0;
        let number2 = num2Array[i]?parseInt(num2Array[i]):0;
        
        if(sign1 !== sign2) {
            res = base10HalfAdder(number2, number1, sign1, sign2, toNext);
        } else {
            res = base10HalfAdder(number1, number2, sign1, sign2, toNext);
        }
        
        if (res >= 10) {
            res = res - 10;
            toNext = 1;
            resultArray[i] = res;
        } else if(res < -9) {
            resultArray[i] = res + 10
            toNext = -1;
        } else if (res < 0 && res > (-1 * 10) && i < length - 1) {
            resultArray[i] = res + 10;
            toNext = -1;
        } else if(res < 0 && i === length -1) {
            resultArray[i - 1] = 10 - resultArray[i - 1]
            resultArray[i] = '';
            newSign = '-'
        } else {
            toNext = 0;
            resultArray[i] = res;
        }
    }
    if (toNext === 1) {
        resultArray.push(1);
    } else {
        for(let i = 1; i <= 0; i--) {
            if(resultArray[i] !== '0') {
                break;
            }
            if(resultArray[i] === '0') {
                resultArray.pop();
            }
        }
    }
    if(res < 0 && i === length - 1) {
        resultArray.pop();
        let temp = resultArray(length - 2);
        resultArray[length - 2] = 10 - temp;
    }
    resultArray.push(newSign);
    resultArray.reverse();
    let newNumber = resultArray.join('');
    newNumber = newNumber.replace(/\b0+/, '').replace(/-0/, '-').replace(/--/, '-');
    if(newNumber === '') {
        newNumber = 0;
    }
    return newNumber;
}
module.exports = addBigNumbers;
let accumulator = 0
let addArrOfBigNumbers = (accumulator, nextNumber) => {
    return addBigNumbers(accumulator, nextNumber)
}
console.log(arr.reduce(addArrOfBigNumbers));

