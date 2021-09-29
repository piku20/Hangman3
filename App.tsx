import React, {useState} from 'react';

import Game from './src/game';
import {
  ScrollView,
} from 'react-native';

const App = ()=>{
  
  const [gameId, setGameId] = useState(1);

  const resetGame = ()=>{
    setGameId(prev => prev + 1);
  }
  
  return(
    <ScrollView>
      <Game 
        key = {gameId}
        onPlayAgain = {resetGame}
      />
    </ScrollView>
  );
};

export default App;