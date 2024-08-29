import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getProducts } from '../Server/Api';
import ProductDetailScreen from '../Common/ProductDetailScreen';
//import BottomView from './Footer';

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  

  useEffect(() => {
    const fetchActiveProducts = async () => {
      try {
        const activeProducts = await getProducts();
        setProducts(activeProducts);
      } catch (error) {
        console.error('Error fetching active products:', error);
      }
    };

    fetchActiveProducts();
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

  const handleViewAll = () => {
    navigation.navigate('AllProductsScreen');
  };

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth * 0.8 ) / 2;


 
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      vertical
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.buttonContainer}>
        <Button title="View All" onPress={handleViewAll} buttonStyle={styles.viewAllButton} titleStyle={styles.titleStyle} />
      </View>
      <View style={styles.productContainer}>
      
        {products.map(product => (
          <TouchableOpacity key={product._id} onPress={() => handleProductPress(product._id)} >
           
            <Card containerStyle={[styles.card, { width: cardWidth }]}>
              <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
              <Text style={styles.productName}>{truncateProductName(product.name)}</Text>
              <View style={styles.container1}>
              <Text style={styles.productPrice}>₹ {product.price}</Text>
              <Text style={[styles.productPrice, { textDecorationLine: 'line-through', color: 'red' }]}>₹ {product.sale_price}</Text>
              </View>
              <Text style={{ fontSize: 12, marginTop: 10 }}><Text style={{ fontSize: 15, color: 'black' }}></Text> {product.calories}g</Text>
            </Card>

          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
     
   
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 2,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center', // This aligns items vertically in the center
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 8,
    marginTop: 8,
  },
  viewAllButton: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 5,
    borderColor: 'green',
    borderWidth: 1,
  },
  titleStyle: {
    color: 'green',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    color: 'green',
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
});

export default ProductsView;
