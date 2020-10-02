import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TodayScreen from '../screens/TodayScreen';
import MedicineScreen from '../screens/MedicineScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { AddTabParamList } from '../types';
import ManualInputScreen from '../screens/add/ManualInputScreen';
import ScanInputScreen from '../screens/add/ScanInputScreen';

const AddTab = createBottomTabNavigator<AddTabParamList>();

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
          tabBarLabel: "Scan Input",
        }}
      />
      <AddTab.Screen
        name="ManualInputScreen"
        component={ManualInputScreen}
        options={{
          tabBarLabel: "Manual Input",
        }}
      />
    </AddTab.Navigator>
  );
}
