import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { ManualInputStackParamList } from '../../types';
import { StyleSheet, TouchableOpacity, Alert, Image, TouchableHighlight } from 'react-native';
import { Text, View, ScrollView } from '../../components/Themed';
import useColorScheme from '../../hooks/useColorScheme';

export default function FirstManualInputScreen({ navigation }: StackScreenProps<ManualInputStackParamList, 'FirstManualInputScreen'>) {

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => { navigation.navigate("SecondManualInputScreen"); }}>
        <Text>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

});
