const squares = document.querySelectorAll(".square");
const resetButton = document.querySelector("#reset");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

const winCombos = [  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleMove(square, index) {
  square.innerText = currentPlayer;
  gameBoard[index] = currentPlayer;
  let winning = checkWin();
  if (winning) {
    endGame(false);
  } else if (gameBoard.every((square) => square !== "")) {
    endGame(true);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin() {
  return winCombos.some((combo) => {
    return combo.every((index) => {
      return gameBoard[index] === currentPlayer;
    });
  });
}

function endGame(tie) {
  if (tie) {
    alert("Tie game!");
  } else {
    alert(`${currentPlayer} wins!`);
  }
  squares.forEach((square) => {
    square.removeEventListener("click", handleClick);
  });
}

function handleClick(event) {
  const square = event.target;
  const index = square.id;
  if (gameBoard[index] === "") {
    handleMove(square, index);
  }
}

function resetGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  squares.forEach((square) => {
    square.innerText = "";
    square.addEventListener("click", handleClick);
  });
}

squares.forEach((square) => {
  square.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", resetGame);
