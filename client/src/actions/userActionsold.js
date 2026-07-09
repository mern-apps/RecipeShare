import * as api from '../api'; // Import the user API functions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTokenCookie } from '../utils/cookieUtils'; // Import the utility function
import {logOut} from '../reducers/userSlice';


export const signup = createAsyncThunk(
  'auth/signup',
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
     const response = await api.signupuserapi({ firstName, lastName, email, password });

      // Save token in a cookie
      const token = response.data.token;
      setTokenCookie(token);

      console.log('Signup response data:', response.data); // Log the response data

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const signin = createAsyncThunk(
  'auth/signin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
     const response = await api.signinuserapi({email, password });

      // Save token in a cookie
      const token = response.data.token;
      setTokenCookie(token);
      
      console.log('signin response data:', response.data); // Log the response data

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = () => async (dispatch) => {
  try {
    console.log('logout');
    dispatch(logOut());
  } catch (error) {
    console.log(' logout Error:', error.message);
  }
};