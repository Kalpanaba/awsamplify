import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView ,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const OrderContext = React.createContext();

const OrderDetailScreen = ( { route } ) => {
    const { order } = route.params;
    const orderID = order.orderID;
    console.log('Received order:', orderID);
    const [ord, setOrder] = useState(null);
    // Access the order data from the context
   // const order = useContext(OrderContext);
   // const formattedDate = moment.format('ddd, DD MMM YY, hh:mm A');
//    useEffect(() => {
//     // Fetch order details based on orderID
//     fetch(`https://hari-hara.onrender.com/order/single/${orderID}`)
//         .then(response => response.json())
//         .then(data => {
//             setOrder(data.ord);
//         })
//         .catch(error => console.error('Error fetching order:', error));
// }, [orderID]);

  const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="green" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
        </View>
        <ScrollView style={styles.content}>
          <Text style={styles.successMessage}>Yay! Order successfully delivered</Text>
          {/* //<Text style={styles.placedOn}>Placed on {formattedDate.toLowerCase()}</Text> */}
          <View style={styles.paymentMode}>
            <Text>Payment mode</Text>
            <Text style={styles.paidOnline}>Paid online</Text>
          </View>
          <View style={styles.container}>
            {order && (
                <View>
                    <Text>Order ID: {order.orderID}</Text>
                    {order.products.map(product => (
                        <View key={product._id} style={styles.card}>
                            <Image source={{ uri: product.productId.imageUrl }} style={styles.image} />
                            <View style={styles.details}>
                                <Text>{product.productId.name}</Text>
                                <Text>Quantity: {product.cartQuantity}</Text>
                                <Text>Price: ₹{product.productId.price}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </View>
          <View style={styles.address}>
            <Text>Delivery address</Text>
            <Text>{order.email}</Text>
          </View>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Customer Support</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  successMessage: {
    color: 'green',
    fontWeight: 'bold',
  },
  placedOn: {
    color: 'gray',
    marginBottom: 20,
  },
  paymentMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paidOnline: {
    color: 'green',
  },
  items: {
    marginBottom: 20,
  },
  itemsTitle: {
    fontWeight: 'bold',
  },
  orderId: {
    color: 'gray',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  address: {
    marginBottom: 20,
  },
  supportButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  supportButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  //
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
},
card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
},
image: {
    width: 80,
    height: 80,
    marginRight: 10,
},
details: {
    flex: 1,
},
//
});


const OrderDetailScreenWithContext = ({ navigation }) => (
    <OrderContext.Provider >
      <OrderDetailScreen navigation={navigation} />
    </OrderContext.Provider>
  );



export default OrderDetailScreen;
