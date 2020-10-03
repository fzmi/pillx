import React from 'react';

const AuthContext = React.createContext({
  signIn: (data: any) => {},
  signOut: () => {},
  signUp: (data: any) => {},
});

export default AuthContext;
