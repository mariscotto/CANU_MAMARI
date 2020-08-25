// Redux Actions for Researcher Authentication

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    // .post("/api/users/signup", userData)
    .post("/api/users/signup", userData)
    // push to login page after register
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    // .post("/api/users/login", userData)
    .post("/api/users/login", userData)
    .then(res => {
      // Set and save token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(function (error) {
      console.log(error);
      const errorMessage = (() => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return error.response.data;
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          return error.request;
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          return error.message;
        }
      })();

      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    })

  // .catch(err =>
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: err.response.data
  //   })
  // );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
