import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from '../screens/LoginScreen';
import Signup from '../screens/SignupScreen'


export default createAppContainer(
    createSwitchNavigator({
      Login: Login,
      Signup: Signup
    })
  );
  