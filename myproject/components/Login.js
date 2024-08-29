import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigation = useNavigation(); 


    const handleLogin = async () => {
        try {
            const response = await axios.post('https://backendnew-3rgc.onrender.com/api/auth/login', {
                email: userId,
                password
            });
            console.log(response.data);
            // Assuming login was successful, navigate to Home screen
            navigation.replace('Home'); // Use replace to avoid going back to the login screen
        } catch (error) {
            if (error.response) {
                console.error('Error Response:', error.response.data);
                Alert.alert('Login Error', error.response.data.msg);
            } else if (error.request) {
                console.error('Error Request:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    };
    

    return (
        <ImageBackground
            source={{ uri: 'https://th.bing.com/th/id/OIP.94F7QfaKJV9lCnMalLx3ngAAAA?w=115&h=180&c=7&r=0&o=5&pid=1.7' }}
            style={styles.background}
        >
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="User ID"
                    placeholderTextColor="#aaa"
                    value={userId}
                    onChangeText={setUserId}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <View style={styles.rememberMeContainer}>
                    <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                        <Text style={styles.rememberMeText}>
                            {rememberMe ? '☑' : '☐'} Remember Me
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                        Don't have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerLink}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%"
    },
    container: {
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        color: '#000',
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberMeText: {
        fontSize: 16,
        color: '#000',
    },
    loginButton: {
        backgroundColor: 'violet', 
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
    },
    registerText: {
        fontSize: 16,
        color: '#000',
    },
    registerLink: {
        fontSize: 16,
        color: 'violet',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
