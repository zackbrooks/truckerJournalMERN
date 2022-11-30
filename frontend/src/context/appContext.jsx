import React from "react";
import { useReducer, useContext } from "react";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGGED_IN,
  LOG_OUT_USER,
} from "./actions";
import reducer from "./reducers";
import api from "../api/posts";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoadiing: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserToLocalStorage = ({ user, token }) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  //create user in db
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const resp = await api.post("/signup", currentUser);

      const { user, token } = resp.data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //login user
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const resp = await api.post("login", currentUser);

      const { user, token } = resp.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log("errorRRRRRRRRRR", error.response.data.msg);

      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loggedIn = async (currentUser) => {
    dispatch({ type: LOGGED_IN });
    clearAlert();
  };

  const logOut = async () => {
    removeUserToLocalStorage({ user, token });
    dispatch({ type: LOG_OUT_USER });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        loggedIn,
        logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};
export { AppProvider, initialState, useAppContext };
