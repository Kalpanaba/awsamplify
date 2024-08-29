import React from 'react';
import { View, Text } from 'react-native';
import Slider from './Slider'; // Import the CartSidebar component


const SliderScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Slider isOpen={true} />
    </View>
  );
};

export default SliderScreen;