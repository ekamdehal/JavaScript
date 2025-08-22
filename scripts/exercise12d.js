buttonElement = document.querySelector('.js-button');

start = () => {
  buttonElement.innerHTML = 'Loading...'
  setTimeout(finished, 1000)
}

finished = () => {
  buttonElement.innerHTML = 'Finished'
}

buttonElement.addEventListener('click', start);



