import React from 'react';
import { Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text, View, ScrollView } from '../../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import AuthContext from '../../navigation/AuthContext';
import Layout from '../../constants/Layout';
import { PublicStackParamList } from '../../types';

export default function SignInScreen({ navigation }: StackScreenProps<PublicStackParamList, 'SignInScreen'>) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 0.6, justifyContent: 'center' }}>
        <View style={styles.container}>
          <View style={{ width: 120, height: 120 }}>
            <Image style={styles.logo} source={require("../../assets/images/logo.png")} />
          </View>
          <Text style={styles.title}>Sign In</Text>
          <View style={styles.inputArea}>
            <TextInput
              autoCorrect={false}
              blurOnSubmit={false}
              onChangeText={setUsername}
              // onSubmitEditing={() => { this.secondTextInput.focus(); }}
              placeholder="Username or Email"
              placeholderTextColor='#777'
              returnKeyType='next'
              style={styles.input}
              value={username}
            />
            <TextInput
              autoCorrect={false}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor='#777'
              // ref={(input) => { this.secondTextInput = input; }}
              returnKeyType='done'
              secureTextEntry
              style={styles.input}
              value={password}
            />

            <TouchableOpacity onPress={() => signIn({ username, password })} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.linkText}>Not a member? Sign up here.</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RecoverScreen')}>
              <Text
                style={styles.linkText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: 30
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e78b7',
  },
});
