const cards = document.querySelectorAll('.memory-card');
var modal = document.getElementById('myModal');
var close = document.getElementsByClassName('close')[0];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let isMatchCount = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  //second click
  secondCard = this;
  checkforMatch();
}

function checkforMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();
    isMatchCount++;

    if (isMatchCount === 6) {
      winner();
    }
  } else {
    unflipCards();
  }
  // isMatch ? disableCards() : unflipCards();
}
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false][(firstCard, secondCard)] = [
    null,
    null,
  ];
}


function winner() {
  modal.style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
close.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

function refreshPage() {
  window.location.reload();
}

function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
    });
  };
  
  shuffle();
//Event listener
cards.forEach((card) => card.addEventListener('click', flipCard));


