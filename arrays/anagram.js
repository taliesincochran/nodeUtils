#!/usr/bin / env node
const getAnagrams = str => {
    let len = str.length;
    let subStringArray = []
    let count  = {}
    for(let i = len; i > 0; i--) {
        for(let j = 0; j < str.length; j++) {
            if(j < i) {
                let temp = str.slice(j, i);
                temp = temp.split('')
                temp.sort();
                temp = temp.join('');
                count[temp] = count[temp] !== undefined? count[temp] + 1 : 0;
                subStringArray.push(temp);
            }
        }
    }
    //removes the substring that is equal to the string
    let anagrams = 0;
    let keys = Object.keys(count);
    keys.forEach(key=> {
        if(count[key] > 0) {
            for(let i = count[key]; i >= 0; i--) {
                console.log('anagram');
                anagrams += count[key] - i;
            }
        }
    })
    console.log(count);
    return anagrams;
}


console.log(getAnagrams(process.argv[2]));