// the colour of the tab bar icon when selected
const tintColorLight = '#2e78b7';
const tintColorDark = '#fff';
const colorPurple = '#724ea3';
const colorPurple2 = '#8175ea';
const colorBlue = '#6679e4';

export default {
  light: {
    text: '#000',
    secondaryText: "#777",
    background: '#fff',
    tint: colorPurple,
    tabIconDefault: '#ccc',
    tabIconSelected: colorPurple,
    buttonBlue: colorPurple,
    buttonBlueDisabled: "#8b7ca1",
    medicineStep1: colorPurple,
    medicineStep2: colorPurple2,
    medicineStep3: colorBlue,
    secondaryBackground: '#eee',
    settingIcon: '#333',
    profileBackgroundOuter: "#eee",
    profileBackgroundInner: "#fff",
    headerBorder: "#bbb",
  },
  dark: {
    text: '#fff',
    secondaryText: "#888",
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    buttonBlue: tintColorLight,
    buttonBlueDisabled: "#7497b5",
    medicineStep1: '#000',
    medicineStep2: '#000',
    medicineStep3: '#000',
    secondaryBackground: '#111',
    settingIcon: '#fff',
    profileBackgroundOuter: "#000",
    profileBackgroundInner: "#111",
    headerBorder: "#444",
  },
};
