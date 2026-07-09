import * as api from '../api/api'; 
import * as apicookie from '../api/apicookie';

import {saveProfileData} from '../reducers/userSlice';
import { logout } from './userActions';

 
  export const saveprofiledata = (profileData) => async (dispatch) => {
    try {
            console.log('profileData', profileData);

          let response;
            let token = localStorage.getItem('token');
            if (token) {
              response = await api.saveprofiledata(profileData,token); 
            } 
                else {
                  response = await apicookie.saveprofiledatacookie(profileData); 
                }
      
   const { updatedUser } = response.data;

        dispatch(saveProfileData(updatedUser));

    } catch (error) {
  
      console.log('Error', error.message);
          if (error.response && error.response.status === 401) {
            dispatch(logout());  // Automatically log out on 401 error
          }
    }
  };

  