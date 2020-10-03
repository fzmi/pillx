import React from 'react';

const UserContext = React.createContext({
  name: '',
  email: '',
  medicines: {}
  // don't store tokens here
});

export default UserContext;
