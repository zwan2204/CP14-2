/** @format */

import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles.js";
import axios from "axios";

export default class ParticipantPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> this is Participant page </Text>
      </View>
    );
  }
}
