import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, CheckBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderView from './Header';
import { registerUser }  from '../Server/Api';

const SignupComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pinCode, setPinCode] = useState('');
  const navigation = useNavigation();




  const handleRegister = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        Alert.alert('You are already registered');
        navigation.navigate('SignIn');
      } else {
        const userData = { email, password, pinCode };
        const response = await registerUser(userData);
        console.log(response);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };


  
  // const handleRegister = async() => {
  //   // Your registration logic here
  //   try {
    
  //       console.log(email);
  //       console.log(password);
  //       console.log(pinCode);
  //       const userData = {
  //         email, // Assuming email and password are defined in your component's state
  //         password,
  //         pinCode,
  //       };
  //       const response = await registerUser(userData);
  //       console.log(response);
  //       navigation.navigate('Home');
  //     } catch (error) {
  //       console.error('Error sign up:', error);
  //       // Handle errors
  //     }
     

  // };

  const handleSignInLinkPress = () => {
    navigation.navigate('Login');
  };

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const toggleSlider = () => {
    // Your toggle slider logic here
  };

  const handleCartIconClick  = () => {
    // Your handle cart icon click logic here
  };

  return (
    <View style={styles.container}>
      <HeaderView 
        isSignupPage={true}
        handleCartIconClick={handleCartIconClick}
        toggleSlider={toggleSlider}
        handleBackButtonPress={handleBackButtonPress} 
      />

      <View style={styles.inputContainer}> 
        <View style={styles.gap}></View> 
        <Text style={styles.label}>Email:*</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCompleteType="email"
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.gap}></View> 
        <Text style={styles.label}>Password:*</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCompleteType="password"
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.gap}></View> 
        <Text style={styles.label}>Pin Code:*</Text>
        <TextInput
          style={styles.input}
          placeholder="Pin Code"
          value={pinCode}
          onChangeText={setPinCode}
          secureTextEntry
          autoCompleteType="password"
        />
      </View>
      {/* Checkbox (Remember me) removed */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
          <Text style={styles.signUpButtonText}>Register</Text>
        </TouchableOpacity>
        {/* Registration message */}
        {/* <Text>{registrationMessage}</Text> */}
        {/* Error message */}
        {/* <Text>Error: {error.message}</Text> */}
        <View style={styles.bottomTextContainer}>
          <Text>Have an account? </Text>
          <TouchableOpacity onPress={handleSignInLinkPress}>
            <Text style={styles.signinLink}>Login now</Text>
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
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  gap: {
    height: 20, // Add a gap of 20 units
  },
  inputContainer: {
    marginBottom: 15,
    paddingHorizontal: 40,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 10,
    padding: 10,
  },
  signUpButton: {
    backgroundColor: '#5BB052',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinLink: {
    fontWeight: 'bold',
    color:'#5BB052',
    alignItems: 'bottom ',
  },
});

export default SignupComponent;
