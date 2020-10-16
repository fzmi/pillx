import React from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView, Text, View } from '../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { ProfileParamList } from '../types';
import AuthContext from '../hooks/AuthContext';
import UserContext from '../hooks/UserContext';
import Layout from '../constants/Layout';

export default function ProfileScreen({ navigation }: StackScreenProps<ProfileParamList, 'ProfileScreen'>) {
  const { signOut } = React.useContext(AuthContext);
  const { userInfo, isLoading } = React.useContext(UserContext);
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].profileBackgroundOuter }}>

      <View style={[styles.profileGroup, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
        <Image style={styles.profileImage} source={require("../assets/images/profile/Avatar.png")} />
        <Text style={styles.profileHeaderText}>PillX User</Text>
        <Text style={styles.profileText}>{userInfo.email == undefined ? 'Email not available' : userInfo.email}</Text>
      </View>

      <View style={[styles.buttonGroup, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
        <TouchableOpacity onPress={() => { }} style={styles.buttonItem}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Image style={styles.buttonImage} source={require("../assets/images/profile/Name.png")} />
            <Text style={styles.buttonTextLeft}>Name</Text>
          </View>
          <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>

        <View style={styles.buttonSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <TouchableOpacity onPress={() => { }} style={styles.buttonItem}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Image style={styles.buttonImage} source={require("../assets/images/profile/DOB.png")} />
            <Text style={styles.buttonTextLeft}>DOB</Text>
          </View>
          <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>

        <View style={styles.buttonSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <TouchableOpacity onPress={() => { }} style={styles.buttonItem}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Image style={styles.buttonImage} source={require("../assets/images/profile/Gender.png")} />
            <Text style={styles.buttonTextLeft}>Gender</Text>
          </View>
          <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>

        <View style={styles.buttonSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <TouchableOpacity onPress={() => { }} style={styles.buttonItem}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Image style={styles.buttonImage} source={require("../assets/images/profile/Allergen.png")} />
            <Text style={styles.buttonTextLeft}>Allergies</Text>
          </View>
          <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonGroup, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
        <TouchableOpacity onPress={() => { }} style={styles.buttonItem}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Ionicons name="ios-settings" style={styles.buttonIcon} size={30} color={Colors[colorScheme].settingIcon} />
            <Text style={styles.buttonTextLeft}>Settings</Text>
          </View>
          <Entypo name="chevron-thin-right" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>

        <View style={styles.buttonSeparator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={[styles.buttonItem, { borderRadius: 15 }]}>
          <View style={[styles.buttonItemLeft, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
            <Ionicons name="ios-globe" style={styles.buttonIcon} size={30} color={Colors[colorScheme].settingIcon} />
            <Text style={styles.buttonTextLeft}>Server</Text>
          </View>
          <Text style={styles.buttonTextRight}>{userInfo.email == undefined ? 'Not Connected' : 'Connected'}</Text>
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
    paddingLeft: 15,
    fontWeight: '500',
  },
  buttonSeparator: {
    height: 1,
    paddingLeft: Layout.window.width - 100,
    justifyContent: 'center',
    alignSelf: "flex-end",
  },
  filledButton: {
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  filledButtonText: {
    textAlign: 'center',
    color: '#724ea3',
    fontSize: 20,
    fontWeight: '600',
  },
});
