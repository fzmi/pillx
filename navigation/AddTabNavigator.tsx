import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackScreenProps, useHeaderHeight } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { Camera } from 'expo-camera';

import { AddStackParamList, ScanInputTabParamList, MedicineParamList, Tracking } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AddContext from '../hooks/useAddContext';
import AustRScanScreen from '../screens/medicine/add/AustRScanScreen';
import BarcodeScanScreen from '../screens/medicine/add/BarcodeScanScreen';
import ManualStep1Screen from '../screens/medicine/add/ManualStep1Screen';
import ManualStep2Screen from '../screens/medicine/add/ManualStep2Screen';
import ManualStep3Screen from '../screens/medicine/add/ManualStep3Screen';

const AddStack = createStackNavigator<AddStackParamList>();

// Root stack -> Bottom Tab -> Medicine -> Add
export default function AddStackNavigator({ navigation }: StackScreenProps<MedicineParamList, "Add">) {
  const [addInfo, setAddInfo] = useState({
    trackingName: '',
    medicineResults: [],
    medicineName: "",
    medicineId: "97801",
    frequency: { type: "day", value: 1 } as Tracking["frequency"],
    periodOfTreatment: { type: "week", value: 1 },
    reminders: [new Date(0, 0, 0, 12, 0)],
    imageUri: '',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<Button title="Skip" onPress={() => { }} />),
      headerRightContainerStyle: { paddingRight: 5 },
    });
  }, [navigation]);

  // Since the screen props need to be serialisable, will use contexts instead
  const addContext = {
    addInfo: addInfo,
    setAddInfo: (data: any) => {
      setAddInfo(data);
    }
  };

  const headerHeight = useHeaderHeight();

  return (
    <AddContext.Provider value={addContext}>
      <AddStack.Navigator initialRouteName="ScanInput" headerMode="none">
        <AddStack.Screen name="ScanInput" component={ScanInputTabNavigator} initialParams={{ headerHeight: headerHeight }} />
        <AddStack.Screen name="ManualStep1Screen" component={ManualStep1Screen} initialParams={{ styles: styles }} />
        <AddStack.Screen name="ManualStep2Screen" component={ManualStep2Screen} initialParams={{ styles: styles }} />
        <AddStack.Screen name="ManualStep3Screen" component={ManualStep3Screen} initialParams={{ styles: styles }} />
      </AddStack.Navigator>
    </AddContext.Provider>
  );
}


const ScanInputTab = createBottomTabNavigator<ScanInputTabParamList>();

// Root stack -> Button Tab -> Medicine -> Add -> Scan
export function ScanInputTabNavigator({ navigation, route }: StackScreenProps<AddStackParamList, "ScanInput">) {
  const colorScheme = useColorScheme();
  const { headerHeight } = route.params;

  return (
    <ScanInputTab.Navigator
      initialRouteName="AustRScanScreen"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].background,
        activeBackgroundColor: Colors[colorScheme].tint,
        labelStyle: { fontSize: 20, fontWeight: '500' },
        style: { height: 75, backgroundColor: Colors[colorScheme].secondaryBackground },
        tabStyle: { justifyContent: 'center', margin: 12, borderRadius: 20 },
        safeAreaInsets: { bottom: 0 },
      }}>
      <ScanInputTab.Screen name="AustRScanScreen" component={AustRScanScreen} initialParams={{ headerHeight: headerHeight }}
        options={{ tabBarLabel: "AUST R/L", }}
      />
      <ScanInputTab.Screen name="BarcodeScanScreen" component={BarcodeScanScreen} initialParams={{ headerHeight: headerHeight }}
        options={{ tabBarLabel: "Barcode", }}
      />
    </ScanInputTab.Navigator>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
  },
  backButtonContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  backButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    marginBottom: 20,
  },
  separator: {
    height: 1,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldLeftTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  fieldRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldRightEdit: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
  },
  fieldRightText: {
    fontSize: 18,
    fontWeight: '400',
    marginHorizontal: 10,
  },
  fieldTextInput: {
    marginTop: 4,
    marginLeft: -6,
    paddingHorizontal: 6,
    paddingVertical: 7,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  fieldTextSmall: {
    fontSize: 15,
    fontWeight: "600",
    paddingTop: 7
  },
});
