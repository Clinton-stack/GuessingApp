import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function GuessLog({ roundNumber, roundGuess }) {
    return (
        <View style={styles.guessLog}>
            <Text style={styles.guessNumber}> #{roundNumber}</Text>
            <Text style={styles.guessNumber}> Opponent's Guess {roundGuess}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    guessLog: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ecb214',
        width: '100%',
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        borderRadius: 10,
    },
    guessNumber: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: 'black',
    }

})

export default GuessLog