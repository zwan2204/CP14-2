/** @format */

import React from "react";
import { Text, View } from "react-native";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          height: "5%",
          backgroundColor: "#00205B",
          justifyContent: "center"
        }}
      >
        <Text style={{ color: "white", fontSize: 10, marginLeft: 10 }}>
          NSW Health website | Disclaimer | Privacy | Copyright | Accessibility
          | Site map
        </Text>
      </View>
    );
  }
}
