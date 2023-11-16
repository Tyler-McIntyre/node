/* 
 * Find the smallest subarray with the given sum
 * Return the length of the substring
 * 
 * Example Input
 * [4, 2, 1, 7, 8, 1, 2, 8, 1, 0]
 * 
 */

function SmallestSubarrayGivenSum(targetSum, arr) {
    let smallestSubarr = undefined

    // iterate from left to right
    for (let [i, num] of arr.entries()) {
        let sum = num
        let runningSubArr = 1

        while(sum < targetSum) {
            runningSubArr++
            i++
            sum += arr[i]
        }

        // init the variable or track the new lowest value
        if ((!smallestSubarr || runningSubArr < smallestSubarr) && sum === targetSum) {
            smallestSubarr = runningSubArr;
        }
          
    }

    return smallestSubarr || 0
}

module.exports = SmallestSubarrayGivenSum