import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchBannersCategoriesAndProducts = async () => {
            try {
                const bannersResponse = await axios.get('https://backendnew-3rgc.onrender.com/api/banners/getBanners');
                const categoriesResponse = await axios.get('https://backendnew-3rgc.onrender.com/api/categories/getCategories');
                const productsResponse = await axios.get('https://backendnew-3rgc.onrender.com/api/products/getProducts');
                setBanners(bannersResponse.data.data);
                setCategories(categoriesResponse.data.data);
                setProducts(productsResponse.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching banners, categories, or products:', error);
                setLoading(false);
            }
        };
    
        fetchBannersCategoriesAndProducts();
    }, []);

    const _renderBannerItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Image source={{ uri: item.image }} style={styles.bannerImage} />
            </View>
        );
    };

    const _renderCategoryItem = ({ item }) => {
        return (
          
            <View style={styles.categoryBox}>
                <Image 
                    source={{ uri: 'https://placehold.co/50x50' }} // Replace with `item.image` when available
                    style={styles.categoryImage} 
                />
                <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          
        );
    };

    const _renderProductItem = (product) => {
        return (
           
            <TouchableOpacity 
                key={product._id} 
                style={styles.productBox}
                onPress={() => navigation.navigate('ProductDetail', { productId: product._id })}
            >
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.productName}>{product.name}</Text>
            </TouchableOpacity>
        
        );
        
    };

    if (loading) {
        return <Text>Loading banners, categories, and products...</Text>;
        
    }
     
    return (
        <ScrollView>
            <Carousel
                data={banners}
                renderItem={_renderBannerItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth}
                loop={true}
                autoplay={true}
                autoplayInterval={3000}
            />
            <Carousel
                data={categories}
                renderItem={_renderCategoryItem}
                sliderWidth={screenWidth}
                itemWidth={100}
                loop={true}
                autoplay={true}
                autoplayInterval={2500}
                layout={'default'}
            />
            <Text style={styles.productsHeading}>Products</Text>
            <View style={styles.productsContainer}>
                {products.map(_renderProductItem)}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    slide: {
        backgroundColor: 'white',
        borderRadius: 8,
        height: 200,
        padding: 30,
        marginTop: 20,
        alignItems: 'center',
    },
    bannerImage: {
        width: screenWidth - 40,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    categoriesHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    categoryBox: {
        width: 80,
        height: 80,
        backgroundColor: '#e6e6e6',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginVertical: 10,
    },
    categoryImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 5,
    },
    categoryText: {
        fontSize: 14,
        textAlign: 'center',
    },
    productsHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    productBox: {
        width: '45%',
        marginBottom: 20,
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Banner;
