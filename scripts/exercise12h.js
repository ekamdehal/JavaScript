let messages = 0

add = () => {
  messages++
}

remove = () => {
  if (messages > 0) {
  messages--
  }
}

setInterval(() => {
  if (document.title === 'App') {
  document.title = `(${messages}) new messages`
  } else {
    document.title = 'App'
  }
}, 2000)