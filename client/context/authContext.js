import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();

const INITIAL_STATE = {
  user: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "USER_LOADED":
      return { ...state, user: payload };
    case "LOGOUT":
    case "AUTH_ERROR":
      return { ...state, user: null };
    default:
      state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
