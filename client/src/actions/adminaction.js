import * as api from '../api/api'; 
import * as apicookie from '../api/apicookie';
import axios from 'axios';


import { blockFind,blockMatch,blockUser,blockGroups,blockHomePage }  from '../reducers/generalSlice';
import { getAllImprovementsAccessibility }  from '../reducers/generalSlice';


import { logout } from './userActions';


export const adminblockdata = (data) => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
      console.log('response admin block client token :', data);

      response = await api.adminblockdata(data,token)
    } 
        else {
          console.log('response admin block client coockie :', data);

          response = await apicookie.adminblockdatacookie(data)
        }

        console.log('response admin block server :', response);

const { groups,find,match,user,homepage } = response.data.blockData; 

dispatch(blockGroups(groups)); 
dispatch(blockFind(find)); 
dispatch(blockMatch(match)); 
dispatch(blockUser(user)); 
dispatch(blockHomePage(homepage)); 

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};


export const getadminblockdata = () => async (dispatch) => {
  try {
    let response;

    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getadminblockdata()
    } 
        else {
          response = await apicookie.getadminblockdatacookie()
        }        
        const { groups,find,match,user,homepage } = response.data.blockData; 
        dispatch(blockGroups(groups)); 
        dispatch(blockFind(find)); 
        dispatch(blockMatch(match)); 
        dispatch(blockUser(user)); 
          dispatch(blockHomePage(homepage));
      

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};



//image code:







export const getAllImprovementsaccessibility = () => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getAllImprovementsaccessibility(token)
    } 
        else {
          response = await apicookie.getAllImprovementsaccessibilitycookie()
        }
        dispatch(getAllImprovementsAccessibility(response.data.improvements)); 

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());
    }
  }
};
