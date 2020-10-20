import React from 'react';
import { Tracking } from '../types';

// don't store tokens here
const AddContext = React.createContext({
  addInfo: {
    scannedText: '',
    medicineResults: [] as any,
    trackingName: '',
    medicineId: '',
    medicineName: '',
    frequency: { type: "day", value: 1, } as Tracking["frequency"],
    periodOfTreatment: { type: 'week', value: 1, },
    reminders: [] as any,
    imageUri: '',
  },
  setAddInfo: (data: any) => { },
});

export default AddContext;
