import React from "react";
import { Text, View } from '../Themed';
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

interface CardProps {
  imageUri: string;
  cardColor: string;
  name: string;
  label?: string;
  instruction?: string;
  date: string;
  progress: number;
}

const Divider = () => {
  return (
    <View
      style={{
        borderTopColor: '#F4F4F4',
        borderTopWidth: 1,
        marginVertical: 10,
      }} />
  )
};

const ReminderItem = () => {
  return (
    <View style={CommonStyles.reminderItem}>
      <View style={{
        backgroundColor: '#F4F4F4',
        borderRadius: 100,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
      }}>
        <Text style={{ fontWeight: 'bold' }}>8 a.m.</Text>
      </View>

    </View>
  )
}

const EditButton = () => {
  return (
    <View style={CommonStyles.editButtonContainer}>

      <View style={CommonStyles.editButton}>
        <TouchableOpacity>
          <Text style={CommonStyles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const Card: React.FC<CardProps> = props => {
  // colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <View style={CommonStyles.card}>
      <View style={CommonStyles.cardImage} >
        {/* Put medicine image or placeholder here */}
        {/* <Image source={props.imageUri} /> */}
      </View>

      <View style={CommonStyles.content} >
        <View style={CommonStyles.medInfoCardContent}>
          <Text style={CommonStyles.medInfoCardContentTitle}>{props.name}</Text>
          <Text style={CommonStyles.medInfoCardContentText}>{props.date}</Text>
          <Progress.Bar
            progress={props.progress}
            color={props.cardColor}
            unfilledColor={'#B9B9B9'}
            borderWidth={0}
            height={20}
            borderRadius={100}>
          </Progress.Bar>
          <Text style={CommonStyles.medInfoCardContentText}>{props.progress * 100}%</Text>
          <Text style={CommonStyles.medInfoCardContentText}>{props.instruction}</Text>

        </View>
        <EditButton />
        <Divider />
        <ReminderItem />
      </View>

      <TouchableOpacity style={CommonStyles.methodButtonContainer} 
      onPress={() => { navigation.navigate("Data", { medicineId: "med-id" }) }}>
        <View style={CommonStyles.methodButton}>
          <Text style={CommonStyles.methodButtonText}>See methods & effects</Text>
          <View style={CommonStyles.methodButtonIcon}>
            <AntDesign name="right" size={24} color="white" />
          </View>
        </View>
      </TouchableOpacity>

    </View>
  );
}

export default Card;

const CommonStyles = StyleSheet.create({
  card: {
    height: Dimensions.get('window').height * 0.65,
    width: Dimensions.get('window').width * 0.7,
    margin: 20,
    marginVertical: Dimensions.get('window').height * 0.05,
  },
  cardImage: {
    backgroundColor: 'yellow',
    flex: 2
  },
  content: {
    flex: 4,
    marginTop: -40,
    marginHorizontal: 30,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 10, },
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  editButtonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  editButton: {
    backgroundColor: '#2e78b7',
    borderRadius: 100,
    width: 80,
    height: 80,
    shadowOffset: { width: 0, height: 10, },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -20
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 5,
    fontSize: 25,
    fontStyle: 'italic'
  },
  header: {
    height: 100,
  },
  headerProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 20,
  },
  methodButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  methodButtonText: {
    fontSize: 15,
    color: '#8D8D8D',
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  methodButtonIcon: {
    backgroundColor: '#8D8D8D',
    borderRadius: 100,
    padding: 6,
    shadowOffset: { width: 0, height: 10, },
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  methodButtonContainer: {
    flex: 1,
  },
  medInfoView: {
    marginTop: -30,
    height: 200,
    marginHorizontal: 30,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 10, },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    marginVertical: 20,
  },
  medInfoCardContent: {
    alignItems: 'center',
    paddingTop: 30,
    margin: 10
  },
  medInfoEditContainer: {
    flexDirection: 'row',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#71CDF9',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    margin: 10
  },
  medInfoCardContentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  medInfoCardContentText: {
    fontSize: 15,
    color: "#707070",
    fontWeight: 'bold',
    paddingVertical: 5
  },
  medInfoProgessbarText: {
    flex: 1,
    color: 'white',
  },
  reminderView: {
    height: 200,
    marginHorizontal: 30,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 10, },
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  reminderContent: {
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    marginVertical: 20
  },
  reminderTopbar: {
    flexDirection: 'row',
    marginVertical: 10
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
