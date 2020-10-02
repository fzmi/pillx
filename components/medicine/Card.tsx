import React, { Component } from "react";

import { Text, View } from '../';
import { Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CommonStyles from '../../styles/CommonStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

interface CardProps {
  imageUri: string;
  cardColor: string;
  name: string;
  label: string;
  instruction: string;
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
              <Image source={this.props.imageUri} />
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
