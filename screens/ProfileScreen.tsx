import React from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView, Text, View } from '../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';

import { ProfileParamList } from '../types';
import AuthContext from '../hooks/AuthContext';
import UserContext from '../hooks/UserContext';

export default function ProfileScreen({ navigation }: StackScreenProps<ProfileParamList, 'ProfileScreen'>) {
  const { signOut } = React.useContext(AuthContext);
  const { userInfo, isLoading } = React.useContext(UserContext);

  return (
    <ScrollView>
      <View style={styles.topbar}>
        <View style={styles.profile}>
          <Image style={styles.profileImage} source={require("../assets/images/profile/Avatar.png")} />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="username"
        />
      </View>

      <View style={styles.items}>
        <TouchableOpacity onPress={() => { }} style={styles.link}>
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Image style={styles.itemIcon} source={require("../assets/images/profile/Name.png")} />
            </View>
            <View style={styles.itemText}>
              <Text style={styles.itemName}>Full Name</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={styles.link}>
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Image style={styles.itemIcon} source={require("../assets/images//profile/DOB.png")} />
            </View>
            <View style={styles.itemText}>
              <Text style={styles.itemName}>Date of Birth</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={styles.link}>
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Image style={styles.itemIcon} source={require("../assets/images/profile/Gender.png")} />
            </View>
            <View style={styles.itemText}>

              <Text style={styles.itemName}>Gender</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={styles.link}>
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Image style={styles.itemIcon} source={require("../assets/images/profile/Email.png")} />
            </View>
            <View style={styles.itemText}>
              <Text style={styles.itemName}>Email</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={styles.link}>
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Image style={styles.itemIcon} source={require("../assets/images/profile/Allergen.png")} />
            </View>

            <View style={styles.itemText}>
              <Text style={styles.itemName}>Allergen</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        {/** ---------- debug text ----------- */}
        <Text style={{ marginBottom: 10 }}>Network status: {userInfo.email == undefined ? 'Not Connected' : 'Connected as ' + userInfo.email}</Text>
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
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  container: {
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
    paddingVertical: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#2e78b7',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 30
  },
  topbar: {
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 20,
  },
  textInput: {
    color: '#727272',
    height: 40,
    fontSize: 20,
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  items: {
    marginHorizontal: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  itemText: {
    width: "70%",
    alignItems: 'center',
  },
  iconContainer: {
    width: "30%",
    alignItems: 'center',
  },
  itemIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  itemName: {
    color: '#727272',
    fontSize: 18,
    fontWeight: '500',
  },
  HeaderProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
