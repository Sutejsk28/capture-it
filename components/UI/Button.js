import { Pressable, Text, View, StyleSheet} from "react-native"
import Colors from "../../constants/GlobalStyles";

function Button({children, onPress, }){
    return <Pressable onPress={onPress} style={({pressed})=>[styles.button , pressed && styles.pressed]} >
        <View>
            <Text style={styles.text} >{children}</Text>
        </View>
    </Pressable>
}

export default Button


const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor:'#def3fc',
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 2,
        borderRadius: 4,
    },
    pressed: {
        opacity: 0.75,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary700
    },
});