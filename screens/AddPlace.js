import { Text } from "react-native"
import PlaceForm from "../components/Places/PlaceForm"
import { insertPlace } from "../util/database"

function AddPlace({navigation}){

    async function AddPlaceHandler(place){
        await insertPlace(place)
        navigation.navigate('AllPlaces')
    }

    return <PlaceForm onCreatePlace={AddPlaceHandler} />
}
export default AddPlace