import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { addAddress } from '../Server/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddNewAddressScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [buildingAddress, setBuildingAddress] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressType, setAddressType] = useState('');
  const [selectedAddressType, setSelectedAddressType] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());
    };

    getLocation();
  }, []);

  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);

    setLatitude(location.coords.latitude.toString());
    setLongitude(location.coords.longitude.toString());
  };

  const handleAddressTypeSelection = (type) => {
    setSelectedAddressType(type);
    setAddressType(type.toLowerCase());
  };

  const handleAddAddress = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      const payload = {
        userId: userId,
        name: firstName,
        phoneNumber: phoneNumber,
        buildingAddress: buildingAddress,
        streetAddress: streetAddress,
        city: city,
        state: state,
        postalCode: pincode,
        country: 'India',
        addressType: addressType,
        location: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
      };
      const response = await addAddress(token, payload);
      navigation.navigate('CartSidebar', { selectedAddressId: response._id, selectedAddress: buildingAddress + ', ' + streetAddress + ', ' + city + ', ' + state + ' - ' + pincode });
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} vertical showsVerticalScrollIndicator={true}>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleGetLocation}>
          <Text style={styles.buttonText}>Get Location</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Latitude</Text>
        <TextInput style={styles.input} value={latitude} onChangeText={setLatitude} />
        <Text style={styles.label}>Longitude</Text>
        <TextInput style={styles.input} value={longitude} onChangeText={setLongitude} />

        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} />
        <Text style={styles.label}>Building Address</Text>
        <TextInput style={styles.input} value={buildingAddress} onChangeText={setBuildingAddress} />
        <Text style={styles.label}>Street Address</Text>
        <TextInput style={styles.input} value={streetAddress} onChangeText={setStreetAddress} />
        <Text style={styles.label}>City</Text>
        <TextInput style={styles.input} value={city} onChangeText={setCity} />
        <Text style={styles.label}>State</Text>
        <TextInput style={styles.input} value={state} onChangeText={setState} />
        <Text style={styles.label}>Pincode</Text>
        <TextInput style={styles.input} value={pincode} onChangeText={setPincode} />

        <View style={styles.container}>
          <Text style={styles.label}>Save Address As</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.saveButton, selectedAddressType === 'Home' && styles.selectedButton]}
              onPress={() => handleAddressTypeSelection('Home')}
            >
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, selectedAddressType === 'Office' && styles.selectedButton]}
              onPress={() => handleAddressTypeSelection('Office')}
            >
              <Text style={styles.buttonText}>Office</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, selectedAddressType === 'Other' && styles.selectedButton]}
              onPress={() => handleAddressTypeSelection('Other')}
            >
              <Text style={styles.buttonText}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
          <Text style={styles.buttonText}>Add Address</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexGrow: 1,
    paddingBottom: 2,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    marginTop: 3,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 3,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedButton: {
    backgroundColor: 'green',
  },
  addButton: {
    backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
