import React from 'react';
import { Button, StyleSheet, Platform, Image } from 'react-native';
import { Text, View, ScrollView } from '../../components/Themed';

import Layout from '../../constants/Layout';
import { StackScreenProps } from '@react-navigation/stack';
import { ModalStackParamList, ProfileParamList } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import useCachedResources from '../../hooks/useCachedResources';

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

        <View style={styles.cardStyle}>
            <Image style={styles.tutorialImage} source={require("../../assets/images/tutorial/tutorial1.png")} />
        </View>

        <View style={styles.cardStyle}>
          <Image style={styles.tutorialImage} source={require("../../assets/images/tutorial/tutorial2.png")} />
        </View>

        <View style={[styles.cardStyle]}>
          <Text style={styles.tutorialText}>PillX aims to help patients to better understand their existing medication provided by doctor. 
          It does not provide users with any diagnosis and medical advices. Please seek help from your doctor for any inqury about medicines.</Text>
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
    shadowColor: "#222",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tutorialImage: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
  },
  tutorialText : {
    fontSize: 20,
    lineHeight: 35,
    marginHorizontal:20,
    fontWeight: 'bold',
    color: '#484747'
  }
});
