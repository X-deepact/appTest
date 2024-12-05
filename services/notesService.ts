import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import {db} from '../firebase/firebaseConfig';

// Collection reference for notes
const notesCollection = collection(db, 'notes');

// Create a new note
export const createNote = async (userId: string, title: string, body: string, location: { lat: number; lng: number }) => {
  try {
    const docRef = await addDoc(notesCollection, {
      userId,
      title,
      body,
      location,
      createdAt: new Date(),
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// Read all notes for a user
export const getNotesByUser = async (userId: string) => {
  try {
    const querySnapshot = await getDocs(notesCollection);
    const notes = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(note => note.userId === userId);  // Filter by userId to only return user's notes
    return notes;
  } catch (e) {
    console.error('Error getting documents: ', e);
    return [];
  }
};

// Get a specific note by ID
export const getNoteById = async (noteId: string) => {
  try {
    const docRef = doc(db, 'notes', noteId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (e) {
    console.error('Error getting document: ', e);
    return null;
  }
};

// Update a note
export const updateNote = async (noteId: string, title: string, body: string, location: { lat: number; lng: number }) => {
  try {
    const noteRef = doc(db, 'notes', noteId);
    await updateDoc(noteRef, {
      title,
      body,
      location,
      updatedAt: new Date(),
    });
    console.log('Document successfully updated!');
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

// Delete a note
export const deleteNote = async (noteId: string) => {
  try {
    const noteRef = doc(db, 'notes', noteId);
    await deleteDoc(noteRef);
    console.log('Document successfully deleted!');
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};
