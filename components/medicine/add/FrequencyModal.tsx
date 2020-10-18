import React, { useState } from 'react';
import { StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { View, Text } from '../../Themed';

import { Entypo } from '@expo/vector-icons';
import AddContext from '../../../hooks/AddContext';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';

interface Props {
  showFrequencyModal: any,
  setShowFrequencyModal: any,
  frequency: any,
  setFrequency: any,
}

const FrequencyModal: React.FC<Props> = ({ showFrequencyModal, setShowFrequencyModal, setFrequency }) => {
  const colorScheme = useColorScheme();

  const [showFrequency, setShowFrequency] = useState<boolean>(true);
  const [showEvery, setShowEvery] = useState<boolean>(false);
  const [everyValue, setEveryValue] = useState<number>(1);
  const [everyType, setEveryType] = useState<string>("day");
  const [showDayOfWeek, setShowDayOfWeek] = useState<boolean>(false);

  return (
    <Modal animationType="fade" transparent={true} visible={showFrequencyModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select Frequency</Text>
          <AddContext.Consumer>
            {({ addInfo, setAddInfo }) => (
              <View style={{ alignItems: 'center' }}>

                {showFrequency && (
                  <View>
                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}
                      onPress={() => {
                        setShowFrequencyModal(!showFrequencyModal);
                      }}>
                      <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, marginRight: 10 }}>Every Day</Text>
                        <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
                      </View>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    </View>

                    <TouchableOpacity style={{ paddingVertical: 10 }}
                      onPress={() => {
                        setShowEvery(true);
                        setShowFrequency(false);
                      }}>
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "transparent" }}>
                        <Text style={{ fontSize: 20, marginRight: 10 }}>Every ... days</Text>
                        <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
                      </View>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    </View>

                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}
                      onPress={() => {
                        setAddInfo({ ...addInfo, medicineName: "My Medicine" });
                        setShowFrequencyModal(!showFrequencyModal);
                      }}>
                      <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, marginRight: 10 }}>Days of Week...</Text>
                        <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {showEvery && (
                  <View>
                    <TouchableOpacity
                      style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: Colors[colorScheme].secondaryBackground, paddingVertical: 10, borderRadius: 10 }}
                      onPress={() => {
                        setShowEvery(false);
                        setShowFrequency(true);
                      }}>
                      <Entypo name="chevron-thin-left" size={24} color={Colors[colorScheme].text} />
                      <Text style={{ fontSize: 18 }}>Back</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <Text style={{ fontSize: 20 }}>Every</Text>
                      <Picker
                        selectedValue={everyValue}
                        style={{ width: 80, marginLeft: 12 }}
                        onValueChange={(itemValue: any, itemIndex) => setEveryValue(itemValue)}
                        itemStyle={{ color: Colors[colorScheme].text }}
                      >
                        {[...Array(6)].map((e, i) => (
                          <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
                        ))}
                      </Picker>
                      <Picker
                        selectedValue={everyType}
                        style={{ width: 100 }}
                        onValueChange={(itemValue: any, itemIndex) => setEveryType(itemValue)}
                        itemStyle={{ color: Colors[colorScheme].text }}
                      >
                        <Picker.Item label={`day${everyValue == 1 ? '' : 's'}`} value="day" />
                        <Picker.Item label={`week${everyValue == 1 ? '' : 's'}`} value="week" />
                        <Picker.Item label={`month${everyValue == 1 ? '' : 's'}`} value="month" />
                      </Picker>
                    </View>

                    <TouchableOpacity
                      style={{ flexDirection: "row", marginTop: 5, justifyContent: "center", alignItems: "center", backgroundColor: Colors[colorScheme].buttonBlue, paddingVertical: 12, borderRadius: 10 }}
                      onPress={() => {
                        setFrequency({type: everyType, value: everyValue});
                        setShowFrequencyModal(!showFrequencyModal);
                      }}>
                      <Text style={{ fontSize: 18, color: "white", fontWeight: "600" }}>Done</Text>
                    </TouchableOpacity>
                  </View>
                )}

              </View>
            )}
          </AddContext.Consumer>

          <TouchableHighlight
            style={{ marginTop: 15, backgroundColor: Colors[colorScheme].secondaryBackground, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 10 }}
            onPress={() => {
              setShowFrequencyModal(!showFrequencyModal);
            }}>
            <Text style={{ fontSize: 18 }}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal >
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

export default FrequencyModal;
