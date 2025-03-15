const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart');

const cardValues = [
    'fa-heart', 'fa-heart',
    'fa-star', 'fa-star',
    'fa-smile', 'fa-smile',
    'fa-cloud', 'fa-cloud',
    'fa-bicycle', 'fa-bicycle',
    'fa-car', 'fa-car',
    'fa-rocket', 'fa-rocket',
    'fa-moon', 'fa-moon'
];

let shuffledCards = [];
let flippedCards = [];
let matchedCards = [];

function initializeGame() {
    shuffledCards = [...cardValues];
    shuffledCards.sort(() => Math.random() - 0.5);  // Mengacak kartu
    gameBoard.innerHTML = '';  // Bersihkan board
    flippedCards = [];
    matchedCards = [];
    createCards();  // Membuat dan menampilkan kartu
}

function createCards() {
    shuffledCards.forEach((iconClass, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);
        card.dataset.value = iconClass;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard(event) {
    const clickedCard = event.target;

    if (flippedCards.length === 2 || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
        return;
    }

    clickedCard.innerHTML = `<i class="fas ${clickedCard.dataset.value}"></i>`;
    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === shuffledCards.length) {
            setTimeout(() => {
                alert("Selamat! Anda menang!");
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '';
            card2.innerHTML = '';
            flippedCards = [];
        }, 1000);
    }
}

restartButton.addEventListener('click', initializeGame);

initializeGame();
