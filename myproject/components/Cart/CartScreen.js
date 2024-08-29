import React from 'react';
import { View, Text } from 'react-native';
import CartSidebar from './CartSidebar'; // Import the CartSidebar component


const CartScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <CartSidebar isOpen={true} />
  
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text></Text>
      </View>
    </View>
  );
};

export default CartScreen;