const gameBoard = (() => {
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let lastPlayerName;
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
    if (board[square] != 0) {
      console.log("This square is taken, choose another one!");
      return;
    }
    board[square] = playerSign;
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
        isOver = true;
      }
    }
  };

  const checkForTie = () => {
    if (roundCount === 9 && winner === undefined) {
      console.log("It's a tie!");
      isOver = true;
      return true;
    }
  };

  const reset = () => {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    lastPlayerName = undefined;
    winner = undefined;
    roundCount = 0;
    isOver = false;
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
  };
})();

const player = (name, sign) => {
  return {
    name,
    sign,
    takeTurn(square) {
      if (gameBoard.checkForTurn(name)) return;
      gameBoard.mark(square, sign);
      gameBoard.displayBoard();
      gameBoard.addroundCount();
      gameBoard.setLastPlayerName(name);
      if (gameBoard.checkForTie()) return;
      gameBoard.checkForWin(name);
    },
  };
};

player1 = player("Adam", "X");
player2 = player("Jacob", "O");

gameBoard.displayBoard();

player1.takeTurn(4);

player2.takeTurn(0);

player1.takeTurn(6);

player2.takeTurn(2);

player1.takeTurn(1);

player2.takeTurn(7);

player1.takeTurn(5);

player2.takeTurn(3);

player1.takeTurn(8);

// gameBoard.displayBoard();

// player1.takeTurn(4);

// player2.takeTurn(0);

// player1.takeTurn(6);

// player2.takeTurn(8);

// player1.takeTurn(2);
