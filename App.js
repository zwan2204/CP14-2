/** @format */

import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

import AppNavigator from "./navigation/AppNavigator";
import ProjectUploading from "./screens/ProjectUploading";
import Route from "./routes/route";

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <AppNavigator /> */}
        {/* <ProjectUploading /> */}
        <Route />
      </View>
    );
  }
}
