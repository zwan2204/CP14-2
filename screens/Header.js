/** @format */

import React from "react";
import { Image, View } from "react-native";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
    );
  }
}
