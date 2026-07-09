import * as api from '../api/api';
import * as apicookie from '../api/apicookie';
import { logout } from './userActions';


import {addRecipeList } from '../reducers/RecipesPage/recipesPageSlice';
import {addRecipeList1 } from '../reducers/books/currentprojectSlice';

import {editRecipeList } from '../reducers/RecipesPage/recipesPageSlice';
import {editRecipeList1 } from '../reducers/books/currentprojectSlice';
import {editRecipeList2 } from '../reducers/groups/groupListSlice';


//
import { setPendingAPI,setPendingAI } from '../reducers/RecipesPage/newRecipeSlice';
import { unsplashImagesArray,aIImage } from '../reducers/RecipesPage/newRecipeSlice';
import { RecipeById } from '../reducers/RecipesPage/newRecipeSlice';
import { setPageMode } from '../reducers/RecipesPage/newRecipeSlice';

import { previousPage } from '../reducers/generalSlice';
import { newFormID } from '../reducers/generalSlice';

import { userCredits } from '../reducers/userSlice';

export const initializetask = () => async (dispatch) => {  
  try {

  } catch (error) {
    console.log('Error adding recipe:', error.message);
  }
};


//NEW
export const generateRecipePrompt = (imagedata,selectedOption) => async (dispatch) => {
  try {
      dispatch(setPendingAPI(1));
      dispatch(setPendingAI(1));
  
    let response;
    let token = localStorage.getItem('token');
    if (token) {
          console.log('generateRecipePrompt', imagedata);

      response = await api.generateRecipePrompt(imagedata,token)
    } 
        else {
              console.log('generateRecipePromptcookie', imagedata);

          response = await apicookie.generateRecipePromptcookie(imagedata)
        }
  
        console.log('generateRecipePrompt:', response.data);
   const { creditImage, shortRecipeName, imagePrompt } = response.data;
 dispatch(userCredits(creditImage));
     return { imagePrompt, shortRecipeName };
    } catch (error) {
          dispatch(setPendingAPI(0));
      dispatch(setPendingAI(0));
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout()); 
    }
    return null;
  }
};

export const resetPending = () => async (dispatch) => {
  try {
      dispatch(setPendingAI(0));
        } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout()); 
    }
  }
};

export const fetchUnsplash = (shortRecipeName) => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.unsplashImages(shortRecipeName,token)
    } 
        else {
          response = await apicookie.unsplashImagescookie(shortRecipeName)
        }
  
      const {firstNineImages, creditImage } = response.data;
 dispatch(userCredits(creditImage));
 dispatch(unsplashImagesArray(firstNineImages));
     dispatch(setPendingAPI(0));
     return { creditImage, firstNineImages };
    } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout()); 
    }
    return null;
  }
};

export const apiAIImage = (imagePrompt) => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.apiAIImage(imagePrompt,token)
    } 
        else {
          response = await apicookie.apiAIImagecookie(imagePrompt)
        }
  
      const {imageAI, creditImage } = response.data;
 dispatch(userCredits(creditImage));
 dispatch(aIImage(imageAI));
     dispatch(setPendingAI(0));
     return imageAI ;
    } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout()); 
    }
    return null;
  }
};


export const addnewrecipeAdmin = (formData) => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.addnewrecipeAdmin(formData,token)
    } 
        else {
          response = await apicookie.addnewrecipeAdmincookie(formData)
        }
        const {recipe} = response.data;
   //reutrn is needed for the component const.
   return recipe;
  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};

export const addnewrecipe = (formData) => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.addnewrecipe(formData,token)
    } 
        else {
          response = await apicookie.addnewrecipecookie(formData)
        }
  
        const {recipe} = response.data;
            console.log('recipe1111111111111', recipe);
   dispatch(addRecipeList(recipe));
   dispatch(addRecipeList1(recipe));

   //reutrn is needed for the component const.
   return recipe;
  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};


export const editrecipe = (editData) => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.editrecipe(editData,token)
    } 
        else {
          response = await apicookie.editrecipecookie(editData)
        }
  
        const {recipe} = response.data;
            console.log('recipe:', recipe);
   dispatch(editRecipeList(recipe));
   dispatch(editRecipeList1(recipe));
   dispatch(editRecipeList2(recipe));
   //reutrn is needed for the component const.
   return recipe;
  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};


export const fetchRecipeById = (id) => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.fetchRecipeById(id,token)
    } 
        else {
          response = await apicookie.fetchRecipeByIdcookie(id)
        }
  
        const {recipe} = response.data;
   dispatch(RecipeById(recipe));

   //reutrn is needed for the component const.
   return recipe;
  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};

export const setpagemode = mode => async (dispatch) => {
  try {
dispatch(setPageMode(mode));
  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};


export const currentrecipe = (task) => async (dispatch) => {
  try {

   dispatch(RecipeById(task));

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};

export const previouspage = (route) => (dispatch) => {
  dispatch(previousPage(route));
};

  export const newformID = (mode) => async (dispatch) => {
  dispatch(newFormID(mode));
  };