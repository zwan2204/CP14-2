/** @format */

import React from "react";
import { Image, Text, View, SafeAreaView } from "react-native";
import { styles } from "../styles.js";
import axios from "axios";
import { HelperText, TextInput, Button } from "react-native-paper";
import { useHistory, Link } from "react-router-dom";
import { storeUserInfo } from "../redux/actions/userAction";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./Header";
class LoginScreen extends React.Component {
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
    const { history } = this.props;
    axios
      .post("http://localhost:12345/api/auth", {
        email: this.state.email,
        password: this.state.password
      })
      .then(
        response => {
          console.log(response);
          const userId = response.data.userId;
          const role = response.data.userRole;
          this.props.storeUserInfo(userId, role);
          AsyncStorage.setItem("role", role);
          AsyncStorage.setItem("userId", userId);
          if (role === "Admin" || role === "Project Manager") {
            history.push("/projectManagement");
          } else if (role === "Health Care Workers") {
            history.push("/worker");
          } else {
            history.push("/questionnaire");
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
    const { history } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {/* Header color */}
        <Header />
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
            <Link to="/questionnaire" style={{ color: "white" }}>
              LOGIN
            </Link>
          </Button>

          <Button mode="text" onPress={() => history.push("/register")}>
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

const mapStateToProps = state => {
  return {
    userId: state.user.userId
  };
};

const mapDispatchToProps = dispatch => ({
  storeUserInfo: (id, role) => dispatch(storeUserInfo(id, role))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
