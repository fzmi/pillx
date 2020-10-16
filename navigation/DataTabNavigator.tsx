import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { DataTabParamList, MedicineParamList } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import EffectScreen from '../screens/data/EffectScreen';
import MethodScreen from '../screens/data/MethodScreen';

const DataTab = createBottomTabNavigator<DataTabParamList>();

// Root stack -> Button Tab -> Medicine -> Data
export default function DataTabNavigator({ route }: StackScreenProps<MedicineParamList, 'Data'>) {
  const colorScheme = useColorScheme();
  const { medicineId } = route.params;

  return (
    <DataTab.Navigator
      initialRouteName="EffectScreen"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].background,
        activeBackgroundColor: Colors[colorScheme].tint,
        labelStyle: { fontSize: 20, fontWeight: '500' },
        style: { height: 75, backgroundColor: Colors[colorScheme].secondaryBackground },
        tabStyle: { justifyContent: 'center', margin: 12, borderRadius: 20 },
        safeAreaInsets: { bottom: 0 },
      }}>
      <DataTab.Screen
        name="EffectScreen"
        component={EffectScreen}
        options={{
          tabBarLabel: "Effects",
        }}
        initialParams={{
          medicineId: medicineId,
        }}
      />
      <DataTab.Screen
        name="MethodScreen"
        component={MethodScreen}
        options={{
          tabBarLabel: "Usages",
        }}
        initialParams={{
          medicineId: medicineId,
        }}
      />
    </DataTab.Navigator>
  );
}
