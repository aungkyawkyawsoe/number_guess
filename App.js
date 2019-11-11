import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from 'expo-font';
import { AppLoading } from "expo";
import strings from "./values/strings";


const fetchFonts = () => {
    return Font.loadAsync({
        'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'pyidaungsu': require('./assets/fonts/Pyidaungsu_Regular.ttf'),
        'pyidaungsu-bold': require('./assets/fonts/Pyidaungsu_Bold.ttf'),
    });
};

export default function App() {

    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    if(!dataLoaded) {
        return <AppLoading
            startAsync={ fetchFonts }
            onFinish={()=> setDataLoaded(true)}
            onError={err=> console.log(err)}
        />;
    }


    const configureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    const startGameHandler = selectedNumber => {
        setUserNumber(selectedNumber);
        setGuessRounds(0);
    };

    const gameOverHandler = numOfRounds => {
        setGuessRounds(numOfRounds);
    };

    let content = <StartGameScreen onStartGame={ startGameHandler }/>;

    if(userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
    } else if(guessRounds > 0) {
        content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}/>;
    }

    return (
        <View style={styles.screen}>
            <Header title={strings.guessANumber}/>
            { content }
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
