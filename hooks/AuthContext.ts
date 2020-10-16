import React from 'react';

// don't store tokens here
const AuthContext = React.createContext({
  signIn: (data: any) => {},
  signOut: () => {},
  signUp: (data: any) => {},
});

export default AuthContext;
