import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomView from './Footer';
import { useNavigation } from '@react-navigation/native';
import HeaderView from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import { fetchAddresses, deleteAddress, fetchOrders } from '../Server/Api'; // Assume fetchOrders is implemented in your API

const getIconName = (addressType) => {
  switch (addressType) {
    case 'Home':
      return 'home';
    case 'Office':
      return 'building';
    default:
      return 'map-marker';
  }
};

const AddressEntry = ({ address, onEdit, onDelete }) => {
  const iconName = getIconName(address.addressType);
  return (
    <View style={styles.addressEntry}>
      <View style={styles.addressIcon}>
        <Icon name={iconName} size={20} color="green" />
      </View>
      <View style={styles.addressDetails}>
        <Text>{address.addressType}</Text>
        <Text>{address.streetAddress}, {address.city}, {address.state}, {address.country}</Text>
      </View>
      <View style={styles.addressOptions}>
        <TouchableOpacity onPress={() => onEdit(address._id)}>
          <Icon name="edit" size={20} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(address._id)}>
          <Icon name="trash" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const OrderEntry = ({ order,onViewDetail }) => {
  const formattedDate = moment(order.createdAt).format('ddd, DD MMM YY, hh:mm A');
  const truncatedOrderId = `ORD0${order._id.substring(0, 8)}`;
return (
  <View style={styles.orderEntry}>

  <View style={styles.orderTopRow}>
    <Icon name="shopping-cart" size={20} color="green" />
    <View style={styles.deliveryStatus}>
          <Text style={styles.deliveryStatusText}>Delivered</Text>
        </View>
  </View>
 
  <View style={styles.orderInfo}>
    <Text style={styles.orderId}>{truncatedOrderId}</Text>
    <Text style={styles.orderTotal}>₹{order.totalAmount}</Text>
  </View>
  <View style={styles.orderBottomRow}>
    <Text style={styles.orderDate}>Placed on {formattedDate.toLowerCase()}</Text>
    <TouchableOpacity style={styles.viewDetail} onPress={() => onViewDetail(order)}>
      <Icon name="eye" size={15} color="green" />
      <Text style={styles.viewDetailText}>View Detail</Text>
    </TouchableOpacity>
  </View>
</View>
);
};

const ProfilePage = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentView, setCurrentView] = useState('addresses'); // 'addresses' or 'orders'

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const fetchedAddresses = await fetchAddresses();
        setAddresses(fetchedAddresses);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    const getOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
        console.log('ADDRESS ORD',orders)
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (currentView === 'addresses') {
      getAddresses();
    } else if (currentView === 'orders') {
      getOrders();
    }
  }, [currentView]);

  const handleAddNewAddress = async () => {
    navigation.navigate('AddNewAddressScreen');
  };

  const handleEditAddress = (addressId) => {
    console.log('Edit address with id:', addressId); 
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const success = await deleteAddress(addressId);
      if (success) {
        setAddresses(prevAddresses => prevAddresses.filter(address => address._id !== addressId));
        Alert.alert('Success', 'Address deleted successfully');
      } else {
        Alert.alert('Error', 'Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      Alert.alert('Error', 'An error occurred while deleting the address');
    }
  };




  const handleLogout = async () => {
    try {
  
      // const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      await AsyncStorage.removeItem(token);
      
      Alert.alert('Logout', 'You have logged out successfully', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'An error occurred while logging out');
    }
  };

  const handleViewDetail = (order) => {
    console.log('HELLO ORDER',order)
   
     navigation.navigate('OrderDetailScreen', { order });
    // navigation.navigate('OrderDetailScreen', { order: selectedOrder });

  };

  return (
    <View style={styles.container}>
      <HeaderView isProfilePage={true} />
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => setCurrentView('addresses')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconWrapper}>
                <Icon name="address-book-o" size={20} color="green" />
              </View>
              <Text style={styles.iconText}>Address</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentView('orders')}>
            <View style={styles.iconContainer}>
              <View style={styles.iconWrapper}>
                <Icon name="shopping-bag" size={20} color="green" />
              </View>
              <Text style={styles.iconText}>My Order</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.iconContainer}>
              <View style={styles.iconWrapper}>
                <Icon name="sign-out" size={20} color="green" />
              </View>
              <Text style={styles.iconText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>

        {currentView === 'addresses' && (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <Text style={{ fontWeight: 'bold' }}>My Address</Text>
              <TouchableOpacity onPress={handleAddNewAddress}>
                <View style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Add New</Text>
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ marginTop: 20 }}>
              {addresses.map(address => (
                <AddressEntry
                  key={address._id}
                  address={address}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                />
              ))}
            </ScrollView>
          </>
        )}

        {currentView === 'orders' && (
          <ScrollView style={{ marginTop: 20 }}>
            {orders.map(order => (
              <OrderEntry
                key={order._id}
                order={order}
                onViewDetail={handleViewDetail}
              />
            ))}
          </ScrollView>
        )}
      </View>
      <BottomView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    padding: 10,
    marginBottom: 5,
  },
  iconText: {
    textAlign: 'center',
  },
  viewDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailText: {
    color: 'green',
    fontSize: 12,
    marginLeft: 5,
  },
  
  deliveryStatus: {
    backgroundColor: '#d4edda', // Light green background
    padding: 2,
    borderRadius: 3,
    marginBottom: 5,
    marginLeft:6
  },
  deliveryStatusText: {
    color: 'green',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  orderEntry: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  orderTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  orderBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 14,
    color: 'gray',
  },
  addButton: {
    backgroundColor: 'green',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  addressEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  addressIcon: {
    marginRight: 10,
  },
  addressDetails: {
    flex: 1,
  },
  addressOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  addButtonText: {
    color: 'white',
  },
});



// // Wrap the OrderDetailScreen with the OrderContext.Provider
// const OrderDetailScreenWithContext = ({ navigation }) => (
//   <OrderContext.Provider value={/* Provide the order data here */}>
//     <OrderDetailScreen navigation={navigation} />
//   </OrderContext.Provider>
// );



export default ProfilePage;
