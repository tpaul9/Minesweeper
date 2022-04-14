import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} onContextMenu={(e) => {
      {props.onRightClick()}
      e.preventDefault()
    }}>
      {props.flagged ? "f" : (props.hidden ? "" : props.value)}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        hidden={this.props.hidden[i]}
        flagged={this.props.flagged[i]}
        onClick={() => this.props.onClick(i)}
        onRightClick={() => this.props.onRightClick(i)}
      />
    );
  }

  render() {
    let rows =[]
    for(let i=0;i<10;i++){
      rows.push([])

      for(let j=0;j<10;j++){
        rows[i].push(this.renderSquare(10*i+j))
      }
    }
    return (
      <div>
        {rows.map((ele) =>{
          return(
          <div className="board-row">
            {ele}
        </div>)
        })}
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
    const flagged=Array(100).fill(null)
    this.state = {
      history: [
        {
          squares: mySquares
        }
      ],
      stepNumber: 0,
      hidden: hiddenArray,
      numMines: myArr[2],
      flagged: flagged,
      flagWon: false,
    };
  }

  handleClick(i) {
    if(this.state.flagWon) return;
    const flagged = this.state.flagged
    if(flagged[i]) return;
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
        if (i - 11 > 0 && squares[i - 11] === 0 && hidden[i - 11] && (i%10!==0)) {
          zeroStack.push(i - 11);
        }
        if (i - 10 > 0 && squares[i - 10] === 0 && hidden[i - 10]) {
          zeroStack.push(i - 10);
        }
        if (i - 9 > 0 && squares[i - 9] === 0 && hidden[i - 9] && (i%10!==9)) {
          zeroStack.push(i - 9);
        }
        if (i - 1 > 0 && squares[i - 1] === 0 && hidden[i - 1] && (i%10!==0)) {
          zeroStack.push(i - 1);
        }
        if (i + 1 < 100 && squares[i + 1] === 0 && hidden[i + 1] && (i%10!==9)) {
          zeroStack.push(i + 1);
        }
        if (i + 9 < 100 && squares[i + 9] === 0 && hidden[i + 9] &&(i%10!==0)) {
          zeroStack.push(i + 9);
        }
        if (i + 10 < 100 && squares[i + 10] === 0 && hidden[i + 10]) {
          zeroStack.push(i + 10);
        }
        if (i + 11 < 100 && squares[i + 11] === 0 && hidden[i + 11]&&((i+11)%10!==0)) {
          zeroStack.push(i + 11);
        }
        hidden[i - 11] = hidden[i-11] ? ((i%10!==0) ? 0 : 1) : 0;
        hidden[i - 10] = 0;
        hidden[i - 9] = hidden[i-9] ? ((i%10!==9) ? 0 : 1) : 0;
        hidden[i - 1] = hidden[i-1] ? ((i%10!==0) ? 0 : 1) : 0;
        hidden[i + 1] = hidden[i+1] ? ((i%10!==9) ? 0 : 1) : 0;
        hidden[i + 9] = hidden[i+9] ? ((i%10!==0) ? 0 : 1) : 0;
        hidden[i + 10] = 0;
        hidden[i + 11] = hidden[i+11] ? (((i+11)%10!==0) ? 0 : 1) : 0;
      }

    }
    let flagWon=true
    for(let i=0;i<100;i++){
      if(hidden[i] && squares[i]!=="X"){
        flagWon=false
        break
      }
    }
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      hidden: hidden,
      flagWon: flagWon,
    });
  }

  handleRightClick(i){
    const flagged=this.state.flagged.slice()
    const hidden=this.state.hidden.slice()
    flagged[i]= !hidden[i] ? 0 : (flagged[i] ? 0 : 1)
    this.setState({
      flagged: flagged,
    })
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

    let status;
    if (winner) {
      status = "Winner: " + !winner;
    } else {
      status = this.state.flagWon ? "You win" : "Number of Mines: ".concat(this.state.numMines.toString());
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            hidden={this.state.hidden}
            flagged={this.state.flagged}
            onRightClick={i => this.handleRightClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }
}

// ========================================

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Game tab="home"/>);

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
  let numMines=15;
  let minesToPlace=numMines;
  while(minesToPlace>0){
    let pos = Math.floor(Math.random()*100)
    if(mySquares[pos]!=="X"){
      mySquares[pos]="X"
      minesToPlace--
    }
  }
  for (let i = 0; i < 100; i++) {
    if (!mySquares[i]) {
      let sum = 0
      if (i - 11 > 0 && mySquares[i - 11] == "X" && (i%10!==0)) sum += 1;
      if (i - 10 > 0 && mySquares[i - 10] == "X") sum += 1;
      if (i - 9 > 0 && mySquares[i - 9] == "X" && (i%10!==9)) sum += 1;
      if (i - 1 > 0 && mySquares[i - 1] == "X" && (i%10!==0)) sum += 1;
      if (i + 1 < 100 && mySquares[i + 1] == "X" && (i%10!==9)) sum += 1;
      if (i + 9 < 100 && mySquares[i + 9] == "X" && (i%10!==0)) sum += 1;
      if (i + 10 < 100 && mySquares[i + 10] == "X") sum += 1;
      if (i + 11 < 100 && mySquares[i + 11] == "X" && ((i+11)%10!==0)) sum += 1;
      mySquares[i] = sum
    }
  }
  for (let i = 0; i < 100; i++) {
    hiddenArray[i] = 1
  }
  return [mySquares,hiddenArray,numMines];
}
