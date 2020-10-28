import React, { useCallback, useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableHighlight } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { showMessage, hideMessage } from "react-native-flash-message";
import * as Haptics from 'expo-haptics';

import AddContext from '../../../hooks/useAddContext';
import { ScanInputTabParamList } from '../../../types';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import ScanResultModal from '../../../components/medicine/add/ScanResultModal';
import UserContext from '../../../hooks/useUserContext';
import { schedulePushNotification } from '../../../components/Notification';

export default function BarcodeScanScreen({ navigation, route }: StackScreenProps<ScanInputTabParamList, 'AustRScanScreen'>) {
  const { headerHeight } = route.params;
  const colorScheme = useColorScheme();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [cameraOn, setcameraOn] = useState(false);
  const { addInfo, setAddInfo } = useContext(AddContext);
  const { userInfo } = useContext(UserContext);

  const scanner = React.useRef<BarCodeScanner>(null!);
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // only turn on the camera when the screen is on focus
  useFocusEffect(
    useCallback(() => {
      setcameraOn(true);
      setTimeout(() => {
        showMessage({
          message: "Scan Instruction",
          description: "Locate barcode on the package.",
          type: "default",
          icon: "info",
          autoHide: false,
          position: { top: headerHeight },
          floating: true,
          textStyle: { paddingRight: 8 },
          backgroundColor: '#222'
        })
      }, 500);
      return () => {
        hideMessage();
        setcameraOn(false);
      };
    }, [])
  );

  const uploadBarCode = async (barCode: any) => {
    return fetch(`https://deco3801-rever.uqcloud.net/user/medicine/search/barcode?email=${userInfo.email}&barcode=${barCode}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => {
        showMessage({
          message: "Server Error",
          description: "Cannot upload barcode to PillX server.",
          type: "danger",
          icon: "danger",
          duration: 2500,
        });
        console.log(error);
      });
  }

  const handleBarCodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    if (scanner.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      let medicineResults = [];
      const result = await uploadBarCode(data);
      if (result) {
        medicineResults = result.map((value: any) => ({
          id: value.identifier, name: (value.name as string).trim()
        }))
      }
      setAddInfo({
        ...addInfo,
        medicineResults: medicineResults,
      });
      setModalVisible(true);
    }
    setData(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: "#000" }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? () => { } : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          ref={scanner}
        />
        {scanned && <TouchableHighlight
          style={[styles.cameraSecondaryButton, { backgroundColor: '#222', marginLeft: 20 }]}
          onPress={() => { setScanned(false); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>Tap to Rescan</Text>
        </TouchableHighlight>}
      </View>

      <ScanResultModal modalVisible={modalVisible} setModalVisible={setModalVisible}
        camera={scanner} navigation={navigation} />
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
    alignSelf: "center",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 20,
    padding: 5,
    minWidth: "40%",
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  cameraTextButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
  }
});
