import { configureStore } from '@reduxjs/toolkit';


import allprojectsreducer from './reducers/books/allprojectsSlice'; 
import currentprojectreducer from './reducers/books/currentprojectSlice'; 

import allgroupsreducer from './reducers/groups/allgroupsSlice'; 
import grouplistreducer from './reducers/groups/groupListSlice'; 

import userreducer from './reducers/userSlice';

import generalreducer from './reducers/generalSlice';

import recipespagereducer from './reducers/RecipesPage/recipesPageSlice'; 
import newrecipepagereducer from './reducers/RecipesPage/newRecipeSlice'; 


const store = configureStore({
  reducer: {

  //Recipes page
  recipespage: recipespagereducer,
  newrecipepage: newrecipepagereducer,

    //all projects
    projects: allprojectsreducer,
    
    //current project
    currentproject: currentprojectreducer,

    //all groups
    groups: allgroupsreducer,
    
     //current group recipes list
     grouppage: grouplistreducer,

    //auth
    auth: userreducer,

        //block
    general: generalreducer,
  },
});

export default store;
