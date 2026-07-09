import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allrecipesbooks: [],
  allrecipesgroups: [],

  filtercategories: [
  { description: 'מנות ראשונות', active: false },
  { description: 'מנות עיקריות', active: false },
  { description: 'קינוחים', active: false },
  { description: 'סלטים', active: false },
  { description: 'מרקים', active: false },
],
 filtertags: [
  // חלבון
  { description: 'עוף', active: false },
  { description: 'בשר', active: false },
  { description: 'דגים', active: false },

  // סוגי מנות / סגנונות
  { description: 'פחמימות', active: false },       // פסטה, אורז, תפוח אדמה
  { description: 'פשטידות / מאפים', active: false },
  { description: 'סושי', active: false },
  { description: 'מוקפץ', active: false },
  { description: 'פיצה', active: false },

  // תזונה
  { description: 'צמחוני', active: false },
  { description: 'טבעוני', active: false },
  { description: 'ללא גלוטן', active: false },
  { description: 'ללא לקטוז', active: false },
  { description: 'חריף', active: false },

  // אופי / אירוע
  { description: 'מהיר / קל להכנה', active: false },
  { description: 'לילדים', active: false },
  { description: 'חגיגי', active: false },
],

    //groups (layoutStart)
    groupbest:[
      { description: 'הכי נצפים', active: false,id: 5.1,imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzcyNTR8MHwxfHNlYXJjaHwyfHxJdGFsaWFuJTIwcmVjaXBlfGVufDB8fHx8MTcyNDM4OTcxOHww&ixlib=rb-4.0.3&q=80&w=400' },
      { description: 'הכי חדשים', active: true,id: 5.2, imageUrl: 'https://images.unsplash.com/photo-1640984618674-7b5d05776d97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzcyNTR8MHwxfHNlYXJjaHw1fHxNZXhpY2FuJTIwY3Vpc2luZXxlbnwwfHx8fDE3MjQzODk5Mzd8MA&ixlib=rb-4.0.3&q=80&w=400'},
    ],
    groupcuisine : [
      { description: 'איטלקי', active: false,id: 6.1,countryCode: "it",imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzcyNTR8MHwxfHNlYXJjaHwyfHxJdGFsaWFuJTIwcmVjaXBlfGVufDB8fHx8MTcyNDM4OTcxOHww&ixlib=rb-4.0.3&q=80&w=400' },
      { description: 'הודי', active: false,id: 6.3,countryCode: "in", imageUrl: 'https://images.unsplash.com/photo-1710091691802-7dedb8af9a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzcyNTR8MHwxfHNlYXJjaHwyfHxJbmRpYW4lMjBjdXJyeXxlbnwwfHx8fDE3MjQzOTAwMDB8MA&ixlib=rb-4.0.3&q=80&w=400'},
      { description: 'יפני', active: false,id: 6.4,countryCode: "jp", imageUrl: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzcyNTR8MHwxfHNlYXJjaHw0fHx0aGFpJTIwZGlzaHxlbnwwfHx8fDE3MjQzOTAwNTJ8MA&ixlib=rb-4.0.3&q=80&w=400'},
      { description: 'תיאלנדי', active: true,id: 6.5,countryCode: "th", imageUrl: 'https://images.unsplash.com/photo-1625938145744-e380515399bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzcyNTR8MHwxfHNlYXJjaHwyfHxqYXBhbiUyMHJlY2lwZXxlbnwwfHx8fDE3MjQzODk2MjZ8MA&ixlib=rb-4.0.3&q=80&w=400'},
    ],
    groupcategories : [
      //to update id (now most of the properoes are with the same id)
      { description: 'ראשונות', active: false,id: 7.1,imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzcyNTR8MHwxfHNlYXJjaHwyfHxJdGFsaWFuJTIwcmVjaXBlfGVufDB8fHx8MTcyNDM4OTcxOHww&ixlib=rb-4.0.3&q=80&w=400' },
      { description: 'עיקריות', active: true,id: 7.1, imageUrl: 'https://images.unsplash.com/photo-1640984618674-7b5d05776d97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzcyNTR8MHwxfHNlYXJjaHw1fHxNZXhpY2FuJTIwY3Vpc2luZXxlbnwwfHx8fDE3MjQzODk5Mzd8MA&ixlib=rb-4.0.3&q=80&w=400'},
    ],
    groupstags : [
      //to update id (now most of the properoes are with the same id)
        { description: 'ללא גלוטן', active: false,id: 8.1,imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzcyNTR8MHwxfHNlYXJjaHwyfHxJdGFsaWFuJTIwcmVjaXBlfGVufDB8fHx8MTcyNDM4OTcxOHww&ixlib=rb-4.0.3&q=80&w=400' },
        { description: 'חריף', active: true,id: 8.1, imageUrl: 'https://images.unsplash.com/photo-1640984618674-7b5d05776d97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzcyNTR8MHwxfHNlYXJjaHw1fHxNZXhpY2FuJTIwY3Vpc2luZXxlbnwwfHx8fDE3MjQzODk5Mzd8MA&ixlib=rb-4.0.3&q=80&w=400'},
      ],

//allrecipes
allrecipes: [],
countallrecipes: 0,

//favorite
allrecipesfavorite: [],
countallrecipesfavorite: 0,

  //bestrecipes
  allrecipesbest: [],
countallrecipesbest: 0,

//cuisine
countallrecipescuisine: 0,
allrecipescuisine: [],

//category
countallrecipescategory: 0,
allrecipescategory: [],

//tags
countallrecipestag: 0,
allrecipestag: [],


//books
allbooks: [],
countallrecipesbook: 0,
allrecipesbook: [],

//groups
allgroups: [],
allbooksgroup: [],
countallrecipesgroup: 0,
allrecipesgroup: [],
countallrecipesbookgroup: 0,
allrecipesbookgroup: [],
};

const recipespageSlice = createSlice({
  name: 'recipespage',
  initialState,
  reducers: {

    
    setFilterCategories: (state, action) => {
      state.filtercategories = action.payload;
    },
    setFilterTags: (state, action) => {
      state.filtertags = action.payload;
    },
   
    getAllBestRecipes: (state, action) => {
      state.allrecipesbest = action.payload;
    },
    countAllRecipesBest: (state, action) => {
      state.countallrecipesbest = action.payload;
    },

      getAllRecipes: (state, action) => {
        state.allrecipes = action.payload;
      },

      countAllRecipes: (state, action) => {
        state.countallrecipes = action.payload;
      },

 deleteRecipe: (state, action) => {
  const deleteId = action.payload;

  // list of arrays and counts
  const map = [
    ["allrecipesbooks", null],
    ["allrecipesgroups", null],

    ["allrecipesbest", "countallrecipesbest"],
    ["allrecipes", "countallrecipes"],
    ["allrecipesfavorite", "countallrecipesfavorite"],
    ["allrecipescuisine", "countallrecipescuisine"],
    ["allrecipescategory", "countallrecipescategory"],
    ["allrecipestag", "countallrecipestag"],
    ["allrecipesbook", "countallrecipesbook"],
    ["allrecipesgroup", "countallrecipesgroup"],
    ["allrecipesbookgroup", "countallrecipesbookgroup"],
  ];

  map.forEach(([arrayName, countName]) => {
    const originalLength = state[arrayName].length;

    // remove recipe by ID
    state[arrayName] = state[arrayName].filter(
      (recipe) => recipe._id !== deleteId
    );

    // if count exists & something was removed → decrease count
    if (countName && state[arrayName].length < originalLength) {
      state[countName] = state[countName] - 1;
    }
  });
},
      

      getAllRecipesFavorite: (state, action) => {
        state.allrecipesfavorite = action.payload;
      },

      countAllRecipesFavorite: (state, action) => {
        state.countallrecipesfavorite = action.payload;
      },
      
    initiateAllRecipes : (state, action) => {
      state.allrecipes = [];
      state.allrecipesfavorite = [];
    },

CopiedRecipe: (state, action) => {
const { newrecipe, item } = action.payload;

  console.log("previousrecipe:", item);
  console.log("newrecipe:", newrecipe);

 if (!newrecipe?._id) return;
const replaceIfExists = (array) => {
const index = array.findIndex(
(item111) =>
 item111._id.toString() === item?._id?.toString()
    );
    if (index !== -1) {
      array[index] = newrecipe;
      return true;
    }
    return false;
  };
  const replacedInAll = replaceIfExists(state.allrecipes);
  if (!replacedInAll) {
    state.allrecipes.push(newrecipe);
    state.countallrecipes += 1;
  }
  // -------- all recipes favorite --------
  replaceIfExists(state.allrecipesfavorite);
  // -------- best recipes --------
  //replaceIfExists(state.allrecipesbest);
  // -------- cuisine --------
  //replaceIfExists(state.allrecipescuisine);

},
    
    FavoriterecipeAdding: (state, action) => {
      // Check if the recipe is already in the allrecipesfavorite array
      const exists = state.allrecipesfavorite.some(item => item._id === action.payload._id);
      if (!exists) {
        state.allrecipesfavorite.push(action.payload);
        state.countallrecipesfavorite += 1;
      }
      const indexcuisine = state.allrecipescuisine.findIndex(
        (item) => item._id === action.payload._id
      );
      state.allrecipescuisine[indexcuisine] = action.payload;

      const indexbest = state.allrecipesbest.findIndex(
        (item) => item._id === action.payload._id
      );
      state.allrecipesbest[indexbest] = action.payload;

      const indexcategory = state.allrecipescategory.findIndex(
        (item) => item._id === action.payload._id
      );
      state.allrecipescategory[indexcategory] = action.payload;

      const indextag = state.allrecipestag.findIndex(
        (item) => item._id === action.payload._id
      );
      state.allrecipestag[indextag] = action.payload;

    },
    
    FavoriterecipeRemove: (state, action) => {
      const indexFavorite = state.allrecipesfavorite.findIndex(item => item._id === action.payload._id);

      if (indexFavorite !== -1) {
        // Remove the item if it exists
        state.allrecipesfavorite.splice(indexFavorite, 1);
        state.countallrecipesfavorite -= 1;
      }
      
      const indexcuisine = state.allrecipescuisine.findIndex(
        (item) => item._id === action.payload._id
      );
      state.allrecipescuisine[indexcuisine] = action.payload;

      const indexbest = state.allrecipesbest.findIndex(
        (item) => item._id === action.payload._id
      );
      state.allrecipesbest[indexbest] = action.payload;

      const indexcategory = state.allrecipescategory.findIndex(
        (item) => item._id === action.payload._id
      );
      state.allrecipescategory[indexcategory] = action.payload;

      const indextag = state.allrecipestag.findIndex(
        (item) => item._id === action.payload._id
      );
      state.allrecipestag[indextag] = action.payload;
    },

    getAllCuisineRecipes: (state, action) => {
      state.allrecipescuisine = action.payload;
    },
    countAllRecipesCuisine: (state, action) => {
      state.countallrecipescuisine = action.payload;
    },


    getAllCategoryRecipes: (state, action) => {
      state.allrecipescategory = action.payload;
    },
    countAllRecipesCategory: (state, action) => {
      state.countallrecipescategory = action.payload;
    },

    getAllTagRecipes: (state, action) => {
      state.allrecipestag = action.payload;
    },
    countAllRecipesTag: (state, action) => {
      state.countallrecipestag = action.payload;
    },

    getAllBooks: (state, action) => {
      state.allbooks = action.payload;
    },
    getAllBookRecipes: (state, action) => {
      state.allrecipesbook = action.payload;
    },
    countAllRecipesBook: (state, action) => {
      state.countallrecipesbook = action.payload;
    },

    getAllGroups: (state, action) => {
      state.allgroups = action.payload;
    },
    getAllBooksGroup: (state, action) => {
      state.allbooksgroup = action.payload;
    },
    countAllRecipesGroup: (state, action) => {
      state.countallrecipesgroup = action.payload;
    },
    getAllGroupRecipes: (state, action) => {
      state.allrecipesgroup = action.payload;
    },
    
    initialRecipesBookGroup: (state, action) => {
      state.allrecipesbookgroup = [];
      state.countallrecipesbookgroup = 0;

    },

    getAllBookGroupRecipes: (state, action) => {
      state.allrecipesbookgroup = action.payload;
    },
    countAllRecipesBookGroup: (state, action) => {
      state.countallrecipesbookgroup = action.payload;
    },

 addRecipeList: (state, action) => {
  const item = action.payload;

  if (!item?._id) return;

  const exists = state.allrecipes.some(
    (recipe) => recipe._id?.toString() === item._id.toString()
  );

  if (!exists) {
    state.allrecipes.push(item);
    state.countallrecipes += 1;
  }
},

    editRecipeList: (state, action) => {
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

  // Replace inside all recipe collections
  replaceIfExists(state.allrecipesbooks);
  replaceIfExists(state.allrecipesgroups);
  replaceIfExists(state.allrecipes);
  replaceIfExists(state.allrecipesfavorite);
  replaceIfExists(state.allrecipesbest);
  replaceIfExists(state.allrecipescuisine);
  replaceIfExists(state.allrecipescategory);
  replaceIfExists(state.allrecipestag);
  replaceIfExists(state.allrecipesbook);
  replaceIfExists(state.allrecipesgroup);
  replaceIfExists(state.allrecipesbookgroup);
},


  },

});


export const { getAllRecipes, countAllRecipes} = recipespageSlice.actions;
export const { getAllBestRecipes,countAllRecipesBest} = recipespageSlice.actions;
export const { getAllRecipesFavorite, countAllRecipesFavorite} = recipespageSlice.actions;
export const { deleteRecipe} = recipespageSlice.actions;

export const { FavoriterecipeAdding,FavoriterecipeRemove} = recipespageSlice.actions;

export const { getAllCuisineRecipes, countAllRecipesCuisine} = recipespageSlice.actions;
export const { getAllCategoryRecipes, countAllRecipesCategory} = recipespageSlice.actions;
export const { getAllTagRecipes, countAllRecipesTag} = recipespageSlice.actions;
export const { getAllBooks, getAllBookRecipes,countAllRecipesBook} = recipespageSlice.actions;
export const { getAllGroups, getAllBooksGroup,countAllRecipesGroup,getAllGroupRecipes,countAllRecipesBookGroup,getAllBookGroupRecipes,initialRecipesBookGroup} = recipespageSlice.actions;

export const {initiateAllRecipes} = recipespageSlice.actions;

export const { CopiedRecipe} = recipespageSlice.actions;
export const { editRecipeList,addRecipeList} = recipespageSlice.actions;
export const { setFilterCategories,setFilterTags} = recipespageSlice.actions;


export default recipespageSlice.reducer;

