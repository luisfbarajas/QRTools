import React, { useState } from "react";
import { Modal, StyleSheet, View, Dimensions } from "react-native";
import ButtonPrimary from "./Button";
import ColorPicker, { Panel1, HueSlider } from "reanimated-color-picker";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

export default function ColorPickerComponent({
  label,
  color,
  setColorHandler,
}: {
  label: string;
  color: string;
  setColorHandler: (color: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  
  function onSelectColor({ hex }: { hex: string }) {
    setColorHandler(hex);
  };

  function selectedColorHandler() {
    setShowModal(false);
  }

  return (
    <View style={styles.containerslider}>
      <View style={styles.buttons}>
        <ButtonPrimary text={label} onPressHandler={() => setShowModal(true)} />
      </View>

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { height: screenHeight * 0.5, width: screenWidth * 0.8 }]}>
            <ColorPicker
              value={color}
              onComplete={onSelectColor}
              style={styles.colorPicker}
            >
              <Panel1 style={styles.panel} />
              <HueSlider style={styles.hueSlider} />
            </ColorPicker>
            <ButtonPrimary text="Select Color" onPressHandler={selectedColorHandler} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  containerslider: {
    width: "100%",
  },
  buttons: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  colorPicker: {
    width: "80%",
    height: "80%",
    marginBottom: 20,
  },
  panel: {
    flex: 1,
  },
  hueSlider: {
    marginTop: 20,
    width: "80%",
    height: 40,
  },
});
