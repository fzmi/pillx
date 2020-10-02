import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { StyleSheet, TouchableOpacity, Alert, Image, TouchableHighlight } from 'react-native';
import { Text, View } from '../components/Themed';
import useColorScheme from '../hooks/useColorScheme';

export default function AddingScreen({ navigation }: StackScreenProps<RootStackParamList, 'UserProfile'>) {

  return (
    <View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 20,
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: {
    paddingVertical: 15,
  },

  pillImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
