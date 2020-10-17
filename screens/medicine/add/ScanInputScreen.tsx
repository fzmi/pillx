import React from 'react';
import { StyleSheet, TouchableHighlight, Platform, Alert } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { StackScreenProps, useHeaderHeight } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Camera } from 'expo-camera';
import * as Haptics from 'expo-haptics';
// import BarCodeScanner from 'expo-barcode-scanner';

import { AddTabParamList } from '../../../types';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import ScanResultModal from '../../../components/medicine/add/ScanResultModal';
import AddContext from '../../../hooks/AddContext';

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

  const uploadImage = async (uri: string) => {
    try {
      const body = new FormData();
      // uri workaround, looks like a react native bug: https://github.com/facebook/react-native/issues/29364
      // also needs to override the typescript formdata (see global.d.ts)
      body.append('file', {
        uri: Platform.OS == 'ios' ? uri.replace("file://", "/private") : uri,
        name: 'image.jpg', type: 'image/jpeg'
      });
      body.append('Content-Type', 'image/jpeg');
      let response = await fetch("http://deco3801-rever.uqcloud.net/scanning", {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: body
      });
      console.log(response);
      let responseJson = await response.json();
      console.log(responseJson);
      return {
        data: responseJson,
      }
    } catch (error) {
      showMessage({
        message: "Server Error",
        description: "Cannot upload image to PillX server.",
        type: "danger",
        icon: "danger",
        duration: 2500,
      });
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.scanView}>
        {cameraOn &&
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
                        let uri = photo.uri;
                        // todo: add the image to the addInfo state
                        const response = uploadImage(uri);

                        // console.log(response);
                        setAddInfo({ ...addInfo, imageUri: uri });
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
                onPress={() => {
                  setZoom(zoom == 0 ? 0.2 : 0);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}>
                <Feather style={styles.cameraButtonIcon}
                  name={zoom == 0 ? "zoom-in" : "zoom-out"} size={25} color="white" />
              </TouchableHighlight>
            </View>
          </Camera>}
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
