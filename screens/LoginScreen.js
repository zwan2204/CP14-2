/** @format */

import React from "react";
import { Text, View, SafeAreaView, TextInput } from "react-native";
import { styles } from "../styles.js";
import axios from "axios";
import { HelperText, Button, Dialog, Portal } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../screens/Header";
import Footer from "../screens/Footer";
import { DEPLOYEDHOST, LOCALHOST } from "../routes/urlMap";
import { ActivityIndicator } from "react-native";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "@",
      password: "",
      isLoading: false,
      visible: false
    };
  }

  componentDidMount() {
    this.setState({ email: "@" });
    this.setState({ password: "" });
  }

  show = () => {
    this.setState({ visible: !this.state.visible });
  };

  hide = () => {
    this.setState({ visible: !this.state.visible });
  };

  userLogin = () => {
    const { history } = this.props;
    if (this.state.email === "@" || this.state.password === "") {
      alert("Please input email and password");
    } else {
      this.setState({ isLoading: !this.state.isLoading });
      axios
        .post(`${DEPLOYEDHOST}/api/auth`, {
          email: this.state.email,
          password: this.state.password
        })
        .then(
          response => {
            const userId = response.data.userId;
            const role = response.data.userRole;
            AsyncStorage.setItem("role", role);
            AsyncStorage.setItem("userId", userId);
            this.setState({ isLoading: !this.state.isLoading });
            if (role === "Project Manager") {
              history.push("/projectManagement");
            } else if (role === "Admin") {
              history.push("/worker");
            } else if (role == "Participant") {
              history.push("/questionnaire");
            } else {
              alert(
                "*If you are a health care worker, please login after the participant finish all questions."
              );
            }
          },
          error => {
            console.log(error);
            alert("Authorization failed");
            this.setState({ isLoading: !this.state.isLoading });
          }
        );
    }
  };

  hasErrors() {
    return !this.state.email.includes("@");
  }

  render() {
    const { history } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {/* Header color */}
        <Header />
        {/* Body */}

        {this.state.isLoading ? (
          <View
            style={[
              styles.loadingStyle,
              {
                position: "absolute",
                backgroundColor: "white",
                opacity: 0.9,
                zIndex: 1,
                top: "15%"
              }
            ]}
          >
            <View
              style={{
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ActivityIndicator size="large" color="#00205B" />
              <Text
                style={{
                  color: "#00205B",
                  fontSize: "1.3em",
                  paddingTop: "3%"
                }}
              >
                Identifying your information
              </Text>
              <Text
                style={{ color: "red", fontSize: "1.3em", paddingTop: "3%" }}
              >
                *Beta Version: The first time you log in, it might take a bit
                long time to activate the server.
              </Text>
            </View>
          </View>
        ) : null}

        <View
          style={{
            height: "80%",
            width: "100%",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <View
            style={{
              height: "25%",
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <Text
              style={{
                color: "#00205B",
                fontSize: "2.5em",
                fontWeight: "bold"
              }}
            >
              Log In
            </Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              width: "20%"
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ fontSize: "1.3em", color: "#00205B" }}>
                Email:
              </Text>

              <TextInput
                style={{
                  height: 30,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 5
                }}
                onChangeText={text => this.setState({ email: text })}
              />
            </View>

            <View>
              <HelperText type="error" visible={this.hasErrors()}>
                Email address is invalid!
              </HelperText>
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ fontSize: "1.3em", color: "#00205B" }}>
                Password:
              </Text>

              <TextInput
                style={{
                  height: 30,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 5
                }}
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
              />
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: "10%",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Button
              mode="contained"
              onPress={this.userLogin}
              style={{ marginTop: 40 }}
            >
              LOGIN
            </Button>
          </View>

          <View
            style={{
              width: "100%",
              height: "10%",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#00205B" }}>
              Don't have an account? Sign up
            </Text>
            <Button mode="text" onPress={() => history.push("/register")}>
              here
            </Button>
          </View>
        </View>

        <Footer />
      </SafeAreaView>
    );
  }
}
