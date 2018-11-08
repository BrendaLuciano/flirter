/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert, Dimensions, TouchableOpacity, TextInput, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase"
import imageLogo from '../../Images/logo-white.png';
import imageBackground from '../../Images/splash-screen.png';

var { height, width } = Dimensions.get('window');

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceWidth: width,
            deviceHeight: height,
            nome: "",
            email: "rodrigo@beestart.com.br",
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
                    <Image style={styles.imageLogo} source={imageLogo} />
                    <ActivityIndicator color="white" size="large" />
                </ImageBackground>
            </View>
        );
    }

    backToLogin() {
        Actions.login();
    }

    askRegister() {
        Alert.alert(
            'Registrar',
            'Confirma o seu registo?',
            [
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () =>
                        this.confirmRegister()
                    //this.registerUser(this.state.email, this.state.senha, this.state.nome, this.state.cidade, this.state.telefone, this.state.idade)
                },
            ],
            { cancelable: false }
        )
    }

    registerUser(email, password, nome, cidade, telefone, idade) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((currentUser) => {
                firebase.database().ref("Users/" + currentUser.user.uid).update({
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

    confirmRegister() {
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
            .catch((error) => {
                console.log("Error: ", error);
                Alert.alert("Errou na persistência!", error.code)
            })

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    buttonText: {
        color: "white"
    },
    inputStyle: {
        height: height * 0.08,
        width: width * 0.85,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        margin: width * 0.04
    },
    titleText: {
        fontSize: 30,
        alignItems: 'center',
        textAlign: 'center',
        color: "#039BE5"
    },
    imageBackground: {
        width: "100%",
        height: "100%"
    },
    imageLogo: {
        width: "55%",
        height: "55%",
        marginBottom: 50,
        marginLeft: 75,
        marginTop: 100,
        marginRight: 20
    }


});
