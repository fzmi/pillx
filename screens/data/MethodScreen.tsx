import React from 'react';
import { View, Text } from '../../components/Themed';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { DataTabParamList } from '../../types';
import UserContext from '../../hooks/UserContext';

export default function MethodScreen({ route, navigation }: StackScreenProps<DataTabParamList, 'MethodScreen'>) {
  // contains user info
  const { userInfo, isLoading } = React.useContext(UserContext);

  // use this medicine id to get information
  const { medicineId } = route.params;

  return (
    <View style={styles.container}>      
    <View style={styles.content}>
      <Image style={styles.pillImage} source={require("../../assets/images/pills/pill1.png")}></Image>
      
    </View>
    
    <View
      style={{
        borderTopColor: '#F4F4F4',
        borderTopWidth: 1,
        marginVertical: 10,
      }} />
      
    <View style={styles.content}>
      
      <Image style={styles.contentImage} source={require("../../assets/images/medicine/method/external.png")}></Image>
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
    },
  });