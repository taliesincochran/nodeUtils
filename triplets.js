// giant array of numbers = arr

'use strict';

const fs = require('fs');
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the countTriplets function below.
function countTriplets(arr, r) {
    let triplets = 0;
    // This function just checks if a map has a key, if it does it adds one to the value
    const getAndSet = (map, key, index) => {
        if (map.has(key)) {
            let indexArray = map.get(key);
            indexArray.push(index);
            map.set(key, indexArray)
        } else {
            let newArray = [index];
            map.set(key, newArray);
        }
    }
    // This is just a shortcut to get a quick value for consequtive numbers from 1 to n;
    const getSumConsequtiveNumbers = (n) => {
        return ((n / 2) * (1 + n));
    }
    // This gets a value for all consequtive numbers from 1 to (n - i) from i = 1 to i = n;
    const getCompoundSumConsequtiveNumbers = number => {
        let sum = 0;
        while (number) {
            sum += getSumConsequtiveNumbers(number--);
        }
        return sum;
    }
    // This will go through the array and create a map for frequencies for each value
    // it will also return if it is not a consequtive array
    const makeFreqArray = valueArr => {
        let freqMap = new Map();
        let max = 0;
        let nonConsequtive = false;
        for (let i = 0; i < valueArr.length; i++) {
            if(max > valueArr[i]) {
                nonConsequtive = true;
            }
            getAndSet(freqMap, valueArr[i], i);
            max = valueArr[i] > max ? valueArr[i] : max;
        }
        return [freqMap, nonConsequtive];
    }
    const forR1 = valueArr => {
        let tripletsR1 = 0;
        let [freqMap, nonConsequtive] = makeFreqArray(valueArr);
        for (let i = 0; i < freqMap.size(); i++) {
            let freqArray = freqMap.next().value;
            tripletsR1 += getCompoundSumConsequtiveNumbers(freqArray.length);
        }
        return tripletsR1;
    }
    const forNotR1 = valueArr => {
        let tripletsNotR1 = 0;
        let [freqMap, nonConsequtive] = makeFreqArray(arr);
        if(!nonConsequtive) {
            for(let i = 0; i < valueArr.length; i++) {
                if(freqMap.has(valueArr[i] * r) && freqMap.has(valueArr[i] * r * r)) {
                    let timesRFreqArray = freqMap.get(valueArr[i] * r);
                    let timesRSquaredFreqArray = freqMap.get(valueArr[i] * r * r);
                    if(i > timesRFreqArray[0]) {
                        timesRFreqArray = timesRFreqArray.filter(index => (index > i));
                    } 
                    if(i > timesRSquaredFreqArray[0]) {
                        timesRSquaredFreqArray = timesRSquaredFreqArray.filter(index => (index > i));
                    }
                    if(timesRFreqArray.length > 0 && timesRFreqArray.length > 0) {
                        console.log('bingo', timesRFreqArray, timesRSquaredFreqArray)
                        tripletsNotR1 += (timesRFreqArray.length * timesRSquaredFreqArray.length);
                    }
                }
            }
        }
        return tripletsNotR1;
    }
    if (r === 1) {
        triplets = forR1(arr);
    } else {
        triplets = forNotR1(arr);
    }
    return triplets;
}


function main() {
    const ws = fs.createWriteStream('./output');

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    ws.write(ans + '\n');

    ws.end();
}

