import * as api from '../api';
import {deleteAllRecipes} from '../reducers/projecteditpageSlices/allListSlice';
import {deleteAllProjects} from '../reducers/allprojectsSlice';

export const deleteallrecipes = (token) => async (dispatch) => {
  try {
    const { data } = await api.deleteallrecipes(token); 
    dispatch(deleteAllRecipes());

  } catch (error) {
  }
};

export const deleteallprojects = (token) => async (dispatch) => {
  try {
    const { data } = await api.deleteallprojects(token); 
    dispatch(deleteAllProjects());

  } catch (error) {
  }
};


export const handledeleteAllgroups = (token) => async (dispatch) => {
  try {
    const { data } = await api.handledeleteAllgroups(token); 

  } catch (error) {
  }
};
