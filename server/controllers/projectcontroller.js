import projectmodel from '../models/projectmodel.js';
import recipemodel from '../models/recipemodel.js';
import addtobookeventmodel from '../models/addtobookeventmodel.js';
import groupmodel from '../models/groupmodel.js';
import usermodel from '../models/usermodel.js';

import mongoose from 'mongoose';

//Books


export const getproject = async (req, res) => {
      const { id } = req.body;
    const userId = req.userId;
  try {
    
    const book = await projectmodel
      .findById(id)
      .populate('recipes');
      
    if (!book) {
      return res.status(404).json({ message: 'book not found' });
    }

    const TempRecipes = await projectmodel.findById(id).populate('recipes');
    const bookRecipes = TempRecipes.recipes.slice(0, 36); 
    const totalcountbookRecipes = TempRecipes.recipes.length;


    res.status(200).json({book, bookRecipes, totalcountbookRecipes});

  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

export const getallbooks = async (req, res) => {
  try {
    const userId = req.userId

    if (!userId) {
      res.status(401).json({ message: 'No user ID found in the token' });
      return;
    }

  const allProjects = await projectmodel
    .find({
      $or: [
        { owner: userId },
        { favorite: userId }
      ]
    })
    .slice("recipes", 1)
    .populate("recipes")
    .sort({ createdAt: -1 });

    

    const totalcount = allProjects.length;
  const projects = allProjects.slice(0, 36);

        res.status(200).json({ projects, totalcount });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const forwardwardpaginationRecipesbookpage = async (req, res) => {
  const bookrecipes = req.body;
  const { activeCategories = [], activeTags = [], currentpage, currentBook } = bookrecipes;

  try {
   const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "No user ID found in the token" });
    }

if (!currentBook) {
      return res.status(400).json({ message: "currentBook is required" });
    }

    const PAGE_SIZE = 12;
const skipValue = Math.max(0, (currentpage - 1) * PAGE_SIZE);

    const query = {
      book: currentBook
    };

      if (activeCategories.length > 0) {
      query.selectedCategories = { $in: activeCategories };
    }

    if (activeTags.length > 0) {
      query.selectedTags = { $in: activeTags };
    }

    const bookRecipes = await recipemodel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skipValue)
      .limit(36)
      .lean();

    const totalcountgroupRecipes = await recipemodel.countDocuments(query);

    return res.status(200).json({
      bookRecipes,
      totalcountgroupRecipes
    });

  } catch (error) {
    console.error('forwardwardpaginationRecipesgrouppage error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const backwardpaginationRecipesbookpage = async (req, res) => {

  const bookrecipes = req.body;
  const { activeCategories = [], activeTags = [], currentpage, currentBook } = bookrecipes;

  try {
   const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "No user ID found in the token" });
    }

if (!currentBook) {
      return res.status(400).json({ message: "currentBook is required" });
    }

    const skipValue = (currentpage - 3) * 12; 
    const safeSkip = Math.max(skipValue, 0);

    const query = {
      book: currentBook
    };

      if (activeCategories.length > 0) {
      query.selectedCategories = { $in: activeCategories };
    }

    if (activeTags.length > 0) {
      query.selectedTags = { $in: activeTags };
    }

    const bookRecipes = await recipemodel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(safeSkip)
      .limit(36)
      .lean();

    const totalcountgroupRecipes = await recipemodel.countDocuments(query);

    return res.status(200).json({
      bookRecipes,
      totalcountgroupRecipes
    });

  } catch (error) {
    console.error('forwardwardpaginationRecipesgrouppage error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const getallrecipesbookfilter = async (req, res) => {

  const bookrecipes = req.body;
  const { activeCategories = [], activeTags = [], currentpage, currentBook } = bookrecipes;

  try {
   const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "No user ID found in the token" });
    }

if (!currentBook) {
      return res.status(400).json({ message: "currentBook is required" });
    }



    const query = {
      book: currentBook
    };

      if (activeCategories.length > 0) {
      query.selectedCategories = { $in: activeCategories };
    }

    if (activeTags.length > 0) {
      query.selectedTags = { $in: activeTags };
    }

    const bookRecipes = await recipemodel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(36)
      .lean();

    const totalcountgroupRecipes = await recipemodel.countDocuments(query);

    return res.status(200).json({
      bookRecipes,
      totalcountgroupRecipes
    });

  } catch (error) {
    console.error('forwardwardpaginationRecipesgrouppage error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};





  

///

export const forwardwardpaginationBooksListPage = async (req, res) => {
  const { currentpage = 1 } = req.body;
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(401).json({ message: 'No user ID found in the token' });
    }

    const skipValue = (currentpage - 1) * 12;
    const limitValue = 36;

    /* ---------------- get user (groups + favorites) ---------------- */
    const user = await usermodel
      .findById(userId)
      .select('codes favoritebook');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    /* ---------------- 1. owner projects ---------------- */
    const ownedProjects = await projectmodel.find({
      owner: userId,
    });

    /* ---------------- 2. group projects ---------------- */
    const groupProjects = user.codes?.length
      ? await projectmodel.find({
          group: { $in: user.codes },
        })
      : [];

    /* ---------------- 3. favorite projects ---------------- */
    const favoriteProjects = user.favoritebook?.length
      ? await projectmodel.find({
          _id: { $in: user.favoritebook },
        })
      : [];

    /* ---------------- merge + remove duplicates ---------------- */
    const projectsMap = new Map();

    [...ownedProjects, ...groupProjects, ...favoriteProjects].forEach(project => {
      projectsMap.set(project._id.toString(), project);
    });

    const allUniqueProjects = Array.from(projectsMap.values());

    /* ---------------- total count ---------------- */
    const totalcount = allUniqueProjects.length;

    /* ---------------- skip + limit ---------------- */
    const projects = allUniqueProjects.slice(
      skipValue,
      skipValue + limitValue
    );

    /* ---------------- response ---------------- */
    return res.status(200).json({
      projects,
      totalcount,
    });

  } catch (error) {
    console.error('forwardwardpaginationBooksListPage error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const backwardpaginationBooksListPage = async (req, res) => {
  const { currentpage = 1 } = req.body; //if now value, so =1
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(401).json({ message: 'No user ID found in the token' });
    }

    /* ---------------- calc skip / limit ---------------- */
    const limitValue = 36;
    const rawSkip = (currentpage - 3) * 12;
    const skipValue = Math.max(rawSkip, 0); // לא לרדת מתחת ל־0

    /* ---------------- get user (groups + favorites) ---------------- */
    const user = await usermodel
      .findById(userId)
      .select('codes favoritebook');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    /* ---------------- 1. owner projects ---------------- */
    const ownedProjects = await projectmodel.find({
      owner: userId,
    });

    /* ---------------- 2. group projects ---------------- */
    const groupProjects = user.codes?.length
      ? await projectmodel.find({
          group: { $in: user.codes },
        })
      : [];

    /* ---------------- 3. favorite projects ---------------- */
    const favoriteProjects = user.favoritebook?.length
      ? await projectmodel.find({
          _id: { $in: user.favoritebook },
        })
      : [];

    /* ---------------- merge + remove duplicates ---------------- */
    const projectsMap = new Map();

    [...ownedProjects, ...groupProjects, ...favoriteProjects].forEach(project => {
      projectsMap.set(project._id.toString(), project);
    });

    const allUniqueProjects = Array.from(projectsMap.values());

    /* ---------------- total count ---------------- */
    const totalcount = allUniqueProjects.length;

    /* ---------------- slice (backward window) ---------------- */
    const projects = allUniqueProjects.slice(
      skipValue,
      skipValue + limitValue
    );

    /* ---------------- response ---------------- */
    return res.status(200).json({
      projects,
      totalcount,
    });

  } catch (error) {
    console.error('backwardpaginationBooksListPage error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const updateproject = async (req, res) => {
  const updatedproject = req.body;
  const userId = req.userId
  try {

  const projectID = updatedproject.projectID;

  const updatedProjectnew = await projectmodel.findByIdAndUpdate(
    projectID,
    {
      $set: {
        title: updatedproject.title,
        author: updatedproject.author,
        image: updatedproject.image,
      }
    },
    { new: true } // Option to return the updated document
  );

  if (!updatedProjectnew) {
    return res.status(404).json({ message: 'Project not found' });
  }

  const firstRecipeID = updatedProjectnew.recipes[0];

  if (!firstRecipeID) {
    return res.status(400).json({ message: 'No recipes found in the project' });
  }

  const updatedRecipe = await recipemodel.findByIdAndUpdate(
    firstRecipeID,
    {
      $set: {
        title: updatedProjectnew.title,
        author: updatedProjectnew.author,
      }
    },
    { new: true } // Option to return the updated document
  );
 

    res.status(200).json(updatedProjectnew);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const getallprojects = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'No user ID found in the token' });
    }

    /* ---------------- get user codes (groups) ---------------- */
    const user = await usermodel
      .findById(userId)
      .select('codes favoritebook');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const groupIds = user.codes || [];

    /* ---------------- 1. owner projects ---------------- */
    const ownedProjects = await projectmodel.find({
      owner: userId,
    });

    /* ---------------- 2. group projects ---------------- */
    const groupProjects = groupIds.length
      ? await projectmodel.find({
          group: { $in: groupIds },
        })
      : [];

    /* ---------------- 3. favorite projects ---------------- */
    const favoriteProjects = user.favoritebook?.length
      ? await projectmodel.find({
          _id: { $in: user.favoritebook },
        })
      : [];

    /* ---------------- merge + remove duplicates ---------------- */
    const projectsMap = new Map();

    [...ownedProjects, ...groupProjects, ...favoriteProjects].forEach(p => {
      projectsMap.set(p._id.toString(), p);
    });

    const allUniqueProjects = Array.from(projectsMap.values());

    /* ---------------- count + limit ---------------- */
    const totalcount = allUniqueProjects.length;
    const projects = allUniqueProjects.slice(0, 36);



    /* ---------------- response ---------------- */
    return res.status(200).json({
      projects,
      totalcount,
    });

  } catch (error) {
    console.error('getallprojects error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getallprojectsfromgroups = async (req, res) => {
  try {
    const userId = req.userId
    if (!userId) {
      res.status(401).json({ message: 'No user ID found in the token' });
      return;
    }
     const user = await usermodel.findById(userId).select('codes');
     const usergroups = user.codes
// 2️⃣ Find all projects that have *any* of those group IDs in their `groups` array
    const projects = await projectmodel
      .find({ groups: { $in: usergroups } })
      .limit(36);
    const totalcount = await projectmodel.countDocuments({ groups: { $in: usergroups } });
        res.status(200).json({ projects, totalcount });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};







  
  //to delete
  export const forwardpagination = async (req, res) => {
    const { currentpage } = req.body;
 
    const userId = req.userId
    try {
      const user = await usermodel.findById(userId);
      const userCodes = user.codes;
    
      const skipValue = ((currentpage-1) * 12);
  
      const projects = await projectmodel.find({ owner: userId }).skip(skipValue).limit(36);

      res.status(200).json(projects);
  
    } catch (error) {
      console.error('Error fetching groups:', error);
  
      res.status(409).json({ message: error.message });
    }
    
  };
  

  //to delete
  export const backwardpagination = async (req, res) => {
    const { currentpage } = req.body;
  
    const userId = req.userId
    try {
  
      const user = await usermodel.findById(userId);
      const userCodes = user.codes;
  
 
      const skipValue = ((currentpage-3) * 12);
  
      const projects = await projectmodel.find({ owner: userId }).skip(skipValue).limit(36);
 
      res.status(200).json(projects);
  
    } catch (error) {
      console.error('Error fetching groups:', error);
  
      res.status(409).json({ message: error.message });
    }
    
  };


  export const deleteallprojects = async (req, res) => {
    try {
      const allProjects = await projectmodel.find({});
  
      if (allProjects.length === 0) {
        return res.status(404).json({ message: 'No  found' });
      }

      await Promise.all(allProjects.map((project) => project.deleteOne()));
      console.log('All  deleted successfully'); // Log a success message

      res.json({ message: 'All  deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

///



export const deleteproject = async (req, res) => {
  const {id}  = req.body;
 
      try {

         const project = await projectmodel.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'No project found with the given id.' });
    }
    // Store project to return later
    const deletedproject = project.toObject();

      await Promise.all(project.recipes.map(async (recipeId) => {
        await addtobookeventmodel.deleteOne({
          recipe: recipeId,
          project: id
        });
        await recipemodel.findByIdAndDelete(recipeId);
      
      }));

       const group = await groupmodel.findOne({ books: id });
    if (group) {
      group.books.pull(id);
      group.booksNum = Math.max(0, group.booksNum - 1);
      await group.save();
    }

        await projectmodel.findByIdAndDelete(id);

    // 5️⃣ Return the exact deleted project
    return res.status(200).json({ deletedproject });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
  

  export const addproject = async (req, res) => {
  const formData = req.body;
  const userId = req.userId

  try {

      if (!userId) {
      res.status(401).json({ message: 'No user ID found in the token' });
      return;
    }

     const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
  const bookuser = {
    type: formData.type,
    title: formData.title,
    author: formData.author,
        insFont: formData.insFont,
    ingFont: formData.ingFont,
    book:'yes',
    owner: userId,
  };

  const newrecipebook = new recipemodel(bookuser);
   if (formData.template) {
      newrecipebook.image = formData.template;
    }
  await newrecipebook.save();

const projectuser = {
  title: formData.title,
  author: formData.author,
  type:formData.type,
  owner: [userId],
  book: 'yes',
groups: formData.groupId ? [formData.groupId] : [],
};

   if (formData.template) {
      projectuser.image = formData.template;
    }

  const newproject = new projectmodel(projectuser);
  newproject.recipes.push(newrecipebook._id);

  await newproject.save();

  //check if needed
if (formData.groupId) {
   await groupmodel.findByIdAndUpdate(
    formData.groupId,
    {
          $addToSet: { books: newproject._id },
          $inc: { booksNum: 1 },
        },      { new: true }
    );
  }

      return res.status(200).json({ newproject });

  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

  export const editbook = async (req, res) => {
    const editData = req.body;
    const userId = req.userId;
    try {
  const user = await usermodel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

    // Find the projectmodel by id
const book = await projectmodel.findById(editData.id);
  
  if (!book) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      if (!book.recipes || book.recipes.length === 0) {
  return res.status(404).json({ message: "No recipes in book" });
}

      if (!book.owner.some(id => id.equals(userId))) {
  return res.status(403).json({ 
    message: "not Unauthorized" 
  });
}

// get first recipe id
const firstRecipeId = book.recipes[0]._id;
// update the recipe
const updatedRecipe = await recipemodel.findByIdAndUpdate(
  firstRecipeId,
  {
    type: editData.type,
    title: editData.title,
    author: editData.author,
    insFont: editData.insFont,
    ingFont: editData.ingFont,
      ...(editData.template !== null && editData.template !== undefined && {
      image: editData.template,
    }),
  },
  { new: true }
);

if (!updatedRecipe) {
  return res.status(404).json({ message: "Recipe not found" });
}

      // Optional: verify that the user is the owner
 

      book.title = editData.title;
            book.author = editData.author;
      book.type = editData.type;
      
    
    if (editData.template !== null && editData.template !== undefined) {
      book.image = editData.template;
    }

    await book.save();

    const updatedBook = await projectmodel
  .findById(editData.id)
  .populate("recipes");
  
      return res.status(200).json({ updatedBook });
    } catch (error) {
      console.error("❌ Error editing book:", error);
      return res.status(500).json({ message: "Failed to edit book" });
    }
  };

  export const addtofavoritebook = async (req, res) => {
  const {projectID}  = req.body;
    const userId = req.userId;
    try {
  const user = await usermodel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

    // Find the projectmodel by id
      const book = await projectmodel.findById(projectID);
      if (!book) {
        return res.status(404).json({ message: "Recipe not found" });
      }

    const exists = user.favoritebook.some(
      (item) => item.toString() === book._id.toString()
    );

    if (!exists) {
      if (user.favoritebook.length >= 100) {
        user.favoritebook.shift(); // remove first (oldest)
      }
      user.favoritebook.push(book._id);
    }

    await user.save();

    return res.status(200).json({
      message: "Book added to favorites",
      bookID: book._id,
    });
    } catch (error) {
      console.error("❌ Error editing book:", error);
      return res.status(500).json({ message: "Failed to edit book" });
    }
  };

export const removefavoritebook = async (req, res) => {
  const { projectID } = req.body;
  const userId = req.userId;

  try {
    // 1. Validate user
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Validate book exists (optional step)
    const book = await projectmodel.findById(projectID);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // 3. Filter out the book ID from favorites
    const beforeLength = user.favoritebook.length;

    user.favoritebook = user.favoritebook.filter(
      (item) => item.toString() !== book._id.toString()
    );

    // If nothing was removed → return early
    if (user.favoritebook.length === beforeLength) {
      return res.status(200).json({
        message: "Book was not in favorites",
        removed: false,
        bookID: book._id,
      });
    }
    // 4. Save updated user
    await user.save();

    return res.status(200).json({
      message: "Book removed from favorites",
      removed: true,
      bookID: book._id,
    });

  } catch (error) {
    console.error("❌ Error removing book from favorites:", error);
    return res.status(500).json({ message: "Server error" });
  }
};