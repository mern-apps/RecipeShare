import recipemodel from '../models/recipemodel.js';
import recipeAdminModel from '../models/recipeAdminModel.js';

import projectmodel from '../models/projectmodel.js';
import usermodel from '../models/usermodel.js';
import groupmodel from '../models/groupmodel.js';

import mongoose from 'mongoose';
import { connections } from 'mongoose';






export const getallrecipesbest2 = async (req, res) => {

  const combinedFilters = req.body;

  try {


    const filteredCategories = combinedFilters.filtercategories.filter(category => category.active);
    const descriptionsOnlyCategories = filteredCategories.map(category => category.description);


    const filteredTags = combinedFilters.filtertags.filter(tag => tag.active);
    const descriptionsOnlyTags = filteredTags.map(tag => tag.description);

    const activeCuisineid=combinedFilters.activeCuisineid

    const activeCuisineGroup = await groupmodel.findById(activeCuisineid).populate('recipes');

    const filteredRecipes = activeCuisineGroup.recipes.filter(recipe => {
      const categoryMatch = descriptionsOnlyCategories.length === 0 ||
        descriptionsOnlyCategories.some(cat => recipe.selectedCategories.includes(cat));

      const tagMatch = descriptionsOnlyTags.length === 0 ||
        descriptionsOnlyTags.some(tag => recipe.selectedTags.includes(tag));

      return categoryMatch && tagMatch;
    });


    const recipesCount = filteredRecipes.length;
    const paginatedRecipes = filteredRecipes.slice(0, 36);

    res.status(200).json({ recipes:paginatedRecipes, totalcount: recipesCount });

  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(409).json({ message: error.message });
  }
  
};

export const forwardpaginationactionbest = async (req, res) => {
  const { combinedFilters, currentpage } = req.body;

  try {
    const filteredCategories = combinedFilters.filtercategories.filter(category => category.active);
    const descriptionsOnlyCategories = filteredCategories.map(category => category.description);

    const filteredTags = combinedFilters.filtertags.filter(tag => tag.active);
    const descriptionsOnlyTags = filteredTags.map(tag => tag.description);

    const activeCuisineid=combinedFilters.activeCuisineid
    const activeCuisineGroup = await groupmodel.findById(activeCuisineid).populate('recipes');

    const filteredRecipes = activeCuisineGroup.recipes.filter(recipe => {
      const categoryMatch = descriptionsOnlyCategories.length === 0 ||
        descriptionsOnlyCategories.some(cat => recipe.selectedCategories.includes(cat));

      const tagMatch = descriptionsOnlyTags.length === 0 ||
        descriptionsOnlyTags.some(tag => recipe.selectedTags.includes(tag));

      return categoryMatch && tagMatch;
    });
    const recipesCount = filteredRecipes.length;


    const skipValue = ((currentpage-1) * 12);

    const paginatedRecipes = filteredRecipes.slice(skipValue, skipValue + 36);

    res.status(200).json({ recipes:paginatedRecipes, totalcount: recipesCount });

  } catch (error) {
    console.error('Error fetching recipes:', error);

    res.status(409).json({ message: error.message });
  }
  
};

export const backwardpaginationactionbest = async (req, res) => {
  const { combinedFilters, currentpage } = req.body;

  try {

    const filteredCategories = combinedFilters.filtercategories.filter(category => category.active);
    const descriptionsOnlyCategories = filteredCategories.map(category => category.description);

    const filteredTags = combinedFilters.filtertags.filter(tag => tag.active);
    const descriptionsOnlyTags = filteredTags.map(tag => tag.description);

    const activeCuisineid=combinedFilters.activeCuisineid
    const activeCuisineGroup = await groupmodel.findById(activeCuisineid).populate('recipes');

    const filteredRecipes = activeCuisineGroup.recipes.filter(recipe => {
      const categoryMatch = descriptionsOnlyCategories.length === 0 ||
        descriptionsOnlyCategories.some(cat => recipe.selectedCategories.includes(cat));

      const tagMatch = descriptionsOnlyTags.length === 0 ||
        descriptionsOnlyTags.some(tag => recipe.selectedTags.includes(tag));

      return categoryMatch && tagMatch;
    });
    const recipesCount = filteredRecipes.length;

    const skipValue = ((currentpage-3) * 12);

    const paginatedRecipes = filteredRecipes.slice(skipValue, skipValue + 36);

    res.status(200).json({ recipes:paginatedRecipes, totalcount: recipesCount });

  } catch (error) {
    console.error('Error fetching recipes:', error);

    res.status(409).json({ message: error.message });
  }
  
};


//My recipes

export const getallrecipes = async (req, res) => {
try {
    const userId = req.userId;
const combinedFilters = req.body;
const { 
      activeCategories = [], 
      activeTags = [], 
      currentpage = 1, 
      action = "all" ,
      activeCuisineid = null ,
    } = combinedFilters;

    if (!userId) {
      return res.status(401).json({ message: "No user ID found in the token" });
    }

    const query = {
 type: {
    $elemMatch: {
      $gte: 1,
      $lte: 1.9,
    },
  },
        book: null,
      owner: userId,
    };

        if (activeCategories.length > 0) {
      query.selectedCategories = { $in: activeCategories };
    }

    if (activeTags.length > 0) {
      query.selectedTags = { $in: activeTags };
    }


    let skipValue = 0;

    if (action === "forward") skipValue = (currentpage - 1) * 12;
    if (action === "back") skipValue = Math.max(0, (currentpage - 3) * 12);

    const recipes = await recipemodel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skipValue)
      .limit(36);

    const totalcount = await recipemodel.countDocuments(query);

    res.status(200).json({ recipes, totalcount });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getallrecipes2 = async (req, res) => {
  try {
    const userId = req.userId
    const combinedFilters = req.body;
    const { activeCategories = [], activeTags = [] } = combinedFilters;
    if (!userId) {
      res.status(401).json({ message: 'No user ID found in the token' });
      return;
    }
      // Build the MongoDB query
    const query = {
      owner: userId,
      book: null,
    };
        if (activeCategories.length > 0) {
      query.selectedCategories = { $in: activeCategories };
    }
    if (activeTags.length > 0) {
      query.selectedTags = { $in: activeTags };
    }

        const recipesCount = await recipemodel.countDocuments(query);
 const recipes = await recipemodel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(36);

        res.status(200).json({ recipes, totalcount: recipesCount });
        
      } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



 
export const forwardpaginationmyrecipes = async (req, res) => {
  const { combinedFilters, currentpage } = req.body;
    const { activeCategories = [], activeTags = [] } = combinedFilters;

  const userId = req.userId
  try {

const query = {
      owner: userId,
      book: null,
    };
        if (activeCategories.length > 0) {
      query.selectedCategories = { $in: activeCategories };
    }
    if (activeTags.length > 0) {
      query.selectedTags = { $in: activeTags };
    }

  const recipesCount = await recipemodel.countDocuments(query);

 const skipValue = ((currentpage-1) * 12);
 const recipes = await recipemodel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skipValue)
      .limit(36);

    res.status(200).json({ recipes, totalcount: recipesCount });

  } catch (error) {
    console.error('Error fetching recipes:', error);

    res.status(409).json({ message: error.message });
  }
  
};

export const backwardpaginationmyrecipes = async (req, res) => {
  const { combinedFilters, currentpage } = req.body;
  const { activeCategories = [], activeTags = [] } = combinedFilters;
  const userId = req.userId
  try {

const query = {
      owner: userId,
      book: null,
    };
        if (activeCategories.length > 0) {
      query.selectedCategories = { $in: activeCategories };
    }
    if (activeTags.length > 0) {
      query.selectedTags = { $in: activeTags };
    }

  const recipesCount = await recipemodel.countDocuments(query);

    const skipValue = ((currentpage-3) * 12);
 const recipes = await recipemodel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skipValue)
      .limit(36);

    res.status(200).json({ recipes, totalcount: recipesCount });

  } catch (error) {
    console.error('Error fetching recipes:', error);

    res.status(409).json({ message: error.message });
  }
  
};



export const getallrecipesfavorite = async (req, res) => {
  try {
 
const userId = req.userId;
const combinedFilters = req.body;
const { 
      activeCategories = [], 
      activeTags = [], 
      currentpage = 1, 
      action = "all" ,
      activeCuisineid = null ,
    } = combinedFilters;

  
    let skipValue = 0;

    switch (action) {
      case "forward":
        skipValue = (currentpage - 1) * 12;
        break;

      case "back":
        skipValue = Math.max(0, (currentpage - 3) * 12);
        break;

      default:
        skipValue = 0;
    }

    const user = await usermodel.findById(userId)
  .populate({
    path: "favorite",
    match: {
      ...(activeCategories.length > 0 && {
        selectedCategories: { $in: activeCategories },
      }),
      ...(activeTags.length > 0 && {
        selectedTags: { $in: activeTags },
      }),
    },
    options: {
      sort: { createdAt: -1 },
    },
  })
  .populate({
    path: "favoriteAdmin",
    match: {
      ...(activeCategories.length > 0 && {
        selectedCategories: { $in: activeCategories },
      }),
      ...(activeTags.length > 0 && {
        selectedTags: { $in: activeTags },
      }),
    },
    options: {
      sort: { createdAt: -1 },
    },
  });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allFavorites = [
  ...(user.favorite || []),
  ...(user.favoriteAdmin || []),
];

// optional: sort by createdAt
allFavorites.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const recipesCount = allFavorites.length;

    const recipes = allFavorites.slice(skipValue, skipValue + 36);

    res.status(200).json({ recipes, totalcount: recipesCount });

  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getallrecipesfavorite2 = async (req, res) => {
  try {
    const userId = req.userId
    const combinedFilters = req.body;
    const { activeCategories = [], activeTags = [] } = combinedFilters;

const user = await usermodel.findById(userId).populate('favorite');
           if (!user) {
          return res.status(404).json({ message: 'User not found' });
        } 

      // Filter the populated recipes according to active filters
    let filteredRecipes = user.favorite;
    //👉 returns true if the recipe’s single category is one of the active ones.
    if (activeCategories.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        activeCategories.includes(recipe.selectedCategories)
      );
    }
    //👉 returns true if at least one tag in the recipe matches one of the active tags.
    if (activeTags.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.selectedTags.some(tag => activeTags.includes(tag))
      );
    }

    //Prepare count and response
    const recipesCount = filteredRecipes.length;
    const recipes = filteredRecipes.slice(0, 36);

        res.status(200).json({ recipes, totalcount: recipesCount });
      } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const forwardpaginationfavorite = async (req, res) => {
  const userId = req.userId
  const { combinedFilters, currentpage } = req.body;
const { activeCategories = [], activeTags = [] } = combinedFilters;

  try {
    
    const skipValue = ((currentpage-1) * 12);
const user = await usermodel.findById(userId).populate({
  path: 'favorite',
  model: 'recipemodel',
  match: {
    ...(activeCategories.length > 0 && { selectedCategories: { $in: activeCategories } }),
    ...(activeTags.length > 0 && { selectedTags: { $in: activeTags } }),
  },
  options: {
    sort: { createdAt: -1 },
  },
});

  if (!user) {
          return res.status(404).json({ message: 'User not found' });
        } 

const recipesCount = user.favorite.length;
const limitValue = 36;
const recipes = user.favorite.slice(skipValue, skipValue + limitValue);

    res.status(200).json({ recipes, totalcount: recipesCount });

  } catch (error) {
    console.error('Error fetching recipes:', error);

    res.status(409).json({ message: error.message });
  }
  
};

export const backwardpaginationfavorite = async (req, res) => {
 const userId = req.userId
  const { combinedFilters, currentpage } = req.body;
const { activeCategories = [], activeTags = [] } = combinedFilters;
  try {
        const skipValue = ((currentpage-3) * 12);
const user = await usermodel.findById(userId).populate({
  path: 'favorite',
  model: 'recipemodel',
  match: {
    ...(activeCategories.length > 0 && { selectedCategories: { $in: activeCategories } }),
    ...(activeTags.length > 0 && { selectedTags: { $in: activeTags } }),
  },
  options: {
    sort: { createdAt: -1 },
  },
});
  if (!user) {
          return res.status(404).json({ message: 'User not found' });
        } 
const recipesCount = user.favorite.length;
const limitValue = 36;
const recipes = user.favorite.slice(skipValue, skipValue + limitValue);

    res.status(200).json({ recipes, totalcount: recipesCount });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(409).json({ message: error.message });
  } 
};

export const getallrecipesbest = async (req, res) => {
try {
    const userId = req.userId;
const combinedFilters = req.body;
const { 
      activeCategories = [], 
      activeTags = [], 
      currentpage = 1, 
      action = "all" ,
      activeCuisineid = null ,
    } = combinedFilters;

    if (!userId) {
      return res.status(401).json({ message: "No user ID found in the token" });
    }

if (!activeCuisineid || activeCuisineid === 111) {
  return res.status(200).json({ recipes: [], totalcount: 0 });
}
    
    // base query
   const query = {};
    // Only include type if activeCuisineid is provided
  //beacuse activeCuisineid contain 1 value. if not - it should be query.type = { $in: [activeCuisineid] };
query.type = Number(activeCuisineid);



    if (activeCategories.length > 0) {
      query.selectedCategories = { $in: activeCategories };
    }

    if (activeTags.length > 0) {
      query.selectedTags = { $in: activeTags };
    }

     

    let skipValue = 0;
    if (action === "forward") skipValue = (currentpage - 1) * 12;
    if (action === "back") skipValue = Math.max(0, (currentpage - 3) * 12);

    const recipes = await recipeAdminModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skipValue)
      .limit(36);

    const totalcount = await recipeAdminModel.countDocuments(query);

    res.status(200).json({ recipes, totalcount });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const getallrecipesbook = async (req, res) => {

  const combinedFilters = req.body;
    const { filtercategories = [], filtertags = [], activeCuisineid } = combinedFilters;
  try {
    if (!activeCuisineid) {
      return res.status(400).json({ message: 'No book/project ID provided' });
    }
       const book = await projectmodel.findById(activeCuisineid).populate('recipes');
    if (!book) {
      return res.status(404).json({ message: 'Book/project not found' });
    }

      let filteredRecipes = book.recipes;
    // Filter by categories
    if (filtercategories.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        filtercategories.includes(recipe.selectedCategories)
      );
    }
    // Filter by tags
    if (filtertags.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.selectedTags.some(tag => filtertags.includes(tag))
      );
    }

    const totalcount = filteredRecipes.length;

        filteredRecipes = filteredRecipes
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 36);

    res.status(200).json({ recipes: filteredRecipes, totalcount });

  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(409).json({ message: error.message });
  }
  
};

export const forwardpaginationbook = async (req, res) => {
  const { combinedFilters, currentpage } = req.body;
      const { filtercategories = [], filtertags = [], activeCuisineid } = combinedFilters;
  try {
    if (!activeCuisineid) {
      return res.status(400).json({ message: 'No book/project ID provided' });
    }
       const book = await projectmodel.findById(activeCuisineid).populate('recipes');
    if (!book) {
      return res.status(404).json({ message: 'Book/project not found' });
    }

      let filteredRecipes = book.recipes;
    // Filter by categories
    if (filtercategories.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        filtercategories.includes(recipe.selectedCategories)
      );
    }
    // Filter by tags
    if (filtertags.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.selectedTags.some(tag => filtertags.includes(tag))
      );
    }

    const totalcount = filteredRecipes.length;
    const skipValue = (currentpage-1) * 12;
const limitValue = 36;

            const paginatedRecipes = filteredRecipes
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(skipValue, skipValue + limitValue);

    res.status(200).json({ recipes:paginatedRecipes, totalcount });

  } catch (error) {
    console.error('Error fetching recipes:', error);

    res.status(500).json({ message: error.message });
  }
  
};
export const backwardpaginationbook = async (req, res) => {
    const { combinedFilters, currentpage } = req.body;
      const { filtercategories = [], filtertags = [], activeCuisineid } = combinedFilters;
  try {
    if (!activeCuisineid) {
      return res.status(400).json({ message: 'No book/project ID provided' });
    }
       const book = await projectmodel.findById(activeCuisineid).populate('recipes');
    if (!book) {
      return res.status(404).json({ message: 'Book/project not found' });
    }

      let filteredRecipes = book.recipes;
    // Filter by categories
    if (filtercategories.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        filtercategories.includes(recipe.selectedCategories)
      );
    }
    // Filter by tags
    if (filtertags.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.selectedTags.some(tag => filtertags.includes(tag))
      );
    }

    const totalcount = filteredRecipes.length;
    const skipValue = (currentpage-3) * 12;
const limitValue = 36;

            const paginatedRecipes = filteredRecipes
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(skipValue, skipValue + limitValue);

    res.status(200).json({ recipes:paginatedRecipes, totalcount });

  } catch (error) {
    console.error('Error fetching recipes:', error);

    res.status(500).json({ message: error.message });
  }
  
};


//group that also participate (not owner)
export const getallgroups = async (req, res) => {
  try {
    const userId = req.userId
    if (!userId) {
      res.status(401).json({ message: 'No user ID found in the token' });
      return;
    }
        const allgroups = await groupmodel.find({ owner: userId }).sort({ createdAt: -1 });
const totalcount = allgroups.length;
const groups = allgroups.slice(0, 36);
        res.status(200).json({ groups, totalcount });
         } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getallbooksgroup = async (req, res) => {

  const {itemid}  = req.body;
  try {
    const allbooksgroup = await groupmodel.findById(itemid).populate('books');
    const totalcount = allbooksgroup.books.length;
    const books = allbooksgroup.books.slice(0, 36);
    res.status(200).json({ books, totalcount });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(409).json({ message: error.message });
  }
  
};

//
export const getallrecipescuisine = async (req, res) => {

 try {
    const userId = req.userId;
    const combinedFilters = req.body;
    const {
      activeCategories = [],
      activeTags = [],
      activeCuisineid
    } = combinedFilters;

    // 🔹 Build dynamic query
    const query = {};

    // 1️⃣ Filter by cuisine type (Number)
  //  if (activeCuisineid !== undefined && activeCuisineid !== null) {
      //query.type = Number(activeCuisineid);
//}
    // 2️⃣ Filter by categories (your schema: selectedCategories = String)
    if (filtercategories.length > 0) {
      query.selectedCategories = { $in: filtercategories };
    }

    // 3️⃣ Filter by tags (your schema: selectedTags = [String])
    if (filtertags.length > 0) {
      query.selectedTags = { $in: filtertags };
    }

    const recipes = await recipeAdminModel.find(query);

    return res.status(200).json(recipes);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const forwardpaginationcuisine = async (req, res) => {
  const { combinedFilters, currentpage } = req.body;

  try {

    const filteredCategories = combinedFilters.filtercategories.filter(category => category.active);
    const descriptionsOnlyCategories = filteredCategories.map(category => category.description);

    const filteredTags = combinedFilters.filtertags.filter(tag => tag.active);
    const descriptionsOnlyTags = filteredTags.map(tag => tag.description);

    const activeCuisineid=combinedFilters.activeCuisineid
    const activeCuisineGroup = await groupmodel.findById(activeCuisineid).populate('recipes');

    const filteredRecipes = activeCuisineGroup.recipes.filter(recipe => {
      const categoryMatch = descriptionsOnlyCategories.length === 0 ||
        descriptionsOnlyCategories.some(cat => recipe.selectedCategories.includes(cat));

      const tagMatch = descriptionsOnlyTags.length === 0 ||
        descriptionsOnlyTags.some(tag => recipe.selectedTags.includes(tag));

      return categoryMatch && tagMatch;
    });
    const recipesCount = filteredRecipes.length;


    const skipValue = ((currentpage-1) * 12);

    const paginatedRecipes = filteredRecipes.slice(skipValue, skipValue + 36);


    res.status(200).json({ recipes:paginatedRecipes, totalcount: recipesCount });

  } catch (error) {
    console.error('Error fetching recipes:', error);

    res.status(409).json({ message: error.message });
  }
  
};

export const backwardpaginationcuisine = async (req, res) => {
  const { combinedFilters, currentpage } = req.body;

  try {

    const filteredCategories = combinedFilters.filtercategories.filter(category => category.active);
    const descriptionsOnlyCategories = filteredCategories.map(category => category.description);

    const filteredTags = combinedFilters.filtertags.filter(tag => tag.active);
    const descriptionsOnlyTags = filteredTags.map(tag => tag.description);

    const activeCuisineid=combinedFilters.activeCuisineid
    const activeCuisineGroup = await groupmodel.findById(activeCuisineid).populate('recipes');

    const filteredRecipes = activeCuisineGroup.recipes.filter(recipe => {
      const categoryMatch = descriptionsOnlyCategories.length === 0 ||
        descriptionsOnlyCategories.some(cat => recipe.selectedCategories.includes(cat));

      const tagMatch = descriptionsOnlyTags.length === 0 ||
        descriptionsOnlyTags.some(tag => recipe.selectedTags.includes(tag));

      return categoryMatch && tagMatch;
    });
    const recipesCount = filteredRecipes.length;

    const skipValue = ((currentpage-3) * 12);

    const paginatedRecipes = filteredRecipes.slice(skipValue, skipValue + 36);

    res.status(200).json({ recipes:paginatedRecipes, totalcount: recipesCount });

  } catch (error) {
    console.error('Error fetching recipes:', error);

    res.status(409).json({ message: error.message });
  }
  
};

export const copyrecipeCuisine = async (req, res) => {
  const modalTaskCuisine = req.body;
  const userId = req.userId
  try {
    const favoriteArray = modalTaskCuisine.favorite.includes(userId) ? [userId] : [];
const updatedPredecessor = [
      ...(modalTaskCuisine.predecessor || []),
      {
        owner: modalTaskCuisine.owner,
        recipeID: modalTaskCuisine._id,
        typeRec: "copy",
      },
    ];

    const recipeuser = {
      ...modalTaskCuisine,
      owner: userId,
      predecessor: updatedPredecessor,
      book: null, 
      groups: [],
      favorite: favoriteArray, 

    };

  delete recipeuser._id;

  const newrecipe = new recipemodel(recipeuser);

    await newrecipe.save();

    const updatedFavoriteArray = modalTaskCuisine.favorite.filter(id => id !== userId);

    const updatedModalTaskCuisine = await recipemodel.findByIdAndUpdate(
      modalTaskCuisine._id,
      { 
        $set: { favorite: updatedFavoriteArray } // Update the favorite array
      },      { new: true }
    );


    res.status(201).json({ newrecipe,updatedModalTaskCuisine});
  } catch (error) {
    res.status(500).json({ message: "Failed to copy recipe." });  
  }
};



