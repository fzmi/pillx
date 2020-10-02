import React from 'react';
import { Button, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View, ScrollView } from '../../components/Themed';
import { CheckBox } from 'react-native-elements';

import { StackScreenProps } from '@react-navigation/stack';
import { PublicStackParamList } from '../../types';
import Layout from '../../constants/Layout';
import AuthContext from '../../navigation/AuthContext';

export default function RegisterScreen({ navigation }: StackScreenProps<PublicStackParamList, 'RegisterScreen'>) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp } = React.useContext(AuthContext);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 0.6, justifyContent: 'center' }}>
      <View style={styles.container}>
        <View style={{ width: 120, height: 120 }}>
          <Image style={styles.logo} source={require("../../assets/images/logo.png")} />
        </View>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.inputArea}>
          <TextInput
            autoCorrect={false}
            onChangeText={setName}
            placeholder="Your Name"
            placeholderTextColor='#777'
            returnKeyType='next'
            style={styles.input}
            value={name}
          />
          <TextInput
            autoCorrect={false}
            keyboardType='email-address'
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor='#777'
            returnKeyType='next'
            style={styles.input}
            value={email}
          />
          <TextInput
            autoCorrect={false}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor='#777'
            returnKeyType='done'
            style={styles.input}
            value={password}
          />
          <CheckBox
            title='By signing up you agree to the terms of service and privacy policy.'
            checked={true}
          />

          <TouchableOpacity onPress={() => signUp({ name, email, password })} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.linkText}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#2e78b7',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
  },
  container: {
    alignItems: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#f2f2f2',
    fontSize: 18,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  inputArea: {
    flex: 1,
    width: Layout.window.width * 0.8,
  },
  linkText: {
    fontSize: 16,
    color: '#2e78b7',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    margin: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e78b7',
  },
});
