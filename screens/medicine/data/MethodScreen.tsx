import React, { useEffect, useState } from 'react';
import { View, Text } from '../../../components/Themed';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { DataTabParamList } from '../../../types';
import UserContext from '../../../hooks/useUserContext';

export default function MethodScreen({ route, navigation }: StackScreenProps<DataTabParamList, 'MethodScreen'>) {
  // contains user info
  const { userInfo, isLoading } = React.useContext(UserContext);

  // use this medicine id to get information
  const { medicineId } = route.params;

  const [medicineData, setMedicineData] = useState<any>(null);

  const [method, setMethod] = useState<string>("");

  const getMedicine = async () => {
    return fetch(`https://deco3801-rever.uqcloud.net/medicine/get?identifier=${medicineId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
      .then(response => response.json())
      .then(result => {
        if (!result) {
          throw "No medicine found";
        }
        return result;
      })
      .catch(error => {
        // showMessage({
        //   message: "Search Error",
        //   description: "No medicine found.",
        //   type: "danger",
        //   icon: "danger",
        //   duration: 2500,
        // });
        console.log(error);
      });
  }

  useEffect(() => {
    (async () => {
      const info = await getMedicine();
      setMedicineData(info);
      setMethod(medicineData.administrationMethod);
    })();
    return () => { }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.pillImage} source={require("../../../assets/images/pills/pill1.png")}></Image>
        <View style={styles.textContent}>
          {medicineData && (<>
            <Text style={styles.pillTitle}>{medicineData.name}</Text>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>{medicineData.dosageDescription}</Text>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>{medicineData.administrationMethod.join(",")}</Text>
          </>)}
        </View>
      </View>

      <View
        style={{
          borderTopColor: '#F4F4F4',
          borderTopWidth: 1,
          marginVertical: 10,
        }} />
      <View style={styles.content}>
        {method == "ORAL" ? 
        <Image style={styles.contentImage} source={require("../../../assets/images/medicine/method/oral.png")}></Image> :
        method== "INJECTION" ? 
         <Image style={styles.contentImage} source={require("../../../assets/images/medicine/method/injection.png")}></Image> :
         <Image style={styles.contentImage} source={require("../../../assets/images/medicine/method/external.png")}></Image> }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
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
  },
  pillTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 25,
    textAlign: "center",
    marginVertical: 10,
  },
});
