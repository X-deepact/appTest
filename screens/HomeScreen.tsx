import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavigator from '../navigation/BottomNavigator';

const HomeScreen: React.FC = () => {

  const navigation = useNavigation();

  // Disable the header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
     <BottomNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: 10, 
    fontSize: 18,
    color: 'black',
  },
  noNotesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default HomeScreen;
