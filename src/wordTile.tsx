import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

interface Props{
  id: number;
  title: string;
  isRevealed: boolean;
}

const WordTile:FC<Props> = ({
  id,
  title,
  isRevealed,
})=>{
  
  const [isGuessed, setIsGuessed] = useState(false);

  const isLetterGuessed = ():boolean =>{
    return;
  };

  return(
    <Text style = {[styles.tile, isGuessed && styles.guessed]}>{title}</Text>
  );
};

const styles = StyleSheet.create({
    tile:{
        fontSize:30,
        color: 'teal',
        backgroundColor: 'teal',
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 2,
        width: 50,
        height: 50,        
        borderColor: '#f009d19e',
        borderWidth:1.5,
    },
    guessed:{
      color: 'white',
    },
});

export default WordTile;