import React from 'react';
import { View, Text } from '../../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { DataTabParamList } from '../../types';
import UserContext from '../../hooks/UserContext';

export default function MethodScreen({ route, navigation }: StackScreenProps<DataTabParamList, 'MethodScreen'>) {
  // contains user info
  const { userInfo, isLoading } = React.useContext(UserContext);

  // use this medicine id to get information
  const { medicineId } = route.params;

  return (
    <View>
      <Text>Method information for medicine: {medicineId}</Text>
    </View>
  )
}
