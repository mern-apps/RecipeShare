import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pendingimageapi: 0,
    pendingimageai: 0,
  currenteditrecipe: null,
 pagemode: "view",
 unsplashimagesarray: [],
  replicateaiimage: null,
  previouspage: "/myrecipes",
};

const newRecipeSlice = createSlice({
  name: 'newrecipepage',
  initialState,
  reducers: {
   
      setPendingAPI: (state, action) => {
      state.pendingimageapi = action.payload;
    },

    setPendingAI: (state, action) => {
      state.pendingimageai = action.payload;
    },
      
     unsplashImagesArray: (state, action) => {
        state.unsplashimagesarray = action.payload;
      },

 aIImage: (state, action) => {
        state.replicateaiimage = action.payload;
      },

       RecipeById: (state, action) => {
        state.currenteditrecipe = action.payload;
      },

       setPageMode: (state, action) => {
      state.pagemode = action.payload;
    },

   // initiateAllRecipes : (state, action) => {
     // state.allrecipes = [];
     // state.allrecipesfavorite = [];
   // },
  },
});

export const { setPendingAPI,setPendingAI} = newRecipeSlice.actions;
export const { unsplashImagesArray, aIImage} = newRecipeSlice.actions;
export const { RecipeById} = newRecipeSlice.actions;
export const { setPageMode} = newRecipeSlice.actions;

export default newRecipeSlice.reducer;
