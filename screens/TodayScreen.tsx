import React, { useLayoutEffect, useState, useEffect } from 'react';
import { ActivityIndicator, DevSettings, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Calendar, Agenda, CalendarList } from 'react-native-calendars';
import { StackScreenProps } from '@react-navigation/stack';
import Card from '../components/medicine/Card';

import { TodayParamList, Tracking } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Todo from '../components/today/Todo';
import UserContext from '../hooks/useUserContext';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TodayScreen({ navigation }: StackScreenProps<TodayParamList, 'TodayScreen'>) {
  const colorScheme = useColorScheme();
  const { userInfo, isLoading, setUserInfo } = React.useContext(UserContext);
  const [data, setData] = useState({});



  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const data = fetchDosages(today);

    // {userInfo.trackings.map((tracking: Tracking) => {
    //   setData({[today]: [{trackingName:tracking.trackingName, medicineId: tracking.medicineId, medicineName:tracking.medicineName, time: new Date(), taken:true}]});
    // })};

    setData({
      [today]: [
        { trackingName: "Panadol", medicineId: "21432", medicineName: "Panadol", time: new Date(), 
        taken: true, description:"One tablet every four to six hours", image: require("../assets/images/pills/pill1.png")},
        { trackingName: "Nurofen", medicineId: "94821", medicineName: "Nurofen", time: new Date(), 
        taken: false, description:"Two tablet every four to six hours", image: require("../assets/images/pills/pill2.png") },
        { trackingName: "Voltaren", medicineId: "67890", medicineName: "Voltaren", time: new Date(), 
        taken: false, description:"Three tablet every four to six hours",image: require("../assets/images/pills/pill3.png") }]
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
        return data;
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
        // items={userInfo.trackings}

        renderItem={(item: any, firstItemInDay: any) => { 
          return <Todo item={item} /> 
          // return <Text>{userInfo.trackings.length}</Text>
          // {userInfo.trackings.map((tracking: Tracking) =>
          //   return <Todo item={userInfo.trackings} /> 

          // )}
        return <Text>{userInfo.trackings} hellow!</Text> 

        }}
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
      {/* {userInfo.trackings.map((tracking: Tracking, index: number) =>
          // <Card key={index} tracking={tracking} cardColor='#ccc' progress={0.3} date="3 months" />
          <Card key={index} tracking={tracking} index={index + 1} />
      )} */}
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
