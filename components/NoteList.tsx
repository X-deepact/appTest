import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  ActivityIndicator,
  TextInput,
  Modal,
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
import { getAuth, signOut } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

    interface Note {
    id: string;
  title: string;
  body: string;
  date: string;
}

const NoteItem = ({ item, onDelete, onPress }) => (
  <View style={styles.noteContainer}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => onDelete(item.id)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const DeleteConfirmationModal = ({ visible, onConfirm, onCancel }) => (
  <Modal
    transparent={true}
    animationType="slide"
    visible={visible}
    onRequestClose={onCancel}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Are you sure you want to delete this note?</Text>
        <View style={styles.modalButtons}>
          <Button title="Cancel" onPress={onCancel} />
          <Button title="Delete" onPress={onConfirm} color="red" />
        </View>
      </View>
    </View>
  </Modal>
);

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', body: '' });
  const db = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.error('User is not authenticated');
      setLoading(false);
      return;
    }
    console.log('Authenticated user ID:', user.uid);

    const notesQuery = query(
      collection(db, 'notes'),
      where('userId', '==', user.uid)
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
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [auth, db]);

  const addNote = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, 'notes'), {
        ...newNote,
        date: Timestamp.now().toDate().toISOString(),
        userId: user.uid,
      });
      setNewNote({ title: '', body: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (noteId: string) => {
    console.log(`Delete button pressed for note with ID: ${noteId}`);
    try {
      const noteRef = doc(db, 'notes', noteId);
      console.log('Note reference created:', noteRef);
      await deleteDoc(noteRef);
      console.log('Note deleted successfully');
      setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  const handleDeletePress = (id: string) => {
    setNoteToDelete(id);
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    if (noteToDelete) {
      try {
        await deleteNote(noteToDelete);
        setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteToDelete));
        setModalVisible(false)
      } catch (error) {
        console.error('Error deleting note:', error.message);
        // Optionally handle error here
      } finally {
        setModalVisible(false);
        setNoteToDelete(null);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login'); // Navigate to the login screen after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSignOut} style={{ marginRight: 10 }}>
          <Icon name="logout" size={24} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
      <Button title="Add New Note" onPress={() => setShowAddForm(!showAddForm)} />
      {showAddForm && (
        <View style={styles.addForm}>
          <TextInput
            style={styles.input}
            placeholder="Note Title"
            value={newNote.title}
            onChangeText={(text) => setNewNote({ ...newNote, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Note Body"
            value={newNote.body}
            onChangeText={(text) => setNewNote({ ...newNote, body: text })}
            multiline
          />
          <Button title="Save Note" onPress={addNote} />
        </View>
      )}
      {notes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No notes found. Start adding some!</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteItem
              item={item}
              onDelete={handleDeletePress}
              onPress={() => navigation.navigate('NoteScreen', { note: item })}
            />
          )}
        />
      )}
      <DeleteConfirmationModal
        visible={modalVisible}
        onConfirm={confirmDelete}
        onCancel={() => setModalVisible(false)}
      />
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
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addForm: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default NotesList;
