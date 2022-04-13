import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.hidden ? "" : props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        hidden={this.props.hidden[i]}
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
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className="board-row">
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
        </div>
        <div className="board-row">
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
        </div>
        <div className="board-row">
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
        </div>
        <div className="board-row">
          {this.renderSquare(40)}
          {this.renderSquare(41)}
          {this.renderSquare(42)}
          {this.renderSquare(43)}
          {this.renderSquare(44)}
          {this.renderSquare(45)}
          {this.renderSquare(46)}
          {this.renderSquare(47)}
          {this.renderSquare(48)}
          {this.renderSquare(49)}
        </div>
        <div className="board-row">
          {this.renderSquare(50)}
          {this.renderSquare(51)}
          {this.renderSquare(52)}
          {this.renderSquare(53)}
          {this.renderSquare(54)}
          {this.renderSquare(55)}
          {this.renderSquare(56)}
          {this.renderSquare(57)}
          {this.renderSquare(58)}
          {this.renderSquare(59)}
        </div>
        <div className="board-row">
          {this.renderSquare(60)}
          {this.renderSquare(61)}
          {this.renderSquare(62)}
          {this.renderSquare(63)}
          {this.renderSquare(64)}
          {this.renderSquare(65)}
          {this.renderSquare(66)}
          {this.renderSquare(67)}
          {this.renderSquare(68)}
          {this.renderSquare(69)}
        </div>
        <div className="board-row">
          {this.renderSquare(70)}
          {this.renderSquare(71)}
          {this.renderSquare(72)}
          {this.renderSquare(73)}
          {this.renderSquare(74)}
          {this.renderSquare(75)}
          {this.renderSquare(76)}
          {this.renderSquare(77)}
          {this.renderSquare(78)}
          {this.renderSquare(79)}
        </div>
        <div className="board-row">
          {this.renderSquare(80)}
          {this.renderSquare(81)}
          {this.renderSquare(82)}
          {this.renderSquare(83)}
          {this.renderSquare(84)}
          {this.renderSquare(85)}
          {this.renderSquare(86)}
          {this.renderSquare(87)}
          {this.renderSquare(88)}
          {this.renderSquare(89)}
        </div>
        <div className="board-row">
          {this.renderSquare(90)}
          {this.renderSquare(91)}
          {this.renderSquare(92)}
          {this.renderSquare(93)}
          {this.renderSquare(94)}
          {this.renderSquare(95)}
          {this.renderSquare(96)}
          {this.renderSquare(97)}
          {this.renderSquare(98)}
          {this.renderSquare(99)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    const myArr = generateNewGame()
    const mySquares=myArr[0]
    const hiddenArray=myArr[1]
    this.state = {
      history: [
        {
          squares: mySquares
        }
      ],
      stepNumber: 0,
      hidden: hiddenArray,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    let squares = current.squares.slice();
    let hidden = this.state.hidden.slice();
    while (!hidden.includes(0) && squares[i] === "X") {
        let newState = generateNewGame()
        squares= newState[0]
        hidden= newState[1]
      }
    console.log(hidden)
    if (!hidden[i] || calculateGameState(squares, hidden)) {
      return;
    }
    if (hidden[i]) {
      hidden[i] = 0
      let zeroStack = new Array()
      let visited = new Array()
      if (squares[i] == 0) zeroStack.push(i);
      while (zeroStack.length > 0) {
        console.log(zeroStack)
        i = zeroStack.pop()
        if (i - 11 > 0 && squares[i - 11] === 0 && hidden[i - 11] && ((i-11)/10===i/10-1)) {
          zeroStack.push(i - 11);
        }
        if (i - 10 > 0 && squares[i - 10] === 0 && hidden[i - 10]) {
          zeroStack.push(i - 10);
        }
        if (i - 9 > 0 && squares[i - 9] === 0 && hidden[i - 9] && ((i-9)/10===i/10-1)) {
          zeroStack.push(i - 9);
        }
        if (i - 1 > 0 && squares[i - 1] === 0 && hidden[i - 1] && ((i-1)/10===i/10)) {
          zeroStack.push(i - 1);
        }
        if (i + 1 < 100 && squares[i + 1] === 0 && hidden[i + 1] && ((i+1)/10===i/10)) {
          zeroStack.push(i + 1);
        }
        if (i + 9 < 100 && squares[i + 9] === 0 && hidden[i + 9] &&((i+9)/10===i/10+1)) {
          zeroStack.push(i + 9);
        }
        if (i + 10 < 100 && squares[i + 10] === 0 && hidden[i + 10]) {
          zeroStack.push(i + 10);
        }
        if (i + 11 < 100 && squares[i + 11] === 0 && hidden[i + 11]&&((i+11)/10===i/10+1)) {
          zeroStack.push(i + 11);
        }
        hidden[i - 11] = hidden[i-11] ? (((i-11)/10 === i/10-1) ? 0 : 1) : 0;
        hidden[i - 10] = 0;
        hidden[i - 9] = hidden[i-9] ? (((i-9)/10 === i/10-1) ? 0 : 1) : 0;
        hidden[i - 1] = hidden[i-1] ? (((i-1)/10=== i/10) ? 0 : 1) : 0;
        hidden[i + 1] = hidden[i+1] ? (((i+1)/10=== i/10) ? 0 : 1) : 0;
        hidden[i + 9] = hidden[i+9] ? (((i+9)/10=== i/10+1) ? 0 : 1) : 0;
        hidden[i + 10] = 0;
        hidden[i + 11] = hidden[i+11] ? (((i+11)/10=== i/10+1) ? 0 : 1) : 0;
      }

    }
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      hidden: hidden
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const hidden = this.state.hidden;
    const winner = calculateGameState(current.squares, hidden);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + !winner;
    } else {
      status = "";
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            hidden={this.state.hidden}
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

// ========================================

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game tab="home" />);

function calculateGameState(squares, hidden) {
  for (let i = 0; i < 100; i++) {
    if (squares[i] == "X" && !hidden[i]) {
      return true;
    }
  }
  return null;
}

function generateNewGame() {
  let mySquares = Array(100).fill(null);
  let hiddenArray = Array(100).fill(null);
  for (let i = 0; i < 100; i++) {
    if (Math.random() < .2) {
      mySquares[i] = "X"
    }
  }
  for (let i = 0; i < 100; i++) {
    console.log(i/10)
    if (!mySquares[i]) {
      let sum = 0
      if (i - 11 > 0 && mySquares[i - 11] == "X" && (Math.floor((i-11)/10)===Math.floor(i/10)-1)) sum += 1;
      if (i - 10 > 0 && mySquares[i - 10] == "X") sum += 1;
      if (i - 9 > 0 && mySquares[i - 9] == "X" && ((i-9)/10===i/10-1)) sum += 1;
      if (i - 1 > 0 && mySquares[i - 1] == "X" && ((i-1)/10===i/10))sum += 1;
      if (i + 1 < 100 && mySquares[i + 1] == "X" && ((i+1)/10===i/10)) sum += 1;
      if (i + 9 < 100 && mySquares[i + 9] == "X" && ((i+9)/10===i/10+1)) sum += 1;
      if (i + 10 < 100 && mySquares[i + 10] == "X") sum += 1;
      if (i + 11 < 100 && mySquares[i + 11] == "X" && ((i+11)/10===i/10+1)) sum += 1;
      mySquares[i] = sum
    }
  }
  for (let i = 0; i < 100; i++) {
    hiddenArray[i] = 1
  }
  return [mySquares,hiddenArray];
}
