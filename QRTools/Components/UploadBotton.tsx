import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Constants/Colors";

function UploadBotton({onLoading}: {onLoading: () => void}) {
  function onPressHandler() {
    console.time("Image Loading");
    onLoading();
    console.timeEnd("Image Loading");
  }

  return (
    <View style={style.container}>
      <Pressable onPress={onPressHandler} style={style.buttonOutderContainer}>
        <View style={style.iconTextContainer}>
          <Ionicons name="cloud-upload-sharp" size={24} color={Colors.black} />
          <Text style={style.buttonText}> Upload icon</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default UploadBotton;

const style = StyleSheet.create({
  container: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
    width: "100%",
  },
  buttonText: {
    color: Colors.black,
    textAlign: "center",
    marginLeft: 8,
  },
  buttonOutderContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
