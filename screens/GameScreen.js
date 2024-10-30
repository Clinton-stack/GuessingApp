import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, FlatList, useWindowDimensions } from "react-native";
import { globalStyles } from "../stylesheet";
import PrimaryButton from "../components/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import GuessLog from "../components/GuessLog";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

function GameScreen({ userNumber, navigation }) {

    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [minBoundary, setMinBoundary] = useState(1);
    const [maxBoundary, setMaxBoundary] = useState(100);
    const [rounds, setRounds] = useState([initialGuess]);

    // useEffect to reset boundaries when the component mounts
    useEffect(() => {
        setMinBoundary(1);
        setMaxBoundary(100);
        setRounds([initialGuess]);
    }, [userNumber]);

    // Handle the next guess logic based on the direction
    const nextGuessHandler = (direction) => {
        if (
            (direction === "lower" && currentGuess < userNumber) ||
            (direction === "greater" && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie!", "You know that this is wrong...", [
                { text: "Sorry!", style: "cancel" },
            ]);
            return;
        }

        if (direction === "lower") {
            setMaxBoundary(currentGuess); // Update the max boundary
        } else {
            setMinBoundary(currentGuess + 1); // Update the min boundary
        }

        const newGuess = generateRandomBetween(
            direction === "lower" ? minBoundary : currentGuess + 1,
            direction === "lower" ? currentGuess : maxBoundary,
            currentGuess
        );
        setCurrentGuess(newGuess); // Set the new guess
        setRounds((currentRounds) => [newGuess, ...currentRounds]); // Update the rounds
    };

    // useEffect to check for game over (when currentGuess matches userNumber)
    useEffect(() => {
        if (currentGuess === userNumber) {
            Alert.alert("Game Over", "The computer guessed your number!", [
                {
                    text: "Okay",
                    onPress: () =>
                        navigation.navigate("GameOver", {
                            userNumber: userNumber,
                            roundsNumber: rounds.length,
                        }),
                },
            ]);
        }
    }, [currentGuess, userNumber, navigation]);

    const { height } = useWindowDimensions();

    const potraitContent = (
        <>
            <View style={globalStyles.guessNumberContainer}>
                <Text style={globalStyles.guessNumber}>{currentGuess}</Text>
            </View>
            <View style={globalStyles.card}>
                <Text style={{ color: "white" }}>Lower or Higher?</Text>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                        <Ionicons name="remove" size={24} color="white" />
                    </PrimaryButton>
                    <PrimaryButton onPress={() => nextGuessHandler("greater")}>
                        <Ionicons name="add" size={24} color="white" />
                    </PrimaryButton>
                </View>
            </View>
        </>
    )

    const lanscapeContent = (
        <>
            <View style={styles.potraitContent}>
                <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                    <Ionicons name="remove" size={24} color="white" />
                </PrimaryButton>
                <Text style={globalStyles.guessNumber}>{currentGuess}</Text>

                <PrimaryButton onPress={() => nextGuessHandler("greater")}>
                    <Ionicons name="add" size={24} color="white" />
                </PrimaryButton>
            </View>
        </>
    )


    return (
        <View style={styles.screen}>
            <Text style={globalStyles.title}>Opponent's Guess</Text>
            {height > 400 ? potraitContent : lanscapeContent}
            <View style={styles.containerList}>
                {/* {rounds.map(round => <Text key={round}>{round}</Text>)} */}
                <FlatList
                    data={rounds}
                    keyExtractor={(item) => item.toString()}
                    renderItem={(itemData) => <GuessLog roundNumber={rounds.length - itemData.index} roundGuess={itemData.item} />}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        marginTop: 50,
    },
    controls: {
        marginTop: 20,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 300,
        maxWidth: "80%",
    },
    containerList: {
        flex: 1,
        padding: 10,
    },
    potraitContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
});

export default GameScreen;
