import React, { useEffect, useState, useContext } from 'react';
import { Alert, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { View, Text } from '../Themed';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import UserContext from '../../hooks/useUserContext';
import useColorScheme from '../../hooks/useColorScheme';
import * as Haptics from 'expo-haptics';

interface Props {
  item: any,
  // tracking: Tracking
}

const Todo: React.FC<Props> = props => {
  const colorScheme = useColorScheme();
  const { userInfo, isLoading } = useContext(UserContext);
  const [taken, setTaken] = useState(false);

  useEffect(() => {
    setTaken(props.item.taken);
  }, []);

  const takenAlert = () =>
    Alert.alert("Taken medicine", "Are you sure you have taken this medicine?",
      [{ text: "Cancel", onPress: () => setTaken(true), },
      { text: "Yes", onPress: () => setTaken(false) }],
      { cancelable: false },
    );

  const takenCancelAlert = () =>
    Alert.alert("Untaken medicine", "Are you sure you have not taken this medicine?",
      [{ text: "Cancel", onPress: () => setTaken(false), },
      { text: "Yes", onPress: () => setTaken(true) }],
      { cancelable: false },
    );

  return (
    <View style={{ backgroundColor: "transparent" }}>
      {taken ? (
        <TouchableOpacity
        style={[styles.item, { height: props.item.height }, { backgroundColor:'#E4E4E4'}]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          taken ? (takenAlert()) : (takenCancelAlert())
        }}>
        <View style={styles.content}>
          <View style={{ backgroundColor: "transparent", flexDirection: "row", flex: 1 }}>
            <View style={{ flexDirection: "row", backgroundColor: "transparent", flex: 1 }}>
              <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>{props.item.trackingName}</Text>
            </View>
            <Ionicons name="ios-checkmark-circle" size={30} color={Colors[colorScheme].buttonBlue} />

          </View>
        </View>
      </TouchableOpacity>

      ) : (
        <View style={[styles.item, { height: props.item.height }, { backgroundColor: taken ?  '#A9A9A9' : 'white'  }]}>
          <View style={styles.content}>
            <View style={{ backgroundColor: "transparent", flex: 1}}>
              <View style={{ flexDirection: "row", backgroundColor: "transparent", flex: 1}}>
                <TouchableOpacity style={{ flex: 1, flexDirection:"row", alignItems: "flex-start" }}>
                  <Ionicons name="ios-information-circle" size={30} color="#333" />
                  <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4, marginLeft:13}}>{props.item.trackingName}</Text>
                </TouchableOpacity>
                <Image style={styles.pillImage} source={props.item.image} />
              </View>

              <Text style={{ fontSize: 18, marginBottom: 10, color: "#444" }}><Entypo name="clock" size={16} color={"#333"} />&nbsp;&nbsp;{props.item.description}</Text>

            </View>

          </View>
          <View style={{ display: "flex", flexDirection: "row", backgroundColor: "transparent" }}>

            <TouchableOpacity style={{
              // backgroundColor: Colors[colorScheme].buttonBlue, 
              backgroundColor: Colors[colorScheme].buttonBlue,
              padding: 10, borderRadius: 20, flex: 3, margin: 5, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"
            }} 
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              taken ? (takenAlert()) : (takenCancelAlert())
            }}>
              <Ionicons name="ios-checkmark-circle" size={30} color={"white"} />

              <Text style={{ fontSize: 20, color: "#fff", marginLeft: 10, fontWeight: "500" }}>
                Take
              </Text>

            </TouchableOpacity>
            {/* <TouchableOpacity style={{ borderColor: "#333", borderWidth: 1, borderRadius: 5, flex: 1, margin: 5, display: "flex", alignItems: "center", justifyContent: "center" }}> */}

          </View>
        </View>
          
        )}
    </View>
  )
}

export default Todo;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 20,
    marginTop: 15,
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    flex:1,
    resizeMode: "contain"

  },
});
