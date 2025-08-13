function runTwice(fun) {
  fun();
  fun();
}

let add = function() {
  console.log(2 + 3)
}

runTwice(add());