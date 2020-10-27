import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView, Text, View } from '../../../components/Themed';
import { AntDesign, Entypo } from '@expo/vector-icons';

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import StepIndicator from '../../../components/medicine/add/StepIndicator';
import AddContext from '../../../hooks/useAddContext';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface Props {
  styles: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const ManualStep2View: React.FC<Props> = ({ styles, setStep }) => {
  const colorScheme = useColorScheme();
  const { addInfo, setAddInfo } = useContext(AddContext);

  const [reminders, setReminders] = useState<Array<Date>>(addInfo.reminders);
  const [showReminderModal, setShowReminderModal] = useState(false);

  const handleConfirm = (date: Date) => {
    date.setSeconds(0);
    setReminders((array: Array<Date>) => [...array, date]);
    setShowReminderModal(false);
  };

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].medicineStep2 }}>
      <View style={{ backgroundColor: Colors[colorScheme].medicineStep2 }}>
        <StepIndicator step={2} totalSteps={3} />

        <View style={{ backgroundColor: Colors[colorScheme].medicineStep2, paddingHorizontal: 18 }}>
          <View style={{ marginVertical: 8, borderRadius: 10, padding: 20 }} lightColor="#fff" darkColor="#333">
            <Text style={{ fontSize: 24, fontWeight: '600' }}>Set Reminders</Text>
            <Text style={{ fontSize: 15, marginVertical: 3 }}>
              The app will push notifications when it is time to take this medicine.
            </Text>
            <View style={[styles.separator, { marginTop: 12, marginBottom: 8 }]} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

            {reminders.map((reminder: Date, index: number) => (
              <View key={index} lightColor="#fff" darkColor="#333">
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                  lightColor="#fff" darkColor="#333">
                  <Text style={{ fontSize: 20, fontWeight: '600' }}>
                    {reminder.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                  </Text>
                  <TouchableOpacity style={styles.fieldRightEdit}
                    onPress={() => setReminders((array: Array<Date>) => array.filter((x: Date) => x !== reminder))}>
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={[styles.separator, { marginVertical: 8 }]} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
              </View>
            ))}

            <TouchableOpacity style={[styles.fieldRightEdit, { flexDirection: "row", justifyContent: "center", alignItems: "center" }]}
              onPress={() => { setShowReminderModal(true) }}>
              <Text style={{ fontSize: 20, fontWeight: '600', marginRight: 10, color: "black" }}>Add New Reminder</Text>
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => {
            setStep(3);
          }} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Next Step</Text>
            <Entypo name="chevron-thin-right" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { setStep(1); }} style={styles.backButtonContainer}>
            <Entypo name="chevron-thin-left" size={24} color="white" />
            <Text style={styles.backButtonText}>Previous Step</Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={showReminderModal}
        date={new Date(0, 0, 0, 12, 0)}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => setShowReminderModal(false)}
        minuteInterval={5}
        headerTextIOS="Pick a reminder time"
      />
    </ScrollView>
  )
}

// styles are defined in ManualInputScreen

export default ManualStep2View;
