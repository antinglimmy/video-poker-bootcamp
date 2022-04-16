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
