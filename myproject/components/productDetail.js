import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const ProductDetail = ({ route, navigation }) => {
    const { productId, userId } = route.params; 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://backendnew-3rgc.onrender.com/api/products/getProduct/${productId}`);
                setProduct(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const handleAddToCart = async () => {
        try {
            const userId = '66b201de06485d23a454a45f'; // Assuming userId is available
            const cartData = {
                userId,
                productId,
                quantity: 1,
            };
    
            await axios.post('https://backendnew-3rgc.onrender.com/api/cart/add', cartData);
            alert('Product added to cart successfully!');
            
            // Navigate to Cart screen after adding to cart
            navigation.navigate('Cart');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart.');
        }
    };
    

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
             {/* <Image source={{ uri: product.image }}  style={styles.productImage} /> */}
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            <Button title="Add to Cart" onPress={handleAddToCart} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    productPrice: {
        fontSize: 20,
        marginBottom: 16,
    },
});

export default ProductDetail;
