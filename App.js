/** @format */

import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

import AppNavigator from "./navigation/AppNavigator";
import CriteriaUploading from "./screens/CriteriaUploading";
import Route from "./routes/route";

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <AppNavigator /> */}
        {/* <CriteriaUploading /> */}
        <Route />
      </View>
    );
  }
}
