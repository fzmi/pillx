import React from 'react';
import { StyleSheet, TouchableOpacity, Alert, Image, TouchableHighlight } from 'react-native';
import { ScrollView, Text, View } from '../../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { ManualInputStackParamList } from '../../types';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import StepIndicator from '../../components/medicine/add/StepIndicator';

export default function SecondManualInputScreen({ navigation }: StackScreenProps<ManualInputStackParamList, 'SecondManualInputScreen'>) {
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].medicineBlue }}>
      <View style={{backgroundColor: Colors[colorScheme].medicineBlue, flex: 1, padding: 20}}>
        <StepIndicator step={2} totalSteps={2} />

        <View style={{ marginVertical: 20, borderRadius: 10, height: '80%'}}>
          
        </View>

        <TouchableOpacity onPress={() => { }} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Add Medicine</Text>
          <AntDesign name="plus" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={styles.backButtonContainer}>
          <Entypo name="chevron-thin-left" size={24} color="white" />
          <Text style={styles.backButtonText}>Previous</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
  },
});
