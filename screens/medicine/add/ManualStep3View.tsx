import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView, Text, View } from '../../../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';
import { showMessage } from "react-native-flash-message";

import { AddTabParamList } from '../../../types';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import StepIndicator from '../../../components/medicine/add/StepIndicator';
import AddContext from '../../../hooks/AddContext';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-community/async-storage';

import UserContext from '../../../hooks/UserContext';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Props {
  styles: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  navigation: StackNavigationProp<AddTabParamList, "ManualInputScreen">;
}

const ManualStep3View: React.FC<Props> = ({ styles, setStep, navigation }) => {
  const colorScheme = useColorScheme();
  const { addInfo, setAddInfo } = useContext(AddContext);
  const { userInfo, isLoading } = useContext(UserContext);

  const [thumbnail, setThumbnail] = useState<number>(addInfo.imageUri === '' ? 1 : 0);
  const imageUri: Array<any> = [
    require("../../../assets/images/pills/pill3.png"),
    require("../../../assets/images/pills/pill2.png"),
    require("../../../assets/images/pills/pill1.png")
  ]

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].medicineStep3 }}>
      <View style={{ backgroundColor: Colors[colorScheme].medicineStep3 }}>
        <StepIndicator step={3} totalSteps={3} />

        <View style={{ backgroundColor: Colors[colorScheme].medicineStep3, paddingHorizontal: 18 }}>
          <View style={{ marginVertical: 8, borderRadius: 10, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: '600' }}>Set Thumbnail</Text>
            <Text style={{ fontSize: 15, marginVertical: 3 }}>Select the header image for your medicine.</Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {addInfo.imageUri != '' && (
                <TouchableWithoutFeedback style={{ borderColor: "#aaa", borderWidth: 1, marginTop: 10, marginRight: 10 }}
                  onPress={() => { setThumbnail(0) }}>
                  <Image style={{ width: 100, height: 100 }} source={{ uri: addInfo.imageUri }} />
                  {thumbnail == 0 && (
                    <View style={{ width: 30, height: 30, backgroundColor: "#228c22", borderRadius: 30, position: "absolute", bottom: 3, right: 3, alignItems: "center", justifyContent: "center" }}>
                      <Entypo name="check" size={24} color="white" />
                    </View>
                  )}
                </TouchableWithoutFeedback>
              )}
              {imageUri.map((uri: any, index: number) => (
                <TouchableWithoutFeedback key={index} style={{ borderColor: "#aaa", borderWidth: 1, marginTop: 10, marginRight: 10 }}
                  onPress={() => { setThumbnail(index + 1) }}>
                  <Image style={{ width: 100, height: 100 }} source={uri} />
                  {thumbnail == index + 1 && (
                    <View style={{ width: 30, height: 30, backgroundColor: "#228c22", borderRadius: 30, position: "absolute", bottom: 3, right: 3, alignItems: "center", justifyContent: "center" }}>
                      <Entypo name="check" size={24} color="white" />
                    </View>
                  )}
                </TouchableWithoutFeedback>
              ))}
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
      </View>
    </ScrollView >
  )
}

// styles are defined in ManualInputScreen

export default ManualStep3View;
