import React, { createContext, useReducer } from "react";

import axios from "../utils/axios";
import { API } from "../config";

// Context
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
      return state;
  }
};

// Provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Actions
export const loadUser = async (dispatch, router) => {
  try {
    const res = await axios.get(`${API}/v1/auth`);
    const user = res.data.data.user;
    dispatch({ type: "USER_LOADED", payload: user });

    if (router) {
      router.push(user.role === "ADMIN" ? "/admin/blogs-manage" : "user");
    }
  } catch (error) {
    console.error("[LOADUSER ERROR]", error);
  }
};

export const login = async (email, password) => {
  try {
    await axios.post(`${API}/v1/auth/login`, { email, password });
  } catch (error) {
    console.error("[LOGIN ERROR]", error);
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    await axios.post(`${API}/v1/auth/register`, { name, email, password });
  } catch (error) {
    console.error("[REGISTER ERROR]", error);
    throw error;
  }
};
