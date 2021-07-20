import React, { useState } from 'react';
import Board from './components/Board';
import Modal from './components/Modal';
import { calculateWinner } from './helper';
import './App.css';


const App = () => {

  const [showHide, setShowHide] = useState(true);

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(true);
  const [playerName, setPlayerName] = useState({player1: "", player2: ""});
  

  function assingPlayer1(e) {
    setPlayerName({
      ...playerName,
      player1: e.target.value,
    });
  }

  function assingPlayer2(e) {
    setPlayerName({
      ...playerName,
      player2: e.target.value,
    });
  }

  
 function hideModal() {
   if (showHide) {
     setSquares(Array(9).fill(null));
   }
   setShowHide(!showHide);
 } 

 function hideModal1() {
   setShowHide(!showHide);
   setPlayer(true);
 }

 function hideModal2() {
   setShowHide(!showHide);
   setPlayer(false);
 }
 
  function handleClick(i) {
    let newSquares =[...squares];
    if (calculateWinner(squares) || newSquares[i]) return;
    newSquares[i] = player ? "X" : "O";
    setSquares(newSquares);
    setPlayer(!player);
  }

  const checkForWinner = calculateWinner(squares);
  const draw = squares.includes(null);

  let playerTurn;
  playerTurn = draw
    ? checkForWinner
      ? player
        ? `Winner: ${playerName.player2} (${checkForWinner})`
        : `Winner: ${playerName.player1} (${checkForWinner}`
      :`Next player: ${
          player ? playerName.player1 + " (X) " : playerName.player2 + " (O) "
        }`
    : "Tie";


  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe</h1>
      <Modal showHide={showHide} playerName1={playerName.player1} playerName2={playerName.player2} assingP1={assingPlayer1} assingP2={assingPlayer2} hideModal1={hideModal1} hideModal2={hideModal2}/>
      <Board showHide={showHide} hideModal={hideModal} playerTurn={playerTurn} squares={squares} handleClick={handleClick} />
    </div>
  );
}

export default App;
