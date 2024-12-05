import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface NoteCardProps {
  title: string;
  date: string;
  onPress: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, date, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default NoteCard;
