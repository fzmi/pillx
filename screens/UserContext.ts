import React from 'react';

// don't store tokens here
const UserContext = React.createContext({
  userInfo: {
    name: '',
    email: '',
    medicine: {},
  },
  setUserInfo: (data: any) => {},
  isLoading: true,
});

export default UserContext;
