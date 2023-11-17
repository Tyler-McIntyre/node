/* 
* Given an array of integers nums, sort the array in ascending order and return it.
*
* You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.
*/

const nums = [5, 2, 3, 1, 4, 7, 10, 11, 4]

const result = sortArray(nums)
console.log('sortArray: ', result)

function sortArray(nums) {
    // divide the array until we're given single elements
    if (nums.length === 1) {
        return nums
    }

    let arrays = divideArray(nums)

    let a = sortArray(arrays.a)
    let b = sortArray(arrays.b)

    return merge(a, b)
};

/**
 * @param {number[]} nums
 * @return { number[], number[]}
 */
function divideArray(nums) {
    const midPoint = Math.floor(nums.length / 2)

    let a = []
    for (let i = 0; i < midPoint; i++) {
        a.push(nums[i])
    }

    let b = []
    for (let i = midPoint; i < nums.length; i++) {
        b.push(nums[i])
    }

    return { a, b }
}

function merge(a, b) {
    let sortedArray = []
    // compare and sort
    while (a.length && b.length) {
        if (a[0] > b[0]) {
            sortedArray.push(b[0])
            b.shift()
        } else {
            sortedArray.push(a[0])
            a.shift()
        }
    }

    // add any leftover elements to the array
    while(b.length) {
        sortedArray.push(b[0])
        b.shift()
    }

    while(a.length) {
        sortedArray.push(a[0])
        a.shift()
    }

    return sortedArray
}