/** @format */

import React from "react";
import { Image, Text, View, SafeAreaView, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles.js";
import axios from "axios";
import { HelperText, Button } from 'react-native-paper';

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
          alert("Email has already been taken");
        }
      );
  };

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.role == "Participant") {
      return (
<<<<<<< HEAD
        <View style={styles.container}>
          <Text style={styles.logo}> Welcome, please signup </Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={this.state.role}
              onValueChange={this.pickRole}
            >
              <Picker.Item label="Participant" value="Participant" />
              <Picker.Item
                label="Health Care Workers"
                value="Health Care Workers"
              />
              <Picker.Item label="Administrator" value="Admin" />
            </Picker>
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Full name"
              placeholderTextColor="grey"
              onChangeText={text => this.setState({ fullName: text })}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Gender"
              placeholderTextColor="grey"
              onChangeText={text => this.setState({ gender: text })}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="DOB dd/mm/yyyy"
              placeholderTextColor="grey"
              onChangeText={text => this.setState({ dob: text })}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="grey"
              onChangeText={text => this.setState({ email: text })}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
            />
=======
        <SafeAreaView style={styles.container}>
          <View style={{ height: 140, backgroundColor: "#00205B", flexDirection: "row" }}>
            <Image style={{ width: 200, height: 100, left: 100, top: 20 }} source={require('../assets/header.png')} />
>>>>>>> loginui
          </View>

          <View style={{ alignItems: "center", flexDirection: "column", flex: 1 }}>
            <View style={{ alignItems: "center", margin: 30 }}>
              <Text style={{ color: "#00205B", fontSize: 20, fontWeight: "bold" }}>Create New Account</Text>
            </View>
            <Picker style={styles.picker} selectedValue={this.state.role} onValueChange={this.pickRole} >
              <Picker.Item label="Participant" value="Participant" />
              <Picker.Item label="Project Manager" value="Project Manager" />
              <Picker.Item label="Health Care Workers" value="Health Care Workers" />
              <Picker.Item label="NSWHP staff" value="Admin" />
            </Picker>
            <View style={{ margin: 20, flexDirection: "column", flex: 1 }}>
              <Text style={styles.subTitle}>Email Address: </Text>
              <TextInput
                style={styles.inputView}
                onChangeText={text => this.setState({ email: text })} />
              <Text style={styles.subTitle}>Your full name: </Text>
              <TextInput
                style={styles.inputView}
                onChangeText={text => this.setState({ fullName: text })} />
              <Text style={styles.subTitle}>Passwrod: </Text>
              <TextInput
                style={styles.inputView}
                onChangeText={text => this.setState({ password: text })} />
              <Text style={styles.subTitle}>Confirm you password: </Text>
              <TextInput
                style={styles.inputView}
                onChangeText={text => this.setState({ password: text })} />
              <Button mode="text" onPress={() => navigate("ParticipantInfoScreen")} style={{ marginBottom: 0 }}>Next</Button>
            </View>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={{ height: 140, backgroundColor: "#00205B", flexDirection: "row" }}>
            <Image style={{ width: 200, height: 100, left: 100, top: 20 }} source={require('../assets/header.png')} />
          </View>

          <View style={{ alignItems: "center", flexDirection: "column", flex: 1 }}>
            <View style={{ alignItems: "center", margin: 30 }}>
              <Text style={{ color: "#00205B", fontSize: 20, fontWeight: "bold" }}>Create New Account</Text>
            </View>
            <Picker style={styles.picker} selectedValue={this.state.role} onValueChange={this.pickRole} >
              <Picker.Item label="Participant" value="Participant" />
              <Picker.Item label="Project Manager" value="Project Manager" />
              <Picker.Item label="Health Care Workers" value="Health Care Workers" />
              <Picker.Item label="NSWHP staff" value="Admin" />
            </Picker>

            <View style={{ margin: 20, flexDirection: "column", flex: 1 }}>
              <Text style={styles.subTitle}>Stafflink Number: </Text>
              <TextInput
                style={styles.inputView}
                onChangeText={text => this.setState({ staffId: text })} />
              <Text style={styles.subTitle}>Email Address: </Text>
              <TextInput
                style={styles.inputView}
                onChangeText={text => this.setState({ email: text })} />
              <Text style={styles.subTitle}>Password: </Text>
              <TextInput
                style={styles.inputView}
                onChangeText={text => this.setState({ password: text })} />
              <Text style={styles.subTitle}>Confirm your Passwrod: </Text>
              <TextInput
                style={styles.inputView}
                onChangeText={text => this.setState({ password: text })} />

              <Button mode="text" onPress={this.userSignup} style={{ marginBottom: 0 }}> Signup </Button>
            </View>
          </View>
        </SafeAreaView>
      );
    } 
  }
}
