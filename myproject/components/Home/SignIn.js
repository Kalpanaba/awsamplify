import React, { useState } from 'react';
import { View, Text, TextInput, CheckBox, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderView from './Header';
import { loginUser } from '../Server/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  
  const handleSignIn = async () => {
    // Your sign-in logic here
    try {
        console.log('Email:', email); // Log email value
      console.log('Password:', password); // Log password value
        const userData = {
          email, // Assuming email and password are defined in your component's state
          password,
        };
        const response = await loginUser(userData);
        const token = response.result.token;
        const userId = response.result.validateUser.userId;

        console.log('Token fetched successfully:', token);
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('token', token);
        console.log('Token fetched successfully:', token);
        
        navigation.navigate('Home');
      } catch (error) {
        console.error('Error signing in:', error);
        // Handle errors
      }

    //logic ends
    navigation.navigate('Home');
  };

  const handleSignInLinkPress = () => {
    navigation.navigate('SignUp');
  };

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const handleCartIconClick = () => {
    // Your handle cart icon click logic here
  };

  const toggleSlider = () => {
    // Your toggle slider logic here
  };

  return (
    <View style={styles.container}>
      <HeaderView
        isSignupPage={false}
        handleCartIconClick={handleCartIconClick}
        toggleSlider={toggleSlider}
        handleBackButtonPress={handleBackButtonPress}
      />

      <View style={styles.topContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.gap}></View>
          <Text style={styles.label}>Email:*</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            autoCompleteType="email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:*</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            autoCompleteType="password"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.gap}></View>
        <View style={styles.checkboxContainer}>
          {/* <CheckBox
            value={rememberMe}
            onValueChange={setRememberMe}
          /> */}
          <Text>Remember me</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Login</Text>
        </TouchableOpacity>
        {/* Error handling */}
        {/* <Text style={styles.errorText}>Error: {error.message}</Text> */}
        <View style={styles.bottomTextContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={handleSignInLinkPress}>
            <Text style={styles.signinLink}>Register now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
  
  topContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 10,
    paddingHorizontal: 40,
  },
  bottomContainer: {
    justifyContent: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 40,
  },  
  gap: {
    height: 20, // Add a gap of 20 units
  },

  label: {
    color: '#333',
    fontSize: 16,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  signInButton: {
    backgroundColor: '#5BB052',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinLink: {
    fontWeight: 'bold',
    color: '#5BB052',
  },
});

export default SignInScreen;
