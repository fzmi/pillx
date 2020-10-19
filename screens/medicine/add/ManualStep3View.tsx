import React, { useContext, useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { ScrollView, Text, View } from '../../../components/Themed';

import { AddTabParamList, Tracking } from '../../../types';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { showMessage } from "react-native-flash-message";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { schedulePushNotification } from '../../../components/Notification';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import StepIndicator from '../../../components/medicine/add/StepIndicator';
import AddContext from '../../../hooks/AddContext';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-community/async-storage';
import UserContext from '../../../hooks/UserContext';

interface Props {
  styles: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  navigation: StackNavigationProp<AddTabParamList, "ManualInputScreen">;
}

const ManualStep3View: React.FC<Props> = ({ styles, setStep, navigation }) => {
  const colorScheme = useColorScheme();
  const { addInfo, setAddInfo } = useContext(AddContext);
  const { userInfo, setUserInfo, isLoading } = useContext(UserContext);

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
          <View style={{ marginVertical: 8, borderRadius: 10, padding: 20 }} lightColor="#fff" darkColor="#333">
            <Text style={{ fontSize: 24, fontWeight: '600' }}>Set Thumbnail</Text>
            <Text style={{ fontSize: 15, marginVertical: 3 }}>Select a header image for your medicine.</Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }} lightColor="#fff" darkColor="#333">
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
            let startDate: Date = new Date();
            let endDate: Date = new Date();
            if (addInfo.periodOfTreatment.type === 'day') {
              endDate.setDate(endDate.getDate() + addInfo.periodOfTreatment.value);
            } else if (addInfo.periodOfTreatment.type === 'week') {
              endDate.setDate(endDate.getDate() + addInfo.periodOfTreatment.value * 7);
            } else {
              endDate.setMonth(endDate.getMonth() + addInfo.periodOfTreatment.value);
            }
            const tracking: Tracking = {
              // id: "AUST R 12345",
              // instruction
              name: addInfo.medicineName,
              image: thumbnail === 0 ? addInfo.imageUri : imageUri[thumbnail - 1],
              frequency: addInfo.frequency as any,
              reminders: addInfo.reminders,
              startDate: new Date(),
              endDate: endDate,
            }
            setUserInfo({
              ...userInfo,
              trackings: [...userInfo.trackings, tracking],
            })

            // todo: add new medicine
            const email = userInfo.email;
            const identifier = "97801";

            try {
              // let response = await fetch(`http://deco3801-rever.uqcloud.net/user/medicine/add/weekdays?
              // email=${email}&identifier=${identifier}&startDate=${startDate}&endDate=${endDate}&time=${time}&weekdays=${weekdays}`, {
              let response = await fetch(`http://deco3801-rever.uqcloud.net/user/medicine/add?email=${email}&identifier=${identifier}`, {
                method: 'POST',
              });
              // console.log(response);
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

            await schedulePushNotification();
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
    </ScrollView>
  )
}

// styles are defined in ManualInputScreen

export default ManualStep3View;
