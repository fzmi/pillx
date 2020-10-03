import React from 'react';

const AddContext = React.createContext({
  medicineName: '',
  frequency: '',
  periodOfTreatment: '',
  reminders: {},
});

export default AddContext;
