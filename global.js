//Global variables
let player1Cards = [];
// let player1Card;
let player1Score = 0;
let playerDiscardedCards = [];
let playerDiscardedCardsIndex = [];

let cardNameTally = {};
let cardSuitTally = {};
let playerCardsRank = [];
let hasAce = "no";
let result = "";

let playerCardObjects = [];
let playerCardsElementsHold = [];
let gameState = "dealing cards";
let cardElement;
let player1CardNew;

//Create all the game elemenets
const gameHeader = document.createElement("div");
gameHeader.classList.add("gameHeader");

const gameFooter = document.createElement("div");
gameFooter.classList.add("gameFooter");

const gameButtons = document.createElement("div");
gameButtons.classList.add("gameButtons");

const gameResult = document.createElement("div");
gameResult.innerText = "Click draw to start";
gameResult.classList.add("gameResult");

const gameInfoContainer = document.createElement("div");

let player1Button = document.createElement("button");
player1Button.classList.add("dealButton");
player1Button.innerText = "Deal";

let cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");

const resetButton = document.createElement("button");
resetButton.classList.add("resetButton");
resetButton.innerText = "Reset";

const topContainer = document.createElement("div");
topContainer.classList.add("topContainer");

const gameInfo = document.createElement("div");
gameInfo.classList.add("gameInfo");
gameInfo.innerText = "i";

const gameInfoText = document.createElement("span");
gameInfoText.classList.add("gameInfoText");
gameInfoText.innerText = "lorem ipsum";

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
