import React from 'react';
import { StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { View, Text } from '../../Themed';

import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { Picker } from '@react-native-community/picker';

interface Props {
  showPeriodModal: any,
  setShowPeriodModal: any,
  period: any,
  setPeriod: any,
}

const PeriodModal: React.FC<Props> = ({ showPeriodModal, setShowPeriodModal, period, setPeriod }) => {
  const colorScheme = useColorScheme();

  return (
    <Modal animationType="fade" transparent={true} visible={showPeriodModal}>
      <View style={styles.fullScreenView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select Period of Treatment</Text>
          <View style={styles.periodContainer}>

            <View style={styles.periodPage}>
              <Picker selectedValue={period.value} style={styles.picker}
                onValueChange={itemValue => setPeriod({ ...period, value: itemValue })}
                itemStyle={{ color: Colors[colorScheme].text }}>
                {[...Array(6)].map((e, i) => (<Picker.Item key={i} label={`${i + 1}`} value={i + 1} />))}
              </Picker>

              <Picker selectedValue={period.type} style={styles.picker}
                onValueChange={itemValue => setPeriod({ ...period, type: itemValue })}
                itemStyle={{ color: Colors[colorScheme].text }}>
                <Picker.Item label={`day${period.value == 1 ? '' : 's'}`} value="day" />
                <Picker.Item label={`week${period.value == 1 ? '' : 's'}`} value="week" />
                <Picker.Item label={`month${period.value == 1 ? '' : 's'}`} value="month" />
              </Picker>
            </View>

            <TouchableHighlight onPress={() => setShowPeriodModal(!showPeriodModal)}
              style={[styles.doneButton, { backgroundColor: Colors[colorScheme].buttonBlue }]}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  fullScreenView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
  },
  periodContainer: {
    alignItems: 'center',
  },
  periodPage: {
    flexDirection: "row",
  },
  picker: {
    width: 100,
  },
  doneButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
})

export default PeriodModal;
