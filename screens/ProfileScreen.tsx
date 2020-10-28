import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScrollView, Text, View } from '../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { ProfileParamList } from '../types';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AuthContext from '../hooks/useAuthContext';
import UserContext from '../hooks/useUserContext';
import Layout from '../constants/Layout';

export default function ProfileScreen({ navigation }: StackScreenProps<ProfileParamList, 'ProfileScreen'>) {
  const { signOut } = React.useContext(AuthContext);
  const { userInfo, isLoading } = React.useContext(UserContext);
  const colorScheme = useColorScheme();
  const connected = userInfo.email !== undefined;
  const name = userInfo.name;

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].profileBackgroundOuter }}>
      {/* Profile */}
      <View style={[styles.profileGroup, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
        <Image style={styles.profileImage} source={require("../assets/images/profile/Avatar.png")} />
        <Text style={styles.profileHeaderText}>{connected && userInfo.name ? userInfo.name : 'PillX User'}</Text>
        <Text style={styles.profileText}>{connected ? userInfo.email : 'Email not available'}</Text>
      </View>

      {/* Details */}
      <View style={[styles.buttonGroup, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
        <TouchableOpacity onPress={() => { navigation.navigate("DetailScreen"); }} style={styles.buttonItem}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Image style={styles.buttonImage} source={require("../assets/images/profile/Name.png")} />
            <Text style={styles.buttonTextLeft}>Name</Text>

          </View>
          <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>

        <View style={styles.buttonSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <TouchableOpacity onPress={() => { navigation.navigate("DetailScreen"); }} style={styles.buttonItem}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Image style={styles.buttonImage} source={require("../assets/images/profile/DOB.png")} />
            <Text style={styles.buttonTextLeft}>DOB</Text>
          </View>
          <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>

        <View style={styles.buttonSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <TouchableOpacity onPress={() => { navigation.navigate("DetailScreen"); }} style={styles.buttonItem}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Image style={styles.buttonImage} source={require("../assets/images/profile/Gender.png")} />
            <Text style={styles.buttonTextLeft}>Gender</Text>
          </View>
          <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>

        <View style={styles.buttonSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <TouchableOpacity onPress={() => { navigation.navigate("DetailScreen"); }} style={styles.buttonItem}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Image style={styles.buttonImage} source={require("../assets/images/profile/Allergen.png")} />
            <Text style={styles.buttonTextLeft}>Allergies</Text>
          </View>
          <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>
      </View>

      {/* Settings */}
      <View style={[styles.buttonGroup, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
        <TouchableOpacity onPress={() => { navigation.navigate("SettingsScreen"); }} style={styles.buttonItem}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Ionicons name="md-settings" style={styles.buttonIcon} size={30} color={Colors[colorScheme].settingIcon} />
            <Text style={styles.buttonTextLeft}>Settings</Text>
          </View>
          <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>

        <View style={styles.buttonSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={styles.buttonSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <TouchableOpacity onPress={() => { navigation.navigate("Tutorial") }} style={styles.buttonItem}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Ionicons name="md-help-circle" style={styles.buttonIcon} size={30} color={Colors[colorScheme].settingIcon} />
            <Text style={styles.buttonTextLeft}>App Tutorial</Text>
          </View>
          <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>

        <View style={styles.buttonSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={[styles.buttonItem, { borderRadius: 15, backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Ionicons name="md-globe" style={styles.buttonIcon} size={30} color={Colors[colorScheme].settingIcon} />
            <Text style={styles.buttonTextLeft}>Server</Text>
          </View>
          <View style={[styles.buttonItemRight, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <View style={[styles.connectionIndicator, { backgroundColor: !isLoading && connected ? "green" : "#fc3d39" }]}></View>
            <Text style={styles.buttonTextRight}>{!isLoading && connected ? 'Connected' : 'Not Connected'}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={() => signOut()} style={[styles.filledButton, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
        <Text style={styles.filledButtonText}>Sign out this account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
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
    marginTop: 12,
    marginBottom: 10,
  },
  profileHeaderText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 2,
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
  connectionIndicator: {
    height: 8,
    width: 8,
    borderRadius: 8,
  },
  filledButton: {
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 20,
  },
  filledButtonText: {
    textAlign: 'center',
    color: '#724ea3',
    fontSize: 20,
    fontWeight: '600',
  },
});
