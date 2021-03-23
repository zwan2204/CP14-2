import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles.js';
import axios from 'axios';

export default class LoginScreen extends React.Component {
  
    state = {
      username: "",
      password: "",
    }
    
    userSignup = () => {
      axios.post('http://localhost:3032/api/users', {
        username: this.state.username,
        password: this.state.password,
        "role": "11"
      }).then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      })};
  
    userLogin = () => {
      axios.post('http://localhost:3032/api/auth', {
        username: this.state.username,
        password: this.state.password
      }).then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      })};  
  
    render() {
      return (
        <View style={styles.container}>
  
          <Text style={styles.logo}>Capstone</Text>
  
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Username" 
              placeholderTextColor="black"
              onChangeText={text => this.setState({username:text})}/>
          </View>
  
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Password" 
              placeholderTextColor="black"
              onChangeText={text => this.setState({password:text})}/>
          </View>
  
          <TouchableOpacity style={styles.loginBtn} onPress = {this.userLogin}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress = {this.userSignup}>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
  
    
        </View>
      );
    }
  }
  
  