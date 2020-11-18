import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Scanner from './Scanner.js'
import MyHeader from './Header.js';

export default class App extends React.Component 
{
  render(){
    return(
      <View style = {styles.container}>
        <MyHeader title = 'BarcodeScanner'/>
        <Scanner />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
