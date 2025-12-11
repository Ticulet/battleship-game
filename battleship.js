const view = {
  displayMessage(msg) {
    const messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit(location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss(location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};

const model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [
    { locations: ["06", "16", "26"], hits: ["", "", ""] },
    { locations: ["24", "34", "44"], hits: ["", "", ""] },
    { locations: ["10", "11", "12"], hits: ["", "", ""] },
  ],

  fire(guess) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if (this.isSunk(ship)) {
          view.displayMessage("You sank my battleship!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.");
    return false;
  },

  isSunk(ship) {
    return !ship.hits.includes("");
  },
};

const controller = {
  guesses: 0,

  processGuess(guess) {
    let location = this.parseGuess(guess);
    if (location) {
      this.guesses++;
      let hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage(
          `You sank all my battleships in ${this.guesses} guesses`
        );
      }
    }
  },

  parseGuess(guess) {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
      alert("Please enter a letter and a number on the board!");
    } else {
      let firstChar = guess.charAt(0);
      let row = alphabet.indexOf(firstChar);
      let column = guess.charAt(1);

      if (isNaN(column)) {
        alert("That is not on the board!");
      } else if (
        row < 0 ||
        row >= model.boardSize ||
        column < 0 ||
        column >= model.boardSize
      ) {
        alert("That is off the board!");
      } else {
        return row + column;
      }
      return null;
    }
  },
};

function init() {
  const fireButton = document.getElementById("fireButton");

  fireButton.addEventListener("click", () => {
    let guess = guessInput.value;
    controller.processGuess(guess);

    guessInput.value = "";
  });

  let guessInput = document.getElementById("guessInput");

  guessInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      fireButton.click();
    }
  });
}

window.onload = init;
