import { Pressable, View,StyleSheet,Text } from "react-native"
import {Ionicons} from '@expo/vector-icons'
import Colors from "../../constants/GlobalStyles"

function OutlineButton({icon, onPress, children}){
    return <Pressable onPress={onPress} style={ ({pressed})=> [styles.button, pressed && styles.pressed]} >
        <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary700} />
        <Text style={styles.text} >{children}</Text>
    </Pressable>
}

export default OutlineButton

const styles = StyleSheet.create({
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.primary700,
        flexDirection: 'row',
        backgroundColor:'#def3fc',
    },
    pressed: {
        opacity: 0.75,
    },
    icon: {
        marginRight: 6,
    },
    text: {
        color: Colors.primary700,
    },
});
