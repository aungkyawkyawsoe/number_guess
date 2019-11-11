import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

function Input(props) {
    return <TextInput {...props} style={{...styles.input, ...props.style}} />
}


const styles = StyleSheet.create({
    input: {
        height: 30,
        borderColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default Input;