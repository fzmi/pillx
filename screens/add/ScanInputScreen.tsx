import React from 'react';
import { StyleSheet, TouchableHighlight, TouchableWithoutFeedback, Modal, Alert } from 'react-native';
import { ScrollView, Text, View } from '../../components/Themed';

import { StackScreenProps, useHeaderHeight } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import BarCodeScanner from 'expo-barcode-scanner';
import { showMessage, hideMessage } from "react-native-flash-message";

import { AddTabParamList } from '../../types';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import AddContext from './AddContext';
import ScanModal from '../../components/medicine/add/ScanModal';

export default function ScanInputScreen({ navigation }: StackScreenProps<AddTabParamList, 'ScanInputScreen'>) {
  const camera = React.useRef<Camera>(null!);
  const colorScheme = useColorScheme();
  const headerHeight = useHeaderHeight();

  const [hasPermission, setHasPermission] = React.useState<Boolean | null>(null);
  const [flash, setFlash] = React.useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = React.useState(0);
  const [cameraOn, setcameraOn] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  // load component
  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // only turn on the camera when the screen is on focus
  useFocusEffect(
    React.useCallback(() => {
      setcameraOn(true);
      showMessage({
        message: "Scan Instruction",
        description: "Loacte the AUST R/L number on the package and take a picture.",
        type: "default",
        icon: "info",
        autoHide: false,
        position: {
          top: headerHeight
        },
        floating: true,
        textStyle: {
          paddingRight: 8
        },
        backgroundColor: '#222'
      });
      return () => {
        setcameraOn(false);
        hideMessage();
      };
    }, [])
  );

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.scanView}>
        {cameraOn &&
          <Camera
            style={styles.camera}
            ref={camera}
            flashMode={flash}
            zoom={zoom}>
            <View
              style={styles.cameraView}>
              <TouchableHighlight
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  backgroundColor: flash === Camera.Constants.FlashMode.off ? '#222' : 'white',
                  borderRadius: 50,
                  height: 50,
                  width: 50,
                  padding: 5,
                  marginRight: 20,
                }}
                onPress={() => {
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.torch
                      : Camera.Constants.FlashMode.off
                  );
                }}>
                <MaterialCommunityIcons
                  style={styles.cameraButtonIcon}
                  name="flashlight"
                  size={25}
                  color={flash === Camera.Constants.FlashMode.off ? 'white' : '#222'} />
              </TouchableHighlight>

              <AddContext.Consumer>
                {({ addInfo, setAddInfo }) => (
                  <TouchableHighlight
                    style={{
                      flex: 0.3,
                      alignSelf: 'flex-end',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                      backgroundColor: Colors[colorScheme].buttonBlue,
                      borderRadius: 40,
                      padding: 10,
                    }}
                    onPress={async () => {
                      if (camera.current) {
                        let photo = await camera.current.takePictureAsync();
                        let uri = photo.uri;
                        // add the image to the addInfo state
                        setAddInfo({
                          ...addInfo,
                          imageUri: uri,
                        })

                        // let body = new FormData();
                        // body.append('photo', { uri: uri, name: 'photo.png', filename: 'imageName.png', type: 'image/png' });
                        // body.append('Content-Type', 'image/png');

                        // fetch("server-url-here", {
                        //   method: 'POST', headers: {
                        //     "Content-Type": "multipart/form-data",
                        //   }, body: body
                        // })

                        // .then((res) => res.json())
                        // .then((res) => { console.log("response" + JSON.stringify(res)); })
                        // .catch((e) => console.log(e))
                        // .done()
                        camera.current.pausePreview();
                        setModalVisible(true);
                      }
                    }}>
                    <Entypo style={styles.cameraButtonIcon} name="camera" size={40} color='white' />
                  </TouchableHighlight>
                )}
              </AddContext.Consumer>

              <TouchableHighlight
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  backgroundColor: '#222',
                  borderRadius: 50,
                  padding: 5,
                  width: 50,
                  height: 50,
                  marginLeft: 20,
                }}
                onPress={() => {
                  setZoom(zoom == 0 ? 0.2 : 0);
                }}>
                <Feather
                  style={styles.cameraButtonIcon}
                  name={zoom == 0 ? "zoom-in" : "zoom-out"}
                  size={25}
                  color="white" />
              </TouchableHighlight>
            </View>
          </Camera>}
      </View>

      <ScanModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        camera={camera}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scanView: {
    flexGrow: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cameraButtonIcon: {
    marginTop: 2,
    marginLeft: 1
  },
});
