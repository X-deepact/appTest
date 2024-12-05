// src/components/NotesMap.tsx
import React, { useState, useEffect } from 'react';
import { Platform, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface NotesMapProps {
  notes: Note[];
}

const NotesMap: React.FC<NotesMapProps> = ({ notes }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading time
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22814.681743947614!2d35.14693831950907!3d31.78622712072101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502d70fb66dcb67%3A0x24cb1e2f146513f0!2sDerech%20HaGefen!5e0!3m2!1sen!2ssg!4v1733375153175!5m2!1sen!2ssg" width="1000" height="1000" style={{border : 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>No map view on this platform</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotesMap;
