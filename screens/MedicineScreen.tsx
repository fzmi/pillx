import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Text, View } from '../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { MedicineParamList, Tracking } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Entypo } from '@expo/vector-icons';
import Card from '../components/medicine/Card';

import UserContext from '../hooks/UserContext';

export default function MedicineScreen({ navigation }: StackScreenProps<MedicineParamList, 'MedicineScreen'>) {
  const colorScheme = useColorScheme();
  const { userInfo, isLoading } = React.useContext(UserContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={[styles.addButton, { backgroundColor: Colors[colorScheme].tint }]}
          onPress={() => { navigation.navigate("Add"); }}>
          <Entypo style={{ marginTop: 2, marginLeft: 1 }} name="plus" size={40} color={Colors[colorScheme].background} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
      {userInfo.trackings && userInfo.trackings.length > 0 && (
        <View style={{ flex: 1, paddingVertical: 30, backgroundColor: Colors[colorScheme].secondaryBackground }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {userInfo.trackings.map((tracking: Tracking, index: number) => (
              <Card key={index}
                tracking={tracking}
                cardColor='#E8E862'
                progress={0.3}
                date="3 months"
              />
            ))}
          </ScrollView>
        </View>
      )}
      {!userInfo.trackings.length && (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30 }}>
          <Text style={{ fontSize: 26, textAlign: "center", fontWeight: "600" }}>No Medicine Trackings</Text>
          <Text style={{ marginVertical: 20, fontSize: 16, textAlign: "center" }}>Click the button below or on the top-right to add a new tracking.</Text>
          <TouchableOpacity style={{ paddingVertical: 12, paddingHorizontal: 30, backgroundColor: Colors[colorScheme].buttonBlue, borderRadius: 20 }}
            onPress={() => { navigation.navigate("Add"); }}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>New Medicine Tracking</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    width: 45,
    height: 45,
    borderRadius: 45,
  },
});
