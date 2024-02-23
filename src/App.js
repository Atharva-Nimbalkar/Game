// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState,useEffect } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissor';
import './App.css';
import Scissor from './icons/Scissor';

const choices=[
  {id:1,name:'stone',component:Rock,losesTo:2},
  {id:2,name:'paper',component:Paper,losesTo:3},
  {id:3,name:'scissor',component:Scissor,losesTo:1}
];
export default function App() {
  const [wins,setWins]=useState(0);
  const [losses,setLosses]=useState(0);
  const [userChoice,setUserChoice]=useState(null);
  const [computerChoice,setComputerChoice]=useState(null);
  const [gameState,setGameState]=useState(null);//win loss ,draw

  useEffect(()=>{
    // const randomChoice=choices[Math.floor(Math.random()*choices.length)]//to choose randomly
    // setComputerChoice(randomChoice);
    restartGame();
  },[]);


  function restartGame(){
    setGameState(null);
    setUserChoice(null)

    const randomChoice=choices[Math.floor(Math.random()*choices.length)]//to choose randomly
    setComputerChoice(randomChoice);
  }
  function handleUserChoice(choice){
      const chosenChoice=choices.find(c=>c.id===choice);
      setUserChoice(chosenChoice);

    //determin winner)
    // if(computerChoice &&  chosenChoice){
      if(chosenChoice.losesTo===computerChoice.id){
        // lose
        setLosses(losses=>losses+1);
        setGameState('lose');
      }else if(computerChoice.losesTo===chosenChoice.id){
        //win
        setWins(wins=>wins+1);
        setGameState('win');
      }else if(computerChoice.id === chosenChoice.id){
        //draw
        setGameState('draw');
      }
    // }
  }
    function renderComponent(choice){
      const Component=choice.component ;//Paper,rock,scissor
      return <Component/>
    }
  
    
  return (
    <div className="app">
      {/* information goes here */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins} </span>
            <span className="text">{wins===1?'Win':'Wins'}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses===1?'Loss':'Losses'}</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/loss/draw */}
      {gameState && (
      <div className={`game-state ${gameState}`} onClick={()=>restartGame()}>
        <div>
        <div className='game-state-content'>
        <p>{renderComponent(userChoice)}</p>
        <p>you {gameState}</p>
        <p>{renderComponent(computerChoice)}</p> 
        </div>
        <button>Play agian</button>
        </div>
      </div>)}


      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer icon</div>

        {/* buttons for my choice */}
        <div>
          
        {/* inseted of to many button we can use map */}
        {/* {choices.map((choice,index)=>{
           <button className="rock" onClick={()=>handleUserChoice(1)}>
           <Rock />
         </button>
        })} */}

          <button className="rock" onClick={()=>handleUserChoice(1)}>
            <Rock />
          </button>
          <button className="paper" onClick={()=>handleUserChoice(2)}>
            <Paper />
          </button>
          <button className="scissors" onClick={()=>handleUserChoice(3)}>
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>
    </div>
  );
}