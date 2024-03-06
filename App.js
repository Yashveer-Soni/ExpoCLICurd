import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Create from './components/Create';
import Update from './components/Update';
import Datalist from './components/Datalist';
import firebasedatabase from './firebasedatabase';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Datalist'>
        <Stack.Screen  name="Datalist" component={Datalist} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Update" component={Update} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

