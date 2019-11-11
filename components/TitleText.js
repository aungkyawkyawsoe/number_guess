import React from 'react';
import { Text, StyleSheet } from 'react-native';

function TitleText(props) {
    return <Text style={{...styles.title, ...props.style }}> {props.children} </Text>
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'roboto-bold',
        fontSize: 20
    }
});

export default TitleText;