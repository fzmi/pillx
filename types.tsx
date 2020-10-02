// Root stack
export type RootStackParamList = {
  Root: undefined;
  Public: undefined;
  NotFound: undefined;
};

// Root stack > Public stack
export type PublicStackParamList = {
  SignInScreen: undefined;
  RegisterScreen: undefined;
  RecoverScreen: undefined;
}

// Root stack > Button Tab
export type BottomTabParamList = {
  Today: undefined;
  Medicine: undefined;
  Settings: undefined;
};

// Root stack > Button Tab > Today
export type TodayParamList = {
  TodayScreen: undefined;
};

// Root stack > Button Tab > Medicine
export type MedicineParamList = {
  MedicineScreen: undefined;
};

// Root stack > Button Tab > Settings
export type SettingsParamList = {
  SettingsScreen: undefined;
};
