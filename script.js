let board = ["", "", "", "", "", "", "", ""];
let selectedPlayer = "X";
let winsX = 0;
let winsO = 0;
const display = document.getElementById("display");
const countX = document.getElementById("countX");
const countY = document.getElementById("countY");

const winningPossibility = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (const combination of winningPossibility) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  const allSquaresFilled = board.every((square) => square !== "");
  return allSquaresFilled ? "Tie" : null;
}

function makeMove(index) {
  if (!board[index]) {
    board[index] = selectedPlayer;
    document.getElementById(`square${index}`).innerText = selectedPlayer;

    const winner = checkWinner();
    if (winner) {
      if (winner === "Tie") {
        display.innerText = "It's a Tie!";
        display.style.color = "tomato";
      } else {
        display.innerText = `${winner} Wins!`;
        display.style.color = "yellowgreen";
        if (winner === "X") {
          winsX++;
        } else {
          winsO++;
        }
      }
      updateScore();
      setTimeout(restartButton, 1000);
      return;
    } else {
      selectedPlayer = selectedPlayer === "X" ? "O" : "X";
      display.innerText = `Player ${selectedPlayer}'s Turn`;
    }
  }
}

function updateScore() {
  countX.innerText = winsX;
  countY.innerText = winsO;
}

function restartButton() {
  board = ["", "", "", "", "", "", "", ""];
  selectedPlayer = "X";
  display.innerText = "Start Game";
  display.style.color = "white";
  document
    .querySelectorAll(".square")
    .forEach((square) => (square.innerText = ""));
}

document.querySelectorAll(".square").forEach((square, index) => {
  square.addEventListener("click", () => makeMove(index));
});

restartButton();
