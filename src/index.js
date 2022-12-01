import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function calculaterWinner(squares) {
  const winningLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  console.log("called");
  for (let winner of winningLine) {
    let [a, b, c] = winner;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(index) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculaterWinner(squares) || squares[index]) return;
    squares[index] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: move % 2 === 0,
    });
  }

  render() {
    const history = this.state.history.slice();
    const current = history[this.state.stepNumber];
    const winner = calculaterWinner(current.squares);
    let status;
    status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.xIsNext ? "X" : "O"}`;

    const moves = history.map((step, move) => {
      const description = move ? `Go to step #${move}` : `Go to game start`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
let root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Game />);
