import React from 'react';
import { StyleSheet, Modal, TouchableHighlight, Alert, Image } from 'react-native';
import { View, Text } from '../../Themed';

import { Entypo, Ionicons } from '@expo/vector-icons';
import AddContext from '../../../hooks/AddContext';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select Period of Treatment</Text>
          <AddContext.Consumer>
            {({ addInfo, setAddInfo }) => (
              <View style={{ alignItems: 'center' }}>

                <View style={{ flexDirection: "row" }}>
                  <Picker
                    selectedValue={period.value}
                    style={{ width: 100 }}
                    onValueChange={(itemValue, itemIndex) => setPeriod({ ...period, value: itemValue })}
                    itemStyle={{ color: Colors[colorScheme].text }}
                  >
                    {[...Array(6)].map((e, i) => (
                      <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
                    ))}
                  </Picker>

                  <Picker
                    selectedValue={period.type}
                    style={{ width: 100 }}
                    onValueChange={(itemValue, itemIndex) => setPeriod({ ...period, type: itemValue })}
                    itemStyle={{ color: Colors[colorScheme].text }}
                  >
                    <Picker.Item label={`day${period.value == 1 ? '' : 's'}`} value="day" />
                    <Picker.Item label={`week${period.value == 1 ? '' : 's'}`} value="week" />
                    <Picker.Item label={`month${period.value == 1 ? '' : 's'}`} value="month" />
                  </Picker>
                </View>

                <TouchableHighlight style={{
                  marginTop: 15, backgroundColor: Colors[colorScheme].buttonBlue,
                  paddingVertical: 10, paddingHorizontal: 30, borderRadius: 10
                }} onPress={() => {
                  setShowPeriodModal(!showPeriodModal);
                }}>
                  <Text style={{ fontSize: 18, color: "white" }}>Done</Text>
                </TouchableHighlight>
              </View>
            )}
          </AddContext.Consumer>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
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
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
  },
  separator: {
    marginVertical: 2,
    height: 1,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
})

export default PeriodModal;
