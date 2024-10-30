// styles.js
import { StyleSheet, Dimensions, Platform } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const globalStyles = StyleSheet.create({
    title: {
        fontSize: windowWidth > 600 ? 36 : 24,
        fontFamily: 'OpenSans-Bold',
        color: '#ddb52f',
        textAlign: 'center',
        borderWidth: Platform.select({ ios: 1, android: 2 }),
        borderColor: '#ddb52f',
        padding: 12,
        marginVertical: 10
    },
    guessNumberContainer: {
        borderWidth: 4,
        borderColor: '#ddb52f',
        padding: 24,
        margin: 24,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    guessNumber: {
        fontSize: 36,
        color: '#ddb52f',
        fontWeight: 'bold',
    },
    card: {
        marginTop: 20,
        marginHorizontal: 24,
        padding: 20,
        backgroundColor: "#72063c",
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        alignItems: "center",
      },
});
