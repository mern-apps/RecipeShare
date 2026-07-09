import * as api from '../api/api';
import * as apicookie from '../api/apicookie';

import { logout } from './userActions';

import {getAllGroupsPage,CountAllGroupsPage } from '../reducers/groups/allgroupsSlice';
import { UpdateEditedGroup,initializeGroup  } from '../reducers/groups/groupListSlice';

import { addRecipeGroup,addBookGroup } from '../reducers/groups/groupListSlice';
import { getAllUsersGroup, getAllBooksGroup, getAllRecipesGroup  } from '../reducers/groups/groupListSlice';

import {countAllRecipes} from '../reducers/RecipesPage/recipesPageSlice'; 
import { modalTask } from '../reducers/groups/groupListSlice';

//groupListSlice=page
import { setPageMode } from '../reducers/groups/groupListSlice';

import { FavoriterecipeAdding, FavoriterecipeRemove  } from '../reducers/groups/groupListSlice';
import {addGroup,deleteGroup,editGroup} from '../reducers/groups/allgroupsSlice';
import { addUserGroup,removeUserGroup } from '../reducers/groups/groupListSlice';

import { getAllBooksInGroup,getAllUsersInGroup,getAllRecipesInGroup } from '../reducers/groups/groupListSlice';
import { getGroupPage } from '../reducers/groups/groupListSlice';
import { groupRecipes,totalcountgroupRecipes } from '../reducers/groups/groupListSlice';

import { getBookPage } from '../reducers/books/currentprojectSlice';


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
    
    const { book, bookRecipes,totalcountbookRecipes} = response.data;
    dispatch(getBookPage({book, bookRecipes,totalcountbookRecipes}));
  
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


  export const fetchGroupById = (id) => async (dispatch) => {
    try {
      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.fetchGroupById(id,token)
      } 
          else {
            response = await apicookie.fetchGroupByIdcookie(id)
          }
    
    const { group, groupUsers, totalcountgroupUsers,groupBooks,totalcountgroupBooks,groupRecipes,totalcountgroupRecipes} = response.data;
    dispatch(getGroupPage({group, groupUsers, totalcountgroupUsers,groupBooks,totalcountgroupBooks,groupRecipes,totalcountgroupRecipes}));
  

     //reutrn is needed for the component const.
     return group;
    } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };

export const backwardpaginationBooksListPage = (groupbooks,countallgroups) => async (dispatch) => {
  try {
        if (groupbooks.currentpage > 2 && (groupbooks.currentpage) * 12 < countallgroups) {
      console.log('YES forwardwardpaginationGroupsListPage server');

    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.backwardpaginationBooksgrouppage(groupbooks,token)
    } 
        else {
                  console.log('getallgroups cookie:');

          response = await apicookie.backwardpaginationBooksgrouppagecookie(groupbooks)
        }
           const { groupBooks,totalcountgroupBooks} = response.data;
    dispatch(getAllBooksInGroup({groupBooks,totalcountgroupBooks}));
}
      console.log('NO forwardwardpaginationGroupsListPage server');

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};

export const forwardwardpaginationBooksListGroupPage = (groupbooks,countallgroups) => async (dispatch) => {
  try {
    if (groupbooks.currentpage > 1 && (groupbooks.currentpage + 1) * 12 < countallgroups) {
      console.log('YES forwardwardpaginationGroupsListPage server');

    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.forwardwardpaginationBooksgrouppage(groupbooks,token)
    } 
        else {
                  console.log('getallgroups cookie:');

          response = await apicookie.forwardwardpaginationBooksgrouppagecookie(groupbooks)
        }
           const { groupBooks,totalcountgroupBooks} = response.data;
    dispatch(getAllBooksInGroup({groupBooks,totalcountgroupBooks}));

}
      console.log('NO forwardwardpaginationGroupsListPage server');

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};


export const backwardpaginationUsersListPage = (groupusers,countallusers) => async (dispatch) => {
  try {
        if (groupusers.currentpage > 2 && (groupusers.currentpage) * 12 < countallusers) {
      console.log('YES forwardwardpaginationGroupsPage server');

    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.backwardpaginationUsersgrouppage(groupusers,token)
    } 
        else {

          response = await apicookie.backwardpaginationUsersgrouppagecookie(groupusers)
        }
           const { groupUsers,totalcountgroupUsers} = response.data;
    dispatch(getAllUsersInGroup({groupUsers,totalcountgroupUsers}));
}
      console.log('NO forwardwardpaginationGroupsPage server');

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};

export const forwardwardpaginationUsersListGroupPage = (groupusers,countallusers) => async (dispatch) => {
  try {
    if (groupusers.currentpage > 1 && (groupusers.currentpage + 1) * 12 < countallusers) {
      console.log('YES forwardwardpaginationGroupsListPage server');

    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.forwardwardpaginationUsersgrouppage(groupusers,token)
    } 
        else {
                  console.log('getallgroups cookie:');

          response = await apicookie.forwardwardpaginationUsersgrouppagecookie(groupusers)
        }
           const { groupUsers,totalcountgroupUsers} = response.data;
    dispatch(getAllUsersInGroup({groupUsers,totalcountgroupUsers}));

}
      console.log('NO forwardwardpaginationGroupsListPage server');

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};



export const backwardpaginationRecipesgrouppage = (grouprecipes,countallrecipes) => async (dispatch) => {
  try {
        if (grouprecipes.currentpage > 2 && (grouprecipes.currentpage) * 12 < countallrecipes) {
      console.log('YES forwardwardpaginationGroupsListPage server');

    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.backwardpaginationRecipesgrouppage(grouprecipes,token)
    } 
        else {

          response = await apicookie.backwardpaginationRecipesgrouppagecookie(grouprecipes)
        }
           const { groupRecipes,totalcountgroupRecipes} = response.data;
    dispatch(getAllRecipesInGroup({groupRecipes,totalcountgroupRecipes}));
}
      console.log('NO forwardwardpaginationGroupsListPage server');

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};

export const forwardwardpaginationRecipesgrouppage = (grouprecipes,countallrecipes) => async (dispatch) => {
  try {
    if (grouprecipes.currentpage > 1 && (grouprecipes.currentpage + 1) * 12 < countallrecipes) {
      console.log('YES paginationGroupPage server');

    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.forwardwardpaginationRecipesgrouppage(grouprecipes,token)
    } 
        else {

          response = await apicookie.forwardwardpaginationRecipesgrouppagecookie(grouprecipes)
        }
           const { groupRecipes,totalcountgroupRecipes} = response.data;
    dispatch(getAllRecipesInGroup({groupRecipes,totalcountgroupRecipes}));

}
      console.log('NO paginationGroupPage server');
  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};




  export const getallrecipesgroupfilter = (grouprecipes) => async (dispatch) => {
    try {
      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.getallrecipesgroupfilter(grouprecipes,token)
      } 
          else {
            response = await apicookie.getallrecipesgroupfiltercookie(grouprecipes)
          }
           const { groupRecipes,totalcountgroupRecipes} = response.data;
    dispatch(getAllRecipesInGroup({groupRecipes,totalcountgroupRecipes}));
    
    } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };
