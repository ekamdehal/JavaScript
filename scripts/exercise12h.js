let messages = 0

function add(){
  messages++
}

function remove() {
  if (messages > 0) {
  messages--
  }
}

setInterval(function(){
  if (document.title === 'App') {
  document.title = `(${messages}) new messages`
  } else {
    document.title = 'App'
  }
}, 2000)