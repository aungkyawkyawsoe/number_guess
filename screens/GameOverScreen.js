import React from 'react';
import {View, Image, ScrollView, Text, StyleSheet, Dimensions} from 'react-native';
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import colors from "../values/colors";
import MainButton from "../components/MainButton";
import strings from "../values/strings";

function GameOverScreen(props) {
    const {roundsNumber, userNumber, onRestart} = props;
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is Over!</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        fadeDuration={500}
                        source={require('../assets/success.png')}
                        // source={{ uri: 'https://images7.alphacoders.com/383/thumb-1920-383321.jpg' }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>
                        Your phone needed
                        <Text style={styles.highlight}> {roundsNumber} </Text>
                        rounds to guess the number
                        <Text style={styles.highlight}> {userNumber} </Text>
                    </BodyText>
                </View>
                <View style={styles.button}><MainButton onPress={onRestart}>{strings.newGame}</MainButton></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        paddingVertical: 20
    },
    button: {
        marginTop: Dimensions.get('window').height > 480 ? 20 : 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.36,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 20
    },
    highlight: {
        color: colors.primary,
        fontFamily: 'roboto-bold'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 40
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
});

export default GameOverScreen;