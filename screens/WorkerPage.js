/** @format */

import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles.js";
import axios from "axios";

export default class WorkerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={styles.container}>this is worker page</View>;
  }
}
