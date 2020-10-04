import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { View, Text } from '../Themed';

import { Entypo } from '@expo/vector-icons';

interface Props {
  item: any;
}

const Todo: React.FC<Props> = props => {
  return (
    <View style={{ backgroundColor: "transparent" }}>
      <TouchableOpacity
        style={[styles.item, { height: props.item.height }]}
        onPress={() => Alert.alert(props.item.name)}
      >
        <View style={styles.content}>
          <View style={{}}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 4 }}>{props.item.name}</Text>
            <Text style={{ fontSize: 16, marginBottom: 10, color: "#444" }}>{props.item.description}</Text>
            <Text style={{ fontSize: 16, color: "#333" }}><Entypo name="clock" size={16} color={"#333"} />&nbsp;&nbsp;{props.item.time}</Text>
          </View>
          <Image style={styles.pillImage} source={props.item.image}></Image>
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
  },
  pillImage: {
    width: 100,
    height: 80,
    borderRadius: 5,
    marginRight: 5,
  },
});
