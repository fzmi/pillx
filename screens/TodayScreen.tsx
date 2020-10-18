import React from 'react';
import { StyleSheet, TouchableOpacity, Alert, Image, TouchableHighlight, Button } from 'react-native';
import { ScrollView, Text, View } from '../components/Themed';
import { Calendar, Agenda, CalendarList } from 'react-native-calendars';
import { StackScreenProps } from '@react-navigation/stack';
import { TodayParamList } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Todo from '../components/today/Todo';
import UserContext from '../hooks/UserContext';
import { Ionicons } from '@expo/vector-icons';

export default function TodayScreen({ navigation }: StackScreenProps<TodayParamList, 'TodayScreen'>) {
  const colorScheme = useColorScheme();
  const { userInfo } = React.useContext(UserContext);

  const date = new Date().toISOString().slice(0, 10);
  let monthData: any = {};
  monthData[date] = userInfo.trackings;

  React.useLayoutEffect(() => {
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
      <Agenda
        theme={{
          color: Colors[colorScheme].tint,
          dotColor: Colors[colorScheme].tint,
          selectedDotColor: Colors[colorScheme].tint,
          selectedDayBackgroundColor: Colors[colorScheme].tint,
          selectedColor: Colors[colorScheme].tint,
          todayColor: Colors[colorScheme].tint,
        }}
        items={monthData}
        renderItem={(item: any, firstItemInDay: any) => { return <Todo item={item} /> }}
        renderEmptyDate={emptyDate}
        markedDates={{
          '2020-10-03': { marked: true, selectedColor: '#724ea3' },
          '2020-09-12': { marked: true, },
        }}
        renderDay={(day: any, item: any) => { return (<View style={{ marginRight: 20 }} />); }}
      />
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
