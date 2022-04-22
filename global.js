//Global variables
let playerCard;
let playerDiscardedCards = [];
let playerDiscardedCardsIndex = [];
let cardNameTally = {};
let cardSuitTally = {};
let playerCardsRank = [];
let hasAce = "no";
let result = "";
let flipCards;
let playerCardElements = [];
let playerCardObjects = [];
let playerCardsElementsHold = [];
let gameState = "dealing cards";
let cardElement;
let playerCardNew;

//Create all the game elemenets
const topContainer = document.createElement("div");
topContainer.classList.add("topContainer");

const gameInfo = document.createElement("div");
gameInfo.classList.add("gameInfo");
gameInfo.innerText = "i";

const gameInfoText = document.createElement("span");
gameInfoText.classList.add("gameInfoText");
gameInfoText.innerHTML =
  "Click on Draw to start the game and Reset to get a new hand. <br> The usual Poker rules don't really apply but have fun!";

const gameHeader = document.createElement("div");
gameHeader.classList.add("gameHeader");

let cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");

const gameFooter = document.createElement("div");
gameFooter.classList.add("gameFooter");

let dealButton = document.createElement("button");
dealButton.classList.add("dealButton");
dealButton.innerText = "Deal";

const resetButton = document.createElement("button");
resetButton.classList.add("resetButton");
resetButton.innerText = "Reset";

const gameButtons = document.createElement("div");
gameButtons.classList.add("gameButtons");

const gameResult = document.createElement("div");
gameResult.innerText = "Click draw to start";
gameResult.classList.add("gameResult");

//Test hands

// let playerTestHand5Kind = [
//   { rank: 3, suit: "♥", name: "3" },
//   { rank: 3, suit: "⬥", name: "3" },
//   { rank: 3, suit: "♣", name: "3" },
//   { rank: 3, suit: "♠", name: "3" },
//   {
//     rank: 14,
//     suit: "",
//     name: "joker",
//   },
// ];

// let playerTestHandStraightFlush = [
//   { rank: 10, suit: "♥", name: "10" },
//   { rank: 11, suit: "♥", name: "jack" },
//   { rank: 12, suit: "♥", name: "queen" },
//   { rank: 13, suit: "♥", name: "king" },
//   { rank: 1, suit: "♥", name: "ace" },
// ];

// let playerTestHandAceStraight = [
//   { rank: 10, suit: "♠", name: "10" },
//   { rank: 11, suit: "♥", name: "jack" },
//   { rank: 12, suit: "♠", name: "queen" },
//   { rank: 13, suit: "♥", name: "king" },
//   { rank: 1, suit: "♥", name: "ace" },
// ];

// let playerTestHandRandom = [
//   { rank: 4, suit: "♠", name: "4" },
//   { rank: 7, suit: "♥", name: "7" },
//   { rank: 7, suit: "♠", name: "7" },
//   { rank: 7, suit: "♥", name: "7" },
//   { rank: 3, suit: "♥", name: "3" },
// ];

// let playerTestHandStraight = [
//   { rank: 9, suit: "♥", name: "9" },
//   { rank: 10, suit: "♠", name: "10" },
//   { rank: 11, suit: "♥", name: "jack" },
//   { rank: 12, suit: "⬥", name: "queen" },
//   { rank: 13, suit: "♥", name: "king" },
// ];

// let playerTestHandFlush = [
//   { rank: 9, suit: "♥", name: "9" },
//   { rank: 10, suit: "♥", name: "10" },
//   { rank: 7, suit: "♥", name: "7" },
//   { rank: 2, suit: "♥", name: "2" },
//   { rank: 3, suit: "♥", name: "3" },
// ];

// let playerTestHandFullHouse = [
//   { rank: 6, suit: "♥", name: "6" },
//   { rank: 6, suit: "⬥", name: "6" },
//   { rank: 6, suit: "♣", name: "6" },
//   { rank: 12, suit: "♠", name: "queen" },
//   { rank: 12, suit: "♥", name: "queen" },
// ];

// let playerTestHandThreeKind = [
//   { rank: 6, suit: "♥", name: "6" },
//   { rank: 6, suit: "⬥", name: "6" },
//   { rank: 6, suit: "♣", name: "6" },
//   { rank: 12, suit: "♠", name: "queen" },
//   { rank: 10, suit: "♥", name: "10" },
// ];

// let playerTestHandTwoPair = [
//   { rank: 10, suit: "♥", name: "jack" },
//   { rank: 10, suit: "♣", name: "jack" },
//   { rank: 3, suit: "♣", name: "3" },
//   { rank: 3, suit: "⬥", name: "3" },
//   { rank: 3, suit: "♥", name: "3" },
// ];
