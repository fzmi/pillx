import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-community/async-storage';

import { BottomTabParamList, TodayParamList, ProfileParamList, MedicineParamList, Tracking } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TodayScreen from '../screens/TodayScreen';
import MedicineScreen from '../screens/MedicineScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddTabNavigator from '../navigation/AddTabNavigator';
import DataTabNavigator from '../navigation/DataTabNavigator';
import EditScreen from '../screens/medicine/edit/EditScreen';
import UserContext from '../hooks/UserContext';
import SettingsScreen from '../screens/profile/SettingsScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

// Root stack -> Bottom Tab
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState({
    userInfo: { name: '', email: '', trackings: [] as Array<Tracking> },
    isLoading: true
  } as any);

  // Load the user data when initialising
  useEffect(() => {
    (async () => {
      const userData = await fetchUserData();
      const trackings = await fetchUserMedicine();
      setUser({
        ...user, userInfo: {
          name: userData?.fullName,
          email: userData?.email,
          trackings: trackings,
        }
      })
    })();
  }, []);

  // Get the user information from the server
  const fetchUserData = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await fetch("http://deco3801-rever.uqcloud.net/user/get?email=" + userToken, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        }
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      showMessage({
        message: "Network Error",
        description: "Cannot connect to PillX server.",
        type: "danger",
        icon: "danger",
        duration: 2500,
      });
      console.log(error);
    }
  }

  const fetchUserMedicine = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await fetch("http://deco3801-rever.uqcloud.net/user/medicine/getAll?email=" + userToken, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        }
      });
      const responseJson = await response.json();

      // translate response into Trackings, Medicines
      const trackings: Array<Tracking> = (responseJson as Array<any>).map(medicine => {
        if (!medicine.dosageSetting) {
          return {
            trackingName: "",
            medicineId: "",
            medicineName: "null",
            instruction: "",
            image: "",
            frequency: {
              type: "day",
              value: 1,
            },
            reminders: [],
            startDate: new Date(),
            endDate: new Date(),
          };
        }
        let frequencyType: string;
        let frequencyValue: number | Array<number>;
        if (medicine.dosageSetting.intervalUsage as boolean) {
          frequencyType = (medicine.dosageSetting.intervalType as string).slice(0, -1).toLowerCase();
          frequencyValue = medicine.dosageSetting.interval as number;
        } else {
          frequencyType = "dayOfWeek";
          frequencyValue = (medicine.dosageSetting.weekdays as Array<boolean>).map((value: boolean, index: number) =>
            (value ? index + 1 : -1)).filter(value => value !== -1);
        }
        return {
          // todo
          trackingName: "Medicine",
          medicineId: medicine.identifier === null ? "" : medicine.identifier,
          medicineName: medicine.name,
          instruction: "",
          image: "",
          frequency: {
            type: frequencyType as "day" | "week" | "month" | "dayOfWeek",
            value: frequencyValue,
          },
          reminders: [],
          startDate: new Date(`${medicine.startDate} ${medicine.time}`),
          endDate: new Date(`${medicine.endDate} ${medicine.time}`)
        }
      })
      return trackings;
    } catch (error) {
      console.log(error);
    }
  }

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
        labelStyle: { fontSize: 16, fontWeight: '500' }, style: { height: 90, paddingVertical: 0 }
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
    </ProfileStack.Navigator>
  );
}
