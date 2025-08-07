let arr1 = [1, 2, 3, 4, 5];
let arr2 = ['a', 'b', 'c', 'd'];
arraySwap(arr1);
arraySwap(arr2);
console.log(arr1); // [5, 2, 3, 4, 1]
console.log(arr2); // ['d', 'b', 'c', 'a']

function arraySwap(array) {
  if (array.length < 2) {
    return 'Array must have at least two elements to swap.';
  }
  let temp = array[0];
  array[0] = array[array.length - 1];
  array[array.length - 1] = temp;
  return array;
}