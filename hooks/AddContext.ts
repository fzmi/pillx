import React from 'react';

// don't store tokens here
const AddContext = React.createContext({
  addInfo: {
    medicineName: '',
    frequency: '',
    periodOfTreatment: '',
    reminders: {},
    imageUri: '',
  },
  setAddInfo: (data: any) => { },
});

export default AddContext;
