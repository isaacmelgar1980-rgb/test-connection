document.addEventListener("DOMContentLoaded", function () {
  const squares = document.querySelectorAll(".square");
  const resetButton = document.getElementById("reset");


  if (squares.length !== 9 || !resetButton) {
      return;
  }


  const currentPlayerText = document.getElementById("current-player");
  const xScoreText = document.getElementById("x-score");
  const oScoreText = document.getElementById("o-score");
  const message = document.getElementById("message");


  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let xScore = 0;
  let oScore = 0;
  let gameOver = false;


  const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];


  function updateDisplay() {
      currentPlayerText.textContent = currentPlayer;
      xScoreText.textContent = xScore;
      oScoreText.textContent = oScore;
  }


  function checkWinner() {
      for (let combination of winningCombinations) {
          const a = combination[0];
          const b = combination[1];
          const c = combination[2];


          if (
              board[a] !== "" &&
              board[a] === board[b] &&
              board[a] === board[c]
          ) {
              return board[a];
          }
      }


      return null;
  }


  function play(index) {
      if (board[index] !== "" || gameOver) {
          return;
      }


      board[index] = currentPlayer;
      squares[index].textContent = currentPlayer;
      squares[index].disabled = true;


      const winner = checkWinner();


      if (winner) {
          message.textContent = "Player " + winner + " wins!";


          if (winner === "X") {
              xScore++;
          } else {
              oScore++;
          }


          gameOver = true;
          squares.forEach(function (square) {
              square.disabled = true;
          });


          updateDisplay();
          return;
      }


      if (board.every(function (square) {
          return square !== "";
      })) {
          message.textContent = "It's a draw!";
          gameOver = true;
          return;
      }


      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = "";
      updateDisplay();
  }


  function resetBoard() {
      board = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameOver = false;


      squares.forEach(function (square) {
          square.textContent = "";
          square.disabled = false;
      });


      message.textContent = "Player X starts.";
      updateDisplay();
  }


  squares.forEach(function (square, index) {
      square.addEventListener("click", function () {
          play(index);
      });
  });


  resetButton.addEventListener("click", resetBoard);


  updateDisplay();
});
