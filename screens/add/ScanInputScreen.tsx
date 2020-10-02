import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { AddTabParamList } from '../../types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import useColorScheme from '../../hooks/useColorScheme';
import { Camera } from 'expo-camera';

export default function ScanInputScreen({ navigation }: StackScreenProps<AddTabParamList, 'ScanInputScreen'>) {
  const [hasPermission, setHasPermission] = React.useState<Boolean | null>(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [cameraOn, setcameraOn] = React.useState(false);
  const camera = React.useRef<Camera>(null!);

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
    <View style={{ flex: 1 }}>
      {cameraOn &&
        <Camera style={{ flex: 1 }} type={type} ref={camera}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Flip</Text>
            </TouchableOpacity>
          </View>
        </Camera>}
    </View>
  );
}

const styles = StyleSheet.create({

});
