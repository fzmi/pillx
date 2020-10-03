import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Text, View } from '../../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { AddTabParamList } from '../../types';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Camera } from 'expo-camera';

export default function ScanInputScreen({ navigation }: StackScreenProps<AddTabParamList, 'ScanInputScreen'>) {
  const [hasPermission, setHasPermission] = React.useState<Boolean | null>(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [flash, setFlash] = React.useState(Camera.Constants.FlashMode.off);
  const [cameraOn, setcameraOn] = React.useState(false);
  const camera = React.useRef<Camera>(null!);
  const colorScheme = useColorScheme();

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
      return () => {
        setcameraOn(false);
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
    <View style={styles.scanView}>
      {cameraOn &&
        <Camera style={styles.camera} type={type} ref={camera} flashMode={flash}>
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
                name={flash === Camera.Constants.FlashMode.off ? "flashlight" : "flashlight-off"}
                size={25}
                color={flash === Camera.Constants.FlashMode.off ? 'white' : '#222'} />
            </TouchableHighlight>

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
              onPress={() => { }}>
              <Entypo style={styles.cameraButtonIcon} name="camera" size={40} color='white' />
            </TouchableHighlight>

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
                setType(
                  type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
                );
              }}>
              <FontAwesome style={styles.cameraButtonIcon} name="refresh" size={25} color='white' />
            </TouchableHighlight>
          </View>
        </Camera>}
    </View>
  );
}

const styles = StyleSheet.create({
  scanView: {
    flex: 1,
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
  }
});
