import React, {useEffect} from 'react';
import { View, Text } from '../../../components/Themed';
import { TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MedicineParamList } from '../../../types';
import UserContext from '../../../hooks/UserContext';
import { useFocusEffect, StackActions } from '@react-navigation/native';
import useColorScheme from '../../../hooks/useColorScheme';
import Colors from '../../../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons'; 
import EditStep1View from './EditStep1View';
import EditStep2View from './EditStep2View';
import EditStep3View from './EditStep3View';

export default function EditScreen({route, navigation }: StackScreenProps<MedicineParamList, 'EditScreen'>) {
  const colorScheme = useColorScheme();

  const [step, setStep] = React.useState(1);

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
    <View style={{ flex: 1 }}>
      { step == 1 && <EditStep1View styles={styles} setStep={setStep} />}
      { step == 2 && <EditStep2View styles={styles} setStep={setStep} />}
      { step == 3 && <EditStep3View styles={styles} setStep={setStep} navigation={navigation} />}
      <View style={[styles.deleteButtonContainer,{backgroundColor: Colors[colorScheme].secondaryBackground}]}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => {
            deleteMedicine();
            navigation.goBack();
          }}>
            <Text style={styles.deleteButtonText}>Delete Tracking</Text>
            <MaterialIcons name="delete" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
  },
  backButtonContainer: {
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  backButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    marginBottom: 20,
  },
  deleteButtonContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal:30,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal:30,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
  },
  separator: {
    height: 1,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldLeftTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  fieldRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldRightEdit: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
  },
  fieldRightText: {
    fontSize: 18,
    fontWeight: '400',
    marginHorizontal: 10,
  },
  fieldTextInput: {
    marginTop: 4,
    marginLeft: -6,
    paddingHorizontal: 6,
    paddingVertical: 7,
    backgroundColor: "#eee",
    borderRadius: 10,
  }
});
