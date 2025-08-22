let timeoutId;

addToCart = () => {
  clearTimeout(timeoutId)
  const message = document.querySelector('.added-message')
  message.innerHTML = 'Added'
  timeoutId = setTimeout(() => {
    message.innerHTML = ''
  }, 2000)
}


