import React, {useState, useEffect} from 'react';
import {
    View,
    Alert,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import Card from "../components/Card";
import colors from '../values/colors';
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import strings from "../values/strings";


const StartGameScreen = ({onStartGame}) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('');
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    useEffect(()=> {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    });


    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chooseNumber = parseInt(enteredValue);
        if (isNaN(chooseNumber) ||
            chooseNumber <= 0 ||
            chooseNumber > 99
        ) {
            Alert.alert(
                strings.invalidNumber,
                strings.invalidNumMsg,
                [{
                    text: strings.okay,
                    style: 'destructive',
                    onPress: resetInputHandler
                }]
            );
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chooseNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <TitleText>{strings.youSelected}</TitleText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => onStartGame(selectedNumber)}>{strings.startGame}</MainButton>
            </Card>
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior='position'
                keyboardVerticalOffset={30}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>{strings.startNewGame}</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>{strings.selectedNumber}</BodyText>
                            <Input style={styles.input}
                                   blurOnSubmit
                                   autoCapitalize='none'
                                   autoCorrect={false}
                                   keyboardType='number-pad'
                                   maxLength={2}
                                   onChangeText={numberInputHandler}
                                   value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth}}>
                                    <Button color={colors.accent}
                                            onPress={resetInputHandler}
                                            title={strings.reset}/>
                                </View>
                                <View style={{ width: buttonWidth}}>
                                    <Button color={colors.primary}
                                            onPress={confirmInputHandler}
                                            title={strings.confirm}/>
                                </View>
                            </View>
                        </Card>

                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        marginTop: 10,
        marginBottom: 20,
        fontSize: 20
    },
    inputContainer: {
        width: Dimensions.get('window').width > 600 ? '60%' : '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    input: {
        width: 50,
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;