import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import colors from "../values/colors";
import TitleText from "./TitleText";

function Header({ title }) {
    return (
        <View style={{
            ...styles.headerBase,
            ...Platform.select({
                ios: styles.headerIOS,
                android: styles.headerAndroid
            })
        }}>
            <TitleText style={styles.headerTitle}>{ title }</TitleText>
        </View>
    );
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 80,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth:  1
    },
    headerAndroid: {
        backgroundColor: colors.primary
    },
    headerTitle:{
        fontSize: 17,
        color: Platform.OS==="android" ? 'white' : colors.primary
    }
});

export default Header;