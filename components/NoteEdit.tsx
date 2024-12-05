// src/components/NoteEdit.tsx
import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, View } from 'react-native';
import { Note } from '../types';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

interface NoteEditProps {
  note?: Note;
  onSave: (note: Note) => void;
}

const NoteEdit: React.FC<NoteEditProps> = ({ note, onSave }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [body, setBody] = useState(note?.body || '');
  const [date, setDate] = useState(note?.date || new Date().toISOString());
  
  const saveNote = async () => {
    const noteData: Note = {
      id: note?.id || '',
      title,
      body,
      date,
      location: { latitude: 0, longitude: 0 }, // For simplicity, hardcoding
    };
    
    if (note) {
      // Update existing note
      await updateDoc(doc(db, 'notes', note.id), noteData);
    } else {
      // Create new note
      await addDoc(collection(db, 'notes'), noteData);
    }

    onSave(noteData);
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Body" value={body} onChangeText={setBody} style={styles.input} />
      <Button title="Save" onPress={saveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default NoteEdit;
