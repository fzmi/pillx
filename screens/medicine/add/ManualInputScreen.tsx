import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../../components/Themed';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect, StackActions } from '@react-navigation/native';

import { AddTabParamList } from '../../../types';
import ManualStep1View from './ManualStep1View';
import ManualStep2View from './ManualStep2View';
import ManualStep3View from './ManualStep3View';

export default function ManualInputScreen({ navigation }: StackScreenProps<AddTabParamList, 'ManualInputScreen'>) {
  const [step, setStep] = React.useState(1);

  // go back to main medicine screen if navigate to other tabs
  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       if (!navigation.isFocused()) {
  //         navigation.dispatch(StackActions.popToTop());
  //       }
  //     };
  //   }, [])
  // );

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
    marginTop: 10,
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
    marginTop: 5,
  },
  backButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    marginBottom: 20,
  },
  separator: {
    height: 1,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldLeftTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  fieldRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldRightEdit: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
  },
  fieldRightText: {
    fontSize: 18,
    fontWeight: '400',
    marginHorizontal: 10,
  },
  fieldTextInput: {
    marginTop: 4,
    marginLeft: -6,
    paddingHorizontal: 6,
    paddingVertical: 7,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  fieldTextSmall: {
    fontSize: 15,
    fontWeight: "600",
    paddingTop: 7
  },
});
