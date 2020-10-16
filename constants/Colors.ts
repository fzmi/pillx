// the colour of the tab bar icon when selected
const tintColorLight = '#2e78b7';
const tintColorDark = '#fff';
const colorPurple = '#724ea3';
const colorPurple2 = '#8175ea';
const colorBlue = '#6679e4';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: colorPurple,
    tabIconDefault: '#ccc',
    tabIconSelected: colorPurple,
    buttonBlue: colorPurple,
    medicineStep1: colorPurple,
    medicineStep2: colorPurple2,
    medicineStep3: colorBlue,
    secondaryBackground: '#eee',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    buttonBlue: tintColorLight,
    medicineStep1: '#000',
    medicineStep2: '#000',
    medicineStep3: '#000',
    secondaryBackground: '#111',
  },
};
