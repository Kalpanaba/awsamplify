import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchCartItems, deleteCartItem, updateCartItem, createOrder } from '../Server/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartSidebar = ({ isOpen, addressId, selectedAddress }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCartItemsWithToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('You are not logged in');
          navigation.navigate('Login');
          return;
        }

        const data = await fetchCartItems();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (isOpen) {
      fetchCartItemsWithToken();
    }
  }, [isOpen, navigation]);

  const handleQuantityChange = async (productId, quantity) => {
    try {
      await updateCartItem(productId, quantity);
      const updatedCartItems = await fetchCartItems();
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      await deleteCartItem(userId, productId);
      fetchCartItems().then(data => setCartItems(data));
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.productId.sale_price * item.quantity, 0);
  };

  const handleProceed = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (selectedAddress) {
        await createOrder(userId, addressId, cartItems);
      } else {
        navigation.navigate('Address');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to place order');
    }
  };

  return (
    <View style={[styles.container, isOpen ? styles.show : styles.hide]}>
      <View style={styles.header}>
        <Text style={styles.deliveryText}>Delivery in 10 minutes</Text>
        <Text style={styles.itemCountText}>{getTotalItems()} items</Text>
      </View>
      {selectedAddress && (
        <View style={styles.selectedAddressContainer}>
          <Text style={styles.selectedAddressTitle}>Delivering to {selectedAddress.addressType}</Text>
          <Text>{selectedAddress.buildingAddress}</Text>
        </View>
      )}
      <ScrollView style={styles.content}>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <View key={item.productId._id} style={styles.itemContainer}>
              <Image source={{ uri: item.productId.imageUrl }} style={styles.image} />
              <View style={styles.itemDetails}>
                <Text style={styles.productName}>{item.productId.name}</Text>
                <Text style={styles.weight}>{item.productId.weight}gm</Text>
                <View style={styles.priceSection}>
                  <Text style={styles.salePrice}> ₹{item.productId.sale_price}</Text>
                  <Text style={styles.price}> ₹{item.productId.price}</Text>
                </View>
                <View style={styles.quantitySection}>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.productId._id, item.quantity - 1)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(item.productId._id, item.quantity + 1)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleDeleteItem(item.productId._id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>×</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedText}>{getTotalItems()} items - ₹{getTotalPrice()} Proceed {'>>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 0,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deliveryText: {
    fontSize: 14,
    color: '#888',
  },
  itemCountText: {
    fontSize: 14,
    color: '#888',
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  show: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weight: {
    marginBottom: 5,
  },
  priceSection: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  salePrice: {
    marginRight: 10,
  },
  price: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  quantity: {
    marginHorizontal: 10,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  deleteText: {
    fontSize: 20,
    color: '#888',
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  proceedButton: {
    position: 'absolute',
    bottom: 20,
    left: '5%',
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '90%',
    alignItems: 'center',
  },
  proceedText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CartSidebar;
