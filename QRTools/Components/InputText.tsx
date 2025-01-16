import React, { useState, useCallback } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Colors from "../Constants/Colors";
import { IInput } from "../Types/interfaces";

function InputText({ label, example, onChangeText }: IInput) {
  const [inputValue, setInputValue] = useState<string>("");

  const inputHandler = useCallback(
    (input: string) => {
      setInputValue(input.length > 0 ? input : " ");
      onChangeText && onChangeText(input);
    },
    [onChangeText]
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput
        keyboardType="url"
        autoCapitalize="none"
        scrollEnabled={false}
        autoCorrect={false}
        placeholder={example}
        style={styles.input}
        onChangeText={inputHandler}
        value={inputValue}
      />
    </View>
  );
}

export default InputText;

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
  label: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    maxWidth: "80%",
    borderBottomColor: Colors.input,
    borderBottomWidth: 2,
    fontWeight: 'bold',
  },
});
