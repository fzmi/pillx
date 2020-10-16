// Root stack
export type RootStackParamList = {
  Root: undefined;
  Public: undefined;
  NotFound: undefined;
};

// Root stack -> Public stack
export type PublicStackParamList = {
  SignInScreen: undefined;
  RegisterScreen: undefined;
  RecoverScreen: undefined;
}

// Root stack -> Button Tab
export type BottomTabParamList = {
  Today: undefined;
  Medicine: undefined;
  Profile: undefined;
};

// Root stack -> Button Tab -> Today
export type TodayParamList = {
  TodayScreen: undefined;
};

// Root stack -> Button Tab -> Medicine
export type MedicineParamList = {
  MedicineScreen: undefined;
  Add: undefined;
  Data: {
    medicineId: any;
  };
  EditScreen: {
    medicineId: any;
  };
};

// Root stack -> Button Tab -> Profile
export type ProfileParamList = {
  ProfileScreen: undefined;
};

// Root stack -> Button Tab -> Medicine -> Add
export type AddTabParamList = {
  ScanInputScreen: undefined;
  ManualInputScreen: undefined;
}

// Root stack -> Button Tab -> Medicine -> Data
export type DataTabParamList = {
  EffectScreen: {
    medicineId: any;
  };
  MethodScreen: {
    medicineId: any;
  };
}
