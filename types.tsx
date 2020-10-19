// Tracking contains user-specific information on medicine
export type Tracking = {
  id?: string,
  name: string,
  instruction?: string,
  image: string | number,
  frequency: {
    type: "day" | "week" | "month" | "dayOfWeek",
    value: number | Array<number>
  },
  // reminder time for each day
  reminders: Array<Date>,
  startDate: Date,
  endDate?: Date,
}

// List of dosages for each day
export type Dosages = Array<{
  [date: string]: {
    count: number,
    medicines: Array<{time: Date, medicineId: string,}>
  }
}>

// Medicine contains detailed information of medicine
export type Medicine = {
  id?: string,
  name: string,
  description?: string,
}

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
  SettingsScreen: undefined;
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
