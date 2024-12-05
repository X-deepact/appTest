// src/components/MapComponent.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Note } from '../types';

interface MapComponentProps {
  notes: Note[];
}

const MapComponent: React.FC<MapComponentProps> = ({ notes }) => {
  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map}>
        {notes.map((note) => (
          <Marker
            key={note.id}
            coordinate={{
              latitude: note.location.latitude,
              longitude: note.location.longitude,
            }}
            title={note.title}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapComponent;
