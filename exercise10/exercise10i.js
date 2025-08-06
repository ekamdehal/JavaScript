let calculation = localStorage.getItem('calculation') || '';

function updateCalculation(value) {
  calculation += value;
  console.log(calculation);
  localStorage.setItem('calculation', calculation);
  updateDisplay();
}

function updateDisplay() {

  const display = document.querySelector('.calculation-display');
  display.innerHTML = calculation;
}

updateDisplay();