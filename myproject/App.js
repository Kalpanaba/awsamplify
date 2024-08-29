import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import LoginScreen from './components/Login';
import RegisterScreen from './components/Register';
import Header from './components/Header';
import Banner from './components/Banner';
import ProductDetail from './components/productDetail';
import Cart from './components/Cart';




const Stack = createStackNavigator();



const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Header />
                <Banner />
            </ScrollView>
        </SafeAreaView>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Register" 
                    component={RegisterScreen} 
                    options={{ headerShown: true }} 
                />
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="ProductDetail" 
                    component={ProductDetail} 
                    options={{ title: 'Product Details' }} 
                />
                <Stack.Screen 
                    name="Cart" 
                    component={Cart} 
                    options={{ title: 'Your Cart' }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollViewContent: {
        paddingBottom: 50, 
    },
    section: {
        marginBottom: 20,
    },
});

export default App;
