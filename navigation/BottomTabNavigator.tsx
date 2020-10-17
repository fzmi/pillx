import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";

import { BottomTabParamList, TodayParamList, ProfileParamList, MedicineParamList } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TodayScreen from '../screens/TodayScreen';
import MedicineScreen from '../screens/MedicineScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddTabNavigator from '../navigation/AddTabNavigator';
import DataTabNavigator from '../navigation/DataTabNavigator';
import EditScreen from '../screens/medicine/edit/EditScreen';
import UserContext from '../hooks/UserContext';
import AddContext from '../hooks/AddContext';
import SettingsScreen from '../screens/profile/SettingsScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [user, setUser] = React.useState({
    userInfo: { name: '', email: '', medicine: [] },
    isLoading: true
  } as any);

  // Get the user data from the server
  const fetchUserData = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      let response = await fetch("http://deco3801-rever.uqcloud.net/user/get?email=" + userToken, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        }
      });
      let responseJson = await response.json();
      return {
        data: responseJson,
      };
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

  // Load the user data when initialising
  React.useEffect(() => {
    const getUserInfo = async () => {
      const userData = await fetchUserData();
      setUser({
        ...user,
        userInfo: {
          name: userData?.data.fullName,
          email: userData?.data.email,
          // todo: will use server data
          medicine: [{
            austR: "1",
            name: "Pantonix 20mg",
            description: "7:00am, 1 pill",
            time: "7:00am",
            image: require("../assets/images/pills/pill3.png"),
          }, {
            austR: "2",
            name: "Ferralet 90",
            description: "7:30am, 1 pill",
            time: "7:30am",
            image: require("../assets/images/pills/pill2.png"),
          }]
        }
      })
    };
    getUserInfo();
  }, []);

  const userContext = {
    userInfo: user.userInfo,
    setUserInfo: (data: any) => {
      setUser({
        ...user,
        userInfo: data
      });
    },
    isLoading: user.isLoading,
  };

  return (
    <UserContext.Provider value={userContext}>
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
            tabBarIcon: ({ color, focused }) =>
              <Ionicons name="md-calendar" color={color}
                size={focused ? 36 : 30} style={{ marginBottom: -3 }} />,
            tabBarBadge: user.userInfo.medicine.length == 0 ? undefined : user.userInfo.medicine.length,
          }}
        />
        <BottomTab.Screen
          name="Medicine"
          component={MedicineNavigator}
          options={{
            tabBarIcon: ({ color, focused }) =>
              <MaterialCommunityIcons name="pill" color={color}
                size={focused ? 36 : 30} style={{ marginBottom: -3 }} />,
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            tabBarIcon: ({ color, focused }) =>
              <Ionicons name="ios-contact" color={color}
                size={focused ? 36 : 30} style={{ marginBottom: -3 }} />,
          }}
        />
      </BottomTab.Navigator>
    </UserContext.Provider>
  );
}


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TodayStack = createStackNavigator<TodayParamList>();

function TodayNavigator() {
  return (
    <TodayStack.Navigator>
      <TodayStack.Screen
        name="TodayScreen"
        component={TodayScreen}
      />
    </TodayStack.Navigator>
  );
}

const MedicineStack = createStackNavigator<MedicineParamList>();

function MedicineNavigator() {
  const [addInfo, setAddInfo] = React.useState({
    medicineName: '',
    frequency: '',
    periodOfTreatment: '',
    reminders: {},
    imageUri: '',
  });

  // Since the screen props need to be serialisable, will use contexts instead
  const addContext = {
    addInfo: addInfo,
    setAddInfo: (data: any) => {
      setAddInfo(data);
    }
  };

  return (
    <AddContext.Provider value={addContext}>
      <MedicineStack.Navigator>
        <MedicineStack.Screen
          name="MedicineScreen"
          component={MedicineScreen}
          options={{
            headerTitle: 'My Medicine',
            headerTitleAlign: "left",
            headerTitleStyle: { fontSize: 30 },
            headerStyle: { height: 110 },
            headerTitleContainerStyle: { bottom: 10 },
          }}
        />
        <MedicineStack.Screen
          name="Add"
          component={AddTabNavigator}
          options={{
            headerTitle: 'Add Medicine',
            headerBackTitle: 'Medicine',
          }}
        />
        <MedicineStack.Screen
          name="Data"
          component={DataTabNavigator}
          options={{
            headerTitle: 'Data Visualisation',
            headerBackTitle: 'Medicine',
          }}
        />
        <MedicineStack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{
            headerTitle: 'Edit Medicine',
            headerBackTitle: 'Medicine',
          }}
        />

      </MedicineStack.Navigator>
    </AddContext.Provider>
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
      <ProfileStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings'}}
      />
    </ProfileStack.Navigator>
  );
}
