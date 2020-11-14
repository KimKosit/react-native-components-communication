import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  Keyboard,
} from "react-native";
import Colors from "../constants/colors";

const GameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [rounds, setRounds] = useState(0);

  // useEffect(() => {
  //   if (selectedNumber === props.answer) {
  //     props.onGameOver(rounds);
  //   }
  // }, [selectedNumber, props.answer, props.onGameOver]);

  let confirmedOutput;

  if (confirmed) {
    let result_txt = "";
    if (selectedNumber < props.answer) {
      result_txt = "The answer is greater.";
    } else if (selectedNumber > props.answer) {
      result_txt = "The answer is lower.";
    } else {
      // Guess correctly
      // props.onGameOver(rounds);
    }
    confirmedOutput = (
      <View style={styles.resultContainer}>
        <Text>You selected</Text>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{selectedNumber}</Text>
        </View>
        <Text>
          {result_txt} Round: {rounds}
        </Text>
      </View>
    );
  }

  const numberInputHandler = (inputText) => {
    // setEnteredValue(inputText.replace(/[^0-9]/i, ""));
    setEnteredValue(inputText);
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    // setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number", "ต้องใส่เลขจำนวนเต็ม 1-99 เท่านั้น", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
        { text: "Cancel" },
      ]);
      setEnteredValue("")
      return;
    }
    setSelectedNumber(chosenNumber);
    setConfirmed(true);  
    setEnteredValue("");
    setRounds(rounds + 1);
    Keyboard.dismiss();
    if (chosenNumber === props.answer) {
      props.onGameOver(rounds + 1);
      return;
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text>Guess a Number</Text>
        <TextInput
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="number-pad"
          maxLength={2}
          value={enteredValue}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Reset"
              color={Colors.accent}
              onPress={resetInputHandler}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Confirm"
              color={Colors.primary}
              onPress={confirmInputHandler}
            />
          </View>
        </View>
      </View>
      {confirmedOutput}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  card: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    padding: 20,
    elevation: 8,
    borderRadius: 20,
  },
  input: {
    width: 100,
    textAlign: "center",
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
    height: 30,
    marginVertical: 10,
  },
  numberContainer: {
    borderWidth: 2,
    borderColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    minHeight: 50,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: Colors.accent,
    fontSize: 22,
  },
});

export default GameScreen;
