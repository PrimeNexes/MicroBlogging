import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView,Button } from 'react-native';
import store from './app/store'; //Import the store
import Home from './app/components/home' //Import the component file
import Post from './app/components/post' //Import the component file
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { divide } from 'react-native-reanimated';
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MicroBlogging?" component={HomeScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return (

    
  //   // <View style={styles.container}>
  //   //   <Text>Open up App.js to start working on your app!</Text>
  //   //   <StatusBar style="auto" />
  //   // </View>
  // );
}


function HomeScreen({ navigation }) {

  return (    
    <SafeAreaView style={styles.container}>
    <Button

        title="Post"
        onPress={() => navigation.navigate('Post')}
      />
    <Provider store={store}>
    <Home/>
    </Provider>
    </SafeAreaView>

  );

};

function PostScreen({ navigation }) {
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
      backgroundColor: '#ECF0F1',
      padding: 8
    },

  });