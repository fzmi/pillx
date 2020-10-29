import React, { useEffect, useState, useCallback } from 'react';
import { View, Text } from '../../../components/Themed';
import { TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import useColorScheme from '../../../hooks/useColorScheme';
import { StackScreenProps } from '@react-navigation/stack';
import { DataTabParamList } from '../../../types';
import UserContext from '../../../hooks/useUserContext';
import { useFocusEffect } from '@react-navigation/native';


interface Props {
  item: any;
}

export default function EffectScreen({ route, navigation }: StackScreenProps<DataTabParamList, 'EffectScreen'>) {
  // contains user info
  const { userInfo, isLoading } = React.useContext(UserContext);

  // use this medicine id to get information
  const { medicineId } = route.params;

  const [medicineData, setMedicineData] = useState<any>(null);

  const [effect, setEffect] = useState<string>("");


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

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setEffect(medicineData.actionSites)
      })();
    }, [])
  );

  useEffect(() => {
    (async () => {
      const info = await getMedicine();
      setMedicineData(info);
    })();
    return () => { }
  }, []);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Data Visualisation",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView>
          <Image style={styles.pillImage} source={require("../../../assets/images/pills/pill1.png")}></Image>
          <View style={styles.textContent}>

            {medicineData && (<>
              <Text style={styles.pillTitle}>{medicineData.name}</Text>
              <Text style={{ marginHorizontal: 25, fontSize: 18 }}>{medicineData.description}</Text>
            </>)}

          </View>
        </ScrollView>
      </View>

      <View
        style={{
          borderTopColor: '#F4F4F4',
          borderTopWidth: 1,
          marginVertical: 10,
        }} />

      <View style={styles.content}> 
        {effect == "HEART" ?
        <Image style={styles.contentImage} source={require("../../../assets/images/medicine/effect/heart.png")}></Image> :
        effect == "PANCREAS" ?
        <Image style={styles.contentImage} source={require("../../../assets/images/medicine/effect/pancreas.png")}></Image> :
        effect == "AREA_APPLIED" ?
        <Image style={styles.contentImage} source={require("../../../assets/images/medicine/effect/skin.png")}></Image> :
        <Image style={styles.contentImage} source={require("../../../assets/images/medicine/effect/head.png")}></Image>
        }
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
    alignSelf: 'center',
  },
  pillTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 25,
    textAlign: "center",
    marginVertical: 10,
  },
  pillFrequency: {
    fontSize: 15,
  }
});
