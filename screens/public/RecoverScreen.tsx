import React from 'react';
import { Button } from 'react-native';
import { Text, View, ScrollView } from '../../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { PublicStackParamList } from '../../types';


export default function RecoverScreen({ navigation }: StackScreenProps<PublicStackParamList, 'RecoverScreen'>) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Recover Screen</Text>
      <Text>Don't worry about this screen right now.</Text>
      <Button onPress={() => navigation.goBack()} title="Back to Sign In" />
    </View>
  )
}
