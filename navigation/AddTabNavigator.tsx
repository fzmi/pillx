import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { AddTabParamList, ManualInputStackParamList } from '../types';
import FirstManualInputScreen from '../screens/add/FirstManualInputScreen';
import SecondManualInputScreen from '../screens/add/SecondManualInputScreen';
import ScanInputScreen from '../screens/add/ScanInputScreen';

const AddTab = createBottomTabNavigator<AddTabParamList>();

// Root stack -> Button Tab -> Medicine -> Add
export default function AddTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <AddTab.Navigator
      initialRouteName="ScanInputScreen"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        labelStyle: { fontSize: 20, fontWeight: '500' },
        style: { height: 80 },
      }}>
      <AddTab.Screen
        name="ScanInputScreen"
        component={ScanInputScreen}
        options={{
          tabBarLabel: "Scan Package",
        }}
      />
      <AddTab.Screen
        name="ManualInput"
        component={ManualInputStackNavigator}
        options={{
          tabBarLabel: "Manual Input",
        }}
      />
    </AddTab.Navigator>
  );
}

const ManualInputStack = createStackNavigator<ManualInputStackParamList>();

// Root stack -> Button Tab -> Medicine -> Add -> Manual Input
function ManualInputStackNavigator() {
  return (
    <ManualInputStack.Navigator
      headerMode="none">
      <ManualInputStack.Screen
        name="FirstManualInputScreen"
        component={FirstManualInputScreen}
        options={{

        }}
      />
      <ManualInputStack.Screen
        name="SecondManualInputScreen"
        component={SecondManualInputScreen}
        options={{
        }}
      />
    </ManualInputStack.Navigator>
  );
}
