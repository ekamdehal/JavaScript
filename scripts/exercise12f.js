let timeoutId;

function addToCart() {
  clearTimeout(timeoutId)
  const message = document.querySelector('.added-message')
  message.innerHTML = 'Added'
  timeoutId = setTimeout(function() {
    message.innerHTML = ''
  }, 2000)
}


