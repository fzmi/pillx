import React from 'react';
import { Button, StyleSheet, Platform } from 'react-native';
import { Text, View, ScrollView } from '../../components/Themed';

import Layout from '../../constants/Layout';
import { StackScreenProps } from '@react-navigation/stack';
import { ModalStackParamList, ProfileParamList } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

const CARD_WIDTH = Layout.window.width * 0.8;
const CARD_HEIGHT = Layout.window.height * 0.75;
const SPACING_FOR_CARD_INSET = Layout.window.width * 0.1 - 10;

export default function TutorialScreen({ navigation }:
  StackScreenProps<ModalStackParamList, "Tutorial"> | StackScreenProps<ProfileParamList, "Tutorial">) {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      <Button onPress={() => navigation.goBack()} title="Skip" />
      <ScrollView
        horizontal
        pagingEnabled
        decelerationRate={0}
        snapToAlignment='center'
        snapToInterval={CARD_WIDTH + 10}
        showsHorizontalScrollIndicator={false}
        contentInset={{ top: 0, left: SPACING_FOR_CARD_INSET, bottom: 0, right: SPACING_FOR_CARD_INSET }}
        contentContainerStyle={{ paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0, alignItems: "center" }}>

        <View style={[styles.cardStyle, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Tutorial Screen</Text>
          <Text>Page 1</Text>
        </View>

        <View style={[styles.cardStyle, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Tutorial Screen</Text>
          <Text>Page 2</Text>
        </View>

        <View style={[styles.cardStyle, { backgroundColor: Colors[colorScheme].secondaryBackground }]}>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>Tutorial Screen</Text>
          <Text>Page 3</Text>
          <Button onPress={() => navigation.goBack()} title="Done" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStyle: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
  },
});
