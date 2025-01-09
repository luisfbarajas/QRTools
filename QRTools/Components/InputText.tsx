import { useState } from "react";
import { IInput } from "../Types/interfaces";
import { Text, TextInput, View, StyleSheet } from "react-native";
import Colors from "../Constants/Colors";

function InputText({ label, example }: IInput) {
  const [inputValue, setInputValue] = useState<string>(example);

  function inputHandler(input: string) {
    console.log(`InputText: ${input}`);
    
    setInputValue(input);
  }
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
      />
    </View>
  );
}

export default InputText;

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
    fontWeight: "bold",
    textAlign: "center",
  },
});
