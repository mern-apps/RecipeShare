import * as api from '../api/api';
import {getAllUsersSearchList} from '../reducers/usersPageSlice'; 
import {getAllUsersFriends} from '../reducers/usersPageSlice'; 
import {approveFriend,removeFriend} from '../reducers/usersPageSlice'; 
import {getAllUsersPending} from '../reducers/usersPageSlice'; 

export const getalluserssearchlistname = (searchValue,token) => async (dispatch) => {
  try {
    const { data } = await api.getalluserssearchlistname(searchValue,token);
    console.log('users:', data);

    dispatch(getAllUsersSearchList(data));
    
  } catch (error) {
    console.log('Error fetching all reciped:', error.message);
  }
};  

export const getalluserssearchlistcode = (searchValue,token) => async (dispatch) => {
  try {
    const { data } = await api.getalluserssearchlistcode(searchValue,token);
    console.log('users:', data);

    dispatch(getAllUsersSearchList(data));

  } catch (error) {
    console.log('Error fetching all reciped:', error.message);
  }
};

export const getallusersfriends = (token) => async (dispatch) => {
  try {
    const { data } = await api.getallusersfriends(token);
    console.log('users:', data);

    dispatch(getAllUsersFriends(data));
    
  } catch (error) {
    console.log('Error fetching all reciped:', error.message);
  }
};  

export const getalluserspending = (token) => async (dispatch) => {
  try {
    const { data } = await api.getalluserspending(token);
    console.log('action pending:', data);

    dispatch(getAllUsersPending(data));

  } catch (error) {
    console.log('Error fetching all reciped:', error.message);
  }
};  

export const addfriend = (friendId,token) => async (dispatch) => {
  try {
    const { data } = await api.addfriend(friendId,token);
    console.log('addfriend:', data);
    //dispatch(addFriend(data));
  } catch (error) {
    console.log('Error fetching all reciped:', error.message);
  }
};

export const approvefriend = (friendId,token) => async (dispatch) => {
  try {
    const { data } = await api.approvefriend(friendId,token);
    console.log('approvefriend:', data);
    dispatch(approveFriend(data));
  } catch (error) {
    console.log('Error fetching all reciped:', error.message);
  }
};

export const removefriend = (friendId,token) => async (dispatch) => {
  try {
    const { data } = await api.removefriend(friendId,token);
    console.log('removefriend:', data);
    dispatch(removeFriend(data));
  } catch (error) {
    console.log('Error fetching all reciped:', error.message);
  }
};
