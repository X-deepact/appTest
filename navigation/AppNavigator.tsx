// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import NoteScreen from '../screens/NoteScreen';
import NotesList from '../components/NotesList';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen  name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NoteScreen" component={NoteScreen} />
        <Stack.Screen name="NotesList" component={NotesList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
