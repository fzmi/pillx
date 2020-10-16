import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../../Themed';

interface Props {
  step: number;
  totalSteps: number;
}

const StepIndicator: React.FC<Props> = props => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{props.step}</Text>
      <View style={styles.view}>
        <View style={styles.separator} />
        <Text style={styles.smallText}>{props.step}&nbsp;/&nbsp;{props.totalSteps}</Text>
        <View style={styles.separator2} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 55,
    fontWeight: '800',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    flexGrow: 0.8,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginLeft: 20,
  },
  smallText: {
    color: 'white',
    fontSize: 12,
    marginHorizontal: 10,
  },
  separator2: {
    marginVertical: 30,
    height: 1,
    flexGrow: 0.2,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
});

export default StepIndicator;
