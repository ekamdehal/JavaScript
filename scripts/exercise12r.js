// ===============================
// STATE
// ===============================
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let reset = false;
let isAutoPlaying = false;
let intervalId = null;


// ===============================
// INITIAL UI SETUP
// ===============================
updateScoreElement();
document.querySelector('.js-result').innerHTML = 'You ?';
document.querySelector('.js-moves').innerHTML = 'You ? ? Computer';


// ===============================
// FUNCTIONS — UI/CONTROL
// ===============================
function confirmReset() {
  document.querySelector('.js-reset-confirmation').innerHTML = 
    `Are you sure you want to reset the score? 
     <button class="js-confirm-reset-button">Yes</button>
     <button class="js-cancel-reset-button">No</button>`;

    box.querySelector('.js-confirm-reset-button').addEventListener('click', () => {
    resetScore();
    box.innerHTML = '';
  });

  box.querySelector('.js-cancel-reset-button').addEventListener('click', () => {
    box.innerHTML = '';
  });
}

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    intervalId = null;
    isAutoPlaying = false;
  }

  // Toggle button label
  document.querySelector('.js-auto-play-button').textContent =
    isAutoPlaying ? 'Stop Auto Play' : 'Auto Play';
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}


// ===============================
// FUNCTIONS — GAME LOGIC
// ===============================
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else {
      result = 'You lose.';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();

  document.querySelector('.js-moves').innerHTML = `You
    <img src="${playerMove}-emoji.png" class="move-icon" alt="${playerMove}">
    <img src="${computerMove}-emoji.png" class="move-icon" alt="${computerMove}">
    Computer`;

  document.querySelector('.js-result').innerHTML = result;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) {
    return 'rock';
  } else if (randomNumber < 2 / 3) {
    return 'paper';
  } else {
    return 'scissors';
  }
}


// ===============================
// EVENT LISTENERS — BUTTONS
// ===============================
document.querySelector('.js-rock-button')
  .addEventListener('click', () => playGame('rock'));

document.querySelector('.js-paper-button')
  .addEventListener('click', () => playGame('paper'));

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => playGame('scissors'));

document.querySelector('.js-auto-play-button')
  .addEventListener('click', autoPlay);

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    // If resetting while autoplay is on, stop it
    if (isAutoPlaying) autoPlay();
    confirmReset();
  });

// NOTE: These buttons are created dynamically inside confirmReset().
// If they don't exist yet, querySelector will return null.
// TODO: You may want to attach these after rendering, or use event delegation.
document.querySelector('.js-confirm-reset-button')
  .addEventListener('click', () => {
    resetScore();
    document.querySelector('.js-reset-confirmation').innerHTML = '';
  });

document.querySelector('.js-cancel-reset-button')
  .addEventListener('click', () => {
    document.querySelector('.js-reset-confirmation').innerHTML = '';
  });


// ===============================
// EVENT LISTENERS — KEYBOARD
// ===============================
document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();

  if (key === 'r') {
    playGame('rock');
  } else if (key === 'p') {
    playGame('paper');
  } else if (key === 's') {
    playGame('scissors');
  } else if (key === 'a') {
    autoPlay();
  } else if (key === 'backspace') {
    confirmReset();
  }
});
