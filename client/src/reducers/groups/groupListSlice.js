import { createSlice } from '@reduxjs/toolkit';

const initialState = {

   pagemode: "view",
  previouspage: "/myrecipes",
  currentgroup: null, 
 imagestemplates:[
  "https://mern-apps.s3.eu-north-1.amazonaws.com/groups/1770095266592/7a886d30-a6c1-4b1b-bcd9-cc42fbfc25ea.png",
  "https://mern-apps.s3.eu-north-1.amazonaws.com/books/1770095664029/52c5263b-f293-4205-94fc-02325097ec92.png",
  "https://mern-apps.s3.eu-north-1.amazonaws.com/books/1770227068432/114ccc02-b0ca-4f5a-9cfa-a8bf9d430683.png",
  "https://mern-apps.s3.eu-north-1.amazonaws.com/books/1770095586831/951fe00d-04ba-4e7a-bbed-f27cbce46106.png",
    "https://mern-apps.s3.eu-north-1.amazonaws.com/books/1770227542645/37f7340a-0629-42b2-ad52-bbad66bedecb.png",
],
  //modaltask: {}, 
  //users
  userslist: [], 
  countallusers: 0,

   //booksgroup
   bookslist: [], 
   countallbooks: 0,

     //allrecipesgroup
  allrecipesgroup: [],
  countallrecipesgroup: 0,

};


const grouppageSlice = createSlice({
  name: 'grouppage',
  initialState,
  reducers: {
  //CurrentGroup
      getGroupPage: (state, action) => {
        state.currentgroup = action.payload.group;
        state.userslist = action.payload.groupUsers;
        state.countallusers = action.payload.totalcountgroupUsers;
        state.bookslist = action.payload.groupBooks;
        state.countallbooks = action.payload.totalcountgroupBooks;
        state.allrecipesgroup = action.payload.groupRecipes;
        state.countallrecipesgroup = action.payload.totalcountgroupRecipes;
      },
  updateGroupInfo: (state, action) => {
        state.currentgroup = action.payload.group;
      },

      
          getAllRecipesGroup: (state, action) => {
              state.allrecipesgroup = action.payload.recipes;
              state.countallrecipesgroup = action.payload.totalcount;
    },

    getAllBooksGroup: (state, action) => {
              state.bookslist = action.payload.books;
              state.countallbooks = action.payload.totalcount;
    },

    getAllUsersGroup: (state, action) => {
              state.userslist = action.payload.users;
              state.countallusers = action.payload.totalcount;
    },

     
addRecipeToGroup: (state, action) => {
  const recipe = action.payload;
 // if (!state.currentgroup) return;
  const recipeId = recipe._id;
 // if (!Array.isArray(state.currentgroup.recipes)) {
 //   state.currentgroup.recipes = [];
 // }
  if (!Array.isArray(state.allrecipesgroup)) {
    state.allrecipesgroup = [];
  }
 // const existsInGroup = state.currentgroup.recipes.some(
   // (id) => id.toString() === recipeId.toString()
//  );
 // if (!existsInGroup) {
   // state.currentgroup.recipes.push(recipeId);
 // }
  const existsInList = state.allrecipesgroup.some(
    (r) => r._id.toString() === recipeId.toString()
  );
  if (!existsInList) {
    state.allrecipesgroup.push(recipe);
    state.countallrecipesgroup += 1;
  }
},

addBookToGroup: (state, action) => {
  const book = action.payload;
  //if (!state.currentgroup) return;
  const bookId = book._id;
 // if (!Array.isArray(state.currentgroup.books)) {
   // state.currentgroup.books = [];
 // }
  if (!Array.isArray(state.bookslist)) {
    state.bookslist = [];
  }
  //const existsInGroup = state.currentgroup.books.some(
    //(id) => id.toString() === bookId.toString()
  //);
  //if (!existsInGroup) {
   // state.currentgroup.books.push(bookId);
 // }
  const existsInList = state.bookslist.some(
    (r) => r._id.toString() === bookId.toString()
  );
  if (!existsInList) {
    state.bookslist.push(book);
    state.countallbooks += 1;
  }
},

removeRecipeFromGroup: (state, action) => {
  const recipeId = action.payload?.toString();

  // currentgroup.recipes = array of ids
 // if (state.currentgroup?.recipes) {
   // state.currentgroup.recipes =
    //  state.currentgroup.recipes.filter(
     //   (recipeId) => recipeId?.toString() !== id
    //  );
  //}

  // allrecipesgroup = array of recipe objects
  const beforeLength = state.allrecipesgroup?.length || 0;

  state.allrecipesgroup = (state.allrecipesgroup || []).filter(
    (recipe) => recipe?._id?.toString() !== recipeId
  );

  const afterLength = state.allrecipesgroup.length;

  if (beforeLength !== afterLength) {
    state.countallrecipesgroup = Math.max(
      0,
      (state.countallrecipesgroup || 0) - 1
    );
  }
},

 removeBookFromGroup: (state, action) => {
  const bookId = action.payload?.toString();
 // if (state.currentgroup?.books) {
   // state.currentgroup.books =
    //  state.currentgroup.books.filter(
      //  (bookId) => bookId?.toString() !== id
     // );
 // }
  const beforeLength = state.bookslist?.length || 0;
  state.bookslist = (state.bookslist || []).filter(
    (book) => book?._id?.toString() !== bookId
  );
  const afterLength = state.bookslist.length;
  if (beforeLength !== afterLength) {
    state.countallbooks = Math.max(
      0,
      (state.countallbooks || 0) - 1
    );
  }
},




    
  
 setPageMode: (state, action) => {
      state.pagemode = action.payload;
    },

    
   deleteCurrentGroup: (state) => {
  state.pagemode = "view";
  state.currentgroup = null;
  state.userslist = [];
  state.countallusers = 0;
  state.bookslist = [];
  state.countallbooks = 0;
  state.allrecipesgroup = [];
  state.countallrecipesgroup = 0;
},
    
         addUserGroup: (state, action) => {
  const user = action.payload.user;
  const userExists = state.userslist.some(
    (u) => u._id?.toString() === user._id?.toString()
  );
  if (!userExists) {
    state.userslist.push(user);
  }
  if (state.currentgroup && Array.isArray(state.currentgroup.userId)) {
    const exists = state.currentgroup.userId.some(
      (id) => id?.toString() === user._id?.toString()
    );
    if (!exists) {
      state.currentgroup.userId.push(user._id);
    }
  }
},
removeUserGroup: (state, action) => {
    const userIdToDelete = action.payload;
  state.userslist = state.userslist.filter(
    (user) => user._id?.toString() !== userIdToDelete?.toString()
  );
  if (state.currentgroup && Array.isArray(state.currentgroup.userId)) {
    state.currentgroup.userId = state.currentgroup.userId.filter(
      (id) => id?.toString() !== userIdToDelete?.toString()
    );
  }
},
      
 
  

      addBookGroup: (state, action) => {
        const existingBook = state.bookslist.find(book => book._id === action.payload._id);
        if (!existingBook) {
        state.bookslist.push(action.payload);
        state.countallbooks += 1;
      }
      },

      deleteBookFromGroup: (state, action) => {
  const deleteId = action.payload; // the book ID to remove
  const existingBook = state.bookslist.find(book => book._id === deleteId);
        if (existingBook) {
  state.bookslist = state.bookslist.filter(book => book._id !== deleteId);
  state.countallbooks = Math.max(0, state.countallbooks - 1);
      }
      },
      

      UpdateEditedGroup: (state, action) => {
        state.currentgroup = action.payload;
      },
      initializeGroup: (state) => {
        state.currentgroup = initialState.currentgroup;
      },
 InitialGroup: (state) => {
        state.currentgroup = initialState.currentgroup;
      },
 getAllBooksInGroup: (state,action) => {
        state.bookslist = action.payload.groupBooks;
        state.countallbooks = action.payload.totalcountgroupBooks;
      },
       getAllUsersInGroup: (state,action) => {
        state.userslist = action.payload.groupUsers;
        state.countallusers = action.payload.totalcountgroupUsers;
      },
       getAllRecipesInGroup: (state,action) => {
        state.allrecipesgroup = action.payload.groupRecipes;
        state.countallrecipesgroup = action.payload.totalcountgroupRecipes;
      },
      
      editRecipeList2: (state, action) => {
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

  // -------- allrecipesgroup --------
  replaceIfExists(state.allrecipesgroup);

  // -------- currentgroup.recipes --------
  if (state.currentgroup?.recipes) {
    replaceIfExists(state.currentgroup.recipes);
  }
},
    // Add more reducers for task actions (update, delete, etc.)
  },
});

export const {addUserGroup,removeUserGroup} = grouppageSlice.actions;
export const { addRecipeToGroup,addBookToGroup} = grouppageSlice.actions;
export const { removeRecipeFromGroup,removeBookFromGroup} = grouppageSlice.actions;

export const { getAllUsersGroup,getAllBooksGroup,getAllRecipesGroup } = grouppageSlice.actions;
export const { countAllRecipesGroup,countAllBooksGroup,countAllUsersGroup } = grouppageSlice.actions;

export const { getGroupPage} = grouppageSlice.actions;
export const { modalTask} = grouppageSlice.actions; //check if needed
export const { initializeGroup} = grouppageSlice.actions;
export const { UpdateEditedGroup} = grouppageSlice.actions; //check if needed

export const { updateGroupInfo} = grouppageSlice.actions; //check if needed
export const { setPageMode} = grouppageSlice.actions; //check if needed
export const { InitialGroup} = grouppageSlice.actions; //check if needed

export const { getAllBooksInGroup,getAllUsersInGroup,getAllRecipesInGroup} = grouppageSlice.actions; 

export const { deleteBookFromGroup} = grouppageSlice.actions; 
export const { deleteCurrentGroup} = grouppageSlice.actions; 
export const { editRecipeList2} = grouppageSlice.actions; 


export default grouppageSlice.reducer;



