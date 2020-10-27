import React, { useLayoutEffect, useState, useEffect } from 'react';
import { ActivityIndicator, DevSettings, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Calendar, Agenda, CalendarList } from 'react-native-calendars';
import { StackScreenProps } from '@react-navigation/stack';

import { TodayParamList } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Todo from '../components/today/Todo';
import UserContext from '../hooks/useUserContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

export default function TodayScreen({ navigation }: StackScreenProps<TodayParamList, 'TodayScreen'>) {
  const colorScheme = useColorScheme();
  const { userInfo, isLoading, setUserInfo } = React.useContext(UserContext);
  const [data, setData] = useState({});

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    fetchDosages(today);

    // todo: remove dummy data
    setData({
      [today]: [
        { trackingName: "Med 1", medicineId: "12345", medicineName: "Medicine 1", time: new Date(), taken: true },
        { trackingName: "Med 2", medicineId: "12345", medicineName: "Medicine 2", time: new Date(), taken: false },
        { trackingName: "Med 3", medicineId: "67890", medicineName: "Medicine 3", time: new Date(), taken: false }]
    });
  }, []);

  // Get the dosages for a certain day
  const fetchDosages = async (isoDate: string) => {
    const userToken = await AsyncStorage.getItem('userToken');
    return fetch(`https://deco3801-rever.uqcloud.net/user/medicine/getAllOnDate?email=${userToken}&onDate=${isoDate}`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {

        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "October 2020",
    });
  }, [navigation]);

  const emptyDate = () => {
    return (
      <View style={{ backgroundColor: "transparent", flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 100, marginRight: 20 }}>
        <Ionicons name="ios-checkmark-circle-outline" size={50} color={Colors[colorScheme].secondaryText} />
        <Text style={{ fontSize: 24, fontWeight: "600", marginTop: 15, color: Colors[colorScheme].secondaryText }}>No medicine for today!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Loading View */}
      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30 }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginVertical: 15, fontSize: 26, textAlign: "center", fontWeight: "600" }}>Loading trackings...</Text>
          <Text style={{ textAlign: "center" }}>If loading takes large amount of time, please make sure the PillX server is on or check network connection.</Text>
        </View>
      ) : (<Agenda
        theme={{
          color: Colors[colorScheme].tint,
          dotColor: Colors[colorScheme].tint,
          selectedDotColor: Colors[colorScheme].tint,
          selectedDayBackgroundColor: Colors[colorScheme].tint,
          selectedColor: Colors[colorScheme].tint,
          todayColor: Colors[colorScheme].tint,
          todayTextColor: Colors[colorScheme].tint,
        }}
        items={data}
        renderItem={(item: any, firstItemInDay: any) => { return <Todo item={item} /> }}
        renderEmptyDate={emptyDate}
        markedDates={{
          '2020-10-03': { marked: true, selectedColor: '#724ea3' },
          '2020-09-12': { marked: true, },
        }}
        renderDay={(day: any, item: any) => { return (<View style={{ marginRight: 20 }} />); }}
      />
        )}
      {/* <CalendarList
        // Enable horizontal scrolling, default = false
        horizontal={true}
        // Enable paging on horizontal, default = false
        pagingEnabled={true}
        onDayPress={(day: any) => { console.log('selected day', day) }}
        hideArrows={false}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
});
