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
import Header from "../screens/Header";
import Footer from "../screens/Footer";


class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "@",
      password: "",
    };
  }
  pickRole = (role) => {
    this.setState({ role: role });
  };

  userLogin = () => {
    const { history } = this.props;
    axios
      .post("http://localhost:12345/api/auth", {
        email: this.state.email,
        password: this.state.password,
      })
      .then(
        (response) => {
          console.log(response);
          const userId = response.data.userId;
          const role = response.data.userRole;
          this.props.storeUserInfo(userId, role);
          AsyncStorage.setItem("role", role);
          AsyncStorage.setItem("userId", userId);
          if (role === "Project Manager") {
            history.push("/projectManagement");
          } else if (role === "Admin") {
            history.push("/worker");
          } else {
            history.push("/questionnaire");
          }
        },
        (error) => {
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
        <Header/>
        {/* Body */}
        <View style={{ height:"80%", width:"100%", flexDirection: "column", alignItems: "center"}}>
            <View style={{height:"25%", justifyContent:"center", alignContent:"center"}}>
                <Text style={{ color: "#00205B", fontSize: "2.5em", fontWeight: "bold"}}>
                    Log In
                </Text>
            </View>

            <View style={{ justifyContent: "center", textAlign: "center", alignItems: "center", width:"20%"}}>
                <View style={{width:"100%", flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
                    <Text style={{fontSize:"1.3em", color:"#00205B"}}>
                        Email: 
                    </Text>

                    <TextInput
                        mode="outlined"
                        style={{ height: 30 }}
                        onChangeText={(text) => this.setState({ email: text })}/>
                        
                </View>

                <View>
                  <HelperText type="error" visible={this.hasErrors()}>
                          Email address is invalid! 
                          </HelperText>
                </View>

                <View style={{width:"100%", flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
                    <Text style={{fontSize:"1.3em", color:"#00205B"}}>
                        Password: 
                    </Text>
                    
                    <TextInput
                        mode="outlined"
                        style={{ height: 30 }}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}/>
                </View>
            </View>

            <View style={{width:"100%", height:"10%", justifyContent:"center", alignContent:"center", flexDirection:"row", alignItems:"center"}}>
                <Button
                    mode="contained"
                    onPress={this.userLogin}
                    style={{ marginTop: 40 }}
                >
                    LOGIN
                </Button>
            </View>

            <View style={{width:"100%", height:"10%", justifyContent:"center", alignContent:"center", flexDirection:"row", alignItems:"center"}}>
                <Text style={{color:"#00205B"}}>Don't have an account? Sign up</Text>
                <Button mode="text" onPress={() => history.push("/register")}>
                    here
                </Button>
            </View>

        </View>

        <Footer/>

      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  storeUserInfo: (id, role) => dispatch(storeUserInfo(id, role)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
