import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from '../screens/LoginScreen';


export default createAppContainer(
    createSwitchNavigator({
      Login: Login,
    })
  );
  