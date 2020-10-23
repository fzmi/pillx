import React from 'react';
import { View, Text } from '../../../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { MedicineParamList } from '../../../types';
import UserContext from '../../../hooks/UserContext';
import { Button } from 'react-native';

export default function EditScreen({ route, navigation }: StackScreenProps<MedicineParamList, 'EditScreen'>) {
  // contains user info
  const { userInfo, isLoading } = React.useContext(UserContext);

  // use this medicine id to get information
  const { medicineId } = route.params;

  const deleteMedicine = async () => {
    await fetch(`http://deco3801-rever.uqcloud.net/user/medicine/delete?email=${userInfo.email}&identifier=${medicineId}`, {
      method: "POST",
    })
      .then(response => response.text())
      .then(result => {

      })
  }

  return (
    <View>
      <Text>Editing {medicineId}</Text>

      <Button title="Delete Tracking" onPress={() => {
        deleteMedicine();
        navigation.goBack();
      }} />
    </View>
  )
}
