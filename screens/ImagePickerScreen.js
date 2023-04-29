import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        navigation.navigate('Detection', { image: result.assets[0].uri });
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
    <Image source={{ uri: selectedImage }} style={styles.image} />
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
    image: {
    width: 200,
    height: 200,
    marginTop: 20,
    },
    });      