import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import Colors from "../Constants/Colors";
import { ISlider } from "../Types/interfaces";

const SliderComponent = ({
  min = 0,
  max = 100,
  step = 1,
  initialValue = 100,
  onValueChange,
  text = "Value",
}: ISlider) => {
  const [value, setValue] = useState(initialValue);
  const prevValue = useRef(value);

  const handleValueChange = useCallback(
    (newValue: number) => {
      setValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    },
    [onValueChange]
  );

  useEffect(() => {
    if (prevValue.current !== value) {
      console.debug("SliderComponent: ", value);
      prevValue.current = value;
    }
  }, [value]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.label}>
          {text}: {value}
        </Text>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          step={step}
          value={value}
          onSlidingComplete={handleValueChange}
          minimumTrackTintColor={Colors.primary500}
          maximumTrackTintColor={Colors.primary800}
          thumbTintColor={Colors.primary500}
        />
      </View>
    </View>
  );
};

export default SliderComponent;

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: "flex-start",
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 10,
  },
  sliderContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  slider: {
    height: 40,
    width: 250,
    alignSelf: "flex-start",
  },
});
