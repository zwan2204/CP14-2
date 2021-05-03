/** @format */

import React from "react";
import { Image, View } from "react-native";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        width: 0
    };
  }

  render() {
    return (
      <View
        style={{
          height: "15%",
          width:"100%",
          backgroundColor: "#00205B",
          flexDirection: "row",
          alignContent:"center",
          alignItems:"center"
        }}
      >
        <Image
          style={{ width: this.state.width, height: "80%", left: "10%"}}
          onLayout={e => {
            this.setState({ width: e.nativeEvent.layout.height * 2});
          }}
          source={require("../assets/header.png")}
        />
      </View>
    );
  }
}
