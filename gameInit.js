//To-do
//- refactor code
//Add JSDoc
//order of cards when discarded
/**
 * A function that sums numbers
 * @param  player1ButtonClick {function} Draws a card, displays it and calculates the total score
 * @return {number}
 */

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 * @param  max maximum number
 * @return a number between 0 and parameter max
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Shuffle an array of cards
 * @param  cards which are in an array of objects
 * @return a shuffled deck
 */
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

/**
 * Create a deck of 53 cards (including a Joker card)
 * @return deck
 */
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
        cardName = "A";
      } else if (cardName === "11") {
        cardName = "J";
      } else if (cardName === "12") {
        cardName = "Q";
      } else if (cardName === "13") {
        cardName = "K";
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
    name: "Joker",
    suit: "",
    rank: 15,
  };

  newDeck.push(wildCard);

  // Return the completed card deck
  // console.table(newDeck);
  return newDeck;
};

let deck = shuffleCards(makeDeck());

/**
 * Create a div element template for each card, with it's respective name and suit
 * * @param cardInfo a card object with a name, suit and ranking
 * @return created card div element with suit and name
 */
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

/**
 * The helper function to output the game info
 * * @param message game info/result that you want to output
 */
const output = (message) => {
  gameInfo.innerText = message;
};

/**
 * Helps to tally the cards, identify the winning condition and output the relevant result/message
 */
const calPlayerScore = () => {
  player1Score = 0;

  for (let i = 0; i < player1Cards.length; i += 1) {
    let cardName = player1Cards[i].name;
    let cardSuit = player1Cards[i].suit;

    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    } else {
      cardNameTally[cardName] = 1;
    }
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    } else {
      cardSuitTally[cardSuit] = 1;
    }

    if (cardName === "ace") {
      hasAce = "yes";
      console.log(hasAce);
    }
  }

  for (let i = 0; i < player1Cards.length; i += 1) {
    playerCardsRank.push(player1Cards[i].rank);
  }
  playerCardsRank.sort(function (a, b) {
    return a - b;
  });
  console.log(playerCardsRank);

  //Four of a kind win condition
  let fiveKind = "";
  for (cardName in cardNameTally) {
    if (cardNameTally[cardName] === 4) {
      console.log("four of a kind");
      fiveKind = "half";
      output("You got four of a kind!");
      result = "yes";
    }
  }

  //Five of a kind win condition
  for (cardName in cardNameTally) {
    if (fiveKind === "half" && cardName === "joker") {
      console.log("five of a kind");
      output("You got five of a kind!");
      result = "yes";
    }
  }

  //Flush win condition
  let straightFlush = "";
  for (cardSuit in cardSuitTally) {
    if (cardSuitTally[cardSuit] === 5) {
      console.log("flush");
      straightFlush = "half";
      console.log(straightFlush);
      output("You got a flush");
      result = "yes";
    }
  }
  //Straight flush win condition
  if (
    straightFlush === "half" &&
    playerCardsRank[playerCardsRank.length - 1] - playerCardsRank[1] === 4
  ) {
    console.log("straight flush");
    output("You got a straight flush");
    result = "yes";
  }

  if (
    straightFlush === "half" &&
    playerCardsRank[playerCardsRank.length - 1] === 13 &&
    playerCardsRank[1] === 10 &&
    hasAce === "yes"
  ) {
    console.log("king high flush");
    output("You got a king high flush!");
    result = "yes";
  }

  //Straight win condition
  if (
    playerCardsRank[playerCardsRank.length - 1] - playerCardsRank[0] === 4 &&
    playerCardsRank[3] - playerCardsRank[2] === 1
  ) {
    console.log("straight");
    output("You got a straight!");
    result = "yes";
  }
  if (
    playerCardsRank[playerCardsRank.length - 1] === 13 &&
    playerCardsRank[1] === 10 &&
    hasAce === "yes"
  ) {
    console.log("ace straight");
    output("You got an ace straight");
    result = "yes";
  }

  //Three of a kind win conditions
  let fullHouse = "";
  for (cardName in cardNameTally) {
    if (cardNameTally[cardName] === 3) {
      console.log("three of a kind");
      fullHouse = "half";
      output("You got three of a kind");
      result = "yes";
    }
  }

  //Full house win conditions
  for (cardName in cardNameTally) {
    if (fullHouse === "half" && cardNameTally[cardName] === 2) {
      console.log("full house");
      output("You got a full house");
      result = "yes";
    }
  }

  //Two pair win condition
  let twoPair = 0;
  for (cardName in cardNameTally) {
    if (cardNameTally[cardName] === 2) {
      twoPair += 1;
    }
  }
  if (twoPair === 2) {
    console.log("two pair");
    output("You got two pairs");
    result = "yes";
  }

  //One pair win condition
  if (twoPair === 1) {
    console.log("one pair");
    output("You got a pair!");
    result = "yes";
  }

  if (result === "") {
    output("Sorry you didnt win anything");
  }

  // for (let i = 0; i < player1Cards.length; i++) {
  //   player1Score += player1Cards[i].rank;
  // }
  // console.log(player1Score);
};

// calPlayerScore();

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

    calPlayerScore();
    console.log("player score", player1Score);
  }
};

const initGame = () => {
  gameInfoContainer.appendChild(gameInfo);
  gameButtons.appendChild(player1Button);

  player1Button.addEventListener("click", player1ButtonClick);

  // Create game info div as global value
  // fill game info div with starting instructions

  gameFooter.appendChild(gameInfoContainer);
  gameFooter.appendChild(gameButtons);

  document.body.appendChild(gameHeader);
  document.body.appendChild(cardContainer);
  document.body.appendChild(gameFooter);
  // document.body.appendChild(gameButtons);
};

initGame();

//Reset game
const resetButton = document.createElement("button");
resetButton.classList.add("resetButton");
resetButton.innerText = "Reset";
gameButtons.appendChild(resetButton);
resetButton.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  deck = shuffleCards(makeDeck());
  cardNameTally = {};
  cardSuitTally = {};
  playerCardsRank = [];
  hasAce = "no";
  playerCardsElements = [];
  playerCardsElementsHold = [];
  gameState = "dealing cards";
  player1Cards = [];
  playerDiscardedCards = [];
  output("Click draw to try again");
});
