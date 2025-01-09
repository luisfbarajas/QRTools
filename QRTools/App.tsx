import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Container from "./Components/container";
import Title from "./Components/Title";
import InputText from "./Components/InputText";
import UploadBotton from "./Components/UploadBotton";
import SliderComponent from "./Components/Slider";
import ColorPickerComponent from "./Components/ColorPickerComponent";
import QRCode from "react-native-qrcode-svg";
import Colors from "./Constants/Colors";

export default function App() {
  const [colorHandler, setColorHandler] = useState<string>(Colors.black);
  const [backgroundColor, setBackgroundColor] = useState<string>(Colors.white);
  const [size, setSize] = useState<number>(100);

  return (
    <LinearGradient colors={["#079155", "#04a3f7"]} style={styles.background}>
      <StatusBar style="light" />
      <Container>
        <View style={styles.titleContainer}>
          <Title>Generate your QR Code</Title>
        </View>
        <View style={styles.inputContainer}>
          <InputText label="QR Code Content:" example="https://example.com" />
        </View>
        <View style={styles.uploadButtonContainer}>
          <UploadBotton />
        </View>
        <View style={styles.colorPickersRow}>
          <ColorPickerComponent
            label="Foreground Color"
            color={colorHandler}
            setColorHandler={setColorHandler}
          />
          <ColorPickerComponent
            label="Background Color"
            color={backgroundColor}
            setColorHandler={setBackgroundColor}
          />
        </View>
        <View style={styles.sliderContainer}>
          <SliderComponent  text="Size" onValueChange={setSize}/>
        </View>
        <View style={styles.qrCodeContainer}>
          <QRCode value="https://example.com" size={size} color={colorHandler} backgroundColor={backgroundColor}  />
        </View>
      </Container>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginTop:20
  },
  inputContainer: {
    paddingVertical: 30,
    width: '80%',
  },
  uploadButtonContainer: {
  },
  colorPickersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '80%',
  },
  sliderContainer: {
    width: '80%',
  },
  qrCodeContainer: {
    alignItems: "center",
  },
});
