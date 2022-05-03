// To-do
// [DONE] order of cards when discarded
// winning conditions double check
// make page responsive
// Joker image
// [DONE]Change variable names
// Push
// [DONE] Jsdoc formatting
// [DONE]Have your functions and variables clearly named
// [DONE] Don’t add comments to code that are self explanatory
// After discarding once and displaying result once, how to continue with current set
// [DONE] Only replacing 1 card

/* eslint-disable */ 

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
  const suits = ['♥', '⬥', '♣', '♠'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
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
    name: 'Joker',
    suit: '',
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
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suit;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');

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
const calPlayerResult = () => {
  cardNameTally = {};
  cardSuitTally = {};
  playerCardsRank = [];
  hasAce = 'no';
  result = '';

  for (let i = 0; i < playerCardObjects.length; i += 1) {
    const cardName = playerCardObjects[i].name;
    const cardSuit = playerCardObjects[i].suit;

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

    if (cardName === 'ace') {
      hasAce = 'yes';
    }
  }

  for (let i = 0; i < playerCardObjects.length; i += 1) {
    playerCardsRank.push(playerCardObjects[i].rank);
  }
  playerCardsRank.sort((a, b) => a - b);

  // Four of a kind win condition
  let fiveKind = '';
  for (cardName in cardNameTally) {
    if (cardNameTally[cardName] === 4) {
      fiveKind = 'half';
      output('You got four of a kind!');
      result = 'yes';
    }
  }

  // Five of a kind win condition
  for (cardName in cardNameTally) {
    if (fiveKind === 'half' && cardName === 'joker') {
      output('You got five of a kind!');
      result = 'yes';
    }
  }

  // Flush win condition
  let straightFlush = '';
  for (cardSuit in cardSuitTally) {
    if (cardSuitTally[cardSuit] === 5) {
      straightFlush = 'half';
      output('You got a flush');
      result = 'yes';
    }
  }
  // Straight flush win condition
  if (
    straightFlush === 'half'
    && playerCardsRank[playerCardsRank.length - 1] - playerCardsRank[1] === 4
  ) {
    output('You got a straight flush');
    result = 'yes';
  }

  if (
    straightFlush === 'half'
    && playerCardsRank[playerCardsRank.length - 1] === 13
    && playerCardsRank[1] === 10
    && hasAce === 'yes'
  ) {
    output('You got a king high flush!');
    result = 'yes';
  }

  // Straight win condition
  if (
    playerCardsRank[playerCardsRank.length - 1] - playerCardsRank[0] === 4
    && playerCardsRank[3] - playerCardsRank[2] === 1
  ) {
    output('You got a straight!');
    result = 'yes';
  }
  if (
    playerCardsRank[playerCardsRank.length - 1] === 13
    && playerCardsRank[1] === 10
    && hasAce === 'yes'
  ) {
    output('You got an ace straight');
    result = 'yes';
  }

  // Three of a kind win conditions
  let fullHouse = '';
  for (cardName in cardNameTally) {
    if (cardNameTally[cardName] === 3) {
      fullHouse = 'half';
      output('You got three of a kind');
      result = 'yes';
    }
  }

  // Full house win conditions
  for (cardName in cardNameTally) {
    if (fullHouse === 'half' && cardNameTally[cardName] === 2) {
      output('You got a full house');
      result = 'yes';
    }
  }

  // Two pair win condition
  let twoPair = 0;
  for (cardName in cardNameTally) {
    if (cardNameTally[cardName] === 2) {
      twoPair += 1;
    }
  }
  if (twoPair === 2) {
    output('You got two pairs');
    result = 'yes';
  }

  // One pair win condition
  if (twoPair === 1) {
    output('You got a pair!');
    result = 'yes';
  }

  if (result === '') {
    output("Sorry you didn't win anything");
  }
};

/**
 * Helper function to discard the "discard" message when card is clicked, replaces the card and displays the new card
 * * @param i current card being clicked
 */
const discardCards = (i) => {
  playerDiscardedCards.push(playerCardObjects[i]);
  playerCardElements[i].classList.toggle('flipcard');
};

/**
 * Helper function to display the current player hand in cardContainer within the page and enables the clicking of cards to discard them via the discardCard function
 */
const displayInitialCards = () => {
  cardContainer.innerHTML = '';
  for (let i = 0; i < playerCardObjects.length; i++) {
    playerCardElements[i] = createCard(playerCardObjects[i]);
    cardContainer.appendChild(playerCardElements[i]);
  }
};

/**
 * If card is clicked, it is greyed out and set to be discarded
 */
const addDiscard = () => {
  for (let i = 0; i < playerCardObjects.length; i++) {
    playerCardElements[i].addEventListener('click', () => discardCards(i));
  }
};

/**
 * Helper function to display the initial hand of 5 cards on the page
 */
const dealCards = () => {
  for (let i = 0; i < 5; i++) {
    playerCard = deck.pop();
    playerCardObjects[i] = playerCard;
  }
  output('Choose the cards you want to discard');
};

/**
 * Replace cards that have been selected for discard/greyed out
 */
const replaceCards = ()=>{
  for (let i = 0; i < playerCardObjects.length; i++) {
      if (playerCardElements[i].classList.contains('flipcard')) {
        playerCardNew = deck.pop();
        playerCardObjects[i] = playerCardNew;
        playerCardElements[i].remove()
        playerCardElements[i] = createCard(playerCardObjects[i]);
      }
      cardContainer.appendChild(playerCardElements[i])

      calPlayerResult();
}
}

/**
 * Main function run when Deal button is clicked, enabling the display of the initial hand,
 *  discarding and replacement of cards and display of final result
 */

const playerDealButtonClick = () => {
  if (gameState === 'dealing cards') {
    dealCards();
    displayInitialCards();
    addDiscard();
    gameState = 'replacing cards';
  } else if (gameState === 'replacing cards') {
    replaceCards();
  }
};

const initGame = () => {
  gameButtons.appendChild(dealButton);
  gameButtons.appendChild(resetButton);

  dealButton.addEventListener('click', playerDealButtonClick);

  gameFooter.appendChild(gameResult);
  gameFooter.appendChild(gameButtons);

  gameInfo.appendChild(gameInfoText);

  topContainer.appendChild(gameInfo);
  document.body.appendChild(topContainer);
  document.body.appendChild(gameHeader);

  document.body.appendChild(cardContainer);
  document.body.appendChild(gameFooter);
};

initGame();

/**
 * When the reset button is clicked, the deck is repopulated and existing cards are removed from screen
 */
resetButton.addEventListener('click', () => {
  cardContainer.innerHTML = '';
  deck = shuffleCards(makeDeck());
  cardNameTally = {};
  cardSuitTally = {};
  playerCardsRank = [];
  hasAce = 'no';
  playerCardObjects = [];
  playerCardsElementsHold = [];
  gameState = 'dealing cards';
  result = '';
  playerDiscardedCards = [];
  output('Click draw to try again');
});
