runTwice = (fun) => {
  fun();
  fun();
}

let add = () => {
  console.log(2 + 3)
}

runTwice(add);