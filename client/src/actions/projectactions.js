import * as api from '../api/api';
import * as apicookie from '../api/apicookie';
import { logout } from './userActions';

import {getAllProjects,countAllProjects,getAllProjectsFromgroups,countAllProjectsFromgroups  } from '../reducers/books/allprojectsSlice';

import { UpdateEditedProject } from '../reducers/books/currentprojectSlice';

import {countAllRecipes} from '../reducers/RecipesPage/recipesPageSlice'; 
import { addBookGroup } from '../reducers/groups/groupListSlice';
//

//groupListSlice=page
import { bookById } from '../reducers/books/currentprojectSlice';
import { setPageMode } from '../reducers/books/currentprojectSlice';
import { initializeProject } from '../reducers/books/currentprojectSlice';

import {FavoriteBookAdding,FavoriteBookRemove} from '../reducers/userSlice';

import { addUserGroup,removeUserGroup } from '../reducers/books/currentprojectSlice';
import { addProject,deleteProject} from '../reducers/books/allprojectsSlice';



export const sendbackwardpaginationaction = (currentpagination,currentpage,countallrecipes,token) => async (dispatch) => {
  try {
    //dispatch(currentClientPagination(currentpagination-1001));

    if (currentpage > 2 && (currentpage) * 12 < countallrecipes) {
          const {data} = await api.sendbackwardpaginationactionprojects(currentpage,token);
          console.log('recipes:', data);
        //  dispatch(currentClientPagination(currentpagination-1));//still number 2, but dencrease page
          dispatch(getAllProjects(data));
        } 
  } catch (error) {

    console.log('Error', error.message);
  }
};

  
export const sendforwardpaginationaction = (currentpagination,currentpage,countallrecipes,token) => async (dispatch) => {

  try {
    //dispatch(currentClientPagination(currentpagination+1001));

    if (currentpage > 1 && (currentpage + 1) * 12 < countallrecipes) {
      console.log('yes for server');
      //console.log('currentpagination2222222:', currentpagination+1001);
          //dispatch(currentClientPagination(currentpagination+1001));
          //console.log('currentpagination2222222:', currentpagination+1001);
          const {data} = await api.sendforwardpaginationactionprojects(currentpage,token);
          //dispatch(currentClientPagination(currentpagination+1));//still number 2, but increase page
          dispatch(getAllProjects(data));
        } 
  } catch (error) {
    console.log('Error', error.message);
  }
};

//new config.

export const getallprojectsfromgroups = () => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getallprojectsfromgroups(token)
    } 
        else {
                  console.log('getallgroups cookie:');

          response = await apicookie.getallprojectsfromgroupscookie()
        }
    const { projects,totalcount } = response.data;

   dispatch(getAllProjectsFromgroups(projects));
    dispatch(countAllProjectsFromgroups(totalcount));

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};


///


 

  



export const deletebookowner = (id) => async (dispatch) => {
    try {
      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.deletebookowner(id,token)
      } 
          else {
            response = await apicookie.deletebookownercookie(id)
          }
    const { deletedProjectID } = response.data;
           dispatch(deleteProject(deletedProjectID));
      } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };


export const addtofavoritebook = (projectID) => async (dispatch) => {
    try {
           let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.addtofavoritebook(projectID,token)
    } 
        else {
          response = await apicookie.addtofavoritebookcookie(projectID)
        }

      const { bookID} = response.data;
         dispatch(FavoriteBookAdding(bookID));


    } catch (error) {
      console.log('Error fetching all reciped:', error.message);
    }
  };

    export const removefavoritebook = (projectID) => async (dispatch) => {
    try {
           let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.removefavoritebook(projectID,token)
    } 
        else {
          response = await apicookie.removefavoritebookcookie(projectID)
        }
      const { bookID} = response.data;
         dispatch(FavoriteBookRemove(bookID));
    } catch (error) {
      console.log('Error fetching all reciped:', error.message);
    }
  };

  export const initializebook = () => async (dispatch) => {  
  try {
    dispatch(initializeProject());

  } catch (error) {
    console.log('Error adding recipe:', error.message);
  }
};

