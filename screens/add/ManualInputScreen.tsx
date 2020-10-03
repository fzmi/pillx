import React from 'react';
import { StyleSheet, TouchableOpacity, Alert, Image, TouchableHighlight } from 'react-native';
import { ScrollView, Text, View } from '../../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { AddTabParamList } from '../../types';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import StepIndicator from '../../components/medicine/add/StepIndicator';
import AddContext from './AddContext';
import { StackActions } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';

export default function ManualInputScreen({ navigation }: StackScreenProps<AddTabParamList, 'ManualInputScreen'>) {
  const colorScheme = useColorScheme();
  const [step, setStep] = React.useState(1);


  const [frequency, setFrequency] = React.useState<any>({
    number: 1,
    unit: 'day',
  });

  const [showFrequencyPicker, setShowFrequencyPicker] = React.useState(false);

  return (
    <View style={{ flex: 1 }}>

      { step == 1 && (
        <ScrollView style={{ backgroundColor: Colors[colorScheme].medicinePurple }}>
          <View style={{ backgroundColor: Colors[colorScheme].medicinePurple, padding: 20 }}>
            <StepIndicator step={1} totalSteps={2} />

            <AddContext.Consumer>
              {({ addInfo, setAddInfo }) => (
                <View style={{ marginVertical: 20, borderRadius: 10, padding: 20 }} lightColor="#fff" darkColor="#333">
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }} lightColor="#fff" darkColor="#333">
                    <Text style={{ fontSize: 22, fontWeight: '600' }}>Name</Text>
                    {addInfo.imageUri != '' && (
                      <Image style={{ width: 100, height: 100 }} source={{ uri: addInfo.imageUri }} />
                    )}
                  </View>

                  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                  <TouchableOpacity onPress={() => setShowFrequencyPicker(!showFrequencyPicker)}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} lightColor="#fff" darkColor="#333">
                      <View lightColor="#fff" darkColor="#333">
                        <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 3 }}>Frequency</Text>
                        <Text style={{ color: "#444" }}>{frequency.number != 0 && frequency.number + " " + frequency.unit}</Text>
                      </View>
                      <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
                    </View>

                    {showFrequencyPicker && (
                      <View style={{ flexDirection: "row" }}>
                        <Picker
                          selectedValue={frequency.number}
                          style={{ width: 100 }}
                          onValueChange={(itemValue, itemIndex) =>
                            setFrequency({
                              ...frequency,
                              number: itemValue
                            })
                          }
                          itemStyle={{ color: Colors[colorScheme].text }}
                        >
                          {/* May use map in the future */}
                          <Picker.Item label="1" value={1} />
                          <Picker.Item label="2" value={2} />
                          <Picker.Item label="3" value={3} />
                          <Picker.Item label="4" value={4} />
                          <Picker.Item label="5" value={5} />
                        </Picker>

                        <Picker
                          selectedValue={frequency.unit}
                          style={{ width: 100 }}
                          onValueChange={(itemValue, itemIndex) =>
                            setFrequency({
                              ...frequency,
                              unit: itemValue
                            })
                          }
                          itemStyle={{ color: Colors[colorScheme].text }}
                        >
                          <Picker.Item label="Days" value="day" />
                          <Picker.Item label="Weeks" value="week" />
                          <Picker.Item label="Months" value="month" />
                        </Picker>
                      </View>
                    )}
                  </TouchableOpacity>

                  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                  <Text style={{ fontSize: 22, fontWeight: '600' }}>Period of Treatment</Text>
                </View>
              )}
            </AddContext.Consumer>

            <TouchableOpacity
              onPress={() => {
                // navigation.navigate("SecondManualInputScreen");
                setStep(2);
              }}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Next Step</Text>
              <Entypo name="chevron-thin-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      { step == 2 && (
        <ScrollView style={{ backgroundColor: Colors[colorScheme].medicineBlue }}>
          <View style={{ backgroundColor: Colors[colorScheme].medicineBlue, flex: 1, padding: 20 }}>
            <StepIndicator step={2} totalSteps={2} />

            <View style={{ marginVertical: 20, borderRadius: 10, height: '100%' }}>

            </View>

            <TouchableOpacity onPress={() => {
              //todo: add new medicine

              navigation.dispatch(StackActions.popToTop());
            }} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add Medicine</Text>
              <AntDesign name="plus" size={24} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setStep(1); }} style={styles.backButtonContainer}>
              <Entypo name="chevron-thin-left" size={24} color="white" />
              <Text style={styles.backButtonText}>Previous Step</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
  },
  backButtonContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  backButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center'
  },
});
