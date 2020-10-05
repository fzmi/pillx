import React from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Text, View } from '../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { MedicineParamList } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Entypo } from '@expo/vector-icons';
import Card from '../components/medicine/Card';

import UserContext from '../hooks/UserContext';

export default function MedicineScreen({ navigation }: StackScreenProps<MedicineParamList, 'MedicineScreen'>) {
  const colorScheme = useColorScheme();

  // contains medicine info
  const { userInfo, isLoading } = React.useContext(UserContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 15,
            width: 45,
            height: 45,
            backgroundColor: Colors[colorScheme].tint,
            borderRadius: 45,
          }}
          onPress={() => { navigation.navigate("Add"); }}
        >
          <Entypo style={{ marginTop: 2, marginLeft: 1 }} name="plus" size={40} color={Colors[colorScheme].background} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

      {/** ---------- fix code below ----------- */}

      <Button title="See Data" onPress={() => { navigation.navigate("Data", { medicineId: "med-id" }) }} />
      <Button title="Edit" onPress={() => { navigation.navigate("EditScreen", { medicineId: "med-id" }) }} />

      {/* <Card imageUri={require('../assets/images/pills/pill3.png')}
          name="Fish Oil and Omega"
          instruction="2 pill, once per day"
          cardColor='#E8E862'
          progress={0.3}
          date="3 months"
        ></Card>
        <Card imageUri={require('../assets/images/pills/pill1.png')}
          cardColor='#6CE8FC'
          name="Ferralet"
          instruction="1 pill, once per day"
          progress={0.7}
          date="5 months"
        ></Card>
        <Card imageUri={require('../assets/images/pills/pill2.png')}
          cardColor='#6B72D0'
          name="Pantonix 20MG"
          instruction="1 pill, once per day"
          progress={0.6}
          date="2 weeks"
        ></Card> */}

      {/** ---------- fix code above ----------- */}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.85,
    width: Dimensions.get('window').width,
    backgroundColor: '#F0F2F4',
    padding: 0
  },
});
