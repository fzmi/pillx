import React from 'react';
import { View, Text } from '../../../components/Themed';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import useColorScheme from '../../../hooks/useColorScheme';
import { StackScreenProps } from '@react-navigation/stack';
import { DataTabParamList } from '../../../types';
import UserContext from '../../../hooks/useUserContext';


interface Props {
  item: any;
}

export default function EffectScreen({ route, navigation }: StackScreenProps<DataTabParamList, 'EffectScreen'>) {
  // contains user info
  const { userInfo, isLoading } = React.useContext(UserContext);

  // use this medicine id to get information
  const { medicineId } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Data Visualisation",
    });
  }, [navigation]);

  return (
  <View style={styles.container}>      
    <View style={styles.content}>
      <Image style={styles.pillImage} source={require("../../../assets/images/pills/pill1.png")}></Image>
      <View style={styles.textContent}>
        <Text style={styles.pillTitle}>Fish and Omega</Text>
        <Text>Everyday</Text>
      </View>
    </View>
    
    <View
      style={{
        borderTopColor: '#F4F4F4',
        borderTopWidth: 1,
        marginVertical: 10,
      }} />
      
    <View style={styles.content}>
      <Image style={styles.contentImage} source={require("../../../assets/images/medicine/effect/effect1.png")}></Image>
    </View>
    
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex:1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent:'center', 
    alignItems: 'center', 
  },
  textContent: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent:'center', 
    alignItems: 'center', 
  },
  contentImage: {
    flex: 1,
    resizeMode: 'contain',
    margin: 20

  },
  pillImage: {
    maxWidth: 80,
    maxHeight: 60,
    borderRadius: 5,
    marginRight: 5,
    alignSelf: 'center',
  },
  pillTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  pillFrequency: {
    fontSize: 15,
  }
});
