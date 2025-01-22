import React, { useRef, useState } from "react";
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
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
import ViewShot from "react-native-view-shot";
import { MediaFile } from "./src/layers/MediaFile";


export default function App() {
  const defaultQrContent = "https://example.com";

  const [colorHandler, setColorHandler] = useState<string>(Colors.black);
  const [backgroundColor, setBackgroundColor] = useState<string>(Colors.white);
  const [qrContent, setQrContent] = useState<string>(defaultQrContent);
  const [size, setSize] = useState<number>(100);
  const viewShotRef = useRef<ViewShot>(null);
  const mediaFile = new MediaFile();

  /**
   * Updates the size of the QR code.
   * @param newSize - The new size of the QR code.
   */
  const evaluateSize = (newSize: number) => {
    console.log("Evaluating size: ", newSize);
    setSize(newSize);
  };
  /**
   * Updates the content of the QR code.
   * @param content - The new content for the QR code.
   */
  function qrContentHandler(content: string) {
    console.debug(`QR Content: ${content}`);
    setQrContent(content);
  }
  /**
   * Captures the QR code and saves it to the media library.
   */
  const saveQrCode = async () => {
    try {
      const uri = await captureQrCode();
      const x =await mediaFile.onSavedQrCode(uri);
      Alert.alert("Image Saved", "Image has been saved to your gallery.");
    } catch (error) {
      console.error("Failed to save QR Code:", error);
      Alert.alert("Failed to save", "Something was wrong try again in a minute.");
    }
  };
  /**
   * Captures the QR code using the ViewShot reference.
   * @returns The URI of the captured QR code image.
   * @throws Will throw an error if the QR code capture fails.
   */
  const captureQrCode = async () => {
    const uri = viewShotRef?.current?.capture
      ? await viewShotRef.current.capture()
      : null;
    if (!uri) {
      throw new Error("Failed to capture QR code.");
    }
    return uri;
  };


  return (
    <LinearGradient colors={["#079155", "#04a3f7"]} style={styles.background}>
      <StatusBar style="light" />
      <KeyboardAvoidingView>
      <Container>
        <View style={styles.titleContainer}>
          <Title>Generate your QR Code</Title>
        </View>
        <View style={styles.inputContainer}>
          <InputText
            label="QR Code Content"
            example={qrContent}
            onChangeText={qrContentHandler}
          />
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
          <SliderComponent
            text="Size"
            onValueChange={evaluateSize}
            max={250}
            min={50}
          />
        </View>
        <ScrollView
          style={styles.qrCodeContainer}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1.0 }}>
            <QRCode
              value={qrContent || defaultQrContent}
              size={size}
              color={colorHandler}
              backgroundColor={backgroundColor}
              ecl="H"
              quietZone={10}
            />
          </ViewShot>
        </ScrollView>
        <View style={styles.qrDonwloadButton}>
          <ButtonPrimary
            text="Download QR Code"
            onPressHandler={saveQrCode}
            styles={styles.qrButton}
          />
        </View>
      </Container>
      </KeyboardAvoidingView>
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
    width: 250,
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
  qrCodeContainer: {},
  qrDonwloadButton: {
    marginTop: 20,
    alignItems: "center",
  },
  qrButton: {
    backgroundColor: Colors.primary600,
  },
  qrButtonContainer: {
    width: "80%",
  },
});
