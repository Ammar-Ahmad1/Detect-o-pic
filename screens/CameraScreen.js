import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import camera icon 
import { Ionicons } from '@expo/vector-icons';

import { Camera } from 'expo-camera';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      //navigation.navigate('Detection', { image: data.base64 });
      const imageData = data.base64;
    
      fetch('http://192.168.1.7:5000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
        }),
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        console.log(result);
        // navigate to next screen
        // navigation.navigate('Detection', { image: data.base64 });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };

  const cameraRef = React.useRef(null);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              alignItems: 'center',
              borderRadius:5,
              backgroundColor: 'rgba(0,0,0,0.5)',
              marginBottom: 50,
              marginLeft: 100,

            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
              <Ionicons name="camera-reverse" size={32} color="white"/>
            {/* // <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
            //   {' '}
            //   Flip{' '}
            // </Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              alignItems: 'center',
              borderRadius:5,
              backgroundColor: 'rgba(0,0,0,0.5)',
              marginBottom: 50,
              marginLeft: 130,

            }}
            onPress={takePicture}>
            <Ionicons name="camera" size={32} color="white" 
            />
            {/* <Text style={{ fontSize: 12, marginBottom: 10, color: 'white', borderRadius:5}}>
              {' '}
              Take Picture{' '}
            </Text> */}
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  }
});
