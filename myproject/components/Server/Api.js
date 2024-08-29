import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://hari-hara.onrender.com';


export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get/products`);
    return response.data.allProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchBanners = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get/banner-images`);
    return response.data.activeBanners;
  } catch (error) {
    console.error('Error fetching banners:', error);
    throw error;
  } 
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const fetchCartItems = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
   
       const userId = await AsyncStorage.getItem('userId');
     const response = await fetch(`${BASE_URL}/get/cart/${userId}`);
    const data = await response.json();
    console.log("hello :", data);
    return data.products;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};
//

//
export const addToCart = async (productId, quantity) => {
  try {
   // console.log("inside",AsyncStorage.getItem('token'));
  
   // console.log('new token',token)
    const userId = await AsyncStorage.getItem('userId');
    console.log('usss',userId)
    const token = await AsyncStorage.getItem('token');
    console.log("hey",token);
    const response = await axios.post(
      `${BASE_URL}/add/cart`,
      {
        userId,
        product: {
          productId,
          quantity,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    console.error('Error response data:', error.response.data);
    console.error('Error response status:', error.response.status);
    console.error('Error response headers:', error.response.headers);
    throw error;
  }
};

export const getUserIdFromToken = (token) => {
  if (!token) {
    throw new Error('Token is missing');
  }
  const tokenParts = token.split('.');
  //const payload = JSON.parse(atob(tokenParts[1]));
  

  const base64Url = tokenParts[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  // Decode base64
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  const payload = JSON.parse(jsonPayload);
  return payload._id;
};
export const addAddress = async (token, payload) => {
  const url = `${BASE_URL}/user/create-address`;
  console.log("payload",payload);
  try {
    const response = await axios.post(
      url,
      payload, // This is the correct position for the payload
      {
        headers: {
          Authorization: token, // Directly use the token
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      }
    );

    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
   
    console.error('Error config:', error.config);

    throw error; // Re-throw the error after logging it
  }
};

export const deleteCartItem = async (userId, productId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const url = `${BASE_URL}/delete/cart/${userId}/${productId}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};

export const updateCartItem = async (productId, quantityChange) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userId = getUserIdFromToken(token);
    const response = await axios.put(
      `${BASE_URL}/update/cart/${userId}/${productId}`,
      { quantity: quantityChange },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.products;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  } 
};
