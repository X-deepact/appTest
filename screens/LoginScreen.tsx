// src/screens/LoginScreen.tsx
import React, { useEffect, useState } from 'react';
import { Button,Text, TextInput, View, StyleSheet } from 'react-native';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Signin</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.signupButtonContainer}>
        <Button title="Go to Signup" onPress={() => navigation.navigate("Signup")} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  signupButtonContainer: {
    marginTop: 10,
  },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 16 },
  signupButton: {
    marginTop: 10,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});

export default LoginScreen;
