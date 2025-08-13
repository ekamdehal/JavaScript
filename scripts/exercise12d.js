function start() {
  document.querySelector('.js-button').innerHTML = 'Loading...'
  setTimeout(finished, 1000)
}

function finished() {
  document.querySelector('.js-button').innerHTML = 'Finished' 
}




