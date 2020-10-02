import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, ScrollView } from '../components/Themed';

const Card = () => {
  return (
    <View style={{}}>

    </View>
  );
}

export default function MedicineScreen() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
