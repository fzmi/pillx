import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { ManualInputStackParamList } from '../../types';
import { StyleSheet, TouchableOpacity, Alert, Image, TouchableHighlight } from 'react-native';
import { ScrollView, Text, View } from '../../components/Themed';
import useColorScheme from '../../hooks/useColorScheme';

export default function SecondManualInputScreen({ navigation }: StackScreenProps<ManualInputStackParamList, 'SecondManualInputScreen'>) {

  return (
    <ScrollView>
      <Text>Second</Text>
      <TouchableOpacity onPress={() => { navigation.goBack(); }}>
        <Text>Previous</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

});
