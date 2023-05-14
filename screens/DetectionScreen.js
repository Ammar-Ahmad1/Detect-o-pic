import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function DetectionScreen({ route }) {
  const { image, labels, imageBase64 } = route.params;

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Text style={styles.heading}>Detected Objects:</Text>
  {labels.length === 0 ? (
    <Text style={styles.text}>No objects detected</Text>
  ) : (
    Array.from(new Set(labels)).map((label, index) => (
      <Text key={index} style={styles.text}>
        {label}
      </Text>
    ))
  )}
      {imageBase64 && (
        <Image source={{ uri: `data:image/jpeg;base64,${imageBase64}` }} style={styles.segmentedImage} />
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
  segmentedImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
  },
});
