import React from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View, ScrollView } from '../../components/Themed';
import { CheckBox } from 'react-native-elements';

import { StackScreenProps } from '@react-navigation/stack';
import { PublicStackParamList } from '../../types';
import Layout from '../../constants/Layout';
import AuthContext from '../../hooks/AuthContext';

export default function RegisterScreen({ navigation }: StackScreenProps<PublicStackParamList, 'RegisterScreen'>) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const textInput2 = React.useRef<TextInput>(null!);
  const textInput3 = React.useRef<TextInput>(null!);

  const { signUp } = React.useContext(AuthContext);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 0.6, justifyContent: 'center' }}>
      <View style={styles.container}>
        <View style={{ width: 140, height: 140 }}>
          <Image style={styles.logo} source={require("../../assets/images/icons/logo.png")} />
        </View>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.inputArea}>
          <TextInput
            autoCorrect={false}
            blurOnSubmit={false}
            onChangeText={setName}
            onSubmitEditing={() => { textInput2.current.focus() }}
            placeholder="Your Name"
            placeholderTextColor='#777'
            returnKeyType='next'
            style={styles.input}
            value={name}
          />
          <TextInput
            autoCorrect={false}
            blurOnSubmit={false}
            keyboardType='email-address'
            onChangeText={setEmail}
            onSubmitEditing={() => { textInput3.current.focus() }}
            placeholder="Email"
            placeholderTextColor='#777'
            ref={textInput2}
            returnKeyType='next'
            style={styles.input}
            value={email}
          />
          <TextInput
            autoCorrect={false}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor='#777'
            ref={textInput3}
            returnKeyType='done'
            secureTextEntry
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
    fontWeight: '600',
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
    fontSize: 18,
    color: '#2e78b7',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 30,
  },
  logo: {
    width: 140,
    height: 140,
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2e78b7',
  },
});
