const gameBoard = document.querySelector(".game-board");
const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍍", "🥝", "🥥"];
const cards = [...symbols, ...symbols]; // Duplicate symbols to create pairs
let flippedCards = [];
let matchedCards = [];

// Shuffle the cards using Fisher-Yates algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(cards);

// Create the cards dynamically
cards.forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="front">${symbol}</div>
        <div class="back">?</div>
    `;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
});

// Flip the card when clicked
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}
let count=0
// Check if the two flipped cards match
function checkMatch() {
    let [card1, card2] = flippedCards;
    if (card1.innerHTML === card2.innerHTML) {
        matchedCards.push(card1, card2);
        count++;
        document.getElementById('count').innerHTML=count;
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            setTimeout(() => alert("You win!"), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}
document.getElementById("Refresh").addEventListener("click",function(e) {
    location.reload();
});