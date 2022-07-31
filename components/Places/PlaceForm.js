import { useCallback, useState } from "react"
import { ScrollView, Text, View, StyleSheet } from "react-native"
import { TextInput } from "react-native"
import Colors from "../../constants/GlobalStyles"
import { Place } from "../../models/place"
import Button from "../UI/Button"
import ImagePicker from "./ImagePicker"
import LocationPicker from "./LocationPicker"

function PlaceForm({onCreatePlace}){

    const [enteredTitle, setEnteredTitle] = useState()
    const [selectedImage, setSelectedIamge] = useState()
    const [pickedLocation, setPickedLocation] = useState()

    function changeTitleHandler(enteredText){
        setEnteredTitle(enteredText)
    }

    function takeImageHandler(imageUri){
        setSelectedIamge(imageUri)
    }

    const pickedLocationHandler = useCallback( (location) => {
            setPickedLocation(location)
    }, [] )

    function savePlaceHandler(){
        const placeData = new Place(enteredTitle, selectedImage, pickedLocation )
        onCreatePlace(placeData)
    }

    return <>
        <ScrollView style={styles.form} >
            <View >
                <Text style={styles.label} >Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onPickLocation={pickedLocationHandler} />

            <Button onPress={savePlaceHandler} >Add Place</Button>

        </ScrollView>

    </>
}
export default PlaceForm

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 4,
        
        color: Colors.primary700,
    },
    input: {
        marginVertical: 4,
        paddingVertical: 8,
        paddingHorizontal: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: '#def3fc'
    },
});
