import React from 'react';
import { Animated, StyleSheet, Modal, TouchableHighlight, Alert, Image } from 'react-native';
import { View, Text } from '../../Themed';

import { Entypo, Ionicons } from '@expo/vector-icons';
import AddContext from '../../../hooks/AddContext';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import { createStackNavigator } from '@react-navigation/stack';

interface Props {
  showFrequencyModal: any,
  setShowFrequencyModal: any,
  frequency: any,
  setFrequency: any,
}

// const Pickers = () => {
//   return (
//     <View style={{ flexDirection: "row" }}>
//       <Picker
//         selectedValue={frequency.number}
//         style={{ width: 100 }}
//         onValueChange={(itemValue, itemIndex) => setFrequency({ ...frequency, number: itemValue })}
//         itemStyle={{ color: Colors[colorScheme].text }}
//       >
//         {/* May use map in the future */}
//         <Picker.Item label="1" value={1} />
//         <Picker.Item label="2" value={2} />
//         <Picker.Item label="3" value={3} />
//         <Picker.Item label="4" value={4} />
//         <Picker.Item label="5" value={5} />
//       </Picker>

//       <Picker
//         selectedValue={frequency.unit}
//         style={{ width: 100 }}
//         onValueChange={(itemValue, itemIndex) => setFrequency({ ...frequency, unit: itemValue })}
//         itemStyle={{ color: Colors[colorScheme].text }}
//       >
//         <Picker.Item label="Days" value="day" />
//         <Picker.Item label="Weeks" value="week" />
//         <Picker.Item label="Months" value="month" />
//       </Picker>
//     </View>);
// }

const FrequencyModal: React.FC<Props> = ({ showFrequencyModal, setShowFrequencyModal }) => {
  const colorScheme = useColorScheme();

  return (
    <Modal animationType="fade" transparent={true} visible={showFrequencyModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select Frequency</Text>
          <AddContext.Consumer>
            {({ addInfo, setAddInfo }) => (
              <View style={{ alignItems: 'center' }}>

                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}
                  onPress={() => {
                    setAddInfo({ ...addInfo, medicineName: "My Medicine" });
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

                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}
                  onPress={() => {
                    setAddInfo({ ...addInfo, medicineName: "My Medicine" });
                    setShowFrequencyModal(!showFrequencyModal);
                  }}>
                  <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
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

export default FrequencyModal;
