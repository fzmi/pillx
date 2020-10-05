import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';

import { AddTabParamList } from '../../types';
import ManualStep1View from './ManualStep1View';
import ManualStep2View from './ManualStep2View';
import ManualStep3View from './ManualStep3View';

export default function ManualInputScreen({ navigation }: StackScreenProps<AddTabParamList, 'ManualInputScreen'>) {
  const [step, setStep] = React.useState(1);

  return (
    <View style={{ flex: 1 }}>
      { step == 1 && <ManualStep1View styles={styles} setStep={setStep} />}
      { step == 2 && <ManualStep2View styles={styles} setStep={setStep} />}
      { step == 3 && <ManualStep3View styles={styles} setStep={setStep} navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 10,
  },
  backButtonContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  backButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center'
  },
});
