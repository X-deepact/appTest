import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function Signup({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSignup = async ()  => {
    try {
      setErrorMessage('');
      await createUserWithEmailAndPassword(auth, email, password);
      alert(`Welcome, ${email}! Your account has been created successfully.`);
      navigation.navigate('Login');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMessage('Please enter a valid email address');
          break;
        case 'auth/missing-password':
          setErrorMessage('Please enter a valid password');
          break;
        case 'auth/email-already-in-use':
          setErrorMessage('You are already registered');
          break;
        case 'auth/weak-password':
          setErrorMessage('Your password must be at least 6 characters long');
          break;
        default:
          setErrorMessage('An error occurred during signup');
      }
      console.error(error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Signup" onPress={handleSignup} />
      <View style={styles.loginButtonContainer}>
        <Button style={styles.loginButton} title="Go to Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loginButtonContainer: {
    marginTop: 10,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 16 },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
}); 
