import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { styles } from '../styles.js';
import axios from 'axios';

export default class LoginScreen extends React.Component {
  
    state = {
      username: "",
      password: "",
      role: ""
    }

    pickRole = (role) => {
        this.setState({ role: role})
    }
     
    userSignup = () => {
      axios.post('http://localhost:10022/api/users', {
        username: this.state.username,
        password: this.state.password,
        role: this.state.role
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

          <View>
            <Picker selectedValue = {this.state.role} onValueChange = {this.pickRole}>
               <Picker.Item label = "Participant" value = "Participant" />
               <Picker.Item label = "Health Care Workers" value = "Health Care Workers" />
               <Picker.Item label = "Administrator" value = "Admin" />
            </Picker>
            <Text style = {styles.text}>{this.state.user}</Text>
         </View>
  
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
  
  