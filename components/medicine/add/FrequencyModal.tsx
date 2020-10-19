import React, { useState } from 'react';
import { StyleSheet, Modal, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
import { View, Text } from '../../Themed';

import { Entypo } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { Picker } from '@react-native-community/picker';

interface Props {
  showFrequencyModal: any,
  setShowFrequencyModal: any,
  setFrequency: any,
}

const FrequencyModal: React.FC<Props> = ({ showFrequencyModal, setShowFrequencyModal, setFrequency }) => {
  const colorScheme = useColorScheme();

  const [showFrequency, setShowFrequency] = useState<boolean>(true);
  const [showEvery, setShowEvery] = useState<boolean>(false);
  const [everyValue, setEveryValue] = useState<number>(1);
  const [everyType, setEveryType] = useState<string>("day");
  const [showDayOfWeek, setShowDayOfWeek] = useState<boolean>(false);
  const [selectedDays, setSelectedDays] = useState<Array<string>>([]);

  const days = [{ day: "Monday", value: 1 }, { day: "Tuesday", value: 2 },
  { day: "Wednesday", value: 3 }, { day: "Thursday", value: 4 }, { day: "Friday", value: 5 },
  { day: "Saturday", value: 6 }, { day: "Sunday", value: 7 }];

  const renderItem = ({ item }: any) => {
    const backgroundColor = selectedDays.includes(item.day) ? "#555" : "#eee";
    const color = selectedDays.includes(item.day) ? "white" : "black";
    return (
      <TouchableOpacity onPress={() => {
        selectedDays.includes(item.day) ?
          setSelectedDays(selectedDays.filter(day => day !== item.day)) : setSelectedDays([...selectedDays, item.day])
      }} style={[styles.dayOfWeekItem, { backgroundColor: backgroundColor }]}>
        <Text style={[styles.dayOfWeekText, { color: color }]}>{item.day}</Text>
        <Entypo name="check" size={24} color="#eee" />
      </TouchableOpacity>
    );
  };

  const FrequencyPage: React.FC = () => (<View>
    <TouchableOpacity style={styles.frequencyItemContainer}
      onPress={() => { setFrequency({ type: "day", value: 1 }); setShowFrequencyModal(!showFrequencyModal); }}>
      <View style={styles.frequencyItem}>
        <Text style={styles.frequencyItemText}>Every Day</Text>
        <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
      </View>
    </TouchableOpacity>
    <View style={{ flexDirection: "row" }}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>

    <TouchableOpacity style={styles.frequencyItemContainer}
      onPress={() => { setShowEvery(true); setShowFrequency(false); }}>
      <View style={styles.frequencyItem}>
        <Text style={styles.frequencyItemText}>Every ... days</Text>
        <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
      </View>
    </TouchableOpacity>
    <View style={{ flexDirection: "row" }}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>

    <TouchableOpacity style={styles.frequencyItemContainer}
      onPress={() => { setShowDayOfWeek(true); setShowFrequency(false); }}>
      <View style={styles.frequencyItem}>
        <Text style={styles.frequencyItemText}>Days of Week...</Text>
        <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
      </View>
    </TouchableOpacity>
  </View>)

  const EveryPage: React.FC = () => (<View>
    <TouchableOpacity onPress={() => { setShowEvery(false); setShowFrequency(true); }}
      style={[styles.backButton, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
      <Entypo name="chevron-thin-left" size={24} color={Colors[colorScheme].text} />
      <Text style={styles.buttonText}>Back</Text>
    </TouchableOpacity>

    <View style={styles.everyView}>
      <Text style={styles.text}>Every</Text>
      <Picker selectedValue={everyValue} style={styles.everyPickerValue}
        onValueChange={(itemValue: any) => setEveryValue(itemValue)}
        itemStyle={{ color: Colors[colorScheme].text }}>
        {[...Array(6)].map((e, i) => (<Picker.Item key={i} label={`${i + 1}`} value={i + 1} />))}
      </Picker>
      <Picker selectedValue={everyType} style={styles.everyPickerType}
        onValueChange={(itemValue: any) => setEveryType(itemValue)}
        itemStyle={{ color: Colors[colorScheme].text }}>
        <Picker.Item label={`day${everyValue == 1 ? '' : 's'}`} value="day" />
        <Picker.Item label={`week${everyValue == 1 ? '' : 's'}`} value="week" />
        <Picker.Item label={`month${everyValue == 1 ? '' : 's'}`} value="month" />
      </Picker>
    </View>

    <TouchableOpacity onPress={() => {
      setFrequency({ type: everyType, value: everyValue });
      setShowFrequencyModal(!showFrequencyModal);
    }} style={[styles.doneButton, { backgroundColor: Colors[colorScheme].buttonBlue }]}>
      <Text style={styles.doneButtonText}>Done</Text>
    </TouchableOpacity>
  </View>)

  const DayOfWeekPage: React.FC = () => (<View>
    <TouchableOpacity onPress={() => { setShowDayOfWeek(false); setShowFrequency(true); }}
      style={[styles.backButton, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
      <Entypo name="chevron-thin-left" size={24} color={Colors[colorScheme].text} />
      <Text style={styles.buttonText}>Back</Text>
    </TouchableOpacity>
    <View style={styles.everyView}>
      <Text style={styles.text}>Every</Text>
      <FlatList data={days} renderItem={renderItem} keyExtractor={(item) => item.day} extraData={selectedDays} />
    </View>

    <TouchableOpacity disabled={selectedDays.length == 0}
      style={[styles.doneButton, {
        backgroundColor: selectedDays.length == 0 ?
          Colors[colorScheme].buttonBlueDisabled : Colors[colorScheme].buttonBlue
      }]}
      onPress={() => {
        selectedDays.length === 7 ? setFrequency({ type: "day", value: 1 }) :
          setFrequency({
            type: "dayOfWeek", value: selectedDays.map(selectedDay =>
              days.find(item => item.day === selectedDay)?.value).sort()
          })
        setShowFrequencyModal(!showFrequencyModal);
      }}>
      <Text style={styles.doneButtonText}>Done</Text>
    </TouchableOpacity>
  </View>)

  return (
    <Modal animationType="fade" transparent={true} visible={showFrequencyModal}>
      <View style={styles.fullScreenView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Select Frequency</Text>
          <View style={styles.modalPage}>
            {showFrequency && (<FrequencyPage />)}
            {showEvery && (<EveryPage />)}
            {showDayOfWeek && (<DayOfWeekPage />)}
          </View>
          <TouchableHighlight onPress={() => { setShowFrequencyModal(!showFrequencyModal); }}
            style={[styles.cancelButton, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  fullScreenView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
  },
  modalPage: {
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  frequencyItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  frequencyItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  frequencyItemText: {
    fontSize: 20,
    marginRight: 10,
  },
  separator: {
    marginVertical: 2,
    height: 1,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  everyView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  everyPickerValue: {
    width: 80,
    marginLeft: 12,
  },
  everyPickerType: {
    width: 100,
  },
  text: {
    fontSize: 20,
  },
  dayOfWeekItem: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    marginVertical: 2,
    marginLeft: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayOfWeekText: {
    fontSize: 20,
    marginRight: 20,
  },
  doneButton: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  doneButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
})

export default FrequencyModal;
