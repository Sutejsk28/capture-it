import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import Colors from './constants/GlobalStyles';
import Map from './screens/Map';
import { useEffect, useState } from 'react';
import { init } from './util/database';
import PlaceDetails from './screens/PlaceDetails';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator()

export default function App() {

  const [dbInitialized, setDbInitialized] = useState(false)

  useEffect( ()=>{
    init()
      .then(
        setDbInitialized(true)
      )
      .catch( (err)=>{
        console.log(err)
      })
  }, [] )

  if(!dbInitialized){
    return <AppLoading/>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: {backgroundColor: Colors.secondary100},
        }}
      >
        <Stack.Screen 
          name='AllPlaces' 
          component={AllPlaces} 
          options={({navigation})=> ({
            title: 'All your places',
            headerRight: ({tintColor})=>
              (<IconButton 
                icon="add" 
                size={24} 
                color={tintColor} 
                onPress={()=>navigation.navigate('AddPlace') }
              />),
          })}
          />
        <Stack.Screen 
          name='AddPlace' 
          component={AddPlace} 
          options={{
            title: 'Add a place'
          }}
          />
        <Stack.Screen 
          name='PlaceDetails' 
          component={PlaceDetails}
          options={{
            title: "Loading Place..."
          }}
        />
        <Stack.Screen name='Map' component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
