import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CameraScreen from './screens/CameraScreen';
import ImagePickerScreen from './screens/ImagePickerScreen';
import DetectionScreen from './screens/DetectionScreen';
import FrontPage from './screens/FrontPage';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator > 
      <Stack.Screen
      name="FrontPage"
      component={FrontPage}
      options={{ title: 'Detect-o-Pic' }}
    />
      <Stack.Screen
      name="Camera"
      component={CameraScreen}
      options={{ title: 'Take a Picture' }}
    /> 
      <Stack.Screen
      name="ImagePicker"
      component={ImagePickerScreen}
      options={{ title: 'Select Image' }}
    />
    <Stack.Screen
      name="Detection"
      component={DetectionScreen}
      options={{ title: 'Detection Result' }}
    />
    

  </Stack.Navigator>
</NavigationContainer>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
},
});
