import React, { useContext, useState } from 'react';
import { TouchableOpacity, TextInput, View as ClearView } from 'react-native';
import { ScrollView, Text, View } from '../../../components/Themed';
import { Entypo, Feather } from '@expo/vector-icons';

import { Tracking } from '../../../types';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import StepIndicator from '../../../components/medicine/add/StepIndicator';
import AddContext from '../../../hooks/AddContext';
import FrequencyModal from '../../../components/medicine/add/FrequencyModal';
import PeriodModal from '../../../components/medicine/add/PeriodModal';

interface Props {
  styles: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const EditStep1View: React.FC<Props> = ({ styles, setStep }) => {
  const colorScheme = useColorScheme();
  const { addInfo, setAddInfo } = useContext(AddContext);

  const [name, setName] = useState<string>(addInfo.medicineName);
  const [showFrequencyModal, setShowFrequencyModal] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<Tracking["frequency"]>(addInfo.frequency);
  const [showPeriodModal, setShowPeriodModal] = useState<boolean>(false);
  const [period, setPeriod] = useState<any>(addInfo.periodOfTreatment);
  const days: { [key: number]: string; } = { 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat", 7: "Sun" };

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].medicineStep1 }}>
      <View style={{ backgroundColor: Colors[colorScheme].medicineStep1 }}>
        <StepIndicator step={1} totalSteps={3} />

        <View style={{ backgroundColor: Colors[colorScheme].medicineStep1, paddingHorizontal: 18 }}>
          <View style={{ marginVertical: 8, borderRadius: 10, padding: 20 }} lightColor="#fff" darkColor="#333">
            <Text style={{ fontSize: 24, fontWeight: '600' }}>Set Tracking Plan</Text>
            <Text style={{ fontSize: 15, marginVertical: 3 }}>Add the name, frequency and treatment duration of this medicine.</Text>
            <View style={[styles.separator, { marginVertical: 12 }]} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            {/* Medicine Name */}
            <View style={styles.field} lightColor="#fff" darkColor="#333">
              <Text style={styles.fieldLeftTitle}>Medicine Name:</Text>
            </View>
            <View style={styles.fieldTextInput}>
              <TextInput value={name} editable clearButtonMode={"while-editing"}
                onChangeText={text => setName(text)} style={{ fontSize: 20 }} />
            </View>
            <View style={[styles.separator, { marginTop: 10, marginBottom: 12 }]} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            {/* Frequency */}
            <TouchableOpacity onPress={() => setShowFrequencyModal(true)}>
              <View style={styles.field} lightColor="#fff" darkColor="#333">
                <ClearView>
                  <Text style={styles.fieldLeftTitle}>Frequency:</Text>
                  <Text style={{ fontSize: 20, marginTop: 2 }}>
                    {(frequency.type === 'day' && frequency.value == 1) ? 'daily' :
                      frequency.type !== 'dayOfWeek' ? `every ${frequency.value} ${frequency.type}${frequency.value > 1 ? 's' : ''}` :
                        `${(frequency.value as Array<number>).map(value => days[value])}`}
                  </Text>
                </ClearView>
                <View style={styles.fieldRightEdit}>
                  <Feather name="edit" size={24} color="black" />
                </View>
              </View>

            </TouchableOpacity>
            <View style={[styles.separator, { marginVertical: 12 }]} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            {/* Period of Treatment */}
            <TouchableOpacity onPress={() => setShowPeriodModal(true)}>
              <View style={styles.field} lightColor="#fff" darkColor="#333">
                <ClearView>
                  <Text style={styles.fieldLeftTitle}>Period of Treatment:</Text>
                  <Text style={{ fontSize: 20, marginTop: 2 }}>
                    {`${period.value} ${period.type}${period.value > 1 ? 's' : ''}`}
                  </Text>
                </ClearView>
                <View style={styles.fieldRightEdit}>
                  <Feather name="edit" size={24} color="black" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.buttonContainer, { marginBottom: 20 }]} onPress={() => {
            setAddInfo({
              ...addInfo,
              trackingName: name,
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

export default EditStep1View;
