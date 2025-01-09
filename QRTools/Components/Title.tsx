import { Text, StyleSheet } from "react-native";
import { IContainer } from "../Types/interfaces";

function Title({children}:IContainer){
    return (<Text style={styles.title}>
        {children}
    </Text>);
}

export default Title;

const styles = StyleSheet.create({
    title:{  
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 12,
        maxWidth: '80%'}
});
