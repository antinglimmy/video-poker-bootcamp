let player1Cards = [];
let player1Card;
let player1Score = 0;

let cardContainer;

// Player 1 starts first
let playerDiscardedCards = [];
let playerDiscardedCardsIndex = [];

let playerTestHand5Kind = [
  { rank: 3, suit: "♥", name: "3" },
  { rank: 3, suit: "⬥", name: "3" },
  { rank: 3, suit: "♣", name: "3" },
  { rank: 3, suit: "♠", name: "3" },
  { rank: 14, suit: "joker", name: "joker" },
];

let playerTestHandStraightFlush = [
  { rank: 9, suit: "♥", name: "9" },
  { rank: 10, suit: "♥", name: "10" },
  { rank: 11, suit: "♥", name: "jack" },
  { rank: 12, suit: "♥", name: "queen" },
  { rank: 13, suit: "♥", name: "king" },
];

let playerTestHandStraight = [
  { rank: 9, suit: "♥", name: "9" },
  { rank: 10, suit: "♠", name: "10" },
  { rank: 11, suit: "♥", name: "jack" },
  { rank: 12, suit: "⬥", name: "queen" },
  { rank: 13, suit: "♥", name: "king" },
];

let playerTestHandFlush = [
  { rank: 9, suit: "♥", name: "9" },
  { rank: 10, suit: "♥", name: "10" },
  { rank: 7, suit: "♥", name: "7" },
  { rank: 2, suit: "♥", name: "2" },
  { rank: 3, suit: "♥", name: "3" },
];

let playerTestHandFullHouse = [
  { rank: 6, suit: "♥", name: "6" },
  { rank: 6, suit: "⬥", name: "6" },
  { rank: 6, suit: "♣", name: "6" },
  { rank: 12, suit: "♠", name: "queen" },
  { rank: 12, suit: "♥", name: "queen" },
];

let playerTestHandThreeKind = [
  { rank: 6, suit: "♥", name: "6" },
  { rank: 6, suit: "⬥", name: "6" },
  { rank: 6, suit: "♣", name: "6" },
  { rank: 12, suit: "♠", name: "queen" },
  { rank: 10, suit: "♥", name: "10" },
];

let playerTestHandTwoPair = [
  { rank: 10, suit: "♥", name: "jack" },
  { rank: 10, suit: "♣", name: "jack" },
  { rank: 3, suit: "♣", name: "3" },
  { rank: 3, suit: "⬥", name: "3" },
  { rank: 3, suit: "♥", name: "3" },
];
