let messages = 0;
let id = null;
let isDisplayingNotification = false;

add = () => {
  messages++;
  displayNotification();
}

remove = () => {
  if (messages > 0) {
  messages--
  }

  if (messages === 0) {
    stopNotification();
  }
}

displayNotification = () => {
  if (isDisplayingNotification) {
    return
  }

  isDisplayingNotification = true;

  id = setInterval(() => {
  if (document.title === 'App') {
  document.title = `(${messages}) new messages`
  } else {
    document.title = 'App'
  }
  }, 2000)
}

stopNotification = () => {
  isDisplayingNotification = false;
  clearInterval(id);
  id = null;
  document.title = 'App';
}

document.querySelector('.js-add-button').addEventListener('click', add);
document.querySelector('.js-remove-button').addEventListener('click', remove);
