import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { View, Text } from '../Themed';

import { Entypo, Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import * as Haptics from 'expo-haptics';

interface Props {
  item: any;
}

const Todo: React.FC<Props> = props => {
  const colorScheme = useColorScheme();

  return (
    <View style={{ backgroundColor: "transparent" }}>
      <View
        style={[styles.item, { height: props.item.height }]}
      >
        <View style={styles.content}>
          <View style={{ backgroundColor: "transparent" }}>
            <View style={{ flexDirection: "row", backgroundColor: "transparent"}}>
              <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>{props.item.name}</Text>
              <TouchableOpacity style={{ flex: 1, marginLeft: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="ios-information-circle" size={25} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 18, marginBottom: 10, color: "#444" }}><Entypo name="clock" size={16} color={"#333"} />&nbsp;&nbsp;{props.item.description}</Text>
            {/* <Text style={{ fontSize: 16, color: "#333" }}>{props.item.time}</Text> */}
          </View>
          <Image style={styles.pillImage} source={props.item.image}></Image>
        </View>
        <View style={{ display: "flex", flexDirection: "row", backgroundColor: "transparent" }}>

          <TouchableOpacity style={{ backgroundColor: Colors[colorScheme].buttonBlue, padding: 10, borderRadius: 5, flex: 3, margin: 5, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Ionicons name="ios-checkmark-circle" size={30} color="white" />
            <Text style={{ fontSize: 20, color: "#fff", marginLeft: 10 }}>Taken</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{ borderColor: "#333", borderWidth: 1, borderRadius: 5, flex: 1, margin: 5, display: "flex", alignItems: "center", justifyContent: "center" }}> */}

        </View>
      </View>

      {/* Taken the medicine */}
      <View
        style={[styles.item, { height: props.item.height }, {backgroundColor: "#ABABAB"}]}
      >
        <View style={styles.content}>
          <View style={{ backgroundColor: "transparent" }}>
            <View style={{ flexDirection: "row", backgroundColor: "transparent"}}>
              <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>{props.item.name}</Text>
              <TouchableOpacity style={{ flex: 1, marginLeft: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="ios-information-circle" size={25} color="#333" />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 18, marginBottom: 10, color: "#444" }}><Entypo name="clock" size={16} color={"#333"} />&nbsp;&nbsp;{props.item.description}</Text>
            {/* <Text style={{ fontSize: 16, color: "#333" }}>{props.item.time}</Text> */}
          </View>
          <Image style={styles.pillImage} source={props.item.image}></Image>
        </View>
        <View style={{ display: "flex", flexDirection: "row", backgroundColor: "transparent" }}>

          <TouchableOpacity style={{ backgroundColor: Colors[colorScheme].buttonBlue, padding: 10, borderRadius: 5, flex: 3, margin: 5, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Ionicons name="ios-checkmark-circle" size={30} color="white" />
            <Text style={{ fontSize: 20, color: "#fff", marginLeft: 10 }}>Already taken</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{ borderColor: "#333", borderWidth: 1, borderRadius: 5, flex: 1, margin: 5, display: "flex", alignItems: "center", justifyContent: "center" }}> */}

        </View>
      </View>
    </View>
  )
}

export default Todo;

const styles = StyleSheet.create({
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
    backgroundColor: "transparent",
  },
  pillImage: {
    maxWidth: 80,
    maxHeight: 60,
    borderRadius: 5,
    marginRight: 5,
  },
});
