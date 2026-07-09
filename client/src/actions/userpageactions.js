import * as api from '../api/api'; 
import * as apicookie from '../api/apicookie';

import { getUserPagebyId} from '../reducers/userSlice';
import { DeleteFromMongoUrl} from '../reducers/userSlice';
import {saveProfileData} from '../reducers/userSlice';

import { logout } from './userActions';

  
export const getuserpagebyid = (id) => async (dispatch) => {
  
    try {
      let response;
      response = await api.getuserpagebyid(id); 

           // let response;
           // let token = localStorage.getItem('token');
          //  if (token) {
              //response = await api.getuserpagebyid(id,token); 
        //    } 
               // else {
                //  console.log('try', id);
                //  response = await apicookie.getuserpagebyidcookie(id); 
                //}
                const { user } = response.data;
            dispatch(getUserPagebyId(user));
    } catch (error) {
      console.log('Error', error.message);
          if (error.response && error.response.status === 401) {
            dispatch(logout());  // Automatically log out on 401 error
          }
    }
  };

  export const approveuserbyid = (id) => async (dispatch) => {
    try {
      //code explaintion diffrent between response:
      //const response  = await api.approveuserbyid(id); 
      //console.log('User approved successfully:', response.data.message);
      
      const { data } = await api.approveuserbyid(id); // Capture the response
      console.log('User approved successfully:', data.message); // Log the message (optional)
    } catch (error) {
      console.log('Error', error.message);
          if (error.response && error.response.status === 401) {
            dispatch(logout());  // Automatically log out on 401 error
          }
    }
  };

  export const rejectuserbyid = (id) => async (dispatch) => {

    try {
      await api.rejectuserbyid(id);
    } catch (error) {
      console.log('Error', error.message);
          if (error.response && error.response.status === 401) {
            dispatch(logout());  // Automatically log out on 401 error
          }
    }
  };



    export const saveprofiledata = (profileData) => async (dispatch) => {
      try {

        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.saveprofiledata(profileData,token);
        } 
            else {
              response = await apicookie.saveprofiledatacookie(profileData); 
            }
            const { updateduser } = response.data;

          dispatch(saveProfileData(updateduser));
  
      } catch (error) {
    
        console.log('Error', error.message);
            if (error.response && error.response.status === 401) {
              dispatch(logout());  // Automatically log out on 401 error
            }
      }
    };
  

    export const deleteFromAmazon = (urlToDelete) => async (dispatch) => {
      try {
  //dont forget cookie
       // const response = await api.deleteFromAmazon(urlToDelete,token);
 
      } catch (error) {
    
        console.log('Error', error.message);
            if (error.response && error.response.status === 401) {
              dispatch(logout());  // Automatically log out on 401 error
            }
      }
    };
    
    export const deleteFromMongoUrl = (urlToDelete) => async (dispatch) => {
      try {

        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.deleteFromMongoUrl(urlToDelete,token);
        } 
            else {
              response = await apicookie.deleteFromMongoUrlcookie(urlToDelete); 
            }
            const { images } = response.data;

        dispatch(DeleteFromMongoUrl(images));
  
      } catch (error) {
    
        console.log('Error', error.message);
            if (error.response && error.response.status === 401) {
              dispatch(logout());  // Automatically log out on 401 error
            }
      }
    };



  