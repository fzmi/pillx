import React from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView, Text, View } from '../components/Themed';

import { Entypo } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileParamList } from '../types';

import AuthContext from '../navigation/AuthContext';

export default function ProfileScreen({ navigation }: StackScreenProps<ProfileParamList, 'ProfileScreen'>) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <ScrollView>
      <View style={styles.container}>


        {/** ---------- fix code below ----------- */}

        <View style={styles.topbar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
            <Entypo name="chevron-thin-left" size={30} />
          </TouchableOpacity>
          <View style={styles.profile}>
            {/* <Image style={styles.profileImage} source={require("../assets/images/Avatar.png")} /> */}
            <TextInput
              style={styles.textInput}
              placeholder="USER NAME"
            />
          </View>
        </View>

        <View style={styles.items}>
          <TouchableOpacity onPress={() => { }} style={styles.link}>
            <View style={styles.item}>
              {/* <Image style={styles.itemIcon} source={require("../assets/images/Name.png")} /> */}
              <View style={styles.itemText}>
                <Text style={styles.itemName}>Full Name</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { }} style={styles.link}>
            <View style={styles.item}>
              {/* <Image style={styles.itemIcon} source={require("../assets/images/DOB.png")} /> */}
              <View style={styles.itemText}>
                <Text style={styles.itemName}>Date of Birth</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { }} style={styles.link}>
            <View style={styles.item}>
              {/* <Image style={styles.itemIcon} source={require("../assets/images/Gender.png")} /> */}
              <View style={styles.itemText}>
                <Text style={styles.itemName}>Gender</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { }} style={styles.link}>
            <View style={styles.item}>
              {/* <Image style={styles.itemIcon} source={require("../assets/images/Email.png")} /> */}
              <View style={styles.itemText}>
                <Text style={styles.itemName}>Email</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { }} style={styles.link}>
            <View style={styles.item}>
              {/* <Image style={styles.itemIcon} source={require("../assets/images/Allergen.png")} /> */}
              <View style={styles.itemText}>
                <Text style={styles.itemName}>Allergen</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/** ---------- fix code above ----------- */}
        

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <TouchableOpacity onPress={() => signOut()} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign out this account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#2e78b7',
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: '#2e78b7',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 30
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
  },
  textInput: {
    color: '#727272',
    height: 40,
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 80,
  },
  items: {
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 70,
    height: 25,
  },
  itemText: {
    paddingLeft: 45,
  },
  itemIcon: {
    width: 30,
    resizeMode: 'contain',
  },
  itemName: {
    color: '#727272',
    fontSize: 14,
  },
  HeaderProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
