let array = [1, 2, 3, 4, 5];
let array2 = [-2,-1,0,99];
console.log(addOne(array));
console.log(addOne(array2));

function addOne(array) {
    // Check if the input is an array
    if (!Array.isArray(array)) {
        throw new TypeError("Input must be an array");
    }

    for (let i = 0; i < array.length; i++) {
        // Check if the current element is a number
        if (typeof array[i] !== 'number') {
            throw new TypeError("All elements in the array must be numbers");
        }
        // Add one to the current element
        array[i] += 1;
    }
    return array;
}