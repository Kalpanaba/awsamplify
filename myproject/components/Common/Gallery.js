import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

const Gallery = ({ gallery }) => (
  <View style={{ marginTop: 20 }}>
    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Gallery:</Text>
    <ScrollView horizontal>
      {gallery.map((image, index) => (
        <Image key={index} source={{ uri: image }} style={{ width: 100, height: 100, marginHorizontal: 5 }} />
      ))}
    </ScrollView>
  </View>
);

export default Gallery;
