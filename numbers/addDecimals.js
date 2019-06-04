#!/usr/bin/env node
const removeZeroes = (numberString, fromLeft) => {
    let zeroes = 0;
    const getZeroes = (numStr, fromLeftSide) => {
        if(!fromLeftSide) {
            if(numStr[numStr.legth -1] === '0') {
                zeroes += 1;
                getZeroes(numStr.slice(0, -1));
            }
        } else {
            if(numStr[0] === '0') {
                zeroes -= 1;
                getZeroes(numStr.slice(1), true);
            }
        }
    }
    getZeroes(numberString, fromLeft);
    return zeroes;
}
const numToObject = (num) => {
    console.log('num to object start', num);
    let sign = '';
    let exponentSign = '';
    if(typeof num !== 'string' && typeof num !== 'number') {
        return {sign: '', interger: '0', decimal: '', exponent: ''}
    }
    else {
        let numString = num.toString(10);
        let [numberString, exponent] = numString.split('e');
        if(!exponent) {
            exponent = 0;
        } else {
            exponent = parseInt(exponent, 10);
        }
        if(numberString.indexOf('-') === 0) {
            sign = '-';
            numberString = numberString.slice(1);            
        }
        let [integer, decimal] = numberString.split('.');
        if(integer === 0 && decimal) {
            integer = '';
        }
        if(!decimal) {
            decimal = '';
        }
        if(integer !== '0') {
            exponent += removeZeroes(integer, false);
        }
        if(integer === '0' || integer === '') {
            exponent += removeZeroes(decimal, true);
        }
        let sigFig = integer.length + decimal.length;
        console.log('num to object end: sign:', sign, ', integer:', integer, ', decimal:',decimal,', exponent:',exponent,', sigFig: ', sigFig)
        return {sign, integer, decimal, exponent, sigFig}
    }
}
const getStringBase = (numObj, diff) => {
    return (numObj.integer + numObj.decimal);
}
getDecimalPlaces = (exponent, sigFig) => {
    return decimal.legth - exponent;
}

    if(numObj.exponent > 0) {
        for(let i = 0; i < numObj.exponent; i++) {
            base += '0';
        }
    } else if(numObj.exponent < 0) {
        for(let i = numObj.exponent; i < 0; i++) {
            base = '0' + base;
        }
    }
    for(let i =0; i < diff; i++) {
        base += '0';
    }
    return base;
}

const getSignificantFigures = (numberObject) => {
    let { integer, decimal } = numberObject;
    return (integer.length + decimal.length); 
}
let addNumberStrings = (num1, num2) => {
    let numObject1 = numToObject(num1);
    let numObject2 = numToObject(num2);
    // Often you will want to only keep the significant figures,
    // but you don't want to loose precision in the process
    let length;
    if (numObject1.sigFig1 > numObject1.sigFig2) {
        length = numObject1.sigFig1;
    } else {
        length = numObject2.sigFig2;
    }
    let num1Base = getStringBase(numObject1);
    let num2Base = getStringBase(numObject2);
    let length = Math.max(num1Base.legth, num2Base.length);
    let exp1 = numObject1.exponent;
    let exp2 = numObject2.exponent;
    let expDiff = 0;
    if((exp1 - exp2) < 0) {
        expDiff = exp2 - exp1;
    } else {
        expDiff = exp1 - exp2;
    }
    expDiff += 
    console.log(expDiff);
    let sign1 = numObject1.sign;
    let sign2 = numObject2.sign;
    console.log('num1: ', num1Base, 'num2', num2Base);
}

addNumberStrings(process.argv[2], process.argv[3]);