import React from 'react';
import { Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text, View, ScrollView } from '../../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import AuthContext from '../../navigation/AuthContext';
import Layout from '../../constants/Layout';
import { PublicStackParamList } from '../../types';

export default function SignInScreen({ navigation }: StackScreenProps<PublicStackParamList, 'SignInScreen'>) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const textInput2 = React.useRef<TextInput>(null!);

  const { signIn } = React.useContext(AuthContext);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 0.6, justifyContent: 'center' }}>
      <View style={styles.container}>
        <View style={{ width: 140, height: 140 }}>
          <Image style={styles.logo} source={require("../../assets/images/logo.png")} />
        </View>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.inputArea}>
          <TextInput
            autoCorrect={false}
            blurOnSubmit={false}
            keyboardType='email-address'
            onChangeText={setEmail}
            onSubmitEditing={() => { textInput2.current.focus() }}
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
            ref={textInput2}
            returnKeyType='done'
            secureTextEntry
            style={styles.input}
            value={password}
          />

          <TouchableOpacity onPress={() => signIn({ email, password })} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Sign In</Text>
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
    fontWeight: 'bold',
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
    marginTop: 30
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
