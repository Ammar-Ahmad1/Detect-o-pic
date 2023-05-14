import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isLoading, setIsLoading] = useState(false);

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

      // Convert the captured image to base64
      const imageData = data.base64;
      const formData = new FormData();
      formData.append('image', {
        uri: data.uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      // Send the image data to the server
      fetch('http://192.168.1.7:5000/process-image1', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(result => {
          console.log('Success:', result);
          const data = result;
          const label = data.labels;
          // const confidence = data.confidence;
          const imageBase64 = data.image;
          setIsLoading(false); // Set isLoading to false when image processing is completed

          // console.log(label);
          navigation.navigate('Detection', { labels: label, imageBase64 });
        })
        .catch(error => {
          console.error('Error:', error);
          setIsLoading(false); // Set isLoading to false in case of an error

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
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Ionicons name="camera-reverse" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" /> // Display loading indicator while isLoading is true
            ) : (
              <Ionicons name="camera" size={32} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
