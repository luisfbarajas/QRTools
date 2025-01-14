import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Container from "./Components/container";
import Title from "./Components/Title";
import InputText from "./Components/InputText";
import UploadBotton from "./Components/UploadBotton";
import SliderComponent from "./Components/Slider";
import ColorPickerComponent from "./Components/ColorPickerComponent";
import QRCode from "react-native-qrcode-svg";
import Colors from "./Constants/Colors";
import ButtonPrimary from "./Components/Button";

export default function App() {
  const defaultQrContent = "https://example.com";
  const [colorHandler, setColorHandler] = useState<string>(Colors.black);
  const [backgroundColor, setBackgroundColor] = useState<string>(Colors.white);
  const [qrContent, setQrContent] = useState<string>(defaultQrContent);
  const [size, setSize] = useState<number>(100);

  const evaluateSize = (newSize: number) => {
    console.log("Evaluating size: ", newSize);
    setSize(newSize);
  };
  function qrContentHandler(content: string) {
    console.log(`QR Content: ${content}`);
    setQrContent(content);
  }
console.debug(`ForeGround: ${colorHandler}`,`Backgroud: ${backgroundColor}`);

  return (
    <LinearGradient colors={["#079155", "#04a3f7"]} style={styles.background}>
      <StatusBar style="light" />
      <Container>
        <View style={styles.titleContainer}>
          <Title>Generate your QR Code</Title>
        </View>
        <View style={styles.inputContainer}>
          <InputText label="QR Code Content" example={qrContent} onChangeText={qrContentHandler}/>
        </View>
        <View style={styles.uploadButtonContainer}>
          <UploadBotton />
        </View>
        <View style={styles.colorPickersRow}>
          <View>
            <ColorPickerComponent
              label="Foreground"
              color={colorHandler}
              setColorHandler={setColorHandler}
            />
          </View>
          <View>
            <ColorPickerComponent
              label="Background"
              color={backgroundColor}
              setColorHandler={setBackgroundColor}
            />
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <SliderComponent text="Size" onValueChange={evaluateSize} max={250} min={50}/>
        </View>
        <ScrollView style={styles.qrCodeContainer} contentContainerStyle={{alignItems: "center", justifyContent: "center"}}>
          <QRCode
            value={qrContent || defaultQrContent}
            size={size}
            color={colorHandler}
            backgroundColor={backgroundColor}
            
          />
        </ScrollView>
        <View style={styles.qrDonwloadButton}>
        <ButtonPrimary text="Download QR Code" onPressHandler={() => { console.debug("Donwloading...")}} styles={styles.qrButton} containerStyle={styles.qrButtonContainer}/>
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
    marginTop: 20,
  },
  inputContainer: {
    paddingVertical: 30,
    width: "80%",
  },
  uploadButtonContainer: {},
  colorPickersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  sliderContainer: {
    borderColor: Colors.black,
    width: 50,
  },
  qrCodeContainer: {
  },
  qrDonwloadButton: {
    marginTop:  20,
    alignItems: "center",
  },
  qrButton: {
    backgroundColor: Colors.primary600,
  },
  qrButtonContainer: {
    width: "80%",
  }
});
