// Tracking contains user-specific information on medicine
export type Tracking = {
  trackingName: string,
  medicineId?: string,
  medicineName?: string,
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

export type Dosage = {
  trackingName: string,
  medicineId?: string,
  medicineName?: string,
  time: Date,
  taken: boolean,
}

// Medicine contains detailed information of medicine
export type Medicine = {
  id?: string,
  name: string,
  description?: string,
}

// Root modals
export type ModalStackParamList = {
  App: undefined;
  Tutorial: undefined;
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
  Tutorial: undefined;
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
