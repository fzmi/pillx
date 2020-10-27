import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from "react-native-flash-message";

// Get the user information from the server
export default async function useUserData() {
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
