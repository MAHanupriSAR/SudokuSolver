import { useState } from 'react';
import { solveSudoku } from './sudokuSolver';
import './game.css';

// function Square({nums, setNums, i, status}){
//   function handleKeyDown(event){
//     if(status === "solve") {
//       if (/^[1-9]$/.test(event.key)) {
//         const newNums = nums.slice();
//         newNums[i] = event.key;
//         setNums(newNums);
//       } else if (event.key === "Backspace" || event.key === "Delete") {
//         const newNums = nums.slice();
//         newNums[i] = null;
//         setNums(newNums);
//       }
//     }
//   }
//   function handleKeyUp(){
//     window.removeEventListener('keydown', handleKeyDown);
//     window.removeEventListener('keyup', handleKeyUp);
//   }
//   function handleClick(){
//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);
//   }
//   return(
//     <button className="square" onClick={handleClick}>
//       {nums[i]}
//     </button>
//   )
// }

function Square({nums, setNums, i, status}) {
  function handleChange(event) {
    if (status !== "solve") return;
    const val = event.target.value;
    if (/^[1-9]$/.test(val)) {
      const newNums = nums.slice();
      newNums[i] = val;
      setNums(newNums);
    } else if (val === "") {
      const newNums = nums.slice();
      newNums[i] = null;
      setNums(newNums);
    }
  }
  return (
    <input
      className="square"
      type="text"
      maxLength={1}
      value={nums[i] || ""}
      onChange={handleChange}
      disabled={status !== "solve"}
      inputMode="numeric"
      pattern="[1-9]*"
      autoComplete="off"
    />
  );
}

function Board({nums, setNums, status}){
  const rows = [];
  for(let r = 0; r < 9; r++){
    const squares = [];
    for(let c = 0; c < 9; c++){
      const idx = r * 9 + c;
      squares.push(
        <Square key={idx} nums={nums} setNums={setNums} i={idx} status = {status}/>
      );
    }
    rows.push(
      <div className='boardRow' key={r}>
        {squares}
      </div>
    );
  }
  return <>{rows}</>;
}

function Button({nums, setNums, status, setStatus, setHeading}){
  function handleClick(){
    if(status === "tryAgain" || status==="solveAgain"){
      setNums(Array(81).fill(null));
      setStatus("solve");
      setHeading("");
      return;
    }

    let newNums = nums.slice();
    const solved = solveSudoku(newNums);
    if(solved){
      setNums(solved);
      setStatus("solveAgain");
      setHeading("Solved!!");
    }
    else{
      setStatus("tryAgain");
      setHeading("Invalid Input");
    }
  }

  let description = "SOLVE"
  if(status==="solveAgain") description = "SOLVE AGAIN"
  if(status==="tryAgain") description = "TRY AGAIN"

  return(
    <button className='solveButton' onClick={handleClick}>
      {description}
    </button>
  )
}

function Game() {
  const [nums, setNums] = useState(Array(81).fill(null));
  const [status,  setStatus] = useState("solve"); //"solve","solveAgain","tryAgain"
  const [heading, setHeading] = useState("");
  return (
    <>
      <Board nums = {nums} setNums = {setNums} status = {status}/>
      <div>{heading}</div>
      <Button 
        nums = {nums} 
        setNums = {setNums} 
        status={status} 
        setStatus={setStatus}
        setHeading={setHeading}
      />
    </>
  );
}

export default Game;
