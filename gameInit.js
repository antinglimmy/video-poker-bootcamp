//To-do
//[DONE] order of cards when discarded
//winning conditions double check
//make page responsive
//When press discard, can un-discard it multiple times
//Joker image
//Change variable names
//Push
//Jsdoc formatting
// Have your functions and variables clearly named
// Don’t add comments to code that are self explanatory
//After discarding once and displaying result once, how to continue with current set

const getRandomIndex = (max) => Math.floor(Math.random() * max);

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

const output = (message) => {
  gameResult.innerText = message;
};

/**
 * Helps to tally the cards, identify the winning condition and output the relevant result/message
 */
const calPlayerScore = () => {
  player1Score = 0;
  cardNameTally = {};
  cardSuitTally = {};
  playerCardsRank = [];
  hasAce = "no";
  result = "";

  for (let i = 0; i < playerCardObjects.length; i += 1) {
    let cardName = playerCardObjects[i].name;
    let cardSuit = playerCardObjects[i].suit;

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

  for (let i = 0; i < playerCardObjects.length; i += 1) {
    playerCardsRank.push(playerCardObjects[i].rank);
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
    output("Sorry you didn't win anything");
  }

  // for (let i = 0; i < player1Cards.length; i++) {
  //   player1Score += player1Cards[i].rank;
  // }
};

const discardCards = (i) => {
  // if (gameState === "choosing cards to discard") {
  playerDiscardedCards.push(playerCardObjects[i]);
  if (playerCardElements[i].innerText === "Discard") {
    player1CardNew = deck.pop();
    playerCardObjects[i] = player1CardNew;
    playerCardElements[i] = createCard(playerCardObjects[i]);
    console.log("I happen");
    displayCards();
  } else {
    playerCardElements[i].innerText = "Discard";
    playerCardElements[i].classList.toggle("flipcard");
    console.log("I happen 2");
    console.log(playerCardElements[i].innerText);
    // displayCards();
  }
  console.log("I happen 3");
};

//Display cards in card container
let playerCardElements = [];
const displayCards = () => {
  cardContainer.innerHTML = "";
  for (let i = 0; i < playerCardObjects.length; i++) {
    playerCardElements[i] = createCard(playerCardObjects[i]);
    cardContainer.appendChild(playerCardElements[i]);
    playerCardElements[i].addEventListener("click", () => discardCards(i));
  }
};

const dealCards = () => {
  for (let i = 0; i < 5; i++) {
    player1Card = deck.pop();
    playerCardObjects[i] = player1Card;
  }
  output("Choose the cards you want to discard");
  displayCards();
};

/**
 * Helps to deal the first 5 cards, display the Discard message when cards are clicked, and replaces them with new cards from the deck
 */
let flipCards;
player1ButtonClick = () => {
  if (gameState === "dealing cards") {
    dealCards();
    gameState = "replacing cards";
  } else if (gameState === "replacing cards") {
    //   //   for (let i = 0; i < playerCardObjects.length; i++) {
    //   //     if (playerCardElements[i].innerText === "Discard") {
    //   //       player1CardNew = deck.pop();
    //   //       playerCardObjects[i] = player1CardNew;
    //   //     }
    //   //   }
    displayCards();
    //   gameState = "after deal";

    calPlayerScore();
  }
};
/**
 * Displays the initial game elements (game info, buttons, title) once page is loaded
 */
const initGame = () => {
  gameInfoContainer.appendChild(gameResult);
  gameButtons.appendChild(player1Button);
  gameButtons.appendChild(resetButton);

  player1Button.addEventListener("click", player1ButtonClick);

  gameFooter.appendChild(gameInfoContainer);
  gameFooter.appendChild(gameButtons);

  document.body.appendChild(topContainer);
  topContainer.appendChild(gameInfo);
  document.body.appendChild(gameHeader);

  document.body.appendChild(cardContainer);
  document.body.appendChild(gameFooter);

  // document.body.appendChild(gameButtons);
};

initGame();

//Reset game

/**
 * Once the reset button is clicked, the deck is repopulated and existing cards are removed from screen
 */
resetButton.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  deck = shuffleCards(makeDeck());
  cardNameTally = {};
  cardSuitTally = {};
  playerCardsRank = [];
  hasAce = "no";
  playerCardObjects = [];
  playerCardsElementsHold = [];
  gameState = "dealing cards";
  result = "";
  // player1Cards = [];
  playerDiscardedCards = [];
  output("Click draw to try again");
});
