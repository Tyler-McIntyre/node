
const nums = [5,1,1,2,0,0]
console.log(sortArray(nums))

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function sortArray(nums) {
    return quickSort(nums)
}

function medianOfThree(arr, low, high) {
    const mid = Math.floor((low + high) / 2);
    const values = [arr[low], arr[mid], arr[high]];
    values.sort((a, b) => a - b);
    return values[1]; // return the median value
}

function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivot = medianOfThree(arr, low, high);
        const partitionIndex = partition(arr, low, high, pivot);

        quickSort(arr, low, partitionIndex - 1);
        quickSort(arr, partitionIndex, high);
    }
    return arr;
}

function partition(arr, low, high, pivot) {
    while (low <= high) {
        while (arr[low] < pivot) {
            low++;
        }
        while (arr[high] > pivot) {
            high--;
        }
        if (low <= high) {
            // Swap arr[low] and arr[high]
            [arr[low], arr[high]] = [arr[high], arr[low]];
            low++;
            high--;
        }
    }
    return low;
}