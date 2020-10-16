import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView, Text, View } from '../../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';
import { showMessage } from "react-native-flash-message";

import { AddTabParamList } from '../../types';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import StepIndicator from '../../components/medicine/add/StepIndicator';
import AddContext from '../../hooks/AddContext';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-community/async-storage';

import UserContext from '../../hooks/UserContext';

interface Props {
  styles: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  navigation: StackNavigationProp<AddTabParamList, "ManualInputScreen">;
}

const ManualStep3View: React.FC<Props> = ({ styles, setStep, navigation }) => {
  const colorScheme = useColorScheme();

  const { userInfo, isLoading } = React.useContext(UserContext);

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].medicineStep3 }}>
      <AddContext.Consumer>
        {({ addInfo, setAddInfo }) => (
          <View style={{ backgroundColor: Colors[colorScheme].medicineStep3, flex: 1, padding: 20 }}>
            <StepIndicator step={3} totalSteps={3} />

            <View style={{ marginVertical: 20, borderRadius: 10, padding: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: '600' }}>Set Thumbnail</Text>
              <Text style={{ fontSize: 15, marginVertical: 3 }}>Select the header image for your medicine.</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {addInfo.imageUri != '' && (
                  <TouchableOpacity style={{ borderColor: "#aaa", borderWidth: 1, marginTop: 10, marginRight: 10 }}>
                    <Image style={{ width: 100, height: 100 }} source={{ uri: addInfo.imageUri }} />
                    <Ionicons style={{ position: "absolute", bottom: 3, right: 3 }} name="ios-checkmark-circle" size={30} color="#228c22" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={{ borderColor: "#aaa", borderWidth: 1, marginTop: 10, marginRight: 10 }}>
                  <Image style={{ width: 100, height: 100 }} source={require("../../assets/images/pills/pill3.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={{ borderColor: "#aaa", borderWidth: 1, marginTop: 10, marginRight: 10 }}>
                  <Image style={{ width: 100, height: 100 }} source={require("../../assets/images/pills/pill2.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={{ borderColor: "#aaa", borderWidth: 1, marginTop: 10, marginRight: 10 }}>
                  <Image style={{ width: 100, height: 100 }} source={require("../../assets/images/pills/pill1.png")} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={async () => {
              //todo: add new medicine

              const email = userInfo.email;
              const identifier = "97801";
              const startDate = "";
              const endDate = "";
              const time = "";
              const weekdays = "";

              console.log(addInfo.medicineName);

              try {
                // let response = await fetch(`http://deco3801-rever.uqcloud.net/user/medicine/add/weekdays?
                // email=${email}&identifier=${identifier}&startDate=${startDate}&endDate=${endDate}&time=${time}&weekdays=${weekdays}`, {
                let response = await fetch(`http://deco3801-rever.uqcloud.net/user/medicine/add?email=${email}&identifier=${identifier}`, {
                  method: 'POST',
                });
                console.log(response);
                // let responseJson = await response.json();
                // console.log(responseJson);
                showMessage({
                  message: "Added Medicine",
                  description: "Successfully added a new medicine.",
                  type: "success",
                  icon: "success",
                  duration: 3000,
                });
              } catch (error) {
                showMessage({
                  message: "Server Error",
                  description: "Cannot connect to PillX server.",
                  type: "danger",
                  icon: "danger",
                  duration: 2500,
                });
                console.log(error);
              }
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              navigation.dispatch(StackActions.popToTop());
            }} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add Medicine</Text>
              <AntDesign name="plus" size={24} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setStep(2); }} style={styles.backButtonContainer}>
              <Entypo name="chevron-thin-left" size={24} color="white" />
              <Text style={styles.backButtonText}>Previous Step</Text>
            </TouchableOpacity>
          </View>
        )}
      </AddContext.Consumer>
    </ScrollView >
  )
}

// styles are defined in ManualInputScreen

export default ManualStep3View;
