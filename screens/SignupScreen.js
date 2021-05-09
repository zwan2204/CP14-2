/** @format */

import React from "react";
import { Image, Text, View, SafeAreaView, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles.js";
import axios from "axios";
import { Button } from "react-native-paper";
import { DEPLOYEDHOST, LOCALHOST } from "../routes/urlMap";
import Header from "../screens/Header";
import Footer from "../screens/Footer";

export default class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      password: "",
      role: "Participant",
      email: "",
      gender: "",
      dob: "",
      staffId: ""
    };
  }

  pickRole = role => {
    this.setState({ role: role });
  };

  userSignup = () => {
    const { history } = this.props;
    axios
      .post(`${DEPLOYEDHOST}/api/users`, {
        fullName: this.state.fullName,
        password: this.state.password,
        role: this.state.role,
        email: this.state.email,
        gender: this.state.gender,
        staffId: this.staffId,
        dob: this.state.dob,
        healthy: false,
        english: false,
        isPregnant: false,
        isSmoking: false,
        isLactating: false,
        isPlanning: false,
        contactMethod: "",
        phoneNum: ""
      })
      .then(
        response => {
          console.log(response);
          history.push("/homepage");
        },
        error => {
          console.log(error);
          alert("Email has already been registered");
        }
      );
  };

  render() {
    const { history } = this.props;
    if (this.state.role == "Participant") {
      return (
        <SafeAreaView style={styles.container}>
          <Header />
          <View style={{ alignItems: "center", height: "80%" }}>
            <View style={{ alignItems: "center", margin: 30 }}>
              <Text style={{ color: "#00205B", fontSize: 20, fontWeight: "bold" }}> Create New Account </Text>
            </View>

            <View style={{ alignItems: "center", flexDirection: "column", justifyContent: "center", width: "40%" }} >

              <View
                style={{
                  marginTop: 20,
                  marginBottom: 30,
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between"
                }}>
                <Text style={styles.subTitle}>Please choose your role: </Text>
                <Picker
                  style={styles.picker}
                  selectedValue={this.state.role}
                  onValueChange={this.pickRole}
                >
                  <Picker.Item label="Participant" value="Participant" />
                  <Picker.Item label="Project Manager" value="Project Manager" />
                  <Picker.Item
                    label="Health Care Workers"
                    value="Health Care Workers"
                  />
                  <Picker.Item label="NSWHP staff" value="Admin" />
                </Picker>
              </View>

              <View style={{
                flexDirection: "row", width: "100%",
                justifyContent: "space-between"
              }}>
                <Text style={styles.subTitle}>Your full name: </Text>
                <TextInput
                  style={styles.inputView}
                  onChangeText={text => this.setState({ fullName: text })}
                />
              </View>

              <View style={{
                flexDirection: "row", width: "100%",
                justifyContent: "space-between"
              }}>
                <Text style={styles.subTitle}>Date of birth: </Text>
                <TextInput
                  style={styles.inputView}
                  onChangeText={text => this.setState({ dob: text })}
                />
              </View>

              <View style={{
                flexDirection: "row", width: "100%",
                justifyContent: "space-between"
              }}>
                <Text style={styles.subTitle}>Email Address: </Text>
                <TextInput
                  style={styles.inputView}
                  onChangeText={text => this.setState({ email: text })}
                />
              </View>

              <View style={{
                flexDirection: "row", width: "100%",
                justifyContent: "space-between"
              }}>
                <Text style={styles.subTitle}>Passwrod: </Text>
                <TextInput
                  style={styles.inputView}
                  secureTextEntry={true}
                  onChangeText={text => this.setState({ password: text })}
                />
              </View>

              <View style={{
                flexDirection: "row", width: "100%",
                justifyContent: "space-between"
              }}>
                <Text style={styles.subTitle}>Confirm you password: </Text>
                <TextInput
                  style={styles.inputView}
                  secureTextEntry={true}
                  onChangeText={text => this.setState({ password: text })}
                />
              </View>

              <View style={{
                alignItems: "center", flexDirection: "row",
                paddingTop: 40, justifyContent: "space-between", width: "50%"
              }}>
                <Button
                  mode="text"
                  onPress={this.userSignup}
                  style={{ marginBottom: 0 }}
                >
                  Signup
                    </Button>

                <Button
                  mode="text"
                  onPress={() => history.push("/")}
                  style={{ marginBottom: 0 }}
                >
                  Cancel
                    </Button>
              </View>

            </View>
          </View>
          <Footer />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <Header />

          <View style={{ alignItems: "center", height: "80%" }} >

            <View style={{ alignItems: "center", margin: 30 }}>
              <Text style={{ color: "#00205B", fontSize: 20, fontWeight: "bold" }} > Create New Account </Text>
            </View>

            <View style={{ alignItems: "center", flexDirection: "column", justifyContent: "center", width: "40%" }} >

              <View
                style={{
                  marginTop: 20,
                  marginBottom: 30,
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between"
                }}>
                <Text style={styles.subTitle}>Please choose your role: </Text>
                <Picker
                  style={styles.picker}
                  selectedValue={this.state.role}
                  onValueChange={this.pickRole}
                >
                  <Picker.Item label="Participant" value="Participant" />
                  <Picker.Item label="Project Manager" value="Project Manager" />
                  <Picker.Item
                    label="Health Care Workers"
                    value="Health Care Workers"
                  />
                  <Picker.Item label="NSWHP staff" value="Admin" />
                </Picker>
              </View>
              <View style={{
                flexDirection: "row", width: "100%",
                justifyContent: "space-between"
              }}>
                <Text style={styles.subTitle}>Stafflink Number: </Text>
                <TextInput
                  style={styles.inputView}
                  onChangeText={text => this.setState({ staffId: text })}
                />
              </View>
              <View style={{
                flexDirection: "row", width: "100%",
                justifyContent: "space-between"
              }}>
                <Text style={styles.subTitle}>Your full name: </Text>
                <TextInput
                  style={styles.inputView}
                  onChangeText={text => this.setState({ fullName: text })}
                />
              </View>
              <View style={{
                flexDirection: "row", width: "100%",
                justifyContent: "space-between"
              }}>
                <Text style={styles.subTitle}>Email Address: </Text>
                <TextInput
                  style={styles.inputView}
                  onChangeText={text => this.setState({ email: text })}
                />
              </View>
              <View style={{
                flexDirection: "row", width: "100%",
                justifyContent: "space-between"
              }}>
                <Text style={styles.subTitle}>Password: </Text>
                <TextInput
                  style={styles.inputView}
                  secureTextEntry={true}
                  onChangeText={text => this.setState({ password: text })}
                />
              </View>
              <View style={{
                flexDirection: "row", width: "100%",
                justifyContent: "space-between"
              }}>
                <Text style={styles.subTitle}>Confirm your Passwrod: </Text>
                <TextInput
                  style={styles.inputView}
                  secureTextEntry={true}
                  onChangeText={text => this.setState({ password: text })}
                />
              </View>

              <View style={{
                alignItems: "center", flexDirection: "row",
                paddingTop: 40, justifyContent: "space-between", width: "50%"
              }}>
                <Button
                  mode="text"
                  onPress={this.userSignup}
                  style={{ marginBottom: 0 }}
                >
                  {" "}
                        Signup{" "}
                </Button>

                <Button
                  mode="text"
                  onPress={() => history.push("/")}
                  style={{ marginBottom: 0 }}
                >
                  {" "}
                        Cancel{" "}
                </Button>
              </View>
            </View>
          </View>

          <Footer />
        </SafeAreaView>
      );
    }
  }
}
