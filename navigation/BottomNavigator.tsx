import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NoteList from '../components/NoteList';
import NotesMap from '../components/NotesMap';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Notes List" component={NoteList} />
      <Tab.Screen name="Notes Map" component={NotesMap} />
    </Tab.Navigator>
  );
}
