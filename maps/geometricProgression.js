// Solution to hacker rank problem count triplets.

function countTriplets(a, r) {
    let n = a.length;
    // Set up one map for the frequency of all the numbers in the array
    let left = new Map();
    // Set up another map to move numbers into as they are used
    let right = new Map();
    // Set up a counter
    let answer = 0;
    for (let i = 0; i < n; i++) {
        // Add all up the frequency of each number
        if (!left.get(a[i])) {
            // if the number is not allready present set it to one
            left.set(a[i], 1);
        } else {
            // else add one to the frequency
            let temp = left.get(a[i]) + 1;
            left.set(a[i], temp);
        }
        /* set a placeholder at zero in the right map to prevent
         * having to place an extra conditional later
         */
        right.set(a[i], 0);
    }


    for (let j = 0; j < n; j++) {
        // set a convenience variale for the current number
        let c = a[j];
        /* remove the current number from the left map to prevent confusion
         * in the case of a multiple of 1
         */
        let tempLeft = left.get(c);
        left.set(c, tempLeft - 1);
        // Set the count variables to zero
        let countRight = 0;
        let countLeft = 0;
        // If the factor is not a whole number, leave the count at zero
        if (c % r === 0) {
            countRight = right.get(c / r);
        }
        // Check for the product of the current number * r
        countLeft = left.get(c * r);

        /* if neither count returns undefined or zero 
         * add the product of the two couts to the answer 
         */
        if (countLeft && countRight) {
            answer += (countLeft * countRight);
        }
        // Move the current number to the right map
        let tempRight = right.get(c);
        right.set(c, tempRight + 1);
    }
    return answer;
};
module.exports = countTriplets;