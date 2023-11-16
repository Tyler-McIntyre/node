const MaxSumSubarray = require("./max-sum-subarray")
const SmallestSubarrayGivenSum = require("./smallest-subarray-given-sum")

const arr = [4, 2, 1, 7, 8, 1, 2, 8, 1, 0]
const size = 3

const maxSumResult = MaxSumSubarray(arr, size)
console.log("maxSumResult: ", maxSumResult)

const targetSum = 9

const smallestSubarrayResult = SmallestSubarrayGivenSum(targetSum, arr)
console.log("smallestSubarrayResult", smallestSubarrayResult)