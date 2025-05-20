import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MeetingScreen from './src/screens/MeetingScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#1e272e" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2c3e50',
          },
          headerTintColor: '#ecf0f1',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Video Meeting' }}
        />
        <Stack.Screen 
          name="Meeting" 
          component={MeetingScreen} 
          options={{ 
            title: 'Meeting Room',
            headerBackVisible: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
