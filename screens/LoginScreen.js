/** @format */

import React from "react";
import { Image, Text, View, SafeAreaView } from "react-native";
import { styles } from "../styles.js";
import axios from "axios";
import { HelperText, TextInput, Button } from "react-native-paper";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "@",
      password: ""
    };
  }

  pickRole = role => {
    this.setState({ role: role });
  };

  userLogin = () => {
    const { navigate } = this.props.navigation;
    axios
      .post("http://localhost:12345/api/auth", {
        email: this.state.email,
        password: this.state.password
      })
      .then(
        response => {
          console.log(response);
          if (response.data.userRole === "Admin") {
            navigate("CriteriaUploading");
          } else if (response.data.userRole === "Health Care Workers") {
            navigate("WorkerPage");
          } else {
            navigate("ParticipantPage");
          }
        },
        error => {
          console.log(error);
        }
      );
  };

  hasErrors() {
    return !this.state.email.includes("@");
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        {/* Header color */}
        <View
          style={{
            height: 140,
            backgroundColor: "#00205B",
            flexDirection: "row"
          }}
        >
          <Image
            style={{ width: 200, height: 100, left: 100, top: 20 }}
            source={require("../assets/header.png")}
          />
        </View>

        {/* Body */}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              marginTop: 80
            }}
          >
            <Text
              style={{
                color: "#00205B",
                fontSize: 20,
                fontWeight: "bold",
                paddingBottom: 70
              }}
            >
              Log In
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text style={{ justifyContent: "flex-start" }}>Email: </Text>
              <TextInput
                mode="outlined"
                style={{ height: 30, alignSelf: "flex-end" }}
                onChangeText={text => this.setState({ email: text })}
              />
            </View>
            <HelperText type="error" visible={this.hasErrors()}>
              Email address is invalid!
            </HelperText>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text style={{ alignItems: "flex-start" }}>Password: </Text>
              <TextInput
                mode="outlined"
                style={{ height: 30 }}
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
              />
            </View>
          </View>

          <Button
            mode="contained"
            onPress={this.userLogin}
            style={{ marginTop: 40 }}
          >
            LOGIN
          </Button>
          <Button mode="text" onPress={() => navigate("Signup")}>
            Signup
          </Button>
        </View>

        {/* <View
          style={{
            height: 60,
            width:"100%",
            backgroundColor: "#00205B",
            justifyContent: "center",
            position: 'absolute',
            bottom: 0
          }}>
          <Text style={{ color: "white", fontSize: 17}}>
            NSW Health website | Disclaimer | Privacy | Copyright | Accessibility
            | Site map
          </Text>
        </View> */}
      </SafeAreaView>
    );
  }
}
