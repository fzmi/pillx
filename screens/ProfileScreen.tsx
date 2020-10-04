import React from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView, Text, View } from '../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { ProfileParamList } from '../types';

import AuthContext from './public/AuthContext';
import UserContext from './UserContext';

export default function ProfileScreen({ navigation }: StackScreenProps<ProfileParamList, 'ProfileScreen'>) {
  const { signOut } = React.useContext(AuthContext);
  const { userInfo, isLoading } = React.useContext(UserContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.topbar}>
          <View style={styles.profile}>
            <Image style={styles.profileImage} source={require("../assets/images/profile/Avatar.png")} />
            <TextInput
              style={styles.textInput}
              placeholder="USER NAME"
            />
          </View>
        </View>

        <View style={styles.items}>
          <TouchableOpacity onPress={() => { }} style={styles.link}>
            <View style={styles.item}>
              <Image style={styles.itemIcon} source={require("../assets/images/profile/Name.png")} />
              <View style={styles.itemText}>
                <Text style={styles.itemName}>Full Name</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { }} style={styles.link}>
            <View style={styles.item}>
              <Image style={styles.itemIcon} source={require("../assets/images//profile/DOB.png")} />
              <View style={styles.itemText}>
                <Text style={styles.itemName}>Date of Birth</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { }} style={styles.link}>
            <View style={styles.item}>
              <Image style={styles.itemIcon} source={require("../assets/images/profile/Gender.png")} />
              <View style={styles.itemText}>
                <Text style={styles.itemName}>Gender</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { }} style={styles.link}>
            <View style={styles.item}>
              <Image style={styles.itemIcon} source={require("../assets/images/profile/Email.png")} />
              <View style={styles.itemText}>
                <Text style={styles.itemName}>Email</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { }} style={styles.link}>
            <View style={styles.item}>
              <Image style={styles.itemIcon} source={require("../assets/images/profile/Allergen.png")} />
              <View style={styles.itemText}>
                <Text style={styles.itemName}>Allergen</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        {/** ---------- debug text ----------- */}
        <Text style={{marginBottom: 10}}>Network status: {userInfo.email == '' ? 'Not Connected' : 'Connected as ' + userInfo.email}</Text>
        <TouchableOpacity
          onPress={() => signOut()}
          style={styles.buttonContainer}>
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
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center'
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
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
  },
  itemText: {
    width: 80,
    marginHorizontal: 50,
    alignItems: 'center'
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
