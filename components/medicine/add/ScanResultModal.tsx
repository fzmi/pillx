import React, { useContext, useState } from 'react';
import { StyleSheet, Modal, TouchableOpacity, TouchableHighlight, Image, TextInput } from 'react-native';
import { View, Text, ScrollView } from '../../Themed';

import { Entypo } from '@expo/vector-icons';
import AddContext from '../../../hooks/useAddContext';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { showMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';

interface Props {
  modalVisible: any,
  setModalVisible: any,
  camera: any,
  navigation: any,
}

interface ManualProps {
  modalVisible: any,
  setModalVisible: any,
  navigation: any,
  setShowManualInput: any,
}

const ManualInput: React.FC<ManualProps> = ({ modalVisible, setModalVisible, navigation, setShowManualInput }) => {
  const colorScheme = useColorScheme();
  const [name, setName] = useState("AUST R 12345");
  const { addInfo, setAddInfo } = useContext(AddContext);

  const searchMedicine = async (id: string) => {
    id = id.split(" ")[2];
    return fetch(`https://deco3801-rever.uqcloud.net/medicine/get?identifier=${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
      .then(response => response.json())
      .then(result => {
        if (!result) {
          throw "No medicine found";
        }
        return result;
      })
      .catch(error => {
        showMessage({
          message: "Search Error",
          description: "No medicine found.",
          type: "danger",
          icon: "danger",
          duration: 2500,
        });
        console.log(error);
      });
  }

  return (
    <View style={{ width: "100%" }}>
      <Text style={{ fontSize: 18, marginTop: 15 }}>Search by AUST R/L number</Text>

      <View style={styles.fieldTextInput}>
        <TextInput value={name} editable clearButtonMode={"while-editing"}
          onChangeText={text => { setName(text) }} style={{ fontSize: 20 }} />
      </View>

      <TouchableOpacity onPress={async () => {
        const result = await searchMedicine(name);
        if (result) {
          setAddInfo({ ...addInfo, medicineName: result.name, medicineId: result.identifier });
          setModalVisible(!modalVisible);
          navigation.navigate("ManualStep1Screen");
        }
      }} style={[styles.doneButton, { backgroundColor: Colors[colorScheme].buttonBlue }]}>
        <Text style={styles.doneButtonText}>Search &amp; Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { setShowManualInput(false) }}
        style={[styles.backButton, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
        <Entypo name="chevron-thin-left" size={24} color={Colors[colorScheme].text} />
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>);
}

const ScanResultModal: React.FC<Props> = ({ modalVisible, setModalVisible, camera, navigation }) => {
  const colorScheme = useColorScheme();
  const { addInfo, setAddInfo } = useContext(AddContext);
  const [showManualInput, setShowManualInput] = useState<boolean>(false);

  const Result: React.FC = () => (
    <ScrollView style={{ width: "100%", maxHeight: 300 }} contentContainerStyle={{ alignItems: "center" }}>
      {addInfo.medicineResults.map((result: any, index: number) => (
        <View key={index}>
          <TouchableOpacity style={{ flexDirection: "row", paddingVertical: 10 }}
            onPress={() => {
              setAddInfo({ ...addInfo, medicineName: result.name, medicineId: result.id });
              setModalVisible(!modalVisible);
              navigation.navigate("ManualStep1Screen");
            }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 5 }}>{result.name}</Text>
                <Text>AUST R {result.id}</Text>
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
          setShowManualInput(true);
        }}>
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginRight: 10 }}>Add medicine manually</Text>
          <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
        </View>
      </TouchableOpacity>
    </ScrollView>);

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select Medicine</Text>

          <View style={{ alignItems: 'center' }}>
            {addInfo.imageUri != '' && (
              <Image style={{ width: 100, height: 100, marginBottom: 15 }} source={{ uri: addInfo.imageUri }} />
            )}
            {!showManualInput && (<Result />)}
            {showManualInput && (<ManualInput modalVisible={modalVisible} setModalVisible={setModalVisible}
              navigation={navigation} setShowManualInput={setShowManualInput} />)}
          </View>

          <TouchableHighlight
            style={{ marginTop: 20, backgroundColor: Colors[colorScheme].secondaryBackground, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 10 }}
            onPress={() => {
              setModalVisible(!modalVisible);
              if (camera.current instanceof Camera) {
                camera.current.resumePreview();
              }
            }}>
            <Text style={{ fontSize: 18 }}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
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
    maxHeight: "70%",
    minWidth: "80%",
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
    marginBottom: 15,
  },
  separator: {
    marginVertical: 2,
    height: 1,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
  },
  doneButton: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  doneButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  fieldTextInput: {
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    flexGrow: 1,
    marginBottom: 20,
  },
})

export default ScanResultModal;
