import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from '../Constants/Colors';

function SliderComponent({text, min = 0, max = 100, step = 1, initialValue = 0, onValueChange }: {text?:string, min?: number, max?: number, step?: number, initialValue?: number, onValueChange?: (value: number) => void }){
    const [value, setValue] = useState(initialValue);

    const handleValueChange = useCallback(
      (newValue: number) => {
        setValue(newValue);
        if (onValueChange) {
          onValueChange(newValue);
        }
      },
      [onValueChange]
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{text}: {value}</Text>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onValueChange={handleValueChange}
          minimumTrackTintColor={Colors.primary500}
          maximumTrackTintColor={Colors.primary800}
          thumbTintColor={Colors.primary500}
        />
      </View>
    );
}

export default SliderComponent;

const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      marginVertical: 20,
    },
    label: {
      fontSize: 16,
      color: Colors.black,
      marginBottom: 10,
    },
    slider: {
      width: '80%',
      height: 40,
    },
  });