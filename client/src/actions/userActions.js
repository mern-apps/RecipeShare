import * as api from '../api/api'; 
import * as apicookie from '../api/apicookie';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTokenCookie } from '../utils/cookieUtils'; // Import the utility function
import {logOut} from '../reducers/userSlice';
import {signUpStep} from '../reducers/userSlice';
import {signInbyId} from '../reducers/userSlice';
import {cookieEdit} from '../reducers/userSlice';
import {signIn,signUp} from '../reducers/userSlice';
import { InitialGroup } from '../reducers/groups/groupListSlice';
import { InitialBook } from '../reducers/books/currentprojectSlice';

//For all sign in , signup, logout - TO Initiate all redux states

export const signup = (updatedFormData) => async (dispatch) => {
  try {
    console.log('updatedFormData', updatedFormData);

    const response = await api.signupuserapi(updatedFormData);
        console.log('upd2222222222222Data', response);

 if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

dispatch(signUp(response.data.user));

  } catch (error) {
    console.log('Error', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout()); 
        }
  }
};


export const signin = (formData) => async (dispatch) => {
  try {

    const response = await api.signinuserapi(formData);
 if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

dispatch(signIn(response.data.user));

  } catch (error) {
    console.log('Error', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
  }
};



export const signinbyid = () => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');

    if (token) {
      response = await api.signinbyid(token);
    } else {
      response = await apicookie.signinbyidcookie();
    }
    if (response?.data?.updateduser) {
      dispatch(signInbyId(response.data.updateduser));
    } else {
    }
  } catch (error) {
    console.log('Error', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
  }
};

export const logout = () => async (dispatch) => {
  try {

    let response;
    //why dont have log out without coockie? maybe dont need?
      response = await apicookie.logoutcookie();
    localStorage.removeItem('token');
    dispatch(logOut());
        dispatch(InitialGroup());
    dispatch(InitialBook());
  } catch (error) {
    console.log(' logout Error:', error.message);
  }
};

export const signupstepaction = (step) => async (dispatch) => {
  try {

    dispatch(signUpStep(step));
  } catch (error) {
    console.log(' logout Error:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
  }
};


export const cookieedit = (cookieState) => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');

    if (token) {
      response = await api.cookieedit(cookieState,token);
    } else {
      response = await apicookie.cookieeditcookie(cookieState);
    }
   dispatch(cookieEdit(response.data.updatedcookie));
 
  } catch (error) {
    console.log(' logout Error:', error.message);
  }
};