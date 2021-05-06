/** @format */

import React from "react";
import { Image, Text, View, SafeAreaView, CheckBox } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles.js";
import axios from "axios";
import { Button } from "react-native-paper";
import { DEPLOYEDHOST, LOCALHOST } from "../routes/urlMap";
export default class ParticipantInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      dob: "",
      healthy: "",
      english: "",
      curLocation: "",
      isPregnant: false,
      isSmoking: false,
      isLactating: false,
      isPlanning: false
    };
  }

  userSignup = () => {
    const { navigate } = this.props.navigation;
    axios
      .post(`${DEPLOYEDHOST}/api/users`, {
        fullName: this.state.fullName,
        password: this.state.password,
        role: this.state.role,
        email: this.state.email,
        gender: this.state.gender,
        dob: this.state.dob,
        healthy: this.state.healthy,
        english: this.state.english,
        curLocation: this.state.curLocation,
        isPregnant: this.state.isPregnant,
        isSmoking: this.state.isSmoking,
        isLactating: this.state.isLactating,
        isPlanning: this.state.isPlanning
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

  pickGender = gender => {
    if (gender !== 0) {
      this.setState({ gender: gender });
    }
  };

  pickHealthy = healthy => {
    if (healthy !== 0) {
      this.setState({ healthy: healthy });
    }
  };

  pickLocation = curLocation => {
    if (curLocation !== 0) {
      this.setState({ curLocation: curLocation });
    }
  };

  pickEnglish = english => {
    if (english !== 0) {
      this.setState({ english: english });
    }
  };

  setPregnant = isPregnant => {
    this.setState({ isPregnant: !this.state.isPregnant });
  };

  setSmoking = isSmoking => {
    this.setState({ isSmoking: !this.state.isSmoking });
  };

  setLactating = isLactating => {
    this.setState({ isLactating: !this.state.isLactating });
  };

  setPlanning = isPlanning => {
    this.setState({ isPlanning: !this.state.isPlanning });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* header view */}
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
        {/* body view */}

        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            paddingTop: "5%"
          }}
        >
          <View
            style={{ alignItems: "flex-end", flexDirection: "column", flex: 1 }}
          >
            <View>
              <Text style={styles.partDropdown}>Choose your gender</Text>
              <Text style={styles.partDropdown}>Are you healthy?</Text>
              <Text style={styles.partDropdown}>
                Are you a native English speaker?
              </Text>
              <Text style={styles.partDropdown}>
                Where are you currently located?
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "column", flex: 1, paddingLeft: 10 }}>
            <View style={{ padding: 18, marginLeft: 20 }}>
              <Picker
                style={styles.partPiker}
                selectedValue={this.state.gender}
                onValueChange={this.pickGender}
              >
                <Picker.Item label="Your gender" value="0" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            <View style={{ padding: 18, marginLeft: 20 }}>
              <Picker
                style={styles.partPiker}
                selectedValue={this.state.healthy}
                onValueChange={this.pickHealthy}
              >
                <Picker.Item label="Yes/No" value="0" />
                <Picker.Item label="Yes" value="Yes" />
                <Picker.Item label="No" value="No" />
              </Picker>
            </View>
            <View style={{ padding: 18, marginLeft: 20 }}>
              <Picker
                style={styles.partPiker}
                selectedValue={this.state.english}
                onValueChange={this.pickEnglish}
              >
                <Picker.Item label="Yes/No" value="0" />
                <Picker.Item label="Yes" value="Yes" />
                <Picker.Item label="No" value="No" />
              </Picker>
            </View>
            <View style={{ padding: 18, marginLeft: 20 }}>
              <Picker
                style={styles.partPiker}
                selectedValue={this.state.english}
                onValueChange={this.pickEnglish}
              >
                <Picker.Item label="Your current location" value="0" />
                <Picker.Item label="Home" value="Home" />
                <Picker.Item label="GP service" value="GP" />
                <Picker.Item label="Clinic" value="Clinic" />
                <Picker.Item label="Hospital" value="Hospital" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ padding: 30, fontWeight: "bold" }}>
            Please tick the medical condition/habits you have:
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.checkBox}>Pregnant</Text>
              <CheckBox
                value={this.state.isPregnant}
                onValueChange={this.setPregnant}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.checkBox}>Smoking</Text>
              <CheckBox
                value={this.state.isSmoking}
                onValueChange={this.setSmoking}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.checkBox}>Lactating</Text>
              <CheckBox
                value={this.state.isLactating}
                onValueChange={this.setLactating}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.checkBox}>Planning on becoming pregnant</Text>
              <CheckBox
                value={this.state.isPlanning}
                onValueChange={this.setPlanning}
              />
            </View>
          </View>
          <Button
            mode="contained"
            onPress={this.userSignup}
            style={{ marginTop: 80 }}
          >
            Signup
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
