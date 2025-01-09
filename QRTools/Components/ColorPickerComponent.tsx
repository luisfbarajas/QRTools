import React, { useState } from 'react';
import { Button, GestureResponderEvent, Modal, StyleSheet, View } from 'react-native';

import ColorPicker, { Panel1,    HueSlider } from 'reanimated-color-picker';

export default function ColorPickerComponent({label,color,setColorHandler}:{label:string,color:string,setColorHandler:(color:string)=>void}) {
  const [showModal, setShowModal] = useState(false);

  // Note: 👇 This can be a `worklet` function.
  const onSelectColor = ({ hex }:{hex:string}) => {
    setColorHandler(hex);
    console.debug(hex);
  };
function selectedColorHandler(){
  setShowModal(false)
}
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>

      <Button title={label} onPress={() => setShowModal(true)} />
      </View>

      <Modal visible={showModal} animationType='slide'>
        <ColorPicker style={{ width: '70%' }} value={color} onComplete={onSelectColor}>
          <Panel1 />
          <HueSlider />
        </ColorPicker>

        <Button title='Ok' onPress={selectedColorHandler} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttons:{
    padding:10,
  }
});