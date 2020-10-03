import React from 'react';
import { StyleSheet, TouchableOpacity, Alert, Image, TouchableHighlight } from 'react-native';
import { ScrollView, Text, View } from '../../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { ManualInputStackParamList } from '../../types';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import StepIndicator from '../../components/medicine/add/StepIndicator';

export default function FirstManualInputScreen({ navigation }: StackScreenProps<ManualInputStackParamList, 'FirstManualInputScreen'>) {
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].medicinePurple }}>
      <View style={{ backgroundColor: Colors[colorScheme].medicinePurple, flex: 1, padding: 20 }}>
        <StepIndicator step={1} totalSteps={2} />

        <View style={{ marginVertical: 20, borderRadius: 10, height: '80%'}}>
          
        </View>

        <TouchableOpacity onPress={() => { navigation.navigate("SecondManualInputScreen"); }} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Next</Text>
          <Entypo name="chevron-thin-right" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
  },
});
