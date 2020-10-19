import React from 'react';
import { ColorSchemeName } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";

import { RootStackParamList } from '../types';
import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import PublicStackNavigator from './PublicStackNavigator';
import AuthContext from '../hooks/AuthContext';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
function RootNavigator() {
  // user auth
  const [state, dispatch] = React.useReducer((prevState: any, action: any) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return { ...prevState, userToken: action.token, isLoading: false, };
      case 'SIGN_IN':
        return { ...prevState, isSignout: false, userToken: action.token, };
      case 'SIGN_OUT':
        return { ...prevState, isSignout: true, userToken: null, };
    }
  }, { isLoading: true, isSignout: false, userToken: null, });

  // Fetch the token from storage then navigate to our appropriate place
  React.useEffect(() => {
    (async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    })();
  }, []);

  const authContext = React.useMemo(() => ({
    signIn: async (data: any) => {
      let userToken: string;
      if (data.email) {
        try {
          // todo: send email, password to the server to verify and get a token
          const response = await fetch(`http://deco3801-rever.uqcloud.net/user/get?email=${data.email}`, {
            method: 'POST',
            headers: {
              Accept: "application/json",
              'Content-Type': 'application/json',
            }
          });
          userToken = data.email;
        } catch (error) {
          showMessage({
            message: "Network Error",
            description: "Cannot connect to PillX server.",
            type: "danger",
            icon: "danger",
            duration: 2500,
          });
          return;
        }
      } else {
        userToken = "test@test.com";
      }
      // successfully get the token and redirect to auth routes
      AsyncStorage.setItem('userToken', userToken);
      dispatch({ type: 'SIGN_IN', token: userToken });
    },
    signOut: () => {
      AsyncStorage.removeItem('userToken');
      dispatch({ type: 'SIGN_OUT' });
    },
    signUp: async (data: any) => {
      // send user data to server and get a token
      await fetch(`http://deco3801-rever.uqcloud.net/user/add?\
        email=${data.email}&fullName=${data.name}&password=${data.password}`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        }
      })
        .then(response => response.text())
        .then(result => {
          if ((result as string).includes("Invalid email address")) {
            throw "Invalid email";
          }
          // successfully get the token and redirect to auth routes
          let userToken = data.email;
          AsyncStorage.setItem('userToken', userToken);
          dispatch({ type: 'SIGN_IN', token: userToken });
        })
        .catch(error => {
          showMessage({
            message: error === "Invalid email" ? "Failed to create account" : "Network Error",
            description: "Invalid email" ? "Please enter a valid email." : "Cannot connect to PillX server.",
            type: "danger",
            icon: "danger",
            duration: 2500,
          });
          console.log(error);
        })
    },
  }), []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {state.userToken == null ? (
          // public routes
          <Stack.Screen name="Public" component={PublicStackNavigator} />
        ) : ( // protected routes
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          )}
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
