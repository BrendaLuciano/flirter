/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert, Dimensions, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase"

var {height, width} = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class UserProfile extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: width,
      deviceHeight: height,
      userData: {}
      
    };
  }

  
    render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={()=> this.backToDashboard()} style={styles.backButton} >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titleText}>Edição de Usuário</Text>

        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({nome: text})}
          placeholder="Ex: João Silva"
          value={this.state.nome}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({email: text})}
          placeholder="Ex: fulano@gmail.com"
          value={this.state.email}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({senha: text})}
          placeholder="Senha aqui"
          secureTextEntry
          value={this.state.senha}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({cidade: text})}
          placeholder="Ex: Belo Horizonte"
          value={this.state.cidade}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({telefone: text})}
          placeholder="Ex: (31) 99999=9999"
          value={this.state.telefone}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({idade: text})}
          placeholder="Ex: 19 anos"
          value={this.state.idade}
        />
        <TouchableOpacity onPress={()=> this.askRegister()} style={styles.registerButton} >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  backToDashboard(){
    Actions.dashboard();
  }

  askRegister(){
    Alert.alert(
      'Registrar',
      'Confirma o seu registo?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => 
          this.confirmRegister()
          //this.registerUser(this.state.email, this.state.senha, this.state.nome, this.state.cidade, this.state.telefone, this.state.idade)
        },
      ],
      { cancelable: false }
    )
  }

  registerUser (email, password, nome, cidade, telefone, idade) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((currentUser) => {
      firebase.database().ref("Users/"+currentUser.user.uid).update({
        uid: currentUser.user.uid,
        email: email,
        nome: nome,
        cidade: cidade,
        telefone: telefone,
        idade: idade
      });
      Alert.alert("Sucesso!", "Usuário criado");
      Actions.pop();
    })
    .catch((error) => { 
      console.log("firebase error: " + error);
      Alert.alert("Errou no auth!", error.code)
    });
  }

  confirmRegister () {
    const userData = {
      nome: this.state.nome,
      email: this.state.email,
      cidade: this.state.cidade,
      telefone: this.state.telefone,
      idade: this.state.idade,
      altura: 170,
    }
      firebase.database().ref("Shops/").push(userData)
      .then((snapshot) => {
        Alert.alert("Sucesso!", "Usuário criado");
        Actions.pop();
      })
      .catch((error) =>{
        console.log("Error: ", error);
        Alert.alert("Errou na persistência!", error.code)
      })
      
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
  },
  backButton: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    alignSelf: "flex-start"
  },
  registerButton: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.8,
    alignItems: 'center'
  },
  buttonText:{
    color: "white"
  },
  inputStyle:{
    height: height * 0.08, 
    width: width * 0.85, 
    borderBottomColor: 'gray', 
    borderBottomWidth: 1,
    margin: width * 0.04
  },
  titleText:{
    fontSize: 30,
    alignItems: 'center',
    textAlign: 'center',
    color: "#039BE5"
  }
});
