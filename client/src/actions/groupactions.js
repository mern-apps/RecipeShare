import * as api from '../api/api';
import * as apicookie from '../api/apicookie';

import { logout } from './userActions';


import {getAllGroups,countAllGroups } from '../reducers/groups/allgroupsSlice';

import { updateGroupInfo  } from '../reducers/groups/groupListSlice';
import { addRecipeToGroup,addBookToGroup } from '../reducers/groups/groupListSlice';
import { removeRecipeFromGroup,removeBookFromGroup } from '../reducers/groups/groupListSlice';

import { getAllRecipesGroup,countAllRecipesGroup  } from '../reducers/groups/groupListSlice';
import { getAllBooksGroup,countAllBooksGroup  } from '../reducers/groups/groupListSlice';
import { getAllUsersGroup,countAllUsersGroup  } from '../reducers/groups/groupListSlice';

import { getGroupPage } from '../reducers/groups/groupListSlice';
import { modalTask } from '../reducers/groups/groupListSlice';

//groupListSlice=page
import { setPageMode } from '../reducers/groups/groupListSlice';

import {addGroup,deleteGroup,removeUserGroupAllList} from '../reducers/groups/allgroupsSlice';
import { addUserGroup,removeUserGroup,deleteCurrentGroup } from '../reducers/groups/groupListSlice';


import { addGrouptoUser,removeGroupfromUser } from '../reducers/userSlice';

export const getallrecipesgroup = (combinedFilters,countallrecipes) => async (dispatch) => {
    try {
if (
  combinedFilters.action === "all" ||
  (
    combinedFilters.action === "back" &&
    combinedFilters.currentpage > 2 &&
    combinedFilters.currentpage * 12 < countallrecipes
  ) ||
  (
    combinedFilters.action === "forward" &&
    combinedFilters.currentpage > 1 &&
    (combinedFilters.currentpage + 1) * 12 < countallrecipes
  )
) {
            let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getallrecipesgroup(combinedFilters,token)
    } 
        else {
         response = await apicookie.getallrecipesgroupcookie(combinedFilters)
        }

    const { recipes,totalcount } = response.data;

    //dispatch(getAllRecipesGroup(recipes));
//dispatch(countAllRecipesGroup(totalcount));
    dispatch(getAllRecipesGroup({recipes, totalcount}));

} 
  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};



export const getallbooksgroup = (combinedFilters,countallrecipes) => async (dispatch) => {
    try {
if (
  combinedFilters.action === "all" ||
  (
    combinedFilters.action === "back" &&
    combinedFilters.currentpage > 2 &&
    combinedFilters.currentpage * 12 < countallrecipes
  ) ||
  (
    combinedFilters.action === "forward" &&
    combinedFilters.currentpage > 1 &&
    (combinedFilters.currentpage + 1) * 12 < countallrecipes
  )
) {
            let response;
    let token = localStorage.getItem('token');
    if (token) {
      //response = await api.getallbooksgroup(combinedFilters,token)
    } 
        else {
         // response = await apicookie.getallbooksgroupcookie(combinedFilters)
        }

    //const { books,totalcount } = response.data;

    //dispatch(getAllBooksGroup(books));
//dispatch(countAllBooksGroup(totalcount));
    //dispatch(getAllBooksGroup({books, totalcount}));

} 
  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};

export const getallusersgroup = (combinedFilters,countallrecipes) => async (dispatch) => {
    try {
if (
  combinedFilters.action === "all" ||
  (
    combinedFilters.action === "back" &&
    combinedFilters.currentpage > 2 &&
    combinedFilters.currentpage * 12 < countallrecipes
  ) ||
  (
    combinedFilters.action === "forward" &&
    combinedFilters.currentpage > 1 &&
    (combinedFilters.currentpage + 1) * 12 < countallrecipes
  )
) {
            let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getallusersgroup(combinedFilters,token)
    } 
        else {
         response = await apicookie.getallusersgroupcookie(combinedFilters)
        }

    const { users,totalcount } = response.data;

    //dispatch(getAllUsersGroup(users));
//dispatch(countAllUsersGroup(totalcount));
    dispatch(getAllUsersGroup({users, totalcount}));

} 
  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};

  export const addrecipetogroup = (data) => async (dispatch) => {
    try {
      let response;
      let token = localStorage.getItem('token');

       const apiPayload = {
      recipeId: data.chosenRecipe?._id,
      groupId: data.groupId,
    };

      if (token) {
        response = await api.addrecipetogroup(apiPayload,token)
      } 
          else {
            response = await apicookie.addrecipetogroupcookie(apiPayload)
          }
        dispatch(addRecipeToGroup(data.chosenRecipe));
      } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };


export const addbooktogroup = (data) => async (dispatch) => {
    try {
      let response;
      let token = localStorage.getItem('token');

       const apiPayload = {
      bookId: data.chosenBook?._id,
      groupId: data.groupId,
    };

      if (token) {
        response = await api.addbooktogroup(apiPayload,token)
      } 
          else {
            response = await apicookie.addbooktogroupcookie(apiPayload)
          }
        dispatch(addBookToGroup(data.chosenBook));
      } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      }
    }
  };

  export const getoutfromgroup = (id) => async (dispatch) => {
    try {
      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.getoutfromgroup(id,token)
      } 
          else {
            response = await apicookie.getoutfromgroupcookie(id)
          }
    const { userIdToDelete } = response.data;
       dispatch(removeUserGroup(userIdToDelete));
      dispatch(removeUserGroupAllList(id));
       dispatch(removeGroupfromUser(id));

      } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };


  
  export const removerecipefromgroup = (apiPayload) => async (dispatch) => {
    try {

      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.removerecipefromgroup(apiPayload,token)
      } 
          else {
            response = await apicookie.removerecipefromgroupcookie(apiPayload)
          }
       dispatch(removeRecipeFromGroup(apiPayload.recipeId));
      } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };
    export const removebookfromgroup = (apiPayload) => async (dispatch) => {
    try {
  
      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.removebookfromgroup(apiPayload,token)
      } 
          else {
            response = await apicookie.removebookfromgroupcookie(apiPayload)
          }
       dispatch(removeBookFromGroup(apiPayload.bookId));
      } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };


export const deletegroupowner = (id) => async (dispatch) => {
    try {
      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.deletegroupowner(id,token)
      } 
          else {
            response = await apicookie.deletegroupownercookie(id)
          }
       dispatch(deleteGroup(id));
       dispatch(removeGroupfromUser(id));
        dispatch(deleteCurrentGroup(id));

      } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };


export const jointogroup = (id) => async (dispatch) => {
    try {
      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.jointogroup(id,token)
      } 
          else {
            response = await apicookie.jointogroupcookie(id)
          }
    const { user,group } = response.data;
       dispatch(addUserGroup(user));
              dispatch(addGroup(group));
       dispatch(addGrouptoUser(id));

      } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };





export const removeuserfromgroup = (itemid, id, token) => async (dispatch) => {

  try {
    //const {data} = await api.removeuserfromgroup(itemid,id, token);

    //dispatch(removeUserFromGroup(data._id));

  } catch (error) {
    console.log('Error adding recipe:', error.message);
  }
};


//new config.
export const getallgroups = () => async (dispatch) => {
  try {
    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.getallgroups(token)
    } 
        else {
          response = await apicookie.getallgroupscookie()
        }
    const { groups,totalcount } = response.data;

    dispatch(getAllGroups(groups));
    dispatch(countAllGroups(totalcount));

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};


export const backwardpaginationGroupsListPage = (currentpage,countallgroups) => async (dispatch) => {
  try {
        if (currentpage > 2 && (currentpage) * 12 < countallgroups) {
      console.log('YES forwardwardpaginationGroupsListPage server');

    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.backwardpaginationGroupsListPage(currentpage,token)
    } 
        else {
                  console.log('getallgroups cookie:');

          response = await apicookie.backwardpaginationGroupsListPagecookie(currentpage)
        }
          const { groups,totalcount } = response.data;

 dispatch(getAllGroups(groups));
            dispatch(countAllGroups(totalcount));
          }
      console.log('NO forwardwardpaginationGroupsListPage server');

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};

export const forwardwardpaginationGroupsListPage = (currentpage,countallgroups) => async (dispatch) => {
  try {
    if (currentpage > 1 && (currentpage + 1) * 12 < countallgroups) {
      console.log('YES forwardwardpaginationGroupsListPage server');

    let response;
    let token = localStorage.getItem('token');
    if (token) {
      response = await api.forwardwardpaginationGroupsListPage(currentpage,token)
    } 
        else {
                  console.log('getallgroups cookie:');

          response = await apicookie.forwardwardpaginationGroupsListPagecookie(currentpage)
        }
          const { groups,totalcount } = response.data;

 dispatch(getAllGroups(groups));
            dispatch(countAllGroups(totalcount));

}
      console.log('NO forwardwardpaginationGroupsListPage server');

  } catch (error) {
    console.log('Error adding project:', error.message);
    if (error.response && error.response.status === 401) {
      dispatch(logout());  // Automatically log out on 401 error
    }
  }
};

  export const currentGroupNull = () => async (dispatch) => {
    try {
        dispatch(
      getGroupPage({
        group: null,
        groupUsers: null,
        totalcountgroupUsers: null,
        groupBooks: null,
        totalcountgroupBooks: null,
        groupRecipes: null,
        totalcountgroupRecipes: null,
      })
    );
  
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

  

  export const addgroupowner = (formData2) => async (dispatch) => {
    try {
            console.log('START GROUP NEW:');

      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.addgroupowner(formData2,token)
      } 
          else {
            response = await apicookie.addgroupownercookie(formData2)
          }
    const { newgroup } = response.data;
       dispatch(addGroup(newgroup));
             console.log('newgroupnewgroupnewgroupnewgroupnewgroup:', newgroup);

      return newgroup;

      } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };

    export const editgroup = (editData2) => async (dispatch) => {
    try {
      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.editgroup(editData2,token)
      } 
          else {
            response = await apicookie.editgroupcookie(editData2)
          }
    const { group } = response.data;
       //dispatch(updateGroupInfo(group));
           dispatch(updateGroupInfo({group}));

      } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };









export const getoutfromgroupadmin = (idData) => async (dispatch) => {
    try {
      let response;
      let token = localStorage.getItem('token');
      if (token) {
        response = await api.getoutfromgroupadmin(idData,token)
      } 
          else {
            response = await apicookie.getoutfromgroupadmincookie(idData)
          }
    const { userIdToDelete } = response.data;
       dispatch(removeUserGroup(userIdToDelete));
      } catch (error) {
      console.log('Error adding project:', error.message);
      if (error.response && error.response.status === 401) {
        dispatch(logout());  // Automatically log out on 401 error
      }
    }
  };

