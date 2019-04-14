const cards = document.querySelectorAll('.memory-card');
let count = document.getElementById('matches');
let turn = document.getElementById('trys');
let score = document.getElementById('perc');
let league = document.querySelectorAll('.rating');
let countOn = 0;
let turnOn = 0;
let scoreOn = 1;
let leagueOn = 'ROOKIE';


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
    



function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
 
    secondCard = this;
    
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
 
    turnOn++
    trys.textContent = turnOn;

    isMatch ? disableCards() : unflipCards();
    addRatio();
    addRating();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    // finding way to remove matches from view
    firstCard.classList.add('chosen');
    secondCard.classList.add('chosen');
    countOn++
    matches.textContent = countOn; 
       
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1200);
}

function addRatio() {
    scoreOn= (countOn / turnOn) * 100;
    scoreOn = scoreOn.toFixed(1);
    perc.textContent = scoreOn;
}

function addRating() {
    if (scoreOn <= 10) {
        leagueOn ='ROOKIE'
    } else if (scoreOn <= 15) {
        leagueOn = 'JOURNEYMAN'
    } else if (scoreOn <= 20) {
        leagueOn = 'VETERAN'
    } else if (scoreOn <= 35) {
        leagueOn = 'ALL-PRO'
    } else {
        leagueOn = 'HALL OF FAME!!'
    };
    rating.textContent = leagueOn;
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 64);
    card.style.order = randomPos;
  });
})();

document.querySelector('button').addEventListener('click', function () {
    window.location.reload(true);
})


cards.forEach(card => card.addEventListener('click', flipCard));
