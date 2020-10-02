// todo: not checked

import React, { Component } from "react";
import { Text, View } from '../Themed';
import { Image, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Progress from 'react-native-progress';

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

const DeleteButton = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 30
      }}>

      <View
        style={{
          backgroundColor: '#D76161',
          borderRadius: 100,
          paddingHorizontal: 20,
          paddingVertical: 10,
          shadowOffset: { width: 0, height: 10, },
          shadowColor: 'black',
          shadowOpacity: 0.1,
          padding: 5,
        }}>
        <TouchableOpacity style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <FontAwesome name="trash-o" size={30} color="white" />
          <View style={{
            justifyContent: "center",
          }}>
            <Text style={{
              color: 'white',
              fontWeight: 'bold',
              paddingHorizontal: 5
            }}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ReminderItem = () => {
  return (
    <View style={CommonStyles.reminderItem}>
      <View style={{
        backgroundColor: '#F4F4F4',
        borderRadius: 100,
        paddingHorizontal: 20,
        justifyContent: 'center',
        flex: 1
      }}>
        <Text style={{ fontWeight: 'bold' }}>8 a.m.</Text>
      </View>
      <View style={{
        right: 0,
        flex: 1,
        alignItems: 'flex-end'
      }}>
        <TouchableOpacity>
          <Entypo name="cross" size={25} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

class Card extends Component<CardProps> {
  render() {
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={CommonStyles.card}>
          <View
            style={{
              borderTopColor: this.props.cardColor,
              borderTopWidth: 80,
            }}
          />

          <View style={CommonStyles.medInfoView}>
            <View style={CommonStyles.medInfoCardContent}>
              {/* <Image source={this.props.imageUri} /> */}
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{this.props.name}</Text>
              <Text style={{ fontSize: 10, color: '#8D8D8D' }}>{this.props.instruction}</Text>
              <TouchableOpacity>
                <View style={CommonStyles.medInfoEditContainer}>
                  <MaterialCommunityIcons name="pencil" size={24} color="#357CA0" />
                  <Text style={{ fontStyle: 'italic', color: '#357CA0', padding: 5 }}>Edit</Text>
                </View>
              </TouchableOpacity>
              <View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <View style={{ flex: 4, justifyContent: 'center', alignContent: 'center', }}>
                    <Progress.Bar
                      progress={this.props.progress}
                      color={this.props.cardColor}
                      unfilledColor={'#B9B9B9'}
                      borderWidth={0}
                      height={20}
                      borderRadius={100}>
                    </Progress.Bar>
                    <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, marginTop: -18 }}>
                      <Text style={CommonStyles.medInfoProgessbarText}>{this.props.progress * 100}%</Text>
                      <Text style={CommonStyles.medInfoProgessbarText}>{this.props.date}</Text>
                    </View>
                  </View>
                </View>
                <Divider />
                <View>
                  <TouchableOpacity>
                    <View style={{ flexDirection: 'row', bottom: 0, right: 0 }}>
                      <Text style={{ fontSize: 10, color: '#8D8D8D', paddingVertical: 6 }}>See more effects & effects</Text>
                      <AntDesign name="right" size={24} color="#8D8D8D" />
                    </View>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>

          <View style={CommonStyles.reminderView}>
            <View style={CommonStyles.reminderContent}>
              <View style={CommonStyles.reminderTopbar}>
                <View style={{ flex: 4, justifyContent: 'center', alignContent: 'center' }} >
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Reminder</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', paddingRight: 0 }} >
                  <TouchableOpacity>
                    <Entypo name="circle-with-plus" size={30} color="grey" />
                  </TouchableOpacity>
                </View>
              </View>
              <ReminderItem />
              <Divider />

            </View>
          </View>
          <DeleteButton />

        </View>
      </View>
    );
  }
}
export default Card;

const CommonStyles = StyleSheet.create({
  header: {
    height: 100,
  },
  headerProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 20,
  },

  // Card
  card: {
    height: Dimensions.get('window').height * 0.65,
    width: Dimensions.get('window').width * 0.7,
    margin: 20,
    marginVertical: Dimensions.get('window').height * 0.1,
    backgroundColor: 'white'
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
    marginTop: -40,
    alignItems: 'center'
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
  },
});
