import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "../Constants/Colors";
import { IContainer } from "../Types/interfaces";

function Container({ children }: IContainer) {
  return <View style={styles.container}>{children}</View>;
}

export default Container;

const deviceWith = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginVertical: deviceWith < 380 ? 18 : 38,
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 4,
  },
});
