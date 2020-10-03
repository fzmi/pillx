import React from 'react';
import { Text, View } from '../components/Themed';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { MedicineParamList } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Entypo } from '@expo/vector-icons';
import Card from '../components/medicine/Card';

const data = {

}

export default function MedicineScreen({ navigation }: StackScreenProps<MedicineParamList, 'MedicineScreen'>) {
  const colorScheme = useColorScheme();

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

      {/* <Card imageUri={require('../assets/images/pill2.png')}
          name="Fish Oil and Omega"
          instruction="2 pill, once per day"
          cardColor='#E8E862'
          progress={0.3}
          date="3 months"
        ></Card>
        <Card imageUri={require('../assets/images/pill.png')}
          cardColor='#6CE8FC'
          name="Ferralet"
          instruction="1 pill, once per day"
          progress={0.7}
          date="5 months"
        ></Card>
        <Card imageUri={require('../assets/images/pill1.png')}
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

  link: {
    paddingVertical: 15,
    // bottom: 0,
    top: 20,
    position: "absolute",
    right: 0,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 20,
  },
  header: {
    height: 100,
  },
  course: {
    width: Dimensions.get('window').width,
    flex: 2,
    backgroundColor: '#F0F2F4',
  }
});
