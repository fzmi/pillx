import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';
import { ScrollView, Text, View } from '../../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { ProfileParamList } from '../../types';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import Layout from '../../constants/Layout';

interface Props {
  
}

export default function SettingsScreen({ navigation }: StackScreenProps<ProfileParamList, 'ProfileScreen'>) {
  const colorScheme = useColorScheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState: any) => !previousState);

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].profileBackgroundOuter }}>
      <View style={[styles.buttonGroup, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
        <TouchableOpacity onPress={() => { navigation.navigate("SettingsScreen"); }} style={styles.buttonItem}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Ionicons name="ios-settings" style={styles.buttonIcon} size={30} color={Colors[colorScheme].settingIcon} />
            <Text style={styles.buttonTextLeft}>Dark Theme</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  profileGroup: {
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  profileHeaderText: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 2,
  },
  profileText: {
    fontSize: 18,
    marginTop: 2,
    marginBottom: 15,
  },
  buttonGroup: {
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  buttonIcon: {
    height: 30,
    width: 30,
  },
  buttonTextLeft: {
    fontSize: 18,
    paddingLeft: 15,
    fontWeight: '500',
  },
  buttonTextRight: {
    fontSize: 16,
    paddingLeft: 8,
    paddingRight: 0,
    fontWeight: '500',
  },
  buttonSeparator: {
    height: 1,
    paddingLeft: Layout.window.width - 100,
    justifyContent: 'center',
    alignSelf: "flex-end",
  },
});
