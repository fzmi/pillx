import React from 'react';

// don't store tokens here
const AddContext = React.createContext({
  addInfo: {
    medicineResults: [] as any,
    medicineName: '',
    frequency: {
      type: "day",
      value: 1,
    },
    periodOfTreatment: {
      type: 'week',
      value: 1,
    },
    reminders: [] as any,
    imageUri: '',
  },
  setAddInfo: (data: any) => { },
});

export default AddContext;
