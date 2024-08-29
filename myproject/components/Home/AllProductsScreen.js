import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getProducts } from '../Server/Api';
import BottomView from './Footer';

const AllProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching all products:', error);
      }
    };

    fetchAllProducts();
  }, []);

  const handleProductPress = (productId) => {
    navigation.navigate('ProductDetailScreen', { productId });
  };

  const truncateProductName = (name) => {
    const words = name.split(' ');
    if (words.length > 1) {
      const truncatedSecondWord = words[1].substring(0, 3);
      return `${words[0]} ${truncatedSecondWord} ...`;
    } else {
      return name;
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth * 0.8 ) / 2;

  return (
    <View style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.container}
      vertical
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.productContainer}>
        {products.map(product => (
          <TouchableOpacity key={product._id} onPress={() => handleProductPress(product._id)}>
            <Card containerStyle={[styles.card, { width: cardWidth }]}>
              <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
              <Text style={styles.productName}>{truncateProductName(product.name)}</Text>
              <Text style={styles.productPrice}>₹ {product.price}</Text>
              <Text style={[styles.productPrice, { textDecorationLine: 'line-through' }]}>₹ {product.sale_price}</Text>
              <Button title="ADD" onPress={() => {}} buttonStyle={styles.buttonStyle} titleStyle={styles.titleStyle} />
            </Card>
          </TouchableOpacity>
        ))}
      </View>
     
    </ScrollView>
    <BottomView />
    </View>
    
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 2,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 0,
    marginTop: 5,
  },
  card: {
    marginBottom: 5,
    borderRadius: 9,
    width: '50%',
  },
 
  productImage: {
    width: 'auto',
    aspectRatio: 2,
    borderRadius: 8,
    height:60,
  
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 14,
    color: 'grey',
    fontWeight: 'bold',
    marginTop: 5,
  },
  buttonStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 5,
    borderColor: 'green',
    alignSelf: 'flex-end',
    borderWidth: 2,
    borderColor: 'green',
  },
  titleStyle: {
    color: 'green',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AllProductsScreen;
