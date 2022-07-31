import PlaceItem from "./PlaceItem";

import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function PlacesList({places}){

    const navigation = useNavigation()

    function selectPlaceHandler(id){
        navigation.navigate('PlaceDetails', {
            placeId: id
        })
    }

    if(!places){
        return <View style={styles.FallbackContainer} >
            <Text style={styles.FallbackText} >No places yet, start adding some..</Text>
        </View>
    }

    
    return (
        <FlatList
        style={styles.list}
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler} />}
      />
    )
}

export default PlacesList

const styles = StyleSheet.create({
    list: {
        margin: 24,
    },
    FallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    FallbackText: {
        fontSize: 18,
    }
})