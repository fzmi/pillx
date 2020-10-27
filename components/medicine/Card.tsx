import React from 'react';
import { Text, View, ScrollView } from '../Themed';
import { Dimensions, StyleSheet, TouchableOpacity, Image, View as ClearView } from "react-native";
import { Tracking } from "../../types";
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  tracking: Tracking,
  index: number,
}

const Card: React.FC<Props> = ({ tracking, index }) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  // Tracking information
  const imageUri = require('../../assets/images/pills/pill2.png');
  const trackingName = tracking.trackingName ? tracking.trackingName : "Medicine";
  const medicineName = (tracking.medicineName && tracking.medicineName !== "null") ? tracking.medicineName : "";
  const progress = Math.max(0.08, ((new Date()).getTime() - tracking.startDate.getTime()) /
    (tracking.endDate!.getTime() - tracking.startDate.getTime()));
  const progressPercentage = `${progress * 100}%`;
  const remaining = `${timeSince(tracking.startDate, tracking.endDate!)} remaining`;
  const reminders = [new Date()];
  const frequency = tracking.frequency;
  const days: { [key: number]: string; } = { 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat", 7: "Sun" };

  return (<View style={styles.cardContainer}>
    <ClearView style={[styles.headerBanner, { backgroundColor: Colors[colorScheme].buttonBlue }]}></ClearView>
    <ClearView style={styles.headerOverlay}>
      <View style={[styles.headerThumbnail]}>
        <Image source={imageUri} width={50} height={50} style={styles.headerImage} />
      </View>
      <Text style={styles.headerIndex}>{index}</Text>
    </ClearView>

    <ScrollView style={styles.trackingOuterScroll}>
      <View style={styles.trackingContainer}>
        <Text style={styles.trackingName}>{trackingName}</Text>
        <Text style={[styles.medicineName, { color: Colors[colorScheme].secondaryText }]}>{medicineName}</Text>
        <View style={styles.progressBarOuter}>
          <View style={[styles.progressBarInner, { width: progressPercentage }]}>
            {progress >= 0.2 && <Text style={styles.progressBarInnerText}>{progressPercentage}</Text>}
          </View>
        </View>
        <Text style={[styles.progressBarRemaining, { color: Colors[colorScheme].secondaryText }]}>{remaining}</Text>

        <View style={styles.separator}></View>
        <View style={styles.infoContainer}>
          <MaterialCommunityIcons name="progress-clock" size={25} color="black" />
          <Text style={styles.infoText}>{(frequency.type === 'day' && frequency.value == 1) ? 'Daily' : frequency.type !== 'dayOfWeek' ?
                      `Every ${frequency.value} ${frequency.type}${frequency.value > 1 ? 's' : ''}` :
                      `${(frequency.value as Array<number>).map(value => days[value])}`}</Text>
        </View>
        <View style={styles.infoContainer}>
          <MaterialCommunityIcons name="bell-ring-outline" size={25} color="black" />
          <Text style={styles.infoText}>{tracking.reminders.map(reminder => reminder.toISOString().split("T")[1]).join(",")}</Text>
        </View>

        <View style={[styles.separator, { marginTop: 10 }]}></View>

        <View style={styles.identifierContainer}>
          <Text style={styles.identifierText}>{tracking.medicineId ? `AUST R ${tracking.medicineId}` : ""}</Text>
        </View>
      </View>
    </ScrollView>

    <ClearView style={styles.buttonGroup}>
      <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: Colors[colorScheme].buttonBlue }]}
        onPress={() => navigation.navigate("Data", { medicineId: tracking.medicineId })}>
        <Text style={[styles.buttonText, { color: "white" }]}>See Methods &amp; Effects</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonContainer, { marginTop: 10, backgroundColor: "#eee" }]}
        onPress={() => navigation.navigate("EditScreen", { medicineId: tracking.medicineId })}>
        <Text style={[styles.buttonText, { color: "black" }]}>Edit Tracking</Text>
      </TouchableOpacity>
    </ClearView>
  </View>);
};

export default Card;

// Utility function calculating durations
function timeSince(start: Date, end: Date) {
  var seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
  var interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

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
  headerOverlay: {
    marginTop: -40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerThumbnail: {
    height: 70,
    width: 70,
    marginLeft: 15,
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
  },
  headerImage: {
    width: 50,
    height: 50,
  },
  headerIndex: {
    marginRight: 15,
    color: "white",
    fontSize: 25,
    fontWeight: "600"
  },
  trackingOuterScroll: {
    marginBottom: 15,
    width: "100%",
  },
  trackingContainer: {
    paddingHorizontal: 15,
    alignItems: "center",
    width: "100%",
    height: "100%",
    alignContent: "space-between",
    justifyContent: "space-between"
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
  },
  progressBarOuter: {
    width: "100%",
    height: 20,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginBottom: 5,
  },
  progressBarInner: {
    height: 20,
    backgroundColor: "green",
    borderRadius: 20,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  progressBarInnerText: {
    color: "white",
    marginRight: 8,
  },
  progressBarRemaining: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 30,
  },
  separator: {
    backgroundColor: "#eee",
    width: "100%",
    height: 2,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  infoText: {
    fontWeight: "700",
    padding: 4,
    fontSize: 18,
  },
  identifierContainer: {
    flexDirection: "row-reverse",
    width: "100%",
    paddingHorizontal: 15,
  },
  identifierText: {
    color: "#bbb",
    fontWeight: "500",
    fontSize: 14
  },
  buttonGroup: {
    marginBottom: 15,
    paddingHorizontal: 15,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
