import React from 'react';
import { StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { ScrollView, Text, View } from '../../../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

import { showMessage } from "react-native-flash-message";

import { AddTabParamList, Tracking } from '../../../types';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import StepIndicator from '../../../components/medicine/add/StepIndicator';
import AddContext from '../../../hooks/AddContext';
import { Input } from 'react-native-elements';
import FrequencyModal from '../../../components/medicine/add/FrequencyModal';
import PeriodModal from '../../../components/medicine/add/PeriodModal';

interface Props {
  styles: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const ManualStep1View: React.FC<Props> = ({ styles, setStep }) => {
  const colorScheme = useColorScheme();
  const { addInfo, setAddInfo } = React.useContext(AddContext);

  const [name, setName] = React.useState<string>(addInfo.medicineName);
  const [showFrequencyModal, setShowFrequencyModal] = React.useState<boolean>(false);
  const [frequency, setFrequency] = React.useState<Tracking["frequency"]>(addInfo.frequency);
  const [showPeriodModal, setShowPeriodModal] = React.useState<boolean>(false);
  const [period, setPeriod] = React.useState<any>(addInfo.periodOfTreatment);
  const days: { [key: number]: string; } = { 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat", 7: "Sun" };

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].medicineStep1 }}>
      <View style={{ backgroundColor: Colors[colorScheme].medicineStep1 }}>
        <StepIndicator step={1} totalSteps={3} />

        <View style={{ backgroundColor: Colors[colorScheme].medicineStep1, paddingHorizontal: 18 }}>
          <View style={{ marginVertical: 8, borderRadius: 10, padding: 20 }} lightColor="#fff" darkColor="#333">
            <Text style={{ fontSize: 24, fontWeight: '600' }}>Set Tracking Plan</Text>
            <Text style={{ fontSize: 15, marginVertical: 3 }}>Add the name, frequency and treatment duration of this medicine.</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            {/* Medicine Name */}
            <View style={styles.field} lightColor="#fff" darkColor="#333">
              <Text style={styles.fieldLeftTitle}>Medicine Name:</Text>
            </View>
            <View style={styles.fieldTextInput}>
              <TextInput value={name} editable clearButtonMode={"while-editing"}
                onChangeText={text => setName(text)} style={{ fontSize: 20 }} />
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            {/* Frequency */}
            <TouchableOpacity onPress={() => setShowFrequencyModal(true)}>
              <View style={styles.field} lightColor="#fff" darkColor="#333">
                <Text style={styles.fieldLeftTitle}>Frequency:</Text>
                <Feather name="edit" size={24} color={Colors[colorScheme].text} />
              </View>
              <Text style={{ fontSize: 20, marginTop: 2 }}>
                {(frequency.type === 'day' && frequency.value == 1) ? 'daily' :
                  frequency.type !== 'dayOfWeek' ? `every ${frequency.value} ${frequency.type}${frequency.value > 1 ? 's' : ''}` :
                    `every ${(frequency.value as Array<number>).map(value => days[value])}`
                }
              </Text>
            </TouchableOpacity>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            {/* Period of Treatment */}
            <TouchableOpacity onPress={() => setShowPeriodModal(true)}>
              <View style={styles.field} lightColor="#fff" darkColor="#333">
                <Text style={styles.fieldLeftTitle}>Period of Treatment:</Text>
                <Feather name="edit" size={24} color={Colors[colorScheme].text} />
              </View>
              <Text style={{ fontSize: 20, marginTop: 2 }}>
                {`${period.value} ${period.type}${period.value > 1 ? 's' : ''}`}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            setAddInfo({
              ...addInfo,
              medicineName: name,
              frequency: frequency,
              periodOfTreatment: period,
            });
            setStep(2);
          }}>
            <Text style={styles.buttonText}>Next Step</Text>
            <Entypo name="chevron-thin-right" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <FrequencyModal showFrequencyModal={showFrequencyModal} setShowFrequencyModal={setShowFrequencyModal}
        setFrequency={setFrequency} />
      <PeriodModal showPeriodModal={showPeriodModal} setShowPeriodModal={setShowPeriodModal}
        period={period} setPeriod={setPeriod} />
    </ScrollView>
  )
}

// styles are defined in ManualInputScreen

export default ManualStep1View;
