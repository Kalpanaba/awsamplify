import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { getProducts, addToCart, fetchCartItems, updateCartItem } from '../Server/Api'; // Importing API functions
import Gallery from './Gallery';
import HeaderView from '../Home/Header';
import BottomView from '../Home/Footer';
import { useNavigation } from '@react-navigation/native';

const ProductDetailScreen = ({ route }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const { productId } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        const foundProduct = products.find(p => p._id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.warn('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    const checkIfInCart = async () => {
      try {
        const cartItems = await fetchCartItems();
        const cartItem = cartItems.find(item => item.productId._id === productId);
        if (cartItem) {
          setQuantity(cartItem.quantity);
          setIsInCart(true);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

   
    fetchProduct();
    checkIfInCart();
  }, [productId]);
   

  
  const handleAddToCart = async () => {
    try {
      await addToCart(productId, quantity);
      setIsInCart(true);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  // const handleQuantityChange = (change) => {
  //   const newQuantity = Math.max(quantity + change, 1);
  //   setQuantity(newQuantity);
  // };
  

  const handleQuantityChange = async (change) => {
    const newQuantity = Math.max(quantity + change, 1);
    setQuantity(newQuantity);
    if (isInCart) {
      try {
        await updateCartItem(productId, newQuantity);
      } catch (error) {
        console.error('Error updating cart item quantity:', error);
      }
    }
  };


  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderView isProductDetailPage={true} handleBackButtonPress={handleBackButtonPress} />
      <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingTop: 5 }}>
        {product && (
          <View style={{ padding: 20 }}>
            <Image source={{ uri: product.imageUrl }} style={{ width: '100%', aspectRatio: 4 / 3 }} />
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10, color: 'black' }}>{product.name}</Text>
            <Text style={{ fontSize: 18, marginTop: 10 }}>{product.description}</Text>
            <Text style={{ fontSize: 17, marginTop: 10 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Price: ₹</Text>{product.price}</Text>
            <Text style={{ fontSize: 17, marginTop: 10 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Sale Price: ₹</Text>{product.sale_price}</Text>
            {product.gallery.length > 0 && <Gallery gallery={product.gallery} />}
            <Text style={{ fontSize: 17, marginTop: 10 }}><Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Calories:</Text> {product.calories}</Text>
            {/* Add more details as needed */}
          </View>
        )}
      </ScrollView>

      {product && (
        <View style={styles.addToCartContainer}>
          {!isInCart ? (
            <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.quantitySection}>
              <TouchableOpacity onPress={() => handleQuantityChange(-1)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={() => handleQuantityChange(1)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <BottomView />
    </View>
  );
};

const styles = StyleSheet.create({
  addToCartContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#5BB052', 
    paddingVertical: 16,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginBottom: 90,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 16,
  },
});

export default ProductDetailScreen;
