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

interface Props {
  styles: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const ManualStep2View: React.FC<Props> = ({ styles, setStep }) => {
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].medicineStep2 }}>
      <AddContext.Consumer>
        {({ addInfo, setAddInfo }) => (
          <View style={{ backgroundColor: Colors[colorScheme].medicineStep2, flex: 1, padding: 20 }}>
            <StepIndicator step={2} totalSteps={3} />

            <View style={{ marginVertical: 20, borderRadius: 10, padding: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>Set Reminders</Text>
            </View>

            <TouchableOpacity onPress={() => { setStep(3); }} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Next Step</Text>
              <Entypo name="chevron-thin-right" size={24} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setStep(1); }} style={styles.backButtonContainer}>
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

export default ManualStep2View;
