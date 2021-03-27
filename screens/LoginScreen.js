import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles.js';
import axios from 'axios';

export default class LoginScreen extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    pickRole = (role) => {
        this.setState({ role: role})
    }
  
    userLogin = () => {
      axios.post('http://localhost:12345/api/auth', {
        email: this.state.email,
        password: this.state.password
      }).then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      })};  

    render() {
        const { navigate } = this.props.navigation;
        return (
        <View style = {styles.container}>
            <Text style = {styles.logo}> Please login to your account first </Text>
            <View style = {styles.inputView}>
                <TextInput style = {styles.inputText} 
                placeholder = "Email" placeholderTextColor = "grey" 
                onChangeText = {text => this.setState({email: text})}/>
            </View>
            
            <View style = {styles.inputView}>
                <TextInput style = {styles.inputText} 
                placeholder = "Password" placeholderTextColor = "grey"
                onChangeText = {text => this.setState({password: text})}/>
            </View>
            
            <TouchableOpacity style = {styles.loginBtn} onPress = {this.userLogin}>
                <Text style = {styles.loginText}> LOGIN </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress = {() => navigate("Signup")}>
                <Text style = {styles.loginText}> Signup </Text>
            </TouchableOpacity>
        </View>
      );
    }
  }
  
  