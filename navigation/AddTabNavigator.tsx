import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { AddTabParamList, MedicineParamList, Tracking } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ManualInputScreen from '../screens/medicine/add/ManualInputScreen';
import ScanInputScreen from '../screens/medicine/add/ScanInputScreen';
import AddContext from '../hooks/useAddContext';

const AddTab = createBottomTabNavigator<AddTabParamList>();

// Root stack -> Bottom Tab -> Medicine -> Add
export default function AddTabNavigator({ navigation }: StackScreenProps<MedicineParamList, 'Add'>) {
  const colorScheme = useColorScheme();

  const [addInfo, setAddInfo] = React.useState({
    trackingName: '',
    medicineResults: [],
    medicineName: "",
    medicineId: "97801",
    frequency: { type: "day", value: 1 } as Tracking["frequency"],
    periodOfTreatment: { type: "week", value: 1 },
    reminders: [new Date(0, 0, 0, 12, 0)],
    imageUri: '',
  });

  // Since the screen props need to be serialisable, will use contexts instead
  const addContext = {
    addInfo: addInfo,
    setAddInfo: (data: any) => {
      setAddInfo(data);
    }
  };

  return (
    <AddContext.Provider value={addContext}>
      <AddTab.Navigator
        initialRouteName="ScanInputScreen"
        tabBarOptions={{
          activeTintColor: Colors[colorScheme].background,
          activeBackgroundColor: Colors[colorScheme].tint,
          labelStyle: { fontSize: 20, fontWeight: '500' },
          style: { height: 75, backgroundColor: Colors[colorScheme].secondaryBackground },
          tabStyle: { justifyContent: 'center', margin: 12, borderRadius: 20 },
          safeAreaInsets: { bottom: 0 },
        }}>
        <AddTab.Screen
          name="ScanInputScreen"
          component={ScanInputScreen}
          options={{
            tabBarLabel: "Scan Package",
          }}
        />
        <AddTab.Screen
          name="ManualInputScreen"
          component={ManualInputScreen}
          options={{
            tabBarLabel: "Manual Input",
          }}
        />
      </AddTab.Navigator>
    </AddContext.Provider>
  );
}
