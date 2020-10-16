import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { AddTabParamList, MedicineParamList } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ManualInputScreen from '../screens/add/ManualInputScreen';
import ScanInputScreen from '../screens/add/ScanInputScreen';

const AddTab = createBottomTabNavigator<AddTabParamList>();

// Root stack -> Button Tab -> Medicine -> Add
export default function AddTabNavigator({ navigation }: StackScreenProps<MedicineParamList, 'Add'>) {
  const colorScheme = useColorScheme();

  return (
    <AddTab.Navigator
      initialRouteName="ScanInputScreen"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].background,
        activeBackgroundColor: Colors[colorScheme].tint,
        labelStyle: { fontSize: 20, fontWeight: '500' },
        style: { height: 75, backgroundColor: Colors[colorScheme].secondaryBackground },
        tabStyle: { justifyContent: 'center', margin: 12, borderRadius: 20 },
        safeAreaInsets: { bottom: 0 },
      }}>
      <AddTab.Screen
        name="ScanInputScreen"
        component={ScanInputScreen}
        options={{
          tabBarLabel: "Scan Package",
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
