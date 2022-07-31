import { Alert, Button, Image,Text, View,StyleSheet } from "react-native"
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { useState } from "react"
import OutlineButton from "../UI/OutlineButton"
import Colors from "../../constants/GlobalStyles"

function ImagePicker({onTakeImage}){

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
    const [pickedImage, setPickedImage] = useState()

    async function verifyPermission(){
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionRequest = await requestPermission()
            return permissionRequest.granted
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Permission Denied!', 'You need to allow camera access to continue with this app')
            return false
        }
        return true
    }

    async function takeImageHandler(){

        const isPermission = await verifyPermission()

        if(!isPermission){
            return
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,
        })
        setPickedImage(image.uri)
        onTakeImage(image.uri)
    }

    let imagePreview = <Text style={{color: 'white'}} >No image taken yet.</Text>

    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
    }

    return <View>
        <View style={styles.imagePreview} >{imagePreview}</View>
        <OutlineButton icon='camera' onPress={takeImageHandler} >Take Picture</OutlineButton>
    </View>
}

export default ImagePicker

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary800,
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
