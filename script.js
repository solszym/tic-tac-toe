const player = (name, sign) => {
  return {
    name,
    sign,
    takeTurn(square) {
      if (gameBoard.checkForTurn(name)) return;
      if (gameBoard.mark(square, sign) === false) return;
      gameBoard.displayBoard();
      gameBoard.addroundCount();
      gameBoard.setLastPlayerName(name);
      if (gameBoard.getLastPlayerName() == "Player X") {
        displayController.setTurnMessage(`Player O turn`);
      } else {
        displayController.setTurnMessage(`Player X turn`);
      }
      if (gameBoard.checkForTie()) return;
      gameBoard.checkForWin(name);
    },
  };
};

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let lastPlayerName = "";
  let winner;
  let roundCount = 0;
  let isOver = false;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const mark = (square, playerSign) => {
    if (board[square] != "") {
      console.log("This square is taken, choose another one!");
      return false;
    }
    board[square] = playerSign;
    displayController.updateGameBoard();
  };

  const checkForTurn = (playerName) => {
    if (playerName === lastPlayerName) {
      console.log("It's not your turn!");
      return true;
    }
    if (winner != undefined) {
      console.log("You can't make a move. Game is over.");
      return true;
    }
    return false;
  };

  const checkForWin = (playerName) => {
    for (combination of winningConditions) {
      if (
        (board[combination[0]] === "X" || board[combination[0]] === "O") &&
        board[combination[0]] === board[combination[1]] &&
        board[combination[0]] === board[combination[2]] &&
        board[combination[1]] === board[combination[2]]
      ) {
        console.log(`${playerName} won!`);
        winner = playerName;
        displayController.addScore(playerName);
        displayController.setTurnMessage(`${playerName} won!`);
        isOver = true;
      }
    }
  };

  const checkForTie = () => {
    if (roundCount === 9 && winner === undefined) {
      console.log("It's a tie!");
      isOver = true;
      displayController.addTieScore();
      displayController.setTurnMessage("It's a tie");
      return true;
    }
  };

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    lastPlayerName = "";
    winner = undefined;
    roundCount = 0;
    isOver = false;
    displayController.updateGameBoard();
    displayController.setTurnMessage(`Player X turn`);
  };

  const getField = (field) => {
    return board[field];
  };

  const setLastPlayerName = (name) => (lastPlayerName = name);

  const getLastPlayerName = () => lastPlayerName;

  const setWinner = (player) => (winner = player);

  const getWinner = () => winner;

  const addroundCount = () => roundCount++;

  const getroundCount = () => roundCount;

  const displayBoard = () => {
    console.log(`${board[0]} ${board[1]} ${board[2]}`);
    console.log(`${board[3]} ${board[4]} ${board[5]}`);
    console.log(`${board[6]} ${board[7]} ${board[8]}`);
    console.log();
  };

  return {
    mark,
    displayBoard,
    checkForTurn,
    checkForWin,
    lastPlayerName,
    setLastPlayerName,
    getLastPlayerName,
    winner,
    getWinner,
    addroundCount,
    getroundCount,
    checkForTie,
    reset,
    getField,
  };
})();

const displayController = (() => {
  const playerX = player("Player X", "X");
  const playerO = player("Player O", "O");

  const gameFields = document.querySelectorAll(".gameField");

  gameFields.forEach((field) => {
    field.addEventListener("click", () => {
      if (gameBoard.getLastPlayerName() == "Player X") {
        playerO.takeTurn(parseInt(field.dataset.index));
      } else {
        playerX.takeTurn(parseInt(field.dataset.index));
      }
    });
  });

  const updateGameBoard = () => {
    for (let i = 0; i < gameFields.length; i++) {
      gameFields[i].innerText = gameBoard.getField(i);
    }
  };

  const turnMessage = document.getElementById("message");

  const setTurnMessage = (newMessage) => (turnMessage.innerText = newMessage);

  const resetButton = document.getElementById("resetButton");

  resetButton.onclick = () => gameBoard.reset();

  const playerXScore = document.getElementById("player1Score");
  const playerOScore = document.getElementById("player2Score");
  const tieScore = document.getElementById("tieScore");

  let currentXScore = 0;
  let currentOScore = 0;
  let tieCount = 0;

  const addScore = (playerName) => {
    if (playerName === "Player X") {
      currentXScore++;
      playerXScore.innerText = currentXScore;
    } else if (playerName === "Player O") {
      currentOScore++;
      playerOScore.innerText = currentOScore;
    }
  };

  const addTieScore = () => {
    tieCount++;
    tieScore.innerText = tieCount;
  };

  return { updateGameBoard, setTurnMessage, addScore, addTieScore };
})();
