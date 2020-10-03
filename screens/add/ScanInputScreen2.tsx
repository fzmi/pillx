// todo: this is an alternate camera supports barcode, not used currently

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ScanInputScreen() {
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  const scanner = React.useRef<BarCodeScanner>(null!);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
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
      <View
        style={{
          flex: 0.7,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? () => { } : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          ref={scanner}
        />

        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
      <View style={{ flexGrow: 0.3 }}>
        <Text>{data}</Text>
      </View>

    </View>
  );
}
