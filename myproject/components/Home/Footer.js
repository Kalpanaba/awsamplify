import React from 'react';
import { View, StyleSheet, TouchableOpacity ,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, Text } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


const menuItems = [
  { name: 'Home', iconName: 'home' },
  { name: 'Cart', iconName: 'basket' },
  { name: 'Profile', iconName: 'person' },
];

const BottomView = () => {
  const navigation = useNavigation(); // Get navigation object

  const handleMenuItemPress = async(itemName) => {
    // Handle menu item press here
   

    if (itemName === 'Cart') {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          Alert.alert('You are already registered');
          
          navigation.navigate('Login'); // Navigate to the Home screen or any other appropriate screen
        } else {
          navigation.navigate('SignUp'); // Navigate to the SignUp screen if no token is found
       }
      } catch (error) {
        console.error('Error checking token:', error);
        Alert.alert('Error', 'Failed to check token. Please try again.');
      }
      return;
    }
    // if (itemName === 'Cart') {
    //   navigation.navigate('SignUp'); // Navigate to the SignUp screen
    // }

      // Handle menu item press here
      console.log(`Pressed: ${itemName}`);
      if (itemName === 'Profile') {

    
    try {
// console.log(AsyncStorage.getItem('userId'));
const userId = await AsyncStorage.getItem('userId');
      console.log("inside profile",userId);
      if (userId === null || userId === undefined) {
      
        Alert.alert('Login Required', 'Please log in to view your profile.');
      } else {
       
        navigation.navigate('ProfilePage');
      }
    } catch (error) {
      // Handle error by displaying an alert
      console.error('Error retrieving userId:', error);
      Alert.alert('Error', 'Failed to retrieve userId. Please try again.');
    }  
  };

        //navigation.navigate('ProfilePage'); // Navigate to the Sign In screen
      
      
      console.log(`Pressed: ${itemName}`);
      if (itemName === 'Home') {
        navigation.navigate('Home'); // Navigate to the Sign In screen
      } 
  };  
  return (
    <View style={styles.footer}>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem} 
            onPress={() => handleMenuItemPress(item.name)}>
            <Icon name={item.iconName} type="ionicon" size={24} color="black" />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Ensure children stack vertically
  },
  footer: {
    width: '100%',
    // backgroundColor: 'white',
     shadowColor: '#000',
   // position: 'fixed',
    flexDirection: 'column', //
    left: 0,
    right: 0,
   // bottom: 0,
    height: 100,
    shadowOffset: {
      width: 0,
      height: -1, 
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    borderTopWidth: 0,
    borderTopColor: '#ccc',
    position: 'fixed',
    bottom: 0,
   
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 4,
  },
  menuItem: {
    alignItems: 'center',
    marginTop: 20,
  },
  menuText: {
    fontSize: 10,
    marginTop: 9,
  },
});

export  default   BottomView ;
