import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface Props{
    id: number;
    title: string;
    isDisabled: boolean;
    onPress: (index: number)=> void;
}

const KeyBoardLetter:FC<Props> = ({
    id,
    title,
    isDisabled,
    onPress,
})=>{
    const handlePress = ()=>{
        if(isDisabled) return;
        onPress(id);
    }
  
    return(
    <TouchableOpacity 
        onPress = {handlePress}
    >
        <Text style={[styles.letter, isDisabled && styles.disabled]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button:{
        /*borderWidth: 1,
        borderColor: '#24f109dd',
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        margin: 2,*/
    },    
    letter:{
        fontSize:30,
        color: 'white',
        backgroundColor: 'black',
        textAlign: 'center',
        textAlignVertical: 'center',
        margin: 2,
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: '#24f109dd',
        borderWidth:1.5,
    },
    disabled:{
        opacity: 0.1,
    },
});

export default KeyBoardLetter;