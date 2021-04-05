/** @format */

import React from "react";
import { Text, View, TouchableOpacity,SafeAreaView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles.js";
import axios from "axios";
import { HelperText, TextInput } from 'react-native-paper';

export default class SignupScreen extends React.Component {
  state = {
    fullName: "",
    password: "",
    role: "Participant",
    email: "",
    gender: "",
    dob: "",
    staffId: ""
  };

  pickRole = role => {
    this.setState({ role: role });
  };

  userSignup = () => {
    const { navigate } = this.props.navigation;
    axios
      .post("http://localhost:12345/api/users", {
        fullName: this.state.fullName,
        password: this.state.password,
        role: this.state.role,
        email: this.state.email,
        gender: this.state.gender,
        staffId: this.staffId,
        dob: this.state.dob
      })
      .then(
        response => {
          console.log(response);
          navigate("Login");
        },
        error => {
          console.log(error);
        }
      );
  };

  render() {
    if (this.state.role == "Participant") {
      return (
        <SafeAreaView style={styles.container}>
          <View
        style={{
          height: 140,
          backgroundColor: "#00205B",
          flexDirection: "row",
        }}>

        <View
          style={{
            flex: 1,
          }}
        >
        </View>
      </View>

          <View style={{ justifyContent: "center", alignItems: "center", margin: 50}}>
            <Picker style={styles.picker} selectedValue={this.state.role} onValueChange={this.pickRole} >
              <Picker.Item label="Participant" value="Participant" />
              <Picker.Item label="Health Care Workers" value="Health Care Workers" />
              <Picker.Item label="NSWHP staff" value="Admin" />
            </Picker>
            <TextInput 
              style={{ height: 45, margin: 10 }}
              label="Full name" 
              onChangeText={text => this.setState({ fullName: text })}/>
            <TextInput 
              style={{ height: 45, margin: 10 }}
              label="Gender" 
              onChangeText={text => this.setState({ gender: text })}/>
            <TextInput 
              style={{ height: 45, margin: 10 }}
              label="DOB dd/mm/yyyy" 
              onChangeText={text => this.setState({ dob: text })}/>
            <TextInput 
              style={{ height: 45, margin: 10 }}
              label="Email" 
              onChangeText={text => this.setState({ email: text })}/>
            <TextInput 
              style={{ height: 45, margin: 10 }}
              label="Password" 
              onChangeText={text => this.setState({ password: text })}/>
            
            <TouchableOpacity style={{backgroundColor:"#00205B",
            borderRadius:25,
            height:50,
            width: 100,
            alignItems:"center",
            justifyContent:"center"}}onPress={this.userSignup}>
            <Text style={{color:"white"}}>
              Signup
            </Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    } else if (this.state.role == "Health Care Workers") {
      return (
        <SafeAreaView style={styles.container}>
          <View
        style={{
          height: 140,
          backgroundColor: "#00205B",
          flexDirection: "row",
        }}>
        <View style={{ flex: 1, backgroundColor: "tomato" }} />
        <View style={{ flex: 3, backgroundColor: "#00205B" }} />
        <View
          style={{
            flex: 1,
          }}
        >
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", margin: 50}}>
            <Picker style={styles.picker} selectedValue={this.state.role} onValueChange={this.pickRole} >
              <Picker.Item label="Participant" value="Participant" />
              <Picker.Item label="Health Care Workers" value="Health Care Workers" />
              <Picker.Item label="NSWHP staff" value="Admin" />
            </Picker>
            <TextInput 
              style={{ height: 45, margin: 10 }}
              label="Full name" 
              onChangeText={text => this.setState({ fullName: text })}/>
              <TextInput 
              style={{ height: 45, margin: 10 }}
              label="Stafflink number" 
              onChangeText={text => this.setState({ staffId: text })}/>
            <TextInput 
              style={{ height: 45, margin: 10 }}
              label="Email" 
              onChangeText={text => this.setState({ email: text })}/>
            <TextInput 
              style={{ height: 45, margin: 10 }}
              label="Password" 
              onChangeText={text => this.setState({ password: text })}/>
            
            <TouchableOpacity style={{backgroundColor:"#00205B",
            borderRadius:25,
            height:50,
            width: 100,
            alignItems:"center",
            justifyContent:"center"}}onPress={this.userSignup}>
            <Text style={{color:"white"}}>
              Signup
            </Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View
        style={{
          height: 140,
          backgroundColor: "#00205B",
          flexDirection: "row",
        }}>
        <View style={{ flex: 1, backgroundColor: "tomato" }} />
        <View style={{ flex: 3, backgroundColor: "#00205B" }} />
        <View
          style={{
            flex: 1,
          }}
        >
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", margin: 50}}>
            <Picker style={styles.picker} selectedValue={this.state.role} onValueChange={this.pickRole} >
              <Picker.Item label="Participant" value="Participant" />
              <Picker.Item label="Health Care Workers" value="Health Care Workers" />
              <Picker.Item label="NSWHP staff" value="Admin" />
            </Picker>
            <TextInput 
              style={{ height: 45, margin: 10 }}
              label="Full name" 
              onChangeText={text => this.setState({ fullName: text })}/>
              <TextInput 
              style={{ height: 45, margin: 10 }}
              label="Stafflink number" 
              onChangeText={text => this.setState({ staffId: text })}/>
            <TextInput 
              style={{ height: 45, margin: 10 }}
              label="Email" 
              onChangeText={text => this.setState({ email: text })}/>
            <TextInput 
              style={{ height: 45, margin: 10 }}
              label="Password" 
              onChangeText={text => this.setState({ password: text })}/>
            <TouchableOpacity style={{backgroundColor:"#00205B",
            borderRadius:25,
            height:50,
            width: 100,
            alignItems:"center",
            justifyContent:"center"}}onPress={this.userSignup}>
            <Text style={{color:"white"}}>
              Signup
            </Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  }
}
