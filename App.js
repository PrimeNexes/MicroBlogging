
import { Provider } from 'react-redux';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import store from './app/store'; //Import the store
import Home from './app/components/home' //Import the component file
import Post from './app/components/post' //Import the component file
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MicroBlogging: Dave" component={HomeScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function HomeScreen() {
  return (    
    <SafeAreaView style={styles.container}>
    <Provider store={store}>
    <Home/>
    </Provider>
    </SafeAreaView>

  );

};

function PostScreen() {
  return (
    <SafeAreaView style={styles.container}>
    <Provider store={store} >
    <Post/>
    </Provider>
    </SafeAreaView>
  );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ECF0F1'
    },
  });