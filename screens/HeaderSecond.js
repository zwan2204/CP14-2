/** @format */

import React from "react";
import { Image, View, Text } from "react-native";
import { Button } from "react-native-paper";
export default class HeaderSecond extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
    };
  }

  render() {
    const { history } = this.props;
    return (
      <View
        style={{
          height: 150,
          width: "100%",
          backgroundColor: "#00205B",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: this.state.width, height: "80%", left: "10%" }}
          onLayout={(e) => {
            this.setState({ width: e.nativeEvent.layout.height * 2 });
          }}
          source={require("../assets/header.png")}
        />
        <Button
          mode="text"
          style={{
            backgroundColor: "white",
            width: 120,
            height: 37,
            position: "absolute",
            bottom: 30,
            right: 30,
          }}
          onPress={() => history.push("/Homepage")}
        >
          log out
        </Button>
        <Text style={{ color: "red", position: "absolute", fontSize: "3em" }}>
          {" "}
          Project - Version Beta
        </Text>
      </View>
    );
  }
}
