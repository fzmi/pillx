import React, { useState, useContext, useEffect, useCallback } from 'react';
import { StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';
import { ScrollView, Text, View } from '../../components/Themed';

import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { ProfileParamList } from '../../types';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import Layout from '../../constants/Layout';
import { TextInput } from 'react-native-gesture-handler';
import useUserContext from '../../hooks/useUserContext';

export default function DetailScreen({ navigation, route }: StackScreenProps<ProfileParamList, 'DetailScreen'>) {
  const colorScheme = useColorScheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState: any) => !previousState);
  const { userInfo, setUserInfo } = useContext(useUserContext);
  const { item, itemName } = route.params;
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(userInfo[item as "name" | "dateOfBirth" | "gender" | "allergies"]);
    return () => {
      setUserInfo({
        ...userInfo,
        [item]: value,
      });
    }
  }, []);

  return (
    <ScrollView style={{ backgroundColor: Colors[colorScheme].profileBackgroundOuter }}>
      <View style={[styles.buttonGroup, { backgroundColor: Colors[colorScheme].profileBackgroundInner }]}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}>{itemName}</Text>
        <View style={styles.fieldTextInput}>
          <TextInput value={value} editable clearButtonMode={"while-editing"} placeholder={"Not Set"}
            onChangeText={text => {
              setValue(text);
            }} style={{ fontSize: 20 }} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  fieldTextInput: {
    marginTop: 4,
    marginLeft: -6,
    paddingHorizontal: 6,
    paddingVertical: 7,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
});
