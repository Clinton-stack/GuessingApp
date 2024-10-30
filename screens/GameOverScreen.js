import React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { globalStyles } from '../stylesheet';
import PrimaryButton from '../components/PrimaryButton';

function GameOverScreen({ onStartNewGame, route, navigation}) {
    const { userNumber, roundsNumber } = route.params;

const handleStartNewGame = () => {
    onStartNewGame();
    navigation.popToTop();
}

const { width, height } = useWindowDimensions();
let imageSize = 300

if (height < 400) {
    imageSize = 80;
}
if (width < 300){
    imageSize = 150;
}
const imageStyle ={
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
}

    return (
        <View style={styles.rootContainer}>
            <Text style={globalStyles.title}>Game is Over</Text>
            <View style={[styles.imageConatainer, imageStyle]}>
                <Image style={styles.image} source={require('../assets/success.png')} />
            </View>
            <Text style={styles.summaryText}>
                The computer needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>
            </Text>
            <PrimaryButton onPress={handleStartNewGame}>Start New Game </PrimaryButton>
        </View>
    );
}

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    imageConatainer: {
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300, 
        // borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    summaryText: {
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        color: 'white',
        fontSize: 20,
    },
    highlight: {
        color: 'lightblue',
        fontFamily: 'OpenSans-Bold',
    },
});

export default GameOverScreen;
