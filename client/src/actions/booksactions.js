import * as api from '../api/api';
import * as apicookie from '../api/apicookie';

import { logout } from './userActions';

import {getAllProjects,countAllProjects } from '../reducers/books/allprojectsSlice';
export const backwardpaginationBooksListPage = (currentpage,countallbooks) => async (dispatch) => {
  try {
        if (currentpage > 2 && (currentpage) * 12 < countallbooks) {
      console.log('YES backwardpaginationBooksListPagecookie server');

    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.backwardpaginationBooksListPage(currentpage,token)
    } 
        else {
                  console.log('getallgroups cookie:');

          response = await apicookie.backwardpaginationBooksListPagecookie(currentpage)
        }
              const { projects,totalcount } = response.data;

 dispatch(getAllProjects(projects));
            dispatch(countAllProjects(totalcount));
}
      console.log('NO backwardpaginationBooksListPagecookie server');

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};

export const forwardwardpaginationBooksListPage = (currentpage,countallbooks) => async (dispatch) => {
  try {
    if (currentpage > 1 && (currentpage + 1) * 12 < countallbooks) {
      console.log('YES forwardwardpaginationBooksListPage server');

    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.forwardwardpaginationBooksListPage(currentpage,token)
    } 
        else {
                  console.log('getallgroups cookie:');

          response = await apicookie.forwardwardpaginationBooksListPagecookie(currentpage)
        }
          const { projects,totalcount } = response.data;

 dispatch(getAllProjects(projects));
            dispatch(countAllProjects(totalcount));
        }
      console.log('NO forwardwardpaginationBooksListPage server');

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};


export const getallbooks = () => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getallbooks(token)
    } 
        else {
          response = await apicookie.getallbookscookie()
        }
    const { projects,totalcount } = response.data;

   dispatch(getAllProjects(projects));
    dispatch(countAllProjects(totalcount));
    console.log('projectsprojectsprojectsprojectsprojects:', projects);

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};