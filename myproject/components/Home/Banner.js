import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { fetchBanners } from '../Server/Api';

const BannerView = () => {
  const [banners, setBanners] = useState([]);
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchBannersData = async () => {
      try {
        const fetchedBanners = await fetchBanners();
        setBanners(fetchedBanners);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } 
    };

    fetchBannersData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.bannerContainer}>
      <Image source={{ uri: item.bannerImageUrl }} style={styles.bannerImage} resizeMode="cover" />
    </View>
  ); 

  return (
    <View style={styles.container}>
      <Carousel
        data={banners}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        autoplay={true}
        loop={true}
        autoplayInterval={2000}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7, 
    justifyContent: 'flex-start', 
  },
  bannerContainer: {
    alignItems: 'center',
  },
  bannerImage: {
    width: '95%',
    aspectRatio: 4 / 3,
    borderRadius: 10,
    marginVertical: 10, // Adjust vertical margin if needed
  },
});

export default BannerView;