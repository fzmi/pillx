import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView, Text, View } from '../../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';
import { showMessage } from "react-native-flash-message";

import { AddTabParamList } from '../../types';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import StepIndicator from '../../components/medicine/add/StepIndicator';
import AddContext from '../../hooks/AddContext';
import { Input } from 'react-native-elements';

interface Props {
  styles: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const ManualStep1View: React.FC<Props> = ({ styles, setStep }) => {
  const colorScheme = useColorScheme();
  const [showFrequencyPicker, setShowFrequencyPicker] = React.useState(false);
  const [frequency, setFrequency] = React.useState<any>({
    number: 1,
    unit: 'day',
  });
  const [showNameInput, setShowNameInput] = React.useState(false);
  const [name, setName] = React.useState('Medicine');

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].medicineStep1 }}>
      <AddContext.Consumer>
        {({ addInfo, setAddInfo }) => (

          <View style={{ backgroundColor: Colors[colorScheme].medicineStep1, padding: 20 }}>
            <StepIndicator step={1} totalSteps={3} />

            <View style={{ marginVertical: 20, borderRadius: 10, padding: 20 }}
              lightColor="#fff" darkColor="#333">

              <Text style={{ fontSize: 24, fontWeight: '600' }}>Set Tracking Plan</Text>
              <Text style={{ fontSize: 15, marginVertical: 3 }}>Add the name, frequency and treatment duration of this medicine.</Text>
              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

              <TouchableOpacity onPress={() => setShowNameInput(!showNameInput)}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}
                  lightColor="#fff" darkColor="#333">
                  <Text style={{ fontSize: 20, fontWeight: '600' }}>Name</Text>
                  <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
                </View>

                {showNameInput && (
                  <Input></Input>
                )}
              </TouchableOpacity>

              <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

              <TouchableOpacity onPress={() => setShowFrequencyPicker(!showFrequencyPicker)}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                  lightColor="#fff" darkColor="#333">
                  <View lightColor="#fff" darkColor="#333">
                    <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 3 }}>Frequency</Text>
                    <Text style={{ color: "#444" }}>
                      {frequency.number != 0 && frequency.number + " " + frequency.unit}
                    </Text>
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

              <Text style={{ fontSize: 20, fontWeight: '600' }}>Period of Treatment</Text>
            </View>


            <TouchableOpacity onPress={() => { setStep(2); }} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Next Step</Text>
              <Entypo name="chevron-thin-right" size={24} color="#000" />
            </TouchableOpacity>
          </View>

        )}
      </AddContext.Consumer>
    </ScrollView>
  )
}

// styles are defined in ManualInputScreen

export default ManualStep1View;
