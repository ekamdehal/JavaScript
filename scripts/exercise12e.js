function addToCart() {
  const message = document.querySelector('.added-message')
  message.innerHTML = 'Added'
  setTimeout(function() {
    message.innerHTML = ''
  }, 2000)
}



