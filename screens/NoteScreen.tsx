import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

interface RouteParams {
  note?: {
    id: string;
    title: string;
    body: string;
    date: string;
  };
}

const NoteScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { note } = route.params as RouteParams || {};
  const [title, setTitle] = useState(note?.title || '');
  const [body, setBody] = useState(note?.body || '');
  const db = getFirestore();
  const auth = getAuth();

  const saveNote = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to save a note.');
      return;
    }

    const noteData = {
      title,
      body,
      date: new Date().toISOString(),
      userId: user.uid, 
    };

    try {
      const docRef = note
        ? doc(db, 'notes', note.id)
        : doc(collection(db, 'notes'));
      await setDoc(docRef, noteData, { merge: true });
      Alert.alert('Success', note ? 'Note updated.' : 'Note added.');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save the note.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.bodyInput]}
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Button title="Save Note" onPress={saveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
  },
  bodyInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default NoteScreen;
