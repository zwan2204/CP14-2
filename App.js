/** @format */

import React from "react";
import { View } from "react-native";
import { Portal } from "react-native-paper";
import Route from "./routes/route";

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Portal.Host>
          <Route />
        </Portal.Host>
      </View>
    );
  }
}