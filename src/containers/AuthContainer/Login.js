/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Alert, Image, Dimensions, ImageBackground, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import imageBackground from '../../Images/background.png';
/** import openURL from ('http://google.com'); */

var { height, width } = Dimensions.get('window');

type Props = {};
export default class SignUp extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: width,
      deviceHeight: height,
      nome: "",
      email: "",
      senha: "",
      cidade: "Cidade aqui",
      telefone: "Telefone aqui",
      idade: "Idade aqui"
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageBackground} source={imageBackground}>
          <Image style={styles.logoStyle} source={require('../../Images/logo-white.png')} />
         
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({email: text})}
          placeholder="Email"
          placeholderTextColor="#858281"
          value={this.state.email}
        />
        <TextInput
          style={styles.inputStyle}
          onChangeText={(text) => this.setState({senha: text})}
          placeholder="Senha"
          placeholderTextColor="#858281"
          value={this.state.senha}
        />
        <TouchableOpacity onPress={()=> this.openAskAlert()} style={styles.botaoLogar} >
          <Text style={styles.buttonText}>Conectar</Text>
        </TouchableOpacity>  

        <TouchableOpacity onPress={()=> this.openDashboard()}>
          <Text style={styles.textSenha}>Esqueceu a senha?</Text>
        </TouchableOpacity>   

        <TouchableOpacity onPress={()=> this.askRegister()} style={styles.botaoFace} >
          <Text style={styles.buttonText}>Conectar pelo Facebook</Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }

  openDashboard() {
    return Actions.dashboard();
  }

  textoCondicional(condicao) {
    if (condicao == "maior de minas") {
      Alert.alert("Atenção", "Cruzeirão Cabuloso");
    }
    else {
      Alert.alert("Atenção", "Não tem bi");
    }

  }

  openAskAlert() {
    Alert.alert(
      'Título do Alerta',
      'Você quer mesmo confirmar?',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK', onPress: () =>
            this.openSimpleAlert()
        },
      ],
      { cancelable: false }
    )
  }

  openSimpleAlert() {
    Alert.alert("Olá", "Você confirmou");
  }

  openSignup() {
    Actions.signup();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mainButton: {
    backgroundColor: "#4f8942",
  },
  textButton: {
    color: "white",
    margin: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5,
  },
  askButton: {
    backgroundColor: "#039BE5",
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: width * 0.8,
    alignItems: 'center'
  },
  buttonText: {
    color: "white"
  },
  welcomeText: {
    color: "gray",
    fontSize: 38,
    alignItems: "center",
    textAlign: 'center'
  },
  logoStyle: {
    width: width * 0.60,
    height: width * 0.60,
    marginLeft: 70,
    marginTop: 10,
    marginBottom: 1    
  },
  meuBotao: {
    backgroundColor: 'green',
    width: width * 0.8,
    height: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  imageBackground: {
    width: "100%",
    height: "100%"
  },
  inputStyle:{
    height: height * 0.07, 
    width: width * 0.80, 
    marginTop: 1,  
    borderBottomColor: 'white', 
    borderBottomWidth: 1,
    margin: width * 0.02,
    marginLeft: 30,
    marginBottom: 10
  },
  botaoLogar: {
    color: 'white',
    width: width * 0.8,
    height: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    marginLeft: 30,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 30  
  },
  textSenha: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 30,
    marginBottom: 10
  },
  textCadastro: {
    color: '#fff',
    fontSize: 12,
    margin: 30,
    marginBottom: 10,
    textAlign: "right"
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
  estiloTexto: {
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'center'
  }
});
