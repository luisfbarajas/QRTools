// React imports
import React, { useRef, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from "react-native";
// Expo imports
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { PermissionStatus } from "expo-media-library";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

// Custom components
import Container from "./Components/container";
import Title from "./Components/Title";
import InputText from "./Components/InputText";
import UploadBotton from "./Components/UploadBotton";
import SliderComponent from "./Components/Slider";
import ColorPickerComponent from "./Components/ColorPickerComponent";
import Colors from "./Constants/Colors";
import ButtonPrimary from "./Components/Button";
// QR Code imports
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
// Class imports
// import { MediaFile } from "./src/layers/MediaFile";
//Ads imports
import {
  BannerAd,
  BannerAdSize,
  useForeground,
  TestIds,
} from "react-native-google-mobile-ads";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
const defaultQrContent = "https://example.com";

// const adUnitId = __DEV__
//   ? TestIds.BANNER
//   : "ca-app-pub-3940256099942544/6300978111";

export default function App() {
  const [colorHandler, setColorHandler] = useState<string>(Colors.black);
  const [backgroundColor, setBackgroundColor] = useState<string>(Colors.white);
  const [qrContent, setQrContent] = useState<string>(defaultQrContent);
  const [size, setSize] = useState<number>(100);
  const [logo, setLogo] = useState<string>("");
  const viewShotRef = useRef<ViewShot>(null);
  // const mediaFile = new MediaFile();

  const bannerRef = useRef<BannerAd | null>(null);

  useForeground(() => {
    Platform.OS === "android" && bannerRef.current?.load();
  });

  /**
   * Updates the size of the QR code.
   * @param newSize - The new size of the QR code.
   */
  const evaluateSize = useCallback((newSize: number) => {
    console.debug("Evaluating size: ", newSize);
    setSize(newSize);
  }, []);
  /**
   * Handles the loading of the image.
   */
  const imageLoadingHandler = useCallback(async () => {
    console.debug("Image Loading");
    console.log("Image Loading started");
    
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === PermissionStatus.GRANTED) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: "images",
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        const uri = !result.canceled ? result?.assets[0].uri : "";

        console.log("URI: ", uri);
        if (uri !== "") {
          console.log("Image loaded successfully");
          setLogo(uri);
        } else {
          console.log("Image loading failed");
          setLogo("");
        }
      }
    } catch (error) {
      console.error("Failed to load image: ", error);
      setLogo("");
    }
  }, []);
  /**
   * Updates the content of the QR code.
   * @param content - The new content for the QR code.
   */
  const qrContentHandler = useCallback((content: string) => {
    console.debug(`QR Content: ${content}`);
    setQrContent(content);
  }, []);
  /**
   * Captures the QR code using the ViewShot reference.
   * @returns The URI of the captured QR code image.
   * @throws Will throw an error if the QR code capture fails.
   */
  const captureQrCode = useCallback(async () => {
    const uri = viewShotRef?.current?.capture
      ? await viewShotRef.current.capture()
      : null;
    if (!uri) {
      throw new Error("Failed to capture QR code.");
    }
    return uri;
  }, []);
  /**
   * Captures the QR code and saves it to the media library.
   */
  const saveQrCode = useCallback(async () => {
    console.log("Saving QR Code");
    
    try {
      const uri = await captureQrCode();
      // await mediaFile.onSavedQrCode(uri);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === PermissionStatus.GRANTED) {
        const timestamp = new Date().getTime();
        const fileUri = `${FileSystem.documentDirectory}qrcode_${timestamp}.png`;
        await FileSystem.moveAsync({
          from: uri,
          to: fileUri,
        });
        const asset = await MediaLibrary.saveToLibraryAsync(fileUri);
        Alert.alert("Image Saved", "Image has been saved to your gallery.");
        console.log("QR Code saved to media library:", fileUri);
        Alert.alert("Image Saved", "Image has been saved to your gallery.");
      }
    } catch (error) {
      console.error("Failed to save QR Code:", error);
      Alert.alert(
        "Failed to save",
        "Something was wrong try again in a minute."
      );
    }
  }, [captureQrCode]);

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
            <UploadBotton onLoading={imageLoadingHandler} />
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
            <ViewShot
              ref={viewShotRef}
              options={{ format: "png", quality: 1.0 }}
            >
              <QRCode
                value={qrContent || defaultQrContent}
                size={size}
                color={colorHandler}
                backgroundColor={backgroundColor}
                ecl="H"
                quietZone={10}
                logo={logo ? { uri: logo } : undefined}
                logoSize={size * 0.3}
                logoBackgroundColor="transparent"
              />
            </ViewShot>
          </ScrollView>
          <View style={styles.qrDownloadButton}>
            <ButtonPrimary
              text="Download QR Code"
              onPressHandler={saveQrCode}
              styles={styles.qrButton}
            />
          </View>
          <View style={styles.qrDownloadButton}>
            <BannerAd
              ref={bannerRef}
              unitId={TestIds.BANNER}
              size={BannerAdSize.BANNER}
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
    width: screenWidth * 0.8,
  },
  uploadButtonContainer: {},
  colorPickersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderContainer: {
    borderColor: Colors.black,
    width: 50,
  },
  qrCodeContainer: {},
  qrDownloadButton: {
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
