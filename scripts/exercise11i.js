let array = [1, 2, 3];
let array2 = [1, 2, 3];
let array3 = [-2, -1, 0, 99];

console.log(addNum(array, 1)); // Output: [2, 3, 4]
console.log(addNum(array2, 3)); // Output: [4, 5, 6]
console.log(addNum(array3, 2));

function addNum(array, num) {
  let newArray = [];
    // Check if the input is an array
    if (!Array.isArray(array)) {
        throw new TypeError("Input must be an array");
    }
    for (let i = 0; i < array.length; i++) {
        // Check if the current element is a number
        if (typeof array[i] !== 'number') {
            throw new TypeError("All elements in the array must be numbers");
        }
        // Add the specified number to the current element
        let newNum = array[i] + num;
        newArray.push(newNum);
    }
    return newArray;
  }