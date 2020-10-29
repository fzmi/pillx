import React from 'react';
import { Tracking } from '../types';

// don't store tokens here
const UserContext = React.createContext({
  userInfo: {
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    allergies: '',
    trackings: [] as Array<Tracking>,
    todayReminders: [] as Array<any>,
  },
  setUserInfo: (data: any) => {},
  isLoading: true,
});

export default UserContext;
