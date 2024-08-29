import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); 
    

    const handleRegister = async () => {
        try {
            const response = await axios.post('https://backendnew-3rgc.onrender.com/api/auth/register', {
                username,
                email,
                password,
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
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
                    placeholder="Username"
                    placeholderTextColor="#aaa"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                        Already have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>Login</Text>
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
    registerButton: {
        backgroundColor: 'violet', 
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
    },
    loginText: {
        fontSize: 16,
        color: '#000',
    },
    loginLink: {
        fontSize: 16,
        color: 'violet',
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
