// src/components/NotesMap.tsx
import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Note } from '../types';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

interface NotesMapProps {
  notes: Note[];
  google: any;
}

const NotesMap: React.FC<NotesMapProps> = ({ notes, google }) => {
  if (Platform.OS !== 'web') {
    return (
      <View style={styles.container}>
        <Text>No map view on this platform</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Map
        google={google}
        zoom={10}
        initialCenter={{ lat: 37.7749, lng: -122.4194 }}
        style={styles.map}
      >
        {notes.length === 0 ? (
          <Text style={styles.noNotes}>No Notes Available</Text>
        ) : (
          notes.map((note) => (
            <Marker
              key={note.id}
              position={{
                lat: note.location.latitude,
                lng: note.location.longitude,
              }}
              title={note.title}
              name={note.body}
            />
          ))
        )}
      </Map>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  noNotes: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -20 }],  
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});

export default GoogleApiWrapper({
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
})(NotesMap);
