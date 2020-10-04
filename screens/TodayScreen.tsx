import React from 'react';
import { StyleSheet, TouchableOpacity, Alert, Image, TouchableHighlight, Button } from 'react-native';
import { Text, View } from '../components/Themed';

import { Calendar, Agenda } from 'react-native-calendars';
import { Entypo } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { TodayParamList } from '../types';
import useColorScheme from '../hooks/useColorScheme';

// const rightButtons = [
//   <TouchableHighlight>
//     <View style={{
//       backgroundColor: "#B22222",
//       marginTop: 40,
//       marginLeft: 10,
//       borderRadius: 25,
//       width: 40,
//       height: 40,
//       alignItems: 'center',
//       justifyContent: 'center',
//     }}>
//       <Entypo style={{ color: "#eee" }} name="trash" size={24} color="black" />
//     </View>
//   </TouchableHighlight>
// ];

const images = {
  image1: require("../assets/images/pills/pill3.png"),
  image2: require("../assets/images/pills/pill2.png"),
  sample: require("../assets/images/sample-medicine.jpg"),
};

const getMonthData = () => {
  //let loadingData = true;
  let dataToReturn = {
    '2020-10-03': [{ name: "Pantonix 20mg", description: "1 pill, once per day", time: "7:00am", image: images.sample }, { name: "Ferralet 90", description: "1 pill, once per day", time: "7:30am", image: images.image2 }],
    // '2020-09-16': [],
    // '2020-09-17': [],
    // '2020-09-18': [{ name: "Ferralet 90", description: "1 pill, once per day", time: "7:30am", image: images.image2 }],
    // '2020-09-11': [{ name: "Pantonix 20mg", description: "1 pill, once per day", time: "7:00am", image: images.image1 }],
    // '2020-09-12': [{ name: 'item 3 - any js object', image: images.image2 }],
    // '2020-09-13': [{ name: 'item 3 - any js object', image: images.image1 }],
    // '2020-09-14': [{ name: 'item 3 - any js object', image: images.image1 }]
  };
  return dataToReturn;
};

export default function TodayScreen({ navigation }: StackScreenProps<TodayParamList, 'TodayScreen'>) {
  const colorScheme = useColorScheme();
  const monthData = getMonthData();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "October 2020",
    });
  }, [navigation]);

  const renderItem = (item: any) => {
    return (
      <View style={{ backgroundColor: "transparent" }}>
        <TouchableOpacity
          style={[styles.item, { height: item.height }]}
          onPress={() => Alert.alert(item.name)}
        >
          <View style={styles.content}>
            <View style={{}}>
              <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 4 }}>{item.name}</Text>
              <Text style={{ fontSize: 16, marginBottom: 10, color: "#444" }}>{item.description}</Text>
              <Text style={{ fontSize: 16, color: "#333" }}><Entypo name="clock" size={16} color={"#333"} />&nbsp;&nbsp;{item.time}</Text>
            </View>
            <Image style={styles.pillImage} source={item.image}></Image>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity style={{ backgroundColor: "#888", padding: 10, borderRadius: 5, flex: 1, margin: 5, display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "#fff" }}>Instructions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#20bcf0", padding: 10, borderRadius: 5, flex: 1, margin: 5, display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 20, color: "#fff" }}>Taken</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={monthData}
        renderItem={(item: any, firstItemInDay: any) => { return renderItem(item); }}
        renderEmptyDate={() => {
          return (<View
            style={{
              borderBottomColor: '#eee',
              borderBottomWidth: 2,
              backgroundColor: "transparent",
              marginRight: 10,
              flex: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />);
        }}
        markedDates={{
          '2020-09-10': { marked: true },
          '2020-09-12': { marked: true },
        }}
        renderDay={(day: any, item: any) => { return (<View style={{ marginRight: 20 }} />); }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 20,
    marginTop: 15,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  pillImage: {
    width: 100,
    height: 80,
    borderRadius: 5,
    marginRight: 5,
  },
});
