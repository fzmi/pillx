import React from 'react';
import { StyleSheet, Modal, TouchableHighlight, Alert, Image } from 'react-native';
import { View, Text } from '../../Themed';

import { Entypo } from '@expo/vector-icons';
import AddContext from '../../../screens/add/AddContext';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

interface Props {
  modalVisible: any,
  setModalVisible: any,
  camera: any,
  navigation: any,
}

const ScanModal: React.FC<Props> = ({ modalVisible, setModalVisible, camera, navigation }) => {
  const colorScheme = useColorScheme();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select Medicine</Text>
          <AddContext.Consumer>
            {({ addInfo, setAddInfo }) => (
              <View style={{ alignItems: 'center' }}>
                {addInfo.imageUri != '' && (
                  <Image style={{ width: 100, height: 100 }} source={{ uri: addInfo.imageUri }} />
                )}
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                <View style={{ flexDirection: "row", justifyContent: "space-between" }} lightColor="#fff" darkColor="#333">
                  <Text style={{ fontSize: 20, marginRight: 10 }}>Add medicine manually</Text>
                  <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
                </View>

                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
              </View>
            )}
          </AddContext.Consumer>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#2196F3', marginTop: 20 }}
            onPress={() => {
              setModalVisible(!modalVisible);
              navigation.navigate("ManualInputScreen");
            }}>
            <Text style={styles.textStyle}>Continue</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={{ marginTop: 20 }}
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
    backgroundColor: 'white',
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
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
})

export default ScanModal;
