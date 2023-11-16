/* 
 * Find the max sum subarray of a fixed size K
 * 
 * Example Input
 * [4, 2, 1, 7, 8, 1, 2, 8, 1, 0]
 * 
 */

function MaxSumSubarray(arr, k) {
    let maxValue = 0

    for (let [index] of arr.entries()) {
        let sum = 0
        // iterate over k to get the input values
        for(let i = 0; i < k; i++) {
            sum+=arr[index + i]
        }

        // track the max value
        if (sum > maxValue) {
            maxValue = sum
        }
    }

    return maxValue
}

module.exports = MaxSumSubarray