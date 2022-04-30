/**
 * Helps to deal the first 5 cards, display the Discard message when cards are clicked, and replaces them with new cards from the deck
 */
let flipCards;
player1ButtonClick = () => {
  //Deal the first five cards
  if (gameState === "dealing cards") {
    for (let i = 0; i < 5; i++) {
      player1Card = deck.pop();
      playerCardObjects[i] = player1Card;
    }
    output("Choose the cards you want to discard");
    displayCards();
    gameState = "choosing cards to discard";
  }

  //Choosing the cards to discard
  if (gameState === "choosing cards to discard") {
    for (let i = 0; i < 5; i++) {
      playerCardElements[i].addEventListener("click", () => {
        playerDiscardedCards.push(playerCardObjects[i]);
        if (playerCardElements[i].innerText === "Discard") {
          playerCardElements[i] = createCard(playerCardObjects[i]);
          displayCards();
          console.log("I happen");
        } else {
          playerCardElements[i].innerText = "Discard";
          playerCardElements[i].classList.toggle("flipcard");
          console.log("I happen 2");
        }
      });
    }
    gameState = "replacing cards";

    //Because i have this gameState above, once the above block of code gets run once, the gameState is changed to replacing cards and it goes straight into the block of code below. but i can't remove the gameState as i need different blocks of code to run (depending on which stage of the game they are at) when the user clicks on the Deal/Player1Button

    //I tried separating the block of code below (the replacing cards) as it's own function and then calling it after this discarding cards function but still didn't work

    //Replacing the discarded cards
  } else if (gameState === "replacing cards") {
    for (let i = 0; i < playerCardObjects.length; i++) {
      if (playerCardElements[i].innerText === "Discard") {
        player1CardNew = deck.pop();
        playerCardObjects[i] = player1CardNew;
      }
    }
    displayCards();
    gameState = "after deal";
  }
};
