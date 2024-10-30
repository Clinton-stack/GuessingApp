import { View, TextInput, StyleSheet, Alert, Text, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";
import { globalStyles } from "../stylesheet";

function StartGameScreen({ onStartGame }) {
  const [enteredValue, setEnteredValue] = useState("");

  const {width, height} = useWindowDimensions();

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number!", "Number has to be between 1 and 99.", [
        { text: "Okay", style: "destructive", onPress: () => setEnteredValue("") },
      ]);
      return;
    }

    onStartGame(chosenNumber);
  };
  const marginTopDistance = height < 400 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30} style={styles.screen}>
    <View style={[styles.rootConatiner,{ marginTop: marginTopDistance}]}>
      <Text style={globalStyles.title}>GUESS A NUMBER</Text>
      <View style={globalStyles.card}>
        <Text style={{color: 'white'}}>Enter a number</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCorrect={false}
          value={enteredValue}
          onChangeText={(text) => setEnteredValue(text)} // Fixed prop name from onChange to onChangeText
        />
        <View style={styles.buttons}>
          <View style={styles.button}>
            <PrimaryButton onPress={() => setEnteredValue("")}>Reset</PrimaryButton>
          </View>
          <View style={styles.button}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
   
  },
  rootConatiner:{
    flex:1,
    alignItems:'center' 
  },
  
  numberInput: {
    height: 50,
    width: 50,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    marginVertical: 10,
    color: "#ddb52f",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
  },
  button: {
    flex: 1,
  },
});

export default StartGameScreen;
