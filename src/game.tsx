import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';

import KeyBoardLetter from './keyboardLetter';
import WordTile from './wordTile';
import words from './words.json';

interface Props{
    onPlayAgain: ()=>void;
}

enum GameStatusEnum{
    playing = 'PLAYING',
    won = "WON",
    lost = "LOST",
}

const selectRandomWord:any = ()=> {
    return Math.random();
}

const Game:FC<Props> = ({
    onPlayAgain,
})=>{
  
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
    const [chancesLeft, setChancesLeft] = useState(9);
    const [randomWord, setRandomWord] = useState('');
    const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
    const [sortedCorrectGuess, setSortedCorrectGuess] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
    const [gameStatus, setGameStatus] = useState(GameStatusEnum.playing);

    //const [x,y] = useState(0);

    useEffect(()=>{
        generateRandomWord();
    },[]);
    
    useEffect(()=>{
        //setGameStatus(calculateGameStatus);
        calculateGameStatus();
    }, [selectedIds]);    
    
    useEffect(()=>{
        setSortedCorrectGuess([...new Set(correctGuesses.sort())]);
        calculateGameStatus();
    },[correctGuesses]);    
    
    const alphabets: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letters = Array.from(alphabets);
    const puzzleLetters = Array.from(randomWord);
    //new Set - removes duplicates from array
    const uniquePuzzleLetters = [...new Set(puzzleLetters)];
    // Sort chars in array
    const sortedUniquePuzzleLetters = uniquePuzzleLetters.sort();

    //Generate Random Word
    const generateRandomWord = ()=>{
        const randomWordsIndex = Math.floor(words.length * Math.random());
        setRandomWord(words[randomWordsIndex].toLocaleUpperCase());
        const puzzleLetters = Array.from(randomWord);

        //setGameStatus(calculateGameStatus);
        //resetValues();
    }


    // This is for Keyboard
    const isLetterSelected = (index: number):boolean =>{
        return selectedIds.indexOf(index) >= 0;
    };

    const isLetterGuessed = (index:number):boolean => {
        return correctGuesses.indexOf(puzzleLetters[0]) >= 0;
    }
    
    const selectLetter = (index: number)=>{
        setSelectedIds([...selectedIds,index]);
        setSelectedLetters([...selectedLetters, letters[index]]);
        if(puzzleLetters.includes(letters[index])){
            setCorrectGuesses([...correctGuesses, letters[index]]);
            //setSortedCorrectGuess(correctGuesses.sort());
        }else{
            setWrongGuesses([...wrongGuesses, letters[index]]);
            setChancesLeft(chancesLeft - 1);
        }
    };
    // keyboard ends here

    // Calculation of Game Status
    /*
    const calculateGameStatus = () => {
        if(
            //sortedCorrectGuess.length === randomWord.length &&
            sortedCorrectGuess.length != 0 &&
            sortedCorrectGuess.toString() === uniquePuzzleLetters.toString()){
            //sortedUniquePuzzleLetters.toString() === sortedCorrectGuess.toString()){
            return GameStatusEnum.won;
        }
        if(chancesLeft <= 0){
            return GameStatusEnum.lost;
        }
        return GameStatusEnum.playing;
    }
    */

    const calculateGameStatus = () => {
        if(
            //sortedCorrectGuess.length === randomWord.length &&
            //sortedCorrectGuess.length != 0 &&
            sortedCorrectGuess.toString() === uniquePuzzleLetters.toString() &&
            sortedCorrectGuess.length > 0){
            //sortedUniquePuzzleLetters.toString() === sortedCorrectGuess.toString()){
            setGameStatus(GameStatusEnum.won);
        }
        if(chancesLeft <= 0){
            setGameStatus(GameStatusEnum.lost);
        }
        //setGameStatus(GameStatusEnum.playing);
    }

    //Reset All Values
    const resetValues = () => { 
        setSelectedIds([]);
        setSelectedLetters([]);
        setChancesLeft(9);
        setRandomWord('');
        setCorrectGuesses([]);
        setSortedCorrectGuess([]);
        setWrongGuesses([]);
        setGameStatus(GameStatusEnum.playing);
    }

    
    //Prototype Function
    /*
    const proto = ()=>{
        y(Math.floor((Math.random() * words.length)));
        setRandomWord(words[x].toLocaleUpperCase());
    }
    */
    
    return(
    <View style= {styles.container}>
        <Text>Letter Array: {letters}</Text>
        <Text>Selected Ids: {selectedIds}</Text>
        <Text>Selected Letters: {selectedLetters}</Text>
        <Text>Chances Remaining: {chancesLeft}</Text>
        <Text>Random Word: {randomWord}</Text>
        <Text>Puzzle Letters: {puzzleLetters}</Text>
        <Text>Unique Puzzle Letters: {uniquePuzzleLetters}</Text>
        <Text>Sorted Uniques: {sortedUniquePuzzleLetters}</Text>
        <Text>Correct Guesses: {correctGuesses}</Text>
        <Text>Sorted Correct Guess: {sortedCorrectGuess}</Text>
        <Text>Wrong Guesses: {wrongGuesses}</Text>
        <Text>Game Status: {gameStatus}</Text>
        <Text>{puzzleLetters[0]}</Text>
        <Text>{['P','I','K','U'].indexOf('P') >= 0}</Text>

        <View style={styles.result}>
            {
                gameStatus === GameStatusEnum.won && (
                    <Text style={styles.win}>You WIN!</Text>
                )                
            }
            {
                gameStatus === GameStatusEnum.lost && (
                    <Text style={styles.lose}>You LOSE!</Text>
                )                
            }
            
        </View>
        
        <View style = {styles.puzzleContainer}>
            {
                puzzleLetters.map((value, index)=>(
                    <WordTile 
                        key = {index}
                        id = {index}
                        title = {value}
                        isRevealed = {isLetterGuessed(index) || gameStatus != GameStatusEnum.playing}
                    />
                ))
            }
        </View>

        <View style={styles.keyboardContainer}>
            {
                letters.map((value, index)=>(
                    <KeyBoardLetter 
                        key = {index}
                        id = {index}
                        title = {value}
                        isDisabled = {isLetterSelected(index) || gameStatus !== GameStatusEnum.playing}
                        onPress = {selectLetter}
                    />
                ))
            }
        </View>
        
        <Button title="Reset" onPress={onPlayAgain} />
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    puzzleContainer:{
        flex:1,
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center',
    },
    keyboardContainer:{
        flex:1,
        backgroundColor: '#11111122',
        flexDirection: 'row',
        alignContent:'center',
        justifyContent: 'space-evenly',
        flexWrap:'wrap',
    },
    result:{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    win:{
        fontSize: 40,
        color: 'white',
        backgroundColor: 'green',
        width: '50%',
        textAlign: 'center',
    },
    lose:{
        fontSize: 40,
        color: 'white',
        backgroundColor: 'red',
        width: '50%',
        textAlign: 'center',
    },
});

export default Game;