import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { BottomTabParamList, TodayParamList, ProfileParamList, MedicineParamList, Tracking } from '../types';
import UserContext from '../hooks/useUserContext';
import useColorScheme from '../hooks/useColorScheme';
import useUserMedicine from '../hooks/useUserMedicine';
import useUserData from '../hooks/useUserData';
import Colors from '../constants/Colors';
import TodayScreen from '../screens/TodayScreen';
import MedicineScreen from '../screens/MedicineScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddTabNavigator from '../navigation/AddTabNavigator';
import DataTabNavigator from '../navigation/DataTabNavigator';
import EditScreen from '../screens/medicine/edit/EditScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import DetailScreen from '../screens/profile/DetailScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

// Root stack -> Bottom Tab
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState({
    userInfo: { name: '', email: '', dateOfBirth: '', gender: '', allergies: '', trackings: [] as Array<Tracking> },
    isLoading: true
  } as any);

  // Load the user data when initialising
  useEffect(() => {
    (async () => {
      const userData = await useUserData();
      const trackings = await useUserMedicine();
      setUser({
        ...user,
        userInfo: {
          ...user.userInfo,
          name: userData?.fullName,
          email: userData?.email,
          dateOfBirth: userData?.dateOfBirth === null ? "" : userData?.dateOfBirth,
          gender: userData?.gender,
          allergies: userData?.allergies,
          trackings: trackings,
        },
        isLoading: false,
      });
    })();
  }, []);

  const userContext = {
    userInfo: user.userInfo,
    setUserInfo: (data: any) => {
      setUser({
        ...user,
        userInfo: data
      });
      // todo: async store
    },
    isLoading: user.isLoading,
  };

  return (
    <UserContext.Provider value={userContext}>
      <BottomTab.Navigator initialRouteName="Today" tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        labelStyle: { fontSize: 16, fontWeight: '500' },
        style: { height: Platform.OS == 'ios' ? 90 : 60, paddingVertical: 0 }
      }}>
        <BottomTab.Screen name="Today" component={TodayNavigator} options={{
          // https://icons.expo.fyi/
          tabBarIcon: ({ color, focused }) =>
            <Ionicons name="md-calendar" color={color} size={focused ? 36 : 30} style={{ marginBottom: -3 }} />,
          tabBarBadge: user.userInfo.trackings ? (user.userInfo.trackings.length == 0 ? undefined : user.userInfo.trackings.length) : undefined,
        }} />
        <BottomTab.Screen name="Medicine" component={MedicineNavigator} options={{
          tabBarIcon: ({ color, focused }) =>
            <MaterialCommunityIcons name="pill" color={color} size={focused ? 36 : 30} style={{ marginBottom: -3 }} />,
        }} />

        <BottomTab.Screen name="Profile" component={ProfileNavigator} options={{
          tabBarIcon: ({ color, focused }) =>
            <Ionicons name="ios-contact" color={color} size={focused ? 36 : 30} style={{ marginBottom: -3 }} />,
        }} />
      </BottomTab.Navigator>
    </UserContext.Provider>
  );
}

// Each tab has its own navigation stack
// Root stack -> Bottom Tab -> Today
const TodayStack = createStackNavigator<TodayParamList>();
function TodayNavigator() {
  return (
    <TodayStack.Navigator>
      <TodayStack.Screen name="TodayScreen" component={TodayScreen} />
    </TodayStack.Navigator>
  );
}

// Root stack -> Bottom Tab -> Medicine
const MedicineStack = createStackNavigator<MedicineParamList>();
function MedicineNavigator() {
  return (
    <MedicineStack.Navigator>
      <MedicineStack.Screen name="MedicineScreen" component={MedicineScreen} options={{ headerShown: false }} />
      <MedicineStack.Screen name="Add" component={AddTabNavigator}
        options={{ headerTitle: 'Add Medicine', headerBackTitle: 'Medicine' }} />
      <MedicineStack.Screen name="Data" component={DataTabNavigator}
        options={{ headerTitle: 'Data Visualisation', headerBackTitle: 'Medicine' }} />
      <MedicineStack.Screen name="EditScreen" component={EditScreen}
        options={{ headerTitle: 'Edit Medicine', headerBackTitle: 'Medicine' }} />
    </MedicineStack.Navigator>
  );
}

// Root stack -> Bottom Tab -> Profile
const ProfileStack = createNativeStackNavigator<ProfileParamList>();
function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen}
        options={{ headerTitle: 'Profile', headerLargeTitle: true }} />
      <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen}
        options={{ headerTitle: 'Settings' }} />
      <ProfileStack.Screen name="DetailScreen" component={DetailScreen}
        options={{ headerTitle: 'Edit Detail' }} />
    </ProfileStack.Navigator>
  );
}
