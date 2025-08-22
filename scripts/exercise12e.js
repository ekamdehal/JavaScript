buttonElement = document.querySelector('.js-button');

addToCart = () => {
  const message = document.querySelector('.added-message')
  message.innerHTML = 'Added'
  setTimeout(() => {
    message.innerHTML = ''
  }, 2000)
}

buttonElement.addEventListener('click', addToCart);
