import React from 'react';
import { View, StyleSheet } from 'react-native';
function Card(props) {
    return (
        <View style={{ ...styles.card, ...props.style }}>
            { props.children }
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        // Only IOS
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            shadowOpacity: 0.2,
        // Only Android
            elevation: 5,

    }
});

export default Card;