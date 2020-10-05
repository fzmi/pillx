import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { PublicStackParamList } from '../types';
import SignInScreen from '../screens/public/SignInScreen';
import RegisterScreen from '../screens/public/RegisterScreen';
import RecoverScreen from '../screens/public/RecoverScreen';

const PublicStack = createStackNavigator<PublicStackParamList>();

// Root stack -> Public stack
export default function PublicStackNavigator() {
  return (
    <PublicStack.Navigator
      initialRouteName="SignInScreen"
      mode="modal"
      headerMode="none">
      <PublicStack.Screen
        name="SignInScreen"
        component={SignInScreen}
      />
      <PublicStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <PublicStack.Screen
        name="RecoverScreen"
        component={RecoverScreen}
      />
    </PublicStack.Navigator>
  );
}
