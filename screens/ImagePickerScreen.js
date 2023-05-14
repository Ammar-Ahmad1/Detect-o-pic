import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Axios from 'axios';

export default function ImagePickerScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Perform any necessary cleanup or initialization
    return () => {
      // Clean up resources, if needed
    };
  }, []);

  const fetchObjects = async (imageUri) => {
    try {
      setIsLoading(true);

      const form = new FormData();
      form.append('image', {
        uri: imageUri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      const response = await Axios.post('http://192.168.1.7:5000/process-image1', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = response.data;
      const label = data.labels;
      const imageBase64 = data.image;
      console.log(label);
      setIsLoading(false);

      navigation.navigate('Detection', { image: imageUri, labels: label, imageBase64 });
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      fetchObjects(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.buttonText}>Take a Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {selectedImage && (
        <View style={styles.imageContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#4B8FD2" />
          ) : (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4B8FD2',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
