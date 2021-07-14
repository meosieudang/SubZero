import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Butterflies, First, Mapbox} from '../screens';

const Stack = createStackNavigator();

const RootContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'First'}>
        <Stack.Screen name="First" component={First} />
        <Stack.Screen name="ButterfliesScreen" component={Butterflies} />
        <Stack.Screen name="MapboxScreen" component={Mapbox} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootContainer;
