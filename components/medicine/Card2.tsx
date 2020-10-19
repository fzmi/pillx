// demo card for A/B testing
import React from 'react';
import { Text, View, ScrollView } from '../Themed';
import { Dimensions, StyleSheet, TouchableOpacity, Image, View as ClearView } from "react-native";
import { Tracking } from "../../types";
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { FontAwesome5, Entypo } from '@expo/vector-icons';

interface Props {
  tracking: Tracking,
  index: number,
}

const Card: React.FC<Props> = ({ tracking, index }) => {
  const colorScheme = useColorScheme();
  const trackingName = tracking.trackingName ? tracking.trackingName : "Medicine";
  // DERALIN 40 Propranolol hydrochloride 40mg tablet bottle
  const medicineName = (tracking.medicineName && tracking.medicineName !== "null") ? tracking.medicineName : "";
  const progress = 0.45;
  const progressPercentage = `${progress * 100}%`;
  const remaining = "3 months remaining";
  const imageUri = require('../../assets/images/pills/pill2.png');
  const reminders = [new Date()];

  return (<View style={styles.cardContainer}>
    <View style={[styles.headerBanner, { backgroundColor: Colors[colorScheme].buttonBlue }]}></View>
    <ClearView style={{ marginTop: -40, flexDirection: "row", justifyContent: "space-between" }}>
      <View style={[styles.headerThumbnail]}>
        <Image source={imageUri} width={50} height={50} style={{ width: 50, height: 50 }} />
      </View>
      <Text style={{ marginRight: 15, color: "white", fontSize: 25, fontWeight: "600" }}>{index}</Text>
    </ClearView>

    <ScrollView style={{ marginBottom: 15, width: "100%" }}>
      <View style={{ paddingHorizontal: 15, alignItems: "center", width: "100%", height: "100%", alignContent: "space-between", justifyContent: "space-between" }}>
        <Text style={styles.trackingName}>{trackingName}</Text>
        <Text style={[styles.medicineName, { color: Colors[colorScheme].secondaryText }]}>{medicineName}</Text>
        <View style={{ width: "100%", height: 20, backgroundColor: "#eee", borderRadius: 20, marginBottom: 5 }}>
          <View style={{ width: progressPercentage, height: 20, backgroundColor: "green", borderRadius: 20, alignItems: "flex-end", justifyContent: "center" }}>
            {progress >= 0.2 && <Text style={{ color: "white", marginRight: 8 }}>{progressPercentage}</Text>}
          </View>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "600", color: Colors[colorScheme].secondaryText, marginBottom: 30 }}>{remaining}</Text>

        <View style={{ backgroundColor: "#eee", width: "100%", height: 2, marginBottom: 20 }}></View>
        {/* <Text style={{fontSize: 20}}>Reminders</Text> */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingHorizontal: 15, marginBottom: 10 }}>
          <FontAwesome5 name="bell" size={24} color={Colors[colorScheme].text} />
          <Text style={{ fontWeight: "700", padding: 4, fontSize: 18 }}>Daily at 10:00, 12:00</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingHorizontal: 15, marginBottom: 10 }}>
          <Entypo name="block" size={22} color={Colors[colorScheme].text} />
          <Text style={{ fontWeight: "700", padding: 4, fontSize: 18 }}>2 pills per dosage</Text>
        </View>

        <View style={{ backgroundColor: "#eee", width: "100%", height: 2, marginTop: 10, marginBottom: 20 }}></View>

        <View style={{ flexDirection: "row-reverse", width: "100%", paddingHorizontal: 15 }}>
          <Text style={{ color: "#bbb", fontWeight: "500", fontSize: 14 }}>AUST R 12345</Text>
        </View>

      </View>
    </ScrollView>

    <View style={{ marginBottom: 15, paddingHorizontal: 15, width: "100%" }}>
      <TouchableOpacity style={{ width: "100%", paddingVertical: 14, backgroundColor: Colors[colorScheme].buttonBlue, alignItems: "center", justifyContent: "center", borderRadius: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: "500", color: "white" }}>See Methods &amp; Effects</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: "100%", paddingVertical: 14, marginTop: 10, backgroundColor: "#eee", alignItems: "center", justifyContent: "center", borderRadius: 15 }}>
        <Text style={{ fontSize: 18, fontWeight: "500", color: "black" }}>Edit Tracking</Text>
      </TouchableOpacity>
    </View>
  </View>);
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.75,
    marginLeft: 20,
    marginVertical: 30,
    borderRadius: 20,
    elevation: 2,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  headerBanner: {
    height: 55,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerThumbnail: {
    height: 70,
    width: 70,
    marginLeft: 15,
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
  },
  trackingName: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  medicineName: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  }
});
