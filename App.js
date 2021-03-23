import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import AppNavigator from './navigation/AppNavigator';


export default class App extends React.Component {
  render() {
    return (
      <View>
        <AppNavigator />
      </View>
    );
  }
}