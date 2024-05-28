'use strict';

const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0Name = document.querySelector('#name--0');
const player1Name = document.querySelector('#name--1');
const modal = document.querySelector('.modal');
const modalMessage = document.querySelector('.modal-message');
const closeModalBtn = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay');

// Reset the scores to '0'
score0.textContent = '0';
score1.textContent = '0';
current0.textContent = '0';
current1.textContent = '0';

let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const showModal = message => {
  modalMessage.textContent = message;
  modal.classList.add('show');
  overlay.classList.add('show');
};

const closeModal = () => {
  modal.classList.remove('show');
  overlay.classList.remove('show');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a random number between 1 and 6
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    // Display the corresponding dice face
    dice.src = `dice-${randomNumber}.png`; // Assuming you have dice images named dice-1.png, dice-2.png, etc.
    dice.classList.remove('none');
    dice.style.display = 'block';

    // Check if the dice roll is not 1
    if (randomNumber !== 1) {
      // Add dice roll to the current score of the active player
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // If dice roll is 1, switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player has won the game (example winning condition: 100 points)
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      showModal(
        `Winner is ${
          document.getElementById(`name--${activePlayer}`).textContent
        }`
      );
      dice.style.display = 'none';
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  // Reset all scores and states
  score0.textContent = '0';
  score1.textContent = '0';
  current0.textContent = '0';
  current1.textContent = '0';
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  dice.style.display = 'none';
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  closeModal();
});

closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
