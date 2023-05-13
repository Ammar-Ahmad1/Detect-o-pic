import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Axios from 'axios';

export default function DetectionScreen({ route }) {
  const { image } = route.params;
  const [objects, setObjects] = useState([]);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const form = new FormData();
        form.append('image', {
          uri: image,
          name: 'image.jpg',
          type: 'image/jpeg',
        });

        const response = await Axios.post('http://192.168.1.7:5000/process-image1', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const data = response.data;
        const label = data.label;
        const confidence = data.confidence;
        const imageBase64 = data.image;

        setObjects([{ label, confidence }]);
        setImg(`data:image/jpeg;base64,${imageBase64}`);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchObjects();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={styles.image} />
      <Text style={styles.heading}>Detected Objects:</Text>
      {objects.length === 0 ? (
        <Text style={styles.text}>No objects detected</Text>
      ) : (
        objects.map((object, index) => (
          <Text key={index} style={styles.text}>
            {object.label}: {Math.round(object.confidence * 100)}%
          </Text>
        ))
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
