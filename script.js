const gameBoard = (() => {
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let lastPlayerName;

  const winningCondition = [
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
    return false;
  };

  const setLastPlayerName = (name) => {
    lastPlayerName = name;
  };

  const getLastPlayerName = () => {
    return lastPlayerName;
  };

  const checkForWin = () => {};

  const displayBoard = () => {
    console.log(board);
  };

  return {
    mark,
    displayBoard,
    checkForTurn,
    checkForWin,
    lastPlayerName,
    setLastPlayerName,
    getLastPlayerName,
  };
})();

const player = (name, sign) => {
  let squaresTaken = [];

  return {
    name,
    sign,
    takeTurn(square) {
      if (gameBoard.checkForTurn(name)) {
        return;
      }
      //   console.log(`${name} making a move`);
      gameBoard.mark(square, sign);
      squaresTaken.push(square);
      gameBoard.setLastPlayerName(name);
    },

    displaySquaresTaken() {
      console.log(squaresTaken);
    },
  };
};

player1 = player("Adam", "X");
player2 = player("Jacob", "O");

console.log(gameBoard.getLastPlayerName());
player1.takeTurn(1);
console.log(gameBoard.getLastPlayerName());
player2.takeTurn(0);
console.log(gameBoard.getLastPlayerName());
player1.takeTurn(3);
console.log(gameBoard.getLastPlayerName());
gameBoard.displayBoard();
