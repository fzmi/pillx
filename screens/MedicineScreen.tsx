import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { MedicineParamList, Tracking } from '../types';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Entypo } from '@expo/vector-icons';
import Card from '../components/medicine/Card';
import AsyncStorage from '@react-native-community/async-storage';

import UserContext from '../hooks/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MedicineScreen({ navigation }: StackScreenProps<MedicineParamList, 'MedicineScreen'>) {
  const colorScheme = useColorScheme();
  const { userInfo, isLoading } = useContext(UserContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]} edges={['top']}>
      <View style={[styles.container, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
        {/* Header */}
        <View style={[styles.headerView, { borderBottomColor: Colors[colorScheme].headerBorder }]}>
          <Text style={styles.headerText}>My Medicine</Text>
          <TouchableOpacity style={[styles.addButton, { backgroundColor: Colors[colorScheme].tint }]}
            onPress={() => { navigation.navigate("Add"); }}>
            <Entypo style={{ marginTop: 2, marginLeft: 1 }} name="plus" size={40} color={Colors[colorScheme].background} />
          </TouchableOpacity>
        </View>

        {/* Medicine Scroll View */}
        {userInfo.trackings && userInfo.trackings.length > 0 && (
          <View style={{ flex: 1, backgroundColor: Colors[colorScheme].secondaryBackground }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
              {userInfo.trackings.map((tracking: Tracking, index: number) =>
                // <Card key={index} tracking={tracking} cardColor='#ccc' progress={0.3} date="3 months" />
                <Card key={index} tracking={tracking} index={index + 1} />
              )}
            </ScrollView>
          </View>
        )}

        {/* Loading View */}
        {isLoading && (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30 }}>
            <ActivityIndicator size="large" />
            <Text style={{ marginVertical: 15, fontSize: 26, textAlign: "center", fontWeight: "500" }}>Loading medicines...</Text>
            <Text style={{ textAlign: "center" }}>If loading takes large amount of time, please make sure the PillX server is on or check network connection.</Text>
          </View>
        )}

        {/* Empty Medicine View */}
        {!isLoading && (!userInfo.trackings || !userInfo.trackings.length) && (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 30 }}>
            <Text style={{ fontSize: 26, textAlign: "center", fontWeight: "600" }}>No Medicine Trackings</Text>
            <Text style={{ marginVertical: 12, marginBottom: 20, fontSize: 16, textAlign: "center" }}>Tap the button below or on the top-right to add a new tracking.</Text>
            <TouchableOpacity style={{ paddingVertical: 12, paddingHorizontal: 30, backgroundColor: Colors[colorScheme].buttonBlue, borderRadius: 20 }}
              onPress={() => { navigation.navigate("Add"); }}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>New Medicine Tracking</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: 5,
    paddingBottom: 6,

    borderBottomWidth: 0.25,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "600",
    marginLeft: 18,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
    width: 45,
    height: 45,
    borderRadius: 45,
    marginBottom: 2,
  },
});
