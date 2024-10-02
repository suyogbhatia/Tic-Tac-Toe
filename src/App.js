import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 !== 0;

  function handlePlay(nextSquares) {
    let nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description =
      move > 0 ? `Go to move no. ${move}` : `Go to start of the game`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    let nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }
  const colors = Array(9).fill("square");
  const winner = calculateWinner(squares);
  const winnerFigure = winner?.[0];
  const winningSquares = winner?.[1];
  winningSquares?.forEach((_) => (colors[_] = "square winner"));
  let status;
  status = winnerFigure
    ? "Winner: " + winnerFigure
    : "Next player: " + (xIsNext ? "X" : "O");

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} squareColor={colors[0]}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} squareColor={colors[1]}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} squareColor={colors[2]}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} squareColor={colors[3]}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} squareColor={colors[4]}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} squareColor={colors[5]}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} squareColor={colors[6]}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} squareColor={colors[7]}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} squareColor={colors[8]}/>
      </div>
    </>
  );
}

function Square({ value, onSquareClick, squareColor }) {
  return (
    <button className={squareColor} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log(lines[i]);
      return [squares[a], lines[i]];
    }
  }
  return null;
}
