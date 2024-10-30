import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

function PrimaryButton({ children, onPress }) {
 
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "#fdb533" }}
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerConatiner, styles.pressed]
            : styles.buttonInnerConatiner
        }
      >
        <Text style={{ color: "white", textAlign: "center" }}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 25,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerConatiner: {
    backgroundColor: "#ddb52f",
    paddingVertical: 12,
    paddingHorizontal: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
