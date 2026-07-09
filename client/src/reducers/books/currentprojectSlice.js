import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentproject: null,
  currentrecipetype2: {},
 pagemode: "view",
 imagestemplates:[
  "https://mern-apps.s3.eu-north-1.amazonaws.com/groups/1770095266592/7a886d30-a6c1-4b1b-bcd9-cc42fbfc25ea.png",
  "https://mern-apps.s3.eu-north-1.amazonaws.com/books/1770095664029/52c5263b-f293-4205-94fc-02325097ec92.png",
  "https://mern-apps.s3.eu-north-1.amazonaws.com/books/1770227068432/114ccc02-b0ca-4f5a-9cfa-a8bf9d430683.png",
  "https://mern-apps.s3.eu-north-1.amazonaws.com/books/1770227542645/37f7340a-0629-42b2-ad52-bbad66bedecb.png",
  "https://mern-apps.s3.eu-north-1.amazonaws.com/books/1770095586831/951fe00d-04ba-4e7a-bbed-f27cbce46106.png",

],

editBookrecipesSection: {
  bookId: null,
  bookObject: null,
  bookTitle: null,
     bookallrecipes: [],
  bookcountallrecipes: 0,
  groupId: null,
  groupObject: null,
  groupTitle: null,
     groupallrecipes: [],
  groupcountallrecipes: 0,
   allrecipes: [],
  countallrecipes: 0,
},

editBookDNDSection: {
  recipe2: {},
  pagemode2: "new",
},

  //check if the recived form of the project it recive objects with no array (like recipe..)
  //currentprojectedit: [],
};

const currentprojectSlice = createSlice({
  name: 'currentproject',
  initialState,
  reducers: {

          getBookPage: (state, action) => {
 const { book, bookRecipes, totalcountbookRecipes } = action.payload;
      state.currentproject = book;
      state.recipeslist = bookRecipes;
      state.countallrecipes = totalcountbookRecipes;
      },
     
  updateBookInfo: (state, action) => {
        state.currentproject = action.payload.group;
      },

  getAllRecipesInBook: (state,action) => {
        state.recipeslist = action.payload.bookRecipes;
        state.countallrecipes = action.payload.totalcountbookRecipes;
      },
 setPageMode: (state, action) => {
      state.pagemode = action.payload;
    },

    setPageMode2: (state, action) => {
  state.editBookDNDSection.pagemode2 = action.payload;
},
   
    initializeTask: (state) => {
        state.currentproject = initialState.currentproject;
      },
      InitialBook: (state) => {
        state.currentproject = initialState.currentproject;
      },

      editCurrentProjectEdit: (state, action) => {
        state.currentproject = action.payload;
      },

      UpdateEditedProject: (state, action) => {
        state.currentproject = action.payload;
      },
   
      initializeProject: (state) => {
        state.currentproject = initialState.currentproject;
      },

      getRecipeType2: (state, action) => {
        state.currentrecipetype2 = action.payload;
      },
      
      initializeRecipeType2: (state) => {
        state.currentrecipetype2 = initialState.currentrecipetype2;
      },


        addRecipeFromList: (state, action) => {
  const { newrecipebook } = action.payload;
  if (!state.currentproject || !state.currentproject.recipes) return;
  state.currentproject.recipes.splice(1, 0, newrecipebook);
},


 removeRecipeFromBook: (state, action) => {
  const { taskID } = action.payload;
  if (!state.currentproject?.recipes) return;
  state.currentproject.recipes =
    state.currentproject.recipes.filter(
      recipe => recipe._id !== taskID
    );
},


      editBook: (state, action) => {
      const { updatedBook } = action.payload;
         console.log("after updatedBook:", updatedBook.image);
           console.log("Before update:", state.currentproject.image);
      if (!updatedBook) return;
  state.currentproject = updatedBook;
    },

addRecipe2: (state, action) => {
  const newrecipe2 = action.payload;
  if (!state.currentproject || !state.currentproject.recipes) return;
  state.currentproject.recipes.splice(1, 0, newrecipe2);
    state.editBookDNDSection.recipe2 = {};

},

updateRecipe2: (state, action) => {
  const newrecipe2 = action.payload;
  if (!state.currentproject || !state.currentproject.recipes) return;
  const index = state.currentproject.recipes.findIndex(
    (r) => r._id === newrecipe2._id
  );
  if (index !== -1) {
    state.currentproject.recipes[index] = newrecipe2;
  }
    state.editBookDNDSection.recipe2 = {};

},

 setRecipe2: (state, action) => {
  state.editBookDNDSection.recipe2 = action.payload;
},

DnD: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.currentproject.recipes.splice(sourceIndex, 1);
      state.currentproject.recipes.splice(destinationIndex, 0, removed);
    },

   EditBookRecipeSectionBookID: (state, action) => {
    state.editBookrecipesSection.bookId = action.payload;

},
 EditBookRecipeSectionGroupID: (state, action) => {
    state.editBookrecipesSection.groupId = action.payload;
},

  bookEditRecipesBook: (state, action) => {
  const { book, bookRecipes, totalcountbookRecipes } = action.payload;
    state.editBookrecipesSection.bookObject = book;
        state.editBookrecipesSection.bookTitle = book.title;
  state.editBookrecipesSection.bookallrecipes = bookRecipes;
  state.editBookrecipesSection.bookcountallrecipes = totalcountbookRecipes;


},
bookEditRecipesGroup: (state, action) => {
  const { group, groupRecipes, totalcountgroupRecipes } = action.payload;
      state.editBookrecipesSection.groupObject = group;
        state.editBookrecipesSection.groupTitle = group.title;
  state.editBookrecipesSection.groupallrecipes = groupRecipes;
  state.editBookrecipesSection.groupcountallrecipes = totalcountgroupRecipes;
}, 

      bookEditRecipes: (state, action) => {
    const { recipes, totalcount } = action.payload;
  state.editBookrecipesSection.allrecipes = recipes;
  state.editBookrecipesSection.countallrecipes = totalcount;
},


   bookEditInitial: (state, action) => {
  state.editBookrecipesSection.bookId = null;
  state.editBookrecipesSection.bookObject = null;
  state.editBookrecipesSection.bookTitle = null;
    state.editBookrecipesSection.bookallrecipes = null;
        state.editBookrecipesSection.bookcountallrecipes = 0;
  state.editBookrecipesSection.groupId = null;
  state.editBookrecipesSection.groupObject = null;
  state.editBookrecipesSection.groupTitle = null;
    state.editBookrecipesSection.groupallrecipes = null;
        state.editBookrecipesSection.groupcountallrecipes = 0;

},


CopiedRecipe2: (state, action) => {
  const { newrecipe, item } = action.payload;

  if (!newrecipe?._id) return;

  const section = state.editBookrecipesSection;
  if (!section || !Array.isArray(section.allrecipes)) return;

  const index = section.allrecipes.findIndex(
    (item) =>
      item._id.toString() === item?._id?.toString()
  );

  // replace if previous exists
  if (index !== -1) {
    section.allrecipes[index] = newrecipe;
  } else {
    // otherwise push new and increase count
    section.allrecipes.push(newrecipe);
    section.countallrecipes += 1;
  }
},


  


addRecipeList1: (state, action) => {
  const item = action.payload;
  if (!item || !item._id) return;
 const exists = state.editBookrecipesSection.allrecipes.some(
    recipe => recipe._id.toString() === item._id.toString()
  );
 if (!exists) {
    state.editBookrecipesSection.allrecipes = [
      ...state.editBookrecipesSection.allrecipes,
      item
    ];
    state.editBookrecipesSection.countallrecipes += 1;
  }
},

editRecipeList1: (state, action) => {
  const recipe = action.payload;

  if (!recipe?._id) return;

  const recipeId = recipe._id.toString();

  const replaceIfExists = (array) => {
    if (!Array.isArray(array)) return;

    const index = array.findIndex(
      (item) => item._id?.toString() === recipeId
    );

    if (index !== -1) {
      array[index] = recipe;
    }
  };

  // -------- editBookrecipesSection --------
  const section = state.editBookrecipesSection;

  if (section) {
    replaceIfExists(section.bookallrecipes);
    replaceIfExists(section.groupallrecipes);
    replaceIfExists(section.allrecipes);
  }

  // -------- currentproject.recipes --------
  if (state.currentproject?.recipes) {
    replaceIfExists(state.currentproject.recipes);
  }
},

   // Add more reducers for task actions (update, delete, etc.)
  }, 

});

export const {editCurrentProjectEdit,initializeProject,UpdateEditedProject} = currentprojectSlice.actions;
export const {getBookPage,getAllRecipesInBook,updateBookInfo} = currentprojectSlice.actions;
export const {bookEditRecipesBook,bookEditRecipesGroup,bookEditRecipes,bookEditInitial} = currentprojectSlice.actions;

export const {getRecipeType2,initializeRecipeType2} = currentprojectSlice.actions;
export const {setPageMode} = currentprojectSlice.actions;



export const {initializeTask} = currentprojectSlice.actions;
export const {InitialBook} = currentprojectSlice.actions;

export const {addRecipeFromList} = currentprojectSlice.actions;
export const {EditBookRecipeSectionBookID,EditBookRecipeSectionGroupID} = currentprojectSlice.actions;

export const {editBook,addRecipe2,updateRecipe2,setRecipe2} = currentprojectSlice.actions;
export const {setPageMode2} = currentprojectSlice.actions;
export const {DnD,removeRecipeFromBook} = currentprojectSlice.actions;

  export const {CopiedRecipe2} = currentprojectSlice.actions;
  export const {editRecipeList1} = currentprojectSlice.actions;
  export const {addRecipeList1} = currentprojectSlice.actions;



export default currentprojectSlice.reducer;