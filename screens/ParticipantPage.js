/** @format */

import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles.js";
import axios from "axios";
import { connect } from "react-redux";
class ParticipantPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: []
    };
  }
  componentDidMount() {
    this.getQuestion();
  }

  getQuestion = () => {
    axios.get("http://localhost:12345/api/question").then(
      response => {
        console.log(response);
        let list1 = [];
        response.data.map(item => {
          list1.push(item.name);
        });
        this.setState({ question: list1 });
        console.log(this.state.question);
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.question} </Text>
        <Text>{this.props.userId} </Text>
        <Text>{this.props.role} </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    role: state.user.role
  };
};

export default connect(mapStateToProps)(ParticipantPage);
