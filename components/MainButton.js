import React from 'react';
import {StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity, View, Text} from 'react-native';
import colors from "../values/colors";

function MainButton(props) {

    let ButtonComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 22) {
        ButtonComponent = TouchableNativeFeedback;
    }

    return (
        <View style={ styles.buttonContainer }>
            <ButtonComponent activeOpacity={0.8} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
    );

}

const styles = StyleSheet.create({
    buttonContainer: {
      borderRadius: 25,
      overflow: 'hidden'
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 5,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 6},
        shadowColor: 'black',
    },
    buttonText: {
        color: 'white',
        fontFamily: 'pyidaungsu',
        fontSize: 18
    }
});

export default MainButton;