import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isProceedVisible, setIsProceedVisible] = useState(false);

  const fetchCartItems = async () => {
    try {
      const userId = '66b201de06485d23a454a45f'; 
      const response = await axios.get(`https://backendnew-3rgc.onrender.com/api/cart/${userId}`);
      console.log("cart response:", response);
      
      const items = response.data.data.cart.items;

      setCartItems(items);
      setIsProceedVisible(items.length > 0);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCartItems();
    }, [])
  );

  const handleProceed = async () => {
    alert('Order placed successfully!');
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.productImage }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.productPrice}>{item.quantity} x ${item.price}</Text>
      </View>
      <Button title="Remove" onPress={() => handleRemoveItem(item._id)} />
    </View>
  );

  const handleRemoveItem = async (itemId) => {
    try {
      const userId = '66b201de06485d23a454a45f';
      await axios.delete(`https://backendnew-3rgc.onrender.com/api/cart/${userId}/${itemId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      alert('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item from cart.');
    }
  };

  return (
    <View style={styles.cartContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={30} color="black" />
      </TouchableOpacity>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.cartList}
      />
      {isProceedVisible && (
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'black',
  },
  proceedButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },
  proceedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
