import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SignInScreen from '../screens/public/SignInScreen';
import RegisterScreen from '../screens/public/RegisterScreen';
import RecoverScreen from '../screens/public/RecoverScreen';
import { PublicStackParamList } from '../types';

const PublicStack = createStackNavigator<PublicStackParamList>();

export default function PublicStackNavigator() {
  return (
    <PublicStack.Navigator mode="modal" headerMode="none">
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
