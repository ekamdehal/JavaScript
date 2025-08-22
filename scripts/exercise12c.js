buttonElement = document.querySelector('.js-button');

buttonElement.addEventListener('click', () => setTimeout(start, 1000));

start = () => {
  buttonElement.innerHTML = 'Finished';
}