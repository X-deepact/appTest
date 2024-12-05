import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';

interface Note {
  id: string;
  title: string;
  body: string;
  date: string;
}

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  // Fetch notes from Firestore
  const fetchNotes = () => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false); // Stop loading if no user is logged in
      return;
    }

    const notesQuery = query(
      collection(db, 'notes'),
      where('userId', '==', user.uid) // Ensure only user's notes are fetched
    );

    const unsubscribe = onSnapshot(
      notesQuery,
      (snapshot) => {
        const fetchedNotes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Note[];
        setNotes(fetchedNotes);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching notes:', error);
        Alert.alert('Error', 'Failed to fetch notes.');
        setLoading(false);
      }
    );

    return unsubscribe;
  };

  // Add a new note
  const addNote = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, 'notes'), {
        title: 'New Note',
        body: 'This is a new note.',
        date: Timestamp.now().toDate().toISOString(),
        userId: user.uid, // Ensure the note is associated with the current user
      });
      Alert.alert('Success', 'New note added!');
    } catch (error) {
      console.error('Error adding note:', error);
      Alert.alert('Error', 'Failed to add a new note.');
    }
  };

  // Delete a note
  const deleteNote = async (noteId: string) => {
    try {
      console.log(`Attempting to delete note with ID: ${noteId}`); // Debugging line
      await deleteDoc(doc(db, 'notes', noteId));
      Alert.alert('Success', 'Note deleted successfully');
    } catch (error) {
      console.error('Error deleting note:', error); // Check console for errors
      Alert.alert('Error', 'Failed to delete the note.');
    }
  };

  // Initial data fetch
  useEffect(() => {
    const unsubscribe = fetchNotes();
    return () => unsubscribe && unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading notes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Add New Note" onPress={addNote} />
      {notes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No notes found. Start adding some!</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.noteContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('NoteScreen', { note: item })
                }
              >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  Alert.alert(
                    'Delete Note',
                    'Are you sure you want to delete this note?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Delete', onPress: () => deleteNote(item.id) },
                    ]
                  )
                }
              >
                <Text style={styles.deleteButtonText}>Delete2</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
  },
  noteContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    textAlign: 'right',
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NotesList;
