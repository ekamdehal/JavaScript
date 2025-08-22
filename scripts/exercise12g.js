setInterval(() => {
  if (document.title === 'App') {
  document.title = '(2) new messages'
  } else {
    document.title = 'App'
  }
}, 5000)