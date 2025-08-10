console.log(minMax([1,-3,5]))
console.log(minMax([-2,3,-5,7,10]))
console.log(minMax([]))
console.log(minMax([3]))

function minMax(nums) {

  let result = {
    min: null,
    max: null
  }

  if (nums.length === 0) {
    return result
  }

  result.min = nums[0]
  result.max = nums[0]

  if (nums.length == 1) {
    return result
  }

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > result.max) {
      result.max = nums[i]
    }

    if (nums[i] < result.min) {
      result.min = nums[i]
    }
  }
  return result
}