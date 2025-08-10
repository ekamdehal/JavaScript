array = ['hello', 'good', 'search']

let found = false

for (let i = 0; i < array.length; i++) {
  if (array[i] === 'search') {
    console.log(i)
    found = true
  }
}

if (!found) {
  console.log(-1)
}