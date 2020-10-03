import React from 'react';

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
