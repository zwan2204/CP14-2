import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { styles } from '../styles.js';
import axios from 'axios';

export default class SignupScreen extends React.Component {
  
    state = {
      username: "",
      password: "",
      role: "Participant",
      email: "",
      gender: "",
      dob: "",
      stafflink: ""
    }

    pickRole = (role) => {
        this.setState({ role: role})
    }
     
    userSignup = () => {
      axios.post('http://localhost:12345/api/users', {
        username: this.state.username,
        password: this.state.password,
        role: this.state.role,
        email: this.state.email,
        gender: this.state.gender,
        dob: this.state.dob
      }).then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      })};

    render() {
        if (this.state.role == "Participant") {
            return (
                <View style={styles.container}>
                    <Text style={styles.logo}>Welcome, please signup</Text>
                    <View style = {styles.picker}>
                        <Picker selectedValue = {this.state.role} onValueChange = {this.pickRole}>
                            <Picker.Item label = "Participant" value = "Participant" />
                            <Picker.Item label = "Health Care Workers" value = "Health Care Workers" />
                            <Picker.Item label = "Administrator" value = "Admin" />
                        </Picker>
                    </View>
    
                    <View style={styles.inputView} >
                        <TextInput style={styles.inputText} placeholder="Full name" 
                        placeholderTextColor="grey" onChangeText={text => this.setState({username:text})}/>
                    </View>

                    <View style={styles.inputView} >
                        <TextInput style={styles.inputText} placeholder="Gender" 
                        placeholderTextColor="grey" onChangeText={text => this.setState({gender:text})}/>
                    </View>
            
                    <View style={styles.inputView} >
                        <TextInput style={styles.inputText} placeholder="DOB dd/mm/yyyy" 
                        placeholderTextColor="grey" onChangeText={text => this.setState({dob:text})}/>
                    </View>

                    <View style={styles.inputView} >
                        <TextInput style={styles.inputText} placeholder="Email" 
                        placeholderTextColor="grey" onChangeText={text => this.setState({email:text})}/>
                    </View>
                    
                    <View style={styles.inputView} >
                        <TextInput style={styles.inputText} placeholder="Password" 
                        placeholderTextColor="grey" onChangeText={text => this.setState({password:text})}/>
                    </View>
                    
                    <TouchableOpacity onPress = {this.userSignup}> 
                        <Text style={styles.loginText}>Signup</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (this.state.role == "Health Care Workers") {
            return (
                <View style={styles.container}>
                    <Text style={styles.logo}>Welcome, please signup</Text>
                    <View style = {styles.picker}>
                        <Picker selectedValue = {this.state.role} onValueChange = {this.pickRole}>
                            <Picker.Item label = "Participant" value = "Participant" />
                            <Picker.Item label = "Health Care Workers" value = "Health Care Workers" />
                            <Picker.Item label = "Administrator" value = "Admin" />
                        </Picker>
                    </View>
      
                    <View style={styles.inputView} >
                        <TextInput style={styles.inputText} placeholder="Full name" 
                        placeholderTextColor="grey" onChangeText={text => this.setState({username:text})}/>
                    </View>
            
                    <View style={styles.inputView} >
                        <TextInput style={styles.inputText} placeholder="Stafflink number" 
                        placeholderTextColor="grey" onChangeText={text => this.setState({stafflink:text})}/>
                    </View>
    
                    <View style={styles.inputView} >
                        <TextInput style={styles.inputText} placeholder="Email" 
                        placeholderTextColor="grey" onChangeText={text => this.setState({email:text})}/>
                    </View>
                    
                    <View style={styles.inputView} >
                        <TextInput style={styles.inputText} placeholder="Password" 
                        placeholderTextColor="grey" onChangeText={text => this.setState({password:text})}/>
                    </View>
                    
                    <TouchableOpacity onPress = {this.userSignup}> 
                        <Text style={styles.loginText}>Signup</Text>
                    </TouchableOpacity>
                </View>
            ) 
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.logo}>Welcome, please signup</Text>
                    <View style = {styles.picker}>
                        <Picker selectedValue = {this.state.role} onValueChange = {this.pickRole}>
                            <Picker.Item label = "Participant" value = "Participant" />
                            <Picker.Item label = "Health Care Workers" value = "Health Care Workers" />
                            <Picker.Item label = "Administrator" value = "Admin" />
                        </Picker>
                    </View>
      
                    <View style={styles.inputView} >
                        <TextInput style={styles.inputText} placeholder="Full name" 
                        placeholderTextColor="grey" onChangeText={text => this.setState({username:text})}/>
                    </View>
    
                    <View style={styles.inputView} >
                        <TextInput style={styles.inputText} placeholder="Email" 
                        placeholderTextColor="grey" onChangeText={text => this.setState({email:text})}/>
                    </View>
                    
                    <View style={styles.inputView} >
                        <TextInput style={styles.inputText} placeholder="Password" 
                        placeholderTextColor="grey" onChangeText={text => this.setState({password:text})}/>
                    </View>
                    
                    <TouchableOpacity onPress = {this.userSignup}> 
                        <Text style={styles.loginText}>Signup</Text>
                    </TouchableOpacity>
                </View>
            ) 
        }
    }
  }
  
  