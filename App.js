import React, { useState } from "react";
import { ImageBackground, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userNumber, setUserNumber] = useState(null);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const startNewGameHandler = (navigation) => {
    setUserNumber(null); // Reset user number
    // navigation.navigate("StartGame"); // Navigate to StartGame screen
  };

  const [loaded] = useFonts({
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <LinearGradient colors={["#4c0329", "#ddb52f"]} style={styles.container}>
        <ImageBackground
          source={require("./assets/background.png")}
          style={styles.container}
          imageStyle={styles.imageStyle}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="default" />
            <Stack.Navigator
              initialRouteName="StartGame"
              screenOptions={{
                headerStyle: {
                  backgroundColor: 'transparent',
                },
                headerTintColor: '#ddb52f',
                headerTransparent: true,
                contentStyle: { backgroundColor: 'transparent' },
                headerBackTitleVisible: false,
              }}
            >
              {!userNumber ? (
                <Stack.Screen name="StartGame">
                  {(props) => (
                    <StartGameScreen
                      {...props}
                      onStartGame={startGameHandler}
                    />
                  )}
                </Stack.Screen>
              ) : (
                <Stack.Screen name="Game" key={userNumber}>
                  {(props) => (
                    <GameScreen
                      {...props}
                      userNumber={userNumber}
                    />
                  )}
                </Stack.Screen>
              )}
              <Stack.Screen name="GameOver"
                options={{
                  headerBackVisible: false,
                }}>
                {(props) => (
                  <GameOverScreen
                    {...props}
                    onStartNewGame={startNewGameHandler}
                    userNumber={userNumber}
                  />
                )}
              </Stack.Screen>

            </Stack.Navigator>
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    resizeMode: "cover",
    opacity: 0.15,
  },
  navigator: {
    opacity: 0.9,
  },
});
