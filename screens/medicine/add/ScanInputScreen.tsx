import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableHighlight, Platform, Button } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { StackScreenProps, useHeaderHeight } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Camera, CameraCapturedPicture } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import * as ImageManipulator from 'expo-image-manipulator';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { AddTabParamList } from '../../../types';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import ScanResultModal from '../../../components/medicine/add/ScanResultModal';
import AddContext from '../../../hooks/useAddContext';

export default function ScanInputScreen({ navigation }: StackScreenProps<AddTabParamList, 'ScanInputScreen'>) {
  const camera = useRef<Camera>(null!);
  const colorScheme = useColorScheme();
  const headerHeight = useHeaderHeight();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [cameraOn, setcameraOn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [barCodeMode, setBarCodeMode] = useState(false);

  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);

  const scanner = React.useRef<BarCodeScanner>(null!);

  // load component
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // only turn on the camera when the screen is on focus
  useFocusEffect(
    useCallback(() => {
      setcameraOn(true);
      showMessage({
        message: "Scan Instruction",
        description: "Locate the AUST R/L number on the package and take a picture.",
        type: "default",
        icon: "info",
        autoHide: false,
        position: { top: headerHeight },
        floating: true,
        textStyle: { paddingRight: 8 },
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

  const uploadImage = async (photo: CameraCapturedPicture) => {
    return ImageManipulator.manipulateAsync(photo.uri, [{ resize: { width: 480, height: 640 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG })
      .then(result => result.uri)
      .then(uri => {
        const body = new FormData();
        body.append('file', {
          // uri workaround, looks like a react native bug: https://github.com/facebook/react-native/issues/29364
          // also needs to override the typescript formdata (see global.d.ts)
          uri: Platform.OS == 'ios' ? uri.replace("file://", "/private") : uri,
          name: 'image.jpg', type: 'image/jpeg'
        });
        body.append('Content-Type', 'image/jpeg');
        return fetch("https://deco3801-rever.uqcloud.net/scanning", {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body: body
        });
      })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        showMessage({
          message: "Server Error",
          description: "Cannot upload image to PillX server.",
          type: "danger",
          icon: "danger",
          duration: 2500,
        });
        console.log(error);
      });
  }

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setData(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.scanView}>
        {cameraOn && !barCodeMode &&
          <Camera style={styles.camera} ref={camera} flashMode={flash} zoom={zoom}>
            <View style={styles.cameraView}>
              <TouchableHighlight
                style={[styles.cameraSecondaryButton,
                { backgroundColor: flash === Camera.Constants.FlashMode.off ? '#222' : 'white', marginRight: 20 }]}
                onPress={() => {
                  setFlash(flash === Camera.Constants.FlashMode.off ?
                    Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}>
                <MaterialCommunityIcons style={styles.cameraButtonIcon} name="flashlight" size={25}
                  color={flash === Camera.Constants.FlashMode.off ? 'white' : '#222'} />
              </TouchableHighlight>

              <AddContext.Consumer>
                {({ addInfo, setAddInfo }) => (
                  <TouchableHighlight
                    style={[styles.cameraMainButton, { backgroundColor: Colors[colorScheme].buttonBlue }]}
                    onPress={async () => {
                      if (camera.current) {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        let photo = await camera.current.takePictureAsync();
                        let medicineResults = [];
                        const result = await uploadImage(photo);
                        if (result) {
                          medicineResults = result.map((value: any) => ({
                            id: value.identifier, name: (value.name as string).trim()
                          }))
                        }
                        setAddInfo({
                          ...addInfo,
                          medicineResults: medicineResults,
                          imageUri: photo.uri,
                        });
                        camera.current.pausePreview();
                        setModalVisible(true);
                      }
                    }}>
                    <Entypo style={styles.cameraButtonIcon} name="camera" size={40} color='white' />
                  </TouchableHighlight>
                )}
              </AddContext.Consumer>

              <TouchableHighlight
                style={[styles.cameraSecondaryButton, { backgroundColor: '#222', marginLeft: 20 }]}
                onPress={() => { setZoom(zoom == 0 ? 0.2 : 0); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}>
                <Feather style={styles.cameraButtonIcon}
                  name={zoom == 0 ? "zoom-in" : "zoom-out"} size={25} color="white" />
              </TouchableHighlight>
            </View>
          </Camera>}

        {cameraOn && barCodeMode &&
          <BarCodeScanner
            onBarCodeScanned={scanned ? () => { } : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
            ref={scanner}
          />}
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>

      <ScanResultModal modalVisible={modalVisible} setModalVisible={setModalVisible}
        camera={camera} navigation={navigation} />
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
  cameraMainButton: {
    flex: 0.3,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 40,
    padding: 10,
  },
  cameraSecondaryButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 50,
    padding: 5,
    width: 50,
    height: 50,
  },
});
