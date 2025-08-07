let arr = [1, 2, 3, 4, 5];
let arr2 = [];

for (let i = 0; i < arr.length; i++) {
  let num = arr[i] + 1;
  arr2.push(num);
}

console.log(arr2); // Output: [2, 3, 4, 5, 6]