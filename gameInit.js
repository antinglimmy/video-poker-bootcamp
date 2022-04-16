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
  const wildCard = {
    name: "joker",
    suit: "joker",
    rank: 14,
  };

  newDeck.push(wildCard);

  // Return the completed card deck
  // console.table(newDeck);
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

let cardNameTally = {};
let cardSuitTally = {};
let playerCardsRank = [];
const calPlayerScore = () => {
  player1Score = 0;

  // Loop over hand
  for (let i = 0; i < playerTestHandStraightFlush.length; i += 1) {
    let cardName = playerTestHandStraightFlush[i].name;
    let cardSuit = playerTestHandStraightFlush[i].suit;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardSuitTally[cardSuit] = 1;
    }
  }

  for (let i = 0; i < playerTestHandStraightFlush.length; i += 1) {
    playerCardsRank.push(playerTestHandStraightFlush[i].rank);
  }
  playerCardsRank.sort(function (a, b) {
    return a - b;
  });
  console.log(playerCardsRank);

  //Five of a kind win condition
  let fiveKind = "";
  for (cardName in cardNameTally) {
    if (cardNameTally[cardName] === 4) {
      console.log("five of a kind first half");
      fiveKind = "half";
    }
  }
  for (cardName in cardNameTally) {
    if (fiveKind === "half" && cardName === "joker") {
      console.log("five of a kind");
    }
  }

  //Straight flush win condition
  let straightFlush = "";
  for (cardSuit in cardSuitTally) {
    if (cardSuitTally[cardSuit] === 5) {
      console.log("straight flush first half");
      straightFlush = "half";
    }
  }

  if (
    straightFlush === "half" &&
    playerCardsRank[length - 1] - playerCardsRank[0] === 4
  ) {
    console.log("straight flush");
  }

  // for (cardSuit in cardSuitTally) {
  //   console.log(
  //     `There are ${cardSuitTally[cardSuit]} ${cardSuit}s in the hand`
  //   );
  // }

  // for (let i = 0; i < cardNameTally.length; i += 1) {
  // if (cardNameTally[cardName])

  // for (let i = 0; i < player1Cards.length; i++) {
  //   player1Score += player1Cards[i].rank;
  // }
  // console.log(player1Score);
};
calPlayerScore();

// Use let for player1Card object because player1Card will be reassigned
let playerCardsElements = [];
let playerCardsElementsHold = [];
let gameState = "dealing cards";
let cardElement;
let player1CardNew;
player1ButtonClick = () => {
  if (gameState === "dealing cards") {
    for (let i = 0; i < 5; i++) {
      player1Card = deck.pop();
      player1Cards.push(player1Card);

      playerCardsElements[i] = createCard(player1Card);

      // Append the card element to the card container
      cardContainer.appendChild(playerCardsElements[i]);
    }
    gameState = "choosing cards to discard";
  }
  if (gameState === "choosing cards to discard") {
    for (let i = 0; i < 5; i++) {
      playerCardsElements[i].addEventListener("click", () => {
        // playerCardsElementsHold[i] = playerCardsElements[i];
        playerDiscardedCards.push(playerCardsElements[i]);
        // playerDiscardedCardsIndex.push(i);
        // createCard(player1Cards[i]);
        console.log("player 1 cards =>", player1Cards);
        console.log("player discarded cards=>", playerDiscardedCards);
        player1Cards[i] = "";
        playerCardsElements[i].classList.toggle("flipcard");
        playerCardsElements[i].innerText = "Discard";
      });
    }
    gameState = "replacing cards";
  } else if (gameState === "replacing cards") {
    // for (let i = 0; i < 5; i++) {
    //   playerCardsElements[i].addEventListener("click", () => {

    for (let i = 0; i < playerCardsElements.length; i++) {
      if (playerCardsElements[i].innerText === "Discard") {
        playerCardsElements[i].remove();
        player1CardNew = deck.pop();
        player1Cards[i] = player1CardNew;
        console.log(player1CardNew);

        playerCardsElements[i] = createCard(player1CardNew);
        console.log(playerCardsElements[i]);
        cardContainer.appendChild(playerCardsElements[i]);
      }
    }
    gameState = "after deal";

    // for (let i = 0; i < player1Cards.length; i++) {
    //   if (player1Cards[i] === "") {
    //     player1CardNew = deck.pop();
    //     player1Cards[i] = player1CardNew;

    //     cardElement = createCard(player1CardNew);
    //     cardContainer.appendChild(cardElement);
    //     console.log("new cards", cardElement);
    //   }
    // }
    calPlayerScore();
    console.log("player score", player1Score);
    // });
  }
  // }
};

// const holdCard = (i) => {
//   console.log(player1Cards[i]);
//   playerDiscardedCards.push(player1Cards[i]);
//   playerDiscardedCardsIndex.push(i);
//   createCard(player1Cards[i]);
//   console.log(player1Cards);
//   console.log(playerDiscardedCards);
//   player1Cards[i] = "";
//   for (let i = 0; i < player1Cards.length; i++) {
//     if (player1Cards[i] === "") {
//       player1Card = deck.pop();
//       player1Cards[i] = player1Card;

//       cardElement = createCard(player1Card);
//       // Append the card element to the card container
//       cardContainer.appendChild(cardElement);
//     }
//   }
//   calPlayerScore();

// gameState = "discarding cards";
// };

const initGame = () => {
  // create two buttons
  const player1Button = document.createElement("button");
  player1Button.classList.add("button");
  player1Button.innerText = "Deal";
  document.body.appendChild(player1Button);

  player1Button.addEventListener("click", player1ButtonClick);

  // Create game info div as global value
  // fill game info div with starting instructions
  const gameInfo = document.createElement("div");
  gameInfo.innerText = "Click draw to draw 5 cards";
  document.body.appendChild(gameInfo);

  cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  document.body.appendChild(cardContainer);
};

initGame();
