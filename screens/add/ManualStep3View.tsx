import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView, Text, View } from '../../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';
import { showMessage } from "react-native-flash-message";

import { AddTabParamList } from '../../types';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import StepIndicator from '../../components/medicine/add/StepIndicator';
import AddContext from '../../hooks/AddContext';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  styles: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  navigation: StackNavigationProp<AddTabParamList, "ManualInputScreen">;
}

const ManualStep3View: React.FC<Props> = ({ styles, setStep, navigation }) => {
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].medicineStep3 }}>
      <AddContext.Consumer>
        {({ addInfo, setAddInfo }) => (
          <View style={{ backgroundColor: Colors[colorScheme].medicineStep3, flex: 1, padding: 20 }}>
            <StepIndicator step={3} totalSteps={3} />

            <View style={{ marginVertical: 20, borderRadius: 10, padding: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>Set Thumbnail</Text>
              {addInfo.imageUri != '' && (
                <Image style={{ width: 100, height: 100 }} source={{ uri: addInfo.imageUri }} />
              )}
            </View>

            <TouchableOpacity onPress={() => {
              //todo: add new medicine

              showMessage({
                message: "Added Medicine",
                description: "Successfully added a new medicine.",
                type: "success",
                icon: "success",
                duration: 3000,
              });
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
    </ScrollView>
  )
}

// styles are defined in ManualInputScreen

export default ManualStep3View;
