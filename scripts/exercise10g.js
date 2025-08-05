function changeColour(selector) {
  const button = document.querySelector(selector);
  if (!button.classList.contains('is-toggled')) {
    turnOff();
    button.classList.add('is-toggled');
  } else {
    button.classList.remove('is-toggled');
  }
}

function turnOff() {
  const previousButton = document.querySelector('.is-toggled');
  if (previousButton) {
    previousButton.classList.remove('is-toggled');
  }
  }