import { View,StyleSheet, Alert, Image, Text } from "react-native"
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'

import Colors from "../../constants/GlobalStyles";
import OutlineButton from "../UI/OutlineButton"
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

function LocationPicker({onPickLocation}){

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
    const [pickedLoaction, setPickedLocation] = useState()

    const navigation = useNavigation()
    const route = useRoute()
    const isFocused = useIsFocused()

   

    useEffect( ()=>{
        if(isFocused && route.params){
            const mapPickedLocation = route.params && {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            }
            setPickedLocation(mapPickedLocation)
        }
    }, [route, isFocused] )

    useEffect( ()=>{
        async function handleLocation(){
            if(pickedLoaction){
                const address = await getAddress(pickedLoaction.lat, pickedLoaction.lng)
                onPickLocation({...pickedLoaction, address: address})
            }
        }

        handleLocation()

    }, [pickedLoaction, onPickLocation] )

    async function verifyPermission(){
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionRequest = await requestPermission()
            return permissionRequest.granted
        }

        if(locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Permission Denied!', 'You need to allow camera access to continue with this app')
            return false
        }
        return true
    }

    async function getLocationHandler(){

        const isPermission = await verifyPermission()

        if(!isPermission){
            return
        }

        const location = await getCurrentPositionAsync()

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })

    }

    function pickOnMapHandler(){
        navigation.navigate('Map')
    }

    let locationPreview = <Text style={{color: 'white'}} >No location set yet.</Text>

    if(pickedLoaction){
        locationPreview = <Image style={styles.image} source={{uri: getMapPreview(pickedLoaction.lat, pickedLoaction.lng)}} />
    }

    return <View>
        <View style={styles.mapPreview} >
            {locationPreview}
        </View>
        <View style={styles.actions} >
            <OutlineButton icon='location' onPress={getLocationHandler} >Locate</OutlineButton>
            <OutlineButton icon='map' onPress={pickOnMapHandler} >Pick on map</OutlineButton>
        </View>
    </View>
}

export default LocationPicker

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary800,
        borderRadius: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
