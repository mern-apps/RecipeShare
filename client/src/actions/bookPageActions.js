import * as api from '../api/api';
import * as apicookie from '../api/apicookie';

import { logout } from './userActions';

import {getBookPage,setPageMode } from '../reducers/books/currentprojectSlice';
import {getAllRecipesInBook } from '../reducers/books/currentprojectSlice';
import { editBook} from '../reducers/books/currentprojectSlice';
import {editBookAllBooks } from '../reducers/books/allprojectsSlice';

import { addBook,deleteBook} from '../reducers/books/allprojectsSlice';

import { deleteBookFromGroup} from '../reducers/groups/groupListSlice';
import { newFormID } from '../reducers/generalSlice';
import { addBookToGroup } from '../reducers/groups/groupListSlice';


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

export const newformID = (mode) => async (dispatch) => {
  dispatch(newFormID(mode));
  };

    export const currentbookNull = () => async (dispatch) => {
      try {
   
   dispatch(
      getBookPage({
        book: null,
        bookRecipes: null,
        totalcountbookRecipes: null,
      })
    );

      } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
      }
    };


    export const addbookowner = (formData) => async (dispatch) => {
      try {
                     console.log('newproject1:', formData);

        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.addbookowner(formData,token)
        } 
            else {
              response = await apicookie.addbookownercookie(formData)
            }
      const { newproject } = response.data;

     dispatch(addBook(newproject));
  if (newproject.group) {
        dispatch(addBookToGroup(newproject)); 
      }
     return newproject;
             console.log('newproject2:', newproject.group);


        } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
      }
    };
    
export const deletebookowner = (deleteId) => async (dispatch) => {
      try {
        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.deletebookowner(deleteId,token)
        } 
            else {
              response = await apicookie.deletebookownercookie(deleteId)
            }
      const { deletedproject } = response.data;

     dispatch(deleteBook(deleteId));
  if (deletedproject.group) {
        dispatch(deleteBookFromGroup(deleteId)); 
      }

        } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
      }
    };

  export const fetchBookById = (id) => async (dispatch) => {
    try {
      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.fetchBookById(id,token)
      } 
          else {
            response = await apicookie.fetchBookByIdcookie(id)
          }
    
    const { book,bookRecipes,totalcountbookRecipes} = response.data;
    dispatch(getBookPage({book, bookRecipes,totalcountbookRecipes}));
     //reutrn is needed for the component const.
     return book;
    } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };

  export const editbook  = (editData) => async (dispatch) => {
    try {
      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.editbook(editData,token)
      } 
          else {
            response = await apicookie.editbookcookie(editData)
          }
    
    const { updatedBook} = response.data;
    dispatch(editBook({updatedBook}));
    dispatch(editBookAllBooks({updatedBook}));

     //can i remove @reutrn as it needed for add only?.
     return updatedBook;
    } catch (error) { 
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };

    export const backwardpaginationRecipesbookpage = (bookrecipes,countallrecipes) => async (dispatch) => {
      try {
            if (bookrecipes.currentpage > 2 && (bookrecipes.currentpage) * 12 < countallrecipes) {
          console.log('YES forwardwardpaginationGroupsListPage server');
    
        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.backwardpaginationRecipesbookpage(bookrecipes,token)
        } 
            else {
    
              response = await apicookie.backwardpaginationRecipesbookpagecookie(bookrecipes)
            }
                  const { bookRecipes,totalcountbookRecipes} = response.data;
        dispatch(getAllRecipesInBook({bookRecipes,totalcountbookRecipes}));
    }
          console.log('NO forwardwardpaginationGroupsListPage server');
    
      } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
      }
    };
    
    export const forwardwardpaginationRecipesbookpage = (bookrecipes,countallrecipes) => async (dispatch) => {
      try {
        if (bookrecipes.currentpage > 1 && (bookrecipes.currentpage + 1) * 12 < countallrecipes) {
          console.log('YES paginationGroupPage server');
    
        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.forwardwardpaginationRecipesbookpage(bookrecipes,token)
        } 
            else {
    
              response = await apicookie.forwardwardpaginationRecipesbookpagecookie(bookrecipes)
            }
               const { bookRecipes,totalcountbookRecipes} = response.data;
        dispatch(getAllRecipesInBook({bookRecipes,totalcountbookRecipes}));
    
    }
          console.log('NO paginationGroupPage server');
      } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
      }
    };
  
    
        export const getallrecipesbookfilter = (bookrecipes) => async (dispatch) => {
      try {
        let response;
        let token = localStorage.getItem('token');
        if (token) {
          response = await api.getallrecipesbookfilter(bookrecipes,token)
        } 
            else {
              response = await apicookie.getallrecipesbookfiltercookie(bookrecipes)
            }
            const { bookRecipes,totalcountbookRecipes} = response.data;
        dispatch(getAllRecipesInBook({bookRecipes,totalcountbookRecipes}));

        
        } catch (error) {
        console.log('Error adding project:', error.message);
        if (error.response && error.response.status === 401) {
          dispatch(logout());  // Automatically log out on 401 error
        }
      }
    };

