import React, {useEffect,useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Alert,Animated } from 'react-native';
import { Header, Input } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CartSidebar from '../Cart/CartSidebar';
import { fetchCartItems } from '../Server/Api'; 
//import Slider from '../Cart/Slider';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HeaderView = ({ isHomePage, handleBackButtonPress, isSignupPage , isProductDetailPage,isProfilePage}) => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
 const [cartItemCount, setCartItemCount] = useState(0);
  const navigation = useNavigation();


  
  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
    navigation.navigate('SliderScreen');
  };


  useEffect(() => {
    const updateCartCountAsync = async () => {
      try {
        const itemCount = await fetchCartItems();
        console.log('Fetching cart items:', itemCount.length);
        setCartItemCount(itemCount.length);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
         
    updateCartCountAsync();
  }, [fetchCartItems]);
  

  const handleCartIconClick = async() => {

    setIsCartOpen(!isCartOpen);
    console.log("header inside ",isCartOpen);

      navigation.navigate('CartScreen');
    
    // try {

    //   const userId = await AsyncStorage.getItem('userId');
      
                
    //   // Check if userId is null or undefined
    //   if (userId === null || userId === undefined) {
       
    //     // Display an alert message if userId is null or undefined
    //     Alert.alert('Login Required', 'Please log in to view your cart.');
    //     navigation.navigate('Login');
    //   } else {
    //     // If the userId is available, show the cart
    //    // setShowCart(true);
    //     navigation.navigate('CartScreen');
    //   }
    // } catch (error) {
    //   // Handle error by displaying an alert
    //   console.error('Error retrieving userId:', error);
    //   Alert.alert('Error', 'Failed to retrieve userId. Please try again.');
    // }
  };

  const handleCloseButtonClick = () => {
    setIsCartOpen(false);
  };
  

  return (
    <View>
          <Header
            containerStyle={styles.headerContainer}
            leftComponent ={
              isHomePage ? (
                <View style={styles.leftComponent}>
                  <View style={styles.iconContainer}>
                    <FontAwesome name="clock-o" size={24} color="white" />
                  </View>
                  {/* <Text style={styles.deliveryText} numberOfLines={0.1}>Deliveryin 16mint</Text> */}
                </View>
              ) : isSignupPage ? (
                <View style={styles.leftComponent}>
                  <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleBackButtonPress}>
                   <FontAwesome name="arrow-left" size={20} color="white" width={50}  marginRight= '10' />
                   
                              </TouchableOpacity>
                              </View>
                              <Text style={styles.title}>Signup</Text>
                   
                   </View>
                
              )
     : isProductDetailPage ? (
              
    
    <View style={styles.leftComponent}>
    <View style={styles.iconContainer}>
    <TouchableOpacity onPress={handleBackButtonPress}>
     <FontAwesome name="arrow-left" size={20} color="white" width={50}  marginRight= '10' />
     
                </TouchableOpacity>
                </View>
                <Text style={styles.title}>ProductDetail</Text>
     
     </View>
         ) :           isProfilePage ? (
                <View style={styles.leftComponent}>
                  <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleBackButtonPress}>
                   <FontAwesome name="arrow-left" size={20} color="white" width={50}  marginRight= '10' />
                   
                              </TouchableOpacity>
                              </View>
                              <Text style={styles.title}>Profile</Text>
                   
                   </View>
                
              ):
              (
               
                <View style={styles.leftComponent}>
    <View style={styles.iconContainer}>
    <TouchableOpacity onPress={handleBackButtonPress}>
     <FontAwesome name="arrow-left" size={20} color="white" width={50}  marginRight= '10' />
     
                </TouchableOpacity>
                </View>
                <Text style={styles.title}>Login</Text>
     
     </View>
              ) 
    
            }
            centerComponent={
               isHomePage ? (
                <View style={styles.centerComponent}>
                  <View style={styles.searchBarContainer}>
                    <Input
                      placeholder="Search..."
                      inputContainerStyle={styles.inputContainer}
                      rightIcon={<FontAwesome name="search" size={15} color="gray" />}
                    />
                  </View>
                </View>
                 )
    
                
            //      : (
            //       isProductDetailPage ? (
            //          <View>
            //           <Text style={styles.title}>Product Detail</Text>
            //           <TouchableOpacity onPress={handleBackButtonPress}>
            //             {/* <FontAwesome name="angle-left" size={23} color="white" /> */}
            //           </TouchableOpacity>
            //         </View>
            //  ) 
              : (
                <View style={styles.centerComponent}>
              {isSignupPage ? <Text style={styles.title}></Text> : <Text style={styles.title}></Text>}
                </View> 
              )
              }
                      
            rightComponent={
              <View style={styles.rightComponent}>
                   <View style={styles.header}>
                        <TouchableOpacity onPress={handleCartIconClick }>
                        <View style={styles.iconContainer2}>
                           <FontAwesome name="shopping-cart" size={20} color="white" style={styles.icon} />
                           <View >
                                <Text style={styles.cartItemCount}>{cartItemCount}</Text>
                          </View>
                        </View>
                        </TouchableOpacity>
                        {/* {isCartOpen && <CartSidebar isOpen={isCartOpen} />} */}
                   </View> 
                   <View style={styles.header}> 
                   <TouchableOpacity onPress={toggleSlider}>
                  <View style={styles.iconContainer2}>
                    <FontAwesome name="bars" size={24} color="white" style={styles.icon} />
                    {/* {isSliderOpen && <Slider />} */}
                  </View>
                </TouchableOpacity>
                
             </View>
              </View>
            }
          />
        </View>
      );
    };
    
    
  
  
  
 



const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#5BB052',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    height: 'auto', // Set height to auto
    width: 'auto',
    paddingBottom: -6, // Remove or set paddingBottom to 0
  },
  
  menuButton: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
   // backgroundColor: '#ccc', // Default background color
    borderRadius: 5,
  },
  deliveryText: {
    color: 'white',

    fontSize: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 15,
  },
  
  menuButtonActive: {
    backgroundColor: 'blue', // Change background color when active
  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 9,
  },
  centerComponent: {
    marginLeft: 0,
  },
  
  cartItemCountContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCount: {
    color: 'white',
    fontSize: 12,
  },
  iconContainer2: {
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 7,
  }, 
  iconContainer: {
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 15,
  },

  rightComponent: {
    flexDirection: 'row',
  },
  leftComponent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
 
  icon: {
    marginHorizontal: 6,
    paddingTop: 10,
  },
  searchBarContainer: {
    width: width * 0.9,
    paddingTop: 60,
    paddingBottom: 1,
  },
  inputContainer: {
    borderBottomWidth: 3,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 6,
    Width: 'full',
    height: 50,
  },
});

export default HeaderView;
