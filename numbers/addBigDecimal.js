let addBigNumbers = (number1, number2) => {
    class NumObject {
        constructor(numString, size) {
            this.size = size;
            [this.num, this.exponent] = numString.split('e');
            this.exponent = this.getOrRemoveSign(this.exponent, false, true);
            [this.num, this.exponent] = this.removeDecimal(this.num, this.exponent);
            // this.num = this.removeExp(this.num, this.exponent);
            // [this.integer, this.decimal] = this.num.split('.');
            this.sign = this.getOrRemoveSign(this.num, true);
            this.num = this.getOrRemoveSign(this.num);
            // this.integer = this.getOrRemoveSign(this.integer);
            // this.integerArray = this.splitNumber(this.integer, this.sign, this.size);
            // this.decimalArray = this.splitNumber(this.decimal, this.sign, this.size, true);
            // this.num = this.splitNumber(this.num)
            console.log('new numObj', this)
        }
        getOrRemoveSign (target, getSign = false, keepSign = false) {
            if(target) {
                if(target[0] === '+' || (target[0] === '-' && !getSign && !keepSign)) {
                    return target.slice(1)
                } else if(target[0] === '-' && getSign && !keepSign) {
                    return target.slice(0,1);
                } else if(getSign) {
                    return '';
                } else {
                    return target.slice(0);
                }
            } else {
                return 0;
            }
        }
        addZeroes (string, finalLength, toLeft = false) {
            let temp = string;
            for(let i = string.length; i < finalLength; i++) {
                if(toLeft) {
                    temp = '0' + string;
                } else {
                    temp += '0';
                }
            }
            if(toLeft) {
                temp = '0.' + temp;
            }
            return temp;
        }
        removeDecimal (numString, exponent) {
            let localExponent = exponent;
            if (!exponent || exponent === '0' || exponent === '+0' || exponent === '-0') {
                localExponent = 0;
            }
            if(numString.indexOf('.') !== -1) {
                if(exponent >= 0) {
                    localExponent = parseInt(exponent) + (numString.length - numString.indexOf('.')) + 1;
                } else {
                    localExponent = parseInt(exponent) + numString.indexOf('.') + 1;
                }
            }

            let regexDec =/\./gm;
            let localNumString = numString.replace(regexDec, '');
            return [localNumString, localExponent];
        }
    }
    class Result {
        constructor(number1, number2, size) {
            this.numObj1 = new NumObject(number1, size);
            this.addZeroes = this.numObj1.addZeroes;
            this.numObj2 = new NumObject(number2, size);
            // this.intBigN = this.numObj1.intergerNumberOfSplits > this.numObj2.intergerNumberOfSplits ? this.numObj1.intergerNumberOfSplits : this.numObj2.intergerNumberOfSplits;
            // this.decBigN = this.numObj1.decimalNumberOfSplits > this.numObj2.decimalNumberOfSplits ? this.numObj1.decimalNumberOfSplits : this.numObj2.decimalNumberOfSplits;
            this.toNext = 0;
            this.add(this.numObj1.num, this.numObj2.num, this.numObj1.exponent, this.numObj2.exponent, this.numObj1.sign)
            // this.resultDec = this.addArrays(this.numObj1.decimalArray, this.numObj2.decimalArray, size, this.toNext, true);
            // this.resultInt = this.addArrays(this.numObj1.integerArray, this.numObj2.integerArray, size, this.toNext);
            // this.resultInt = this.trimResult(this.resultInt.join(''));
            // this.resultInt = (this.resultInt === '' && this.resultDec[0][0] === '-')? 
            //     '-0'
            //     :
            //     (this.resultInt === '')?
            //     '0'
            //     :
            //     this.resultInt;
            // this.resultDec = this.trimResult(this.resultDec.join(''), true);
            // this.result = !this.resultDec ? 
            //     this.resultInt
            //     : 
            //     !(this.resultDec.length > 0)? 
            //         this.resultInt
            //         : 
            //         this.resultInt + '.' + this.resultDec
            
        }
        splitNumber (numberString)  {
            if(numberString) {
                // find the length of the final array
                const length = numberString.length;
                let numberOfSplits = Math.ceil(length/this.size);
                let tempArray = [];
                // reverse the number to make the operations easier. 
                numberString = numberString.split('').reverse().join('');
                let start = 0;
                let end = this.size;
                for(let i = 0; i < numberOfSplits; i++) {
                    let temp = numberString.slice(start, end);
                    temp = temp.split('');
                    temp.reverse();
                    temp = temp.join('');
                    // If the number is negative, make all members of the array negative.
                    // This will insure that the addition is correct in the case of negative numbers.
                    if (this.sign === '-') {
                        temp = '-' + temp 
                    }
                    tempArray.push(temp);
                    // Alter the start and end of the next slice by the given size
                    start += this.size;
                    end += this.size;
                    if (end >= length) {
                        end = length;
                    }
                }
                return tempArray;
            } else {
                return []
            }
        }
        addOrSubtractArrays (sign1, num1, exp1, sign2, num2, exp2) {
            // Check that at least one array exists;
            if(arr1 || arr2) {
                // if arr2 does not exist return num1 and it's sign and exponent
                if(arr1 && !arr2) {
                    return [sign1, num1, exp1];
                // if arr1 does not exist, return num2 and it's sign and exponent
                } else if(arr2 && !arr1) {
                    return [sign2, num2, exp2];
                } else {
                    if(sign1 !== sign2) {
                        // If sign 1 is negative subtract 1 from 2
                        if(sign1 === '-') {
                            return this.subtractArrays(num2, num1, exp1, exp2)
                        // else subtract 2 from 1
                        } else {
                            return this.subtractArrays(num1, num2, exp1, exp2)
                        }
                    // If the signs are the same add the arrays and keep the sign;
                    } else {
                        return this.addArrays(num1, num2, exp1, exp2, sign1);
                    }
                }

            }
            // If the signs are oposite, treat this as subtraction
        }
        add (num1, num2, exp1, exp2, sign) {
            let [number1, number2, correctionExp] = this.normalize(num1, num2, exp1, exp2);
            let num1Arr = this.splitNumberToArray(number1, 10);
            let num2Arr = this.splitNumberToArray(number2, 10);
            let resultArray = this.addArrays(num1Arr, num2Arr, sign, 10, correctionExp);
            
        }
        normalize (num1, num2, exp1, exp2) {
            let localNum1 = num1;
            let localNum2 = num2;
            let diff = exp1 - exp2;
            let correctionExp = exp1 > exp2? exp1: exp2
            while(diff > 0) {
                if(exp2 > 0) {
                    localNum2 += '0';
                } else {
                    localNum1 += '0';
                    correctionExp++;
                }
                diff--;
            }
            while(diff < 0) {
                if(exp2 > 0) {
                    localNum1 += '0';
                } else {
                    localNum2 += '0';
                    correctionExp++;
                }
                diff++;
            }
            return [localNum1, localNum2, correctionExp];
        }
        splitNumberToArray (number, size) {
            let numArray = [];
            let length = number.length;
            let n = length/size;
            let start = length - 10;
            for(let i = 0; i < n; i++) {
                let end = start + 10;
                if(start < 0) {
                    start = 0;
                }
                let temp = number.slice(start, end);
                numArray.push(temp);
                start += -10;
            }
            return numArray;
        }
        addArrays (arr1, arr2, sign, size, correctionExp) {
            console.log('arr1', arr1, 'arr2', arr2)
            let length1 = arr1.length;
            let length2 = arr2.length;
            let maxSize = Math.pow(10, size);
            let toNext = 0;
            let longest = length1 > length2? length1 : length2;
            let resultArray = [];
            for(let i = 0; i < longest; i++) {
                let num1 = parseInt(arr1[i]);
                let num2 = parseInt(arr2[i]);
                let maxLength;
                if(arr1[i] && arr2[i]) {
                    maxLength = (arr1[i].length >= arr2[i].length)? arr1[i].length : arr2[i].length;
                } else if(!arr1[i]) {
                    maxLength = arr2[i].length;
                } else {
                    maxLength = arr1[i].length
                }
                let temp;
                if(isNaN(num1)) {
                    temp = num2;
                } else if(isNaN(num2)) {
                    temp = num1;
                } else {
                    temp = num1 + num2;
                    if(temp > maxSize) {
                        temp = temp - maxSize;
                        toNext = 1;
                    } 
                }
                temp = temp.toString();
                if(i !== (longest - 1)) {
                    while(temp.length < maxLength) {
                        temp = '0' + temp;
                    }
                }
                resultArray.push(temp);
            }
            let reduceArray = (newValue, accumulator) => {
                return (accumulator + newValue);
            }
            let returnString = sign + resultArray.reduce(reduceArray);
            return this.addDecimal(returnString, correctionExp);
        }
        addDecimal (string, correctionExp) {
            // Get the new decimalPlace
            let decimalPlace = string.length - correctionExp + 1;
            // Slice the stirng there, insert a decimal
            let temp1 = string.slice(0, decimalPlace);
            let temp2 = string.slice(decimalPlace);
            if(temp2.length > 0 && temp1 !== '') {
                return (temp1 + '.' + temp2); 
            } else if(temp1 === '') {
                return '0.' + temp2;
            } else {
                return temp1;
            }
        }
            
            
            // if(localExp1 < 0 && localExp2 < 0) {
            //     console.log('diff', diff)
            //     if(diff > 0) {
            //         correctionExp = localExp2;
            //         while(diff > 0) {
            //             localNum2 += '0';
            //             diff--;
            //         }
            //     } else if(diff < 0) {
            //         correctionExp = localExp1
            //         while(diff < 0) {
            //             localNum1 += '0';
            //             diff++;
            //         }
            //     }
            // } else if(localExp1 < 0 && localExp2 >=0) {
            //     correctionExp = localExp1;
            //     while(localExp1 < 0) {
            //         localNum2 += '0';
            //         localExp1++;
            //         correctionExp--;
            //     }
            // } else if(localExp2 < 0 && localExp1 >=0) {
            //     correctionExp = localExp2;
            //     while(localExp2 < 0) {
            //         console.log('.... adding to localNum1')
            //         localNum1 += '0';
            //         correctionExp--;
            //         localExp2++;
            //     }
            // }
            // console.log('num1', localNum1, 'num2', localNum2, 'correction', correctionExp, sign);

            
                
            //     if(length1Adjusted > length2Adjusted) {
            //         while(length1 > length2) {
            //             localNum2 += '0';
            //         }
            //     } else if(length2 > length1) {
            //         while(length2 > length1) {
            //             localNum1 += '0';
            //         }
            //     }
            // }
            
            //     let len1;
            //     let len2;
            //     if(arr1 && arr2) {
            //         len1 = arr1.length;
            //         len2 = arr2.length;
            //     } else if(arr1 && !arr2) {
            //         len1 = arr1.length;
            //         len2 = 0;
            //     } else if(!arr1 && arr2) {
            //         len1 = 0;
            //         len2 = arr2.length;
            //     }
            //     let longestArr = len1 > len2 ? len1 : len2;
            //     if(exp1 > exp2) {
            //         do {
                        
            //         }
            //     }
            //     for(let i = 0; i < longestArr; i++) {
            //         let newLength = 0;
            //         if(arr1[i] && arr2[i]) {
            //             if((arr1[i].length > arr2[i].length) || (arr1[i] && !arr2[i])) {
            //                 newLength = arr1[i].length;
            //             } else {
            //                 newLength = arr2[i].length
            //             }
            //         } else if (arr1[i]) {
            //             newLength = arr1[i].length;
    
            //         } else {
            //             newLength = arr2[i].length
            //         }
            //         let num1, num2;
            //         const extendDecimal = (decimalString, length) => {
            //             if(decimalString) {
            //                 if(decimalString.length < length) {
            //                     this.addZeroes(decimalString, length);
            //                     // for(let i = decimalString.length; i < length; i++) {
            //                     //     decimalString += '0';
            //                     // }
            //                 }
            //             }
            //             return decimalString;
            //         }
            //         if(isDecimal) {
            //             num1 = parseInt(extendDecimal(arr1[i], newLength)) || 0;
            //             num2 = parseInt(extendDecimal(arr2[i], newLength)) || 0;
                        
            //         } else {
            //             num1 = parseInt(arr1[i]) || 0;
            //             num2 = parseInt(arr2[i]) || 0;
            //         }
            //         let temp = num1 + num2 + this.toNext;
            //         this.toNext = 0;
            //         if(temp > Math.pow(10, this.size)) {
            //             temp = temp - Math.pow(10, this.size);
            //             this.toNext = 1;
            //         } else if(temp < 0 && arr1[i +1] && arr2[i +1]) {
            //             temp = Math.pow(10, this.size) - temp;
            //             this.toNext = -1;
            //         } else if(isDecimal && temp > Math.pow(10, newLength)) {
            //             temp = temp - Math.pow(10, newLength)
            //             this.toNext = 1;
            //         }
            //         temp = temp.toString();
            //         if(isDecimal) {
            //             temp = temp.toString();
            //             temp = this.restoreZeroes(temp, newLength);
            //         } else {
            //             temp = temp.toString();
            //             temp = this.restoreZeroes(temp, this.size);
            //         }
            //         resultArray[i] = temp;
            //     }
            //     resultArray.reverse();
            //     return resultArray;
            // } else if(arr1) {
            //     arr1.reverse();
            //     return arr1;
            // } else if(arr2) {
            //     arr2.reverse();
            //     return arr2;
            // } else {
            //     return [];
            // }

        trimResult (string, isDecimal = false) {
            let length = string.length;
            if(!isDecimal) {
                for(let i = 0; i < length; i++) {
                    if(string.slice(0,1) === '-') {
                        if(string.slice(1,2) === '0') {
                            string = '-' + string.slice(2);
                        } 
                    } else if(string.slice(0,1) === '0') {
                        string = string.slice(1);
                    } else {
                        break;
                    }
                }
            }
            if(string[0] === '-') {
                let regex = /\-/gm;
                if(isDecimal) {
                    string = string.replace(regex, '');
                } else {
                    string = '-' + string.replace(regex, '');
                }
            } 
            return string;
        }
        restoreZeroes (string, length) {
            if(string.length < length) {
                for(let i = string.length; i < length; i++) {
                    string = '0' + string;
                }
            }
            return string
        }
    }
    let result = new Result(process.argv[2], process.argv[3], 10);
    return result.result;
}
console.log(addBigNumbers(process.argv[2], process.argv[3]));