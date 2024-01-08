import { useState } from "react";
import Players from "./components/Players.jsx";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayers(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player == "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivedActivePlayers(gameTurns);

  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];
  let winner;
  let hasDraw = gameTurns.length == 9 && !winner;

  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  for (const combinations of WINNING_COMBINATIONS) {
    let firstSquare = gameBoard[combinations[0].row][combinations[0].column];
    let secondSquare = gameBoard[combinations[1].row][combinations[1].column];
    let thirdSquare = gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquare &&
      firstSquare == secondSquare &&
      firstSquare == thirdSquare
    ) {
      winner = firstSquare;
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = derivedActivePlayers(gameTurns);
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function RestartGame(){
    setGameTurns([])
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Players name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {(winner || hasDraw ) && <GameOver winner={winner} restartGame={RestartGame}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
    </main>
  );
}

export default App;
