
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Axios from 'axios';
export default function DetectionScreen({ route }) {
  const { image } = route.params;
  console.log(image);
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const form = new FormData();
        form.append('image', {
            uri: image,
            name: 'image.jpg',
            type: 'image/jpeg',
          });
        // const response = await Axios.post('http://localhost:5000/process-image', form);
        // // const json = await response.json();
        // // setObjects(json.objects);
      
          fetch('http://localhost:5000/process-image1', {
            method: 'POST',
            body: form,
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
            .then(response => {
              // Handle the response from the server
              console.log(response);
            })
            .catch(error => {
              // Handle any errors that occur during the request
              console.error(error,"error hereeeee");
            });
    } catch (error) {
        console.error(error.message);
      }
    };
    fetchObjects();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: `data:image/png;base64,${image}` }} style={styles.image} /> */}
      <Text style={styles.heading}>Detected Objects:</Text>
      {objects.length === 0 ? (
        <Text style={styles.text}>No objects detected</Text>
      ) : (
        objects.map((object, index) => (
          <Text key={index} style={styles.text}>
            {object.class}: {Math.round(object.confidence * 100)}%
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
