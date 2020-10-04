import React from 'react';
import { View, Text } from '../../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { MedicineParamList } from '../../types';
import UserContext from '../UserContext';

export default function EditScreen({ route, navigation }: StackScreenProps<MedicineParamList, 'EditScreen'>) {
  // contains user info
  const { userInfo, isLoading } = React.useContext(UserContext);

  // use this medicine id to get information
  const { medicineId } = route.params;

  return (
    <View>
      <Text>Editing {medicineId}</Text>
    </View>
  )
}
