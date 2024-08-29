import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet ,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createOrder , fetchCartItems} from '../Server/Api';
// import socket from '../socket';



export default function Address() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null); 
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`https://hari-hara.onrender.com/user/get-address/${userId}`, {
        });
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);


 
  const handleSelectAddress = (address) => {
    setSelectedAddress(address); 
  };

  const handleProceed = async () => {
    if (selectedAddress) {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const cartItems = await fetchCartItems();
        await createOrder(userId, selectedAddress._id, cartItems);

        // socket.emit("nutritionAction", {
        //   orderId: "663e03343de52fa568520832",
        //   userID: userId,
        // });

        navigation.navigate('ProfilePage');
      } catch (error) {
        Alert.alert('Error', 'Failed to place order');
      }
    } else {
      Alert.alert('Error', 'Please select an address');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectAddress(item)} style={[styles.addressContainer, selectedAddress === item && styles.selectedAddress]}>
      <Text style={styles.addressType}>{item.addressType.charAt(0).toUpperCase() + item.addressType.slice(1)}</Text>
      <Text>{item.buildingAddress}, {item.streetAddress}</Text>
      <Text>{item.city}, {item.state} - {item.postalCode}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Addresses</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNewAddressScreen')}
      >
        <Text style={styles.addButtonText}>+ Add New</Text>
      </TouchableOpacity>
      <FlatList
        data={addresses}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    flexGrow: 1,
  },
  addressContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 5,
    marginBottom: 16,
  },
  selectedAddress: {
    borderColor: 'green', // Change border color to indicate selection
    borderWidth: 2,
  },
  addressType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  proceedButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  proceedText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
