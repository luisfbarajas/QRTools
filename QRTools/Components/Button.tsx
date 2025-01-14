import React from "react";
import { View, Pressable, Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import Colors from "../Constants/Colors";
function ButtonPrimary({
  text,
  onPressHandler, styles, containerStyle
}: {
  text: string;
  onPressHandler: () => void;
  styles?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
}) {
  return (
    <View style={[style.container, containerStyle]}>
      <Pressable onPress={onPressHandler} style={[style.buttonOutderContainer,styles]}>
        <View >
          <Text style={[style.buttonText, style.iconTextContainer]}> {text}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default ButtonPrimary;

const style = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: "hidden",
    width: "100%",
  },
  buttonText: {
    color: Colors.black,
    textAlign: "center",
  },
  buttonOutderContainer: {
    backgroundColor: Colors.ButtonPrimary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  iconTextContainer: {
    fontWeight: 'bold',
  },
});
