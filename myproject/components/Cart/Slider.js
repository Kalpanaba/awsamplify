import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, TextInput } from 'react-native';

const Slider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      openSlider();
    } else {
      closeSlider();
    }
  }, [isOpen]);

  const openSlider = () => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSlider = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleSliderClick = () => {
    setIsOpen(!isOpen);
  };

  const sliderTranslateX = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0], 
  });

  return (
    <Animated.View style={[styles.sliderContainer, { transform: [{ translateX: sliderTranslateX }] }]}>
      <TouchableOpacity onPress={handleSliderClick} style={styles.closeButton}>
        <Text>X</Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Shop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>My Account</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 350,
    height: '100%',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  searchContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  menuText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Slider;
