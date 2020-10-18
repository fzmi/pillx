import React from 'react';
import { StyleSheet, Modal, TouchableHighlight, Alert, Image } from 'react-native';
import { View, Text } from '../../Themed';

import { Entypo, Ionicons } from '@expo/vector-icons';
import AddContext from '../../../hooks/AddContext';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  modalVisible: any,
  setModalVisible: any,
  camera: any,
  navigation: any,
}

const ScanResultModal: React.FC<Props> = ({ modalVisible, setModalVisible, camera, navigation }) => {
  const colorScheme = useColorScheme();

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select Medicine</Text>
          <AddContext.Consumer>
            {({ addInfo, setAddInfo }) => (
              <View style={{ alignItems: 'center' }}>
                {addInfo.imageUri != '' && (
                  <Image style={{ width: 100, height: 100, marginVertical: 15 }} source={{ uri: addInfo.imageUri }} />
                )}

                {addInfo.medicineResults.map((result: any, index: number) => (
                  <View key={index}>
                    <TouchableOpacity style={{ flexDirection: "row", paddingVertical: 10 }}
                      onPress={() => {
                        setAddInfo({ ...addInfo, medicineName: result.name });
                        setModalVisible(!modalVisible);
                        navigation.navigate("ManualInputScreen");
                      }}>
                      <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                          <Text style={{ fontSize: 20, marginRight: 10, fontWeight: "700" }}>{result.name}</Text>
                          <Text>{result.id}</Text>
                        </View>
                        <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
                      </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    </View>
                  </View>
                ))}

                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}
                  onPress={() => {
                    setAddInfo({ ...addInfo, medicineName: "My Medicine" });
                    setModalVisible(!modalVisible);
                    navigation.navigate("ManualInputScreen");
                  }}>
                  <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, marginRight: 10 }}>Add medicine manually</Text>
                    <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </AddContext.Consumer>

          <TouchableHighlight
            style={{ marginTop: 15, backgroundColor: Colors[colorScheme].secondaryBackground, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 10 }}
            onPress={() => {
              setModalVisible(!modalVisible);
              camera.current.resumePreview();
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
    fontWeight: '600',
  },
  separator: {
    marginVertical: 2,
    height: 1,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
})

export default ScanResultModal;
