let nums = [10, 20, 30];
console.log(getLastValue(nums)); 
let arr = ['apple', 'banana', 'cherry'];
console.log(getLastValue(arr));
let emptyArr = [];
console.log(getLastValue(emptyArr)); // Should return an error message

function getLastValue(arr) {
  if (arr.length === 0) {
    return 'The array is empty!'; // Returns an error if the array is empty
  }
  return arr[arr.length - 1]; // Return the last element of the array
}