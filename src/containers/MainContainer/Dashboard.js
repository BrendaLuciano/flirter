/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';

var {height, width} = Dimensions.get('window');


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Dashboard extends Component<Props> {

  goToUserProfile(){
    
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native! Dashboard</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableOpacity onPress={()=> this.goToUserProfile()} style={styles.botaoFace} >
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    dfgdfgydifu: Brenda
  },
  botaoFace: {
    backgroundColor: '#1863ab',
    width: width * 0.8,
    height: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 30,
    borderRadius: 30,
    marginTop: 15 
  }, 
});
