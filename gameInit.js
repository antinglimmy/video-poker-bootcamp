//To-do
//- refactor code
//Add JSDoc
/**
 * A function that sums numbers
 * @param  player1ButtonClick {function} Draws a card, displays it and calculates the total score
 * @return {number}
 */

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["♥", "⬥", "♣", "♠"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    let currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "ace";
      } else if (cardName === "11") {
        cardName = "jack";
      } else if (cardName === "12") {
        cardName = "queen";
      } else if (cardName === "13") {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit");
  suit.innerText = cardInfo.suit;

  const name = document.createElement("div");
  name.classList.add("name", cardInfo.colour);
  name.innerText = cardInfo.name;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Create a helper function for output to abstract complexity of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// Use let for player1Card object because player1Card will be reassigned

let cardElement;
player1ButtonClick = () => {
  if (playersTurn === 1) {
    player1Card = deck.pop();
    player1Cards.push(player1Card);
    player1Score += player1Cards[player1Cards.length - 1].rank;
    console.log(player1Score);

    cardElement = createCard(player1Card);
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);

    playersTurn = 2;

    cardElement.addEventListener("click", () => {
      console.log(cardElement);
      console.log(player1Card);
      player1Cards.splice(player1Card);
      // squareClick(i, j);
    });
  }
};

player2ButtonClick = () => {
  if (playersTurn === 2) {
    player2Card = deck.pop();
    player2Cards.push(player2Card);
    player2Score += player2Cards[player2Cards.length - 1].rank;
    console.log(player2Score);

    const cardElement = createCard(player2Card);
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);

    playersTurn = 1;
  }
};

const initGame = () => {
  // create two buttons
  const player1Button = document.createElement("button");
  player1Button.innerText = "Player 1 Draw";
  document.body.appendChild(player1Button);

  player1Button.addEventListener("click", player1ButtonClick);

  const player2Button = document.createElement("button");
  player2Button.innerText = "Player 2 Draw";
  document.body.appendChild(player2Button);
  player2Button.addEventListener("click", player2ButtonClick);

  // Create game info div as global value
  // fill game info div with starting instructions
  const gameInfo = document.createElement("div");
  gameInfo.innerText = "Its player 1 turn. Click to draw a card!";
  document.body.appendChild(gameInfo);

  cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  document.body.appendChild(cardContainer);
};

initGame();
