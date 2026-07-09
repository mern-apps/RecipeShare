import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  find: false,
  match: false,
  groups: false,
  user: false,
  homePage: false,
  improvementsAccessibility: [],

  previouspage: "/myrecipes",
newFormID: 1,

  };

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {

     blockFind: (state, action) => {
      state.find = action.payload;    
     },
     blockMatch: (state, action) => {
      state.match = action.payload;    
     },
     blockGroups: (state, action) => {
      state.groups = action.payload;    
     },
     blockUser: (state, action) => {
      state.user = action.payload;    
     },
     blockHomePage: (state, action) => {
      state.homePage = action.payload;    
     },
     
  previousPage: (state, action) => {
          state.previouspage = action.payload;    
          },
 newFormID: (state, action) => {
          state.newFormID = action.payload;    
          },


        getAllImprovementsAccessibility: (state, action) => {
          state.improvementsAccessibility = action.payload;    
          },

    },
 });

export const { blockFind,blockMatch,blockGroups,blockUser,blockHomePage} = generalSlice.actions;
export const {getAllImprovementsAccessibility} = generalSlice.actions;
export const {previousPage} = generalSlice.actions;
export const {newFormID} = generalSlice.actions;

export default generalSlice.reducer;

