import React from "react";
import "./App.css";
import Instructions from "./components/Instructions";
interface GameState {
  cells: (string | null)[];
  currentPlayer: "X" | "O";
  history: { cells: (string | null)[]; currentPlayer: "X" | "O" }[];
  winner: "X" | "O" | null;
}

class App extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cells: Array(9).fill(null),
      currentPlayer: "X",
      history: [],
      winner: null,
    };
  }

  handleClick(index: number): void {
    const { cells, currentPlayer, winner, history } = this.state;

    if (cells[index] || winner) return;

    const newHistory = [...history, { cells: [...cells], currentPlayer }];

    const newCells = [...cells];
    newCells[index] = currentPlayer;
    const newPlayer: "X" | "O" = currentPlayer === "X" ? "O" : "X";

    const newWinner = this.checkWinner(newCells);

    this.setState({
      cells: newCells,
      currentPlayer: newPlayer,
      history: newHistory,
      winner: newWinner,
    });
  }

  handleUndo(): void {
    const { history } = this.state;

    if (history.length === 0) return;

    const lastState = history[history.length - 1];

    this.setState({
      cells: lastState.cells,
      currentPlayer: lastState.currentPlayer,
      history: history.slice(0, -1),
      winner: null,
    });
  }

  checkWinner(cells: (string | null)[]): "X" | "O" | null {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a] as "X" | "O";
      }
    }

    return null;
  }

  render(): React.ReactNode {
    const { cells, currentPlayer, winner } = this.state;

    return (
      <div>
        <Instructions winner={winner} currentPlayer={currentPlayer} />
        <div id="board">
          {cells.map((cell, index) => (
            <div
              key={index}
              className="cell"
              onClick={() => this.handleClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        <div id="bottombar">
          <button
            onClick={() =>
              this.setState({
                cells: Array(9).fill(null),
                currentPlayer: "X",
                history: [],
                winner: null,
              })
            }
          >
            New Game
          </button>
          <button onClick={() => this.handleUndo()}>Undo</button>
        </div>
      </div>
    );
  }
}

export default App;
