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
import AddTabNavigator from '../navigation/AddTabNavigator';
import { BottomTabParamList, TodayParamList, ProfileParamList, MedicineParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Today"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        labelStyle: { fontSize: 16, fontWeight: '500' },
        style: { height: 90, paddingVertical: 0 },
      }}>
      <BottomTab.Screen
        name="Today"
        component={TodayNavigator}
        options={{
          // You can explore the built-in icon families and icons on the web at:
          // https://icons.expo.fyi/
          tabBarIcon: ({ color, focused }) => <Ionicons name="md-calendar" color={color} size={focused ? 36 : 30} style={{ marginBottom: -3 }} />,
          tabBarBadge: 2,
        }}
      />
      <BottomTab.Screen
        name="Medicine"
        component={MedicineNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons name="pill" color={color} size={focused ? 36 : 30} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => <Ionicons name="ios-contact" color={color} size={focused ? 36 : 30} style={{ marginBottom: -3 }} />,
        }}
      />
    </BottomTab.Navigator>
  );
}



// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TodayStack = createNativeStackNavigator<TodayParamList>();

function TodayNavigator() {
  return (
    <TodayStack.Navigator>
      <TodayStack.Screen
        name="TodayScreen"
        component={TodayScreen}
        options={{ headerTitle: 'October 2020', headerLargeTitle: true }}
      />
    </TodayStack.Navigator>
  );
}
const MedicineStack = createStackNavigator<MedicineParamList>();

function MedicineNavigator() {
  return (
    <MedicineStack.Navigator>
      <MedicineStack.Screen
        name="MedicineScreen"
        component={MedicineScreen}
        options={{
          headerTitle: 'My Medicine',
          headerTitleAlign: "left",
          headerTitleStyle: { fontSize: 30 },
          headerStyle: { height: 110 }
        }}
      />
      <MedicineStack.Screen
        name="Add"
        component={AddTabNavigator}
        options={{
          headerTitle: 'Add New',
          headerBackTitle: 'Medicine',
        }}
      />
    </MedicineStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile', headerLargeTitle: true }}
      />
    </ProfileStack.Navigator>
  );
}
