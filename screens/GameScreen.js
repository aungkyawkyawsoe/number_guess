import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { ScreenOrientation } from 'expo';

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from '../values/default-styles';
import MainButton from "../components/MainButton";
import strings from "../values/strings";
import BodyText from "../components/BodyText";


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }

    return rndNum;
};

const renderListItem = (listLength, itemData) => (
    <View key={itemData.index} style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>G-{itemData.item}</BodyText>
    </View>
);

const GameScreen = (props) => {

    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);


    const initialGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    const currentLow = useRef(1);
    const currentHeight = useRef(100);

    useEffect(()=> {
       const updateLayout = () => {
           setAvailableDeviceWidth(Dimensions.get('window').width);
           setAvailableDeviceHeight(Dimensions.get('window').height);
       };

       Dimensions.addEventListener('change', updateLayout);

        return () => {
           Dimensions.removeEventListener('change', updateLayout);
        }
    });

    const {userChoice, onGameOver} = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert(strings.dontLie, strings.numCompareMsg, [{
                text: strings.sorry, style: 'cancel'
            }]);
            return;
        }

        if (direction === 'lower') {
            currentHeight.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHeight.current,
            currentGuess
        );
        setCurrentGuess(nextNumber);
        // setPastGuesses(curRounds => curRounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    };

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color='white'/>
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color='white'/>
                    </MainButton>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        keyExtractor={(item) => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color='white'/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color='white'/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    listContainer: {
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
        flex: 1
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        width: '100%'
    }
});

export default GameScreen;