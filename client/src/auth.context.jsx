import React, { useState } from "react";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  // token to be used from local storage - get()
  const token =   localStorage.getItem("token");
//   console.log(token);
  const [data, setData] = useState(token);


  return (
    <AuthContext.Provider value={{ data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
