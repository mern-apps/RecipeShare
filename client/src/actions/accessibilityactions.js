import * as api from '../api/api'; 
import * as apicookie from '../api/apicookie';

import { updateAccessibility } from '../reducers/userSlice';
import { updateAccessibilitynouser } from '../reducers/userSlice';

import { logout } from './userActions';

export const updateaccessibility = (formAccessibilityData) => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.updateaccessibility(formAccessibilityData,token);
      } 
        else {
      response = await apicookie.updateaccessibilitycookie(formAccessibilityData);
     }
const { accessibility } = response.data;
dispatch(updateAccessibility(accessibility)); 
    console.log('Server response:', accessibility); 
  } catch (error) {
    console.log('Error adding project:', error.message);
    dispatch(updateAccessibilitynouser(formAccessibilityData)); 

    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};


export const improvementaccessibility = (formData) => async (dispatch) => {
  try {
    await api.improvementaccessibility(formData);
  } catch (error) {
    console.error('Improvement submission failed:', error);
  }
};