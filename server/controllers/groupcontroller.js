import groupmodel from '../models/groupmodel.js';
import recipemodel from '../models/recipemodel.js';
import usermodel from '../models/usermodel.js';
import projectmodel from '../models/projectmodel.js';
import recipeAdminModel from '../models/recipeAdminModel.js';

import mongoose from 'mongoose';

//Group Page

export const getgroup = async (req, res) => {

  const { id } = req.body;
  const userId = req.userId;

  try {

    const group = await groupmodel
      .findById(id)
      .populate({
        path: "userId",
        select: "_id firstName lastName favorite image",
        options: { limit: 36 },
      })
      .populate({
        path: "books",
        options: { limit: 36 },
        populate: {
          path: "recipes",
          options: {
            perDocumentLimit: 1,
          },
        },
      })
      .populate({
        path: "recipes",
        options: { limit: 36 },
      })
      .lean();

  

    if (!group) {
      return res.status(404).json({ message: "group not found" });
    }

      

    const groupUsers = group.userId || [];
    const groupBooks = group.books || [];
    const groupRecipes = group.recipes || [];

    res.status(200).json({
      group,
      groupUsers,
      totalcountgroupUsers: groupUsers.length,
      groupBooks,
      totalcountgroupBooks: groupBooks.length,
      groupRecipes,
      totalcountgroupRecipes: groupRecipes.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getallrecipesgroup = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      activeCategories = [],
      activeTags = [],
      currentpage = 1,
      action = "all",
      activeCuisineid,
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "No user ID found in the token",
      });
    }

    if (!activeCuisineid) {
      return res.status(400).json({
        message: "Group ID is required",
      });
    }

    const group = await groupmodel
      .findById(activeCuisineid)
      .populate("recipes")
      .lean();

    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    let recipes = group.recipes || [];

    // ---------- FILTERING ----------
    recipes = recipes.filter((recipe) => {
      const categoryMatch =
        activeCategories.length === 0 ||
        activeCategories.includes(recipe.selectedCategories);

      const tagMatch =
        activeTags.length === 0 ||
        recipe.selectedTags?.some((tag) =>
          activeTags.includes(tag)
        );

      return categoryMatch && tagMatch;
    });

    // ---------- SORT ----------
    recipes.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const totalcount = recipes.length;

    // ---------- PAGINATION ----------
    let skipValue = 0;

    if (action === "forward") {
      skipValue = (currentpage - 1) * 12;
    }

    if (action === "back") {
      skipValue = Math.max(0, (currentpage - 3) * 12);
    }

    recipes = recipes.slice(skipValue, skipValue + 36);

    // ---------- RESPONSE ----------
    return res.status(200).json({
      recipes,
      totalcount,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getallbooksgroup = async (req, res) => {
  try {
    const userId = req.userId;

    const { currentpage = 1, action = "all", activeCuisineid } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "No user ID found in the token",
      });
    }

    if (!activeCuisineid) {
      return res.status(400).json({
        message: "Group ID is required",
      });
    }

    const skipValue =
      action === "forward"
        ? (currentpage - 1) * 12
        : action === "back"
        ? Math.max(0, (currentpage - 3) * 12)
        : 0;

    const group = await groupmodel
      .findById(activeCuisineid)
      .populate({
        path: "books",
        options: {
          sort: { createdAt: -1 },
          skip: skipValue,
          limit: 36,
        },
        populate: {
          path: "recipes",
          options: {
            perDocumentLimit: 1,
            sort: { createdAt: -1 },
          },
        },
      })
      .lean();

    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    return res.status(200).json({
      books: group.books || [],
      totalcount: group.books?.length || 0,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getallusersgroup = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      currentpage = 1,
      action = "all",
      activeCuisineid,
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "No user ID found in the token",
      });
    }

    if (!activeCuisineid) {
      return res.status(400).json({
        message: "Group ID is required",
      });
    }

    const skipValue =
      action === "forward"
        ? (currentpage - 1) * 12
        : action === "back"
        ? Math.max(0, (currentpage - 3) * 12)
        : 0;

    const group = await groupmodel
      .findById(activeCuisineid)
      .populate({
        path: "userId",
        select: "_id firstName lastName favorite image",
        options: {
          sort: { createdAt: -1 },
          skip: skipValue,
          limit: 36,
        },
      })
      .lean();

    if (!group) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    const users = group.userId || [];

    return res.status(200).json({
      users,
      totalcount: users.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const forwardpaginationactiongroup = async (req, res) => {
  const { combinedFilters, currentpage } = req.body;
  const currentgroupId = req.params.id;
  const userId = req.userId

  try {
    const skipValue = (currentpage - 1) * 12;

    const filteredCategories = combinedFilters.filtercategories.filter(category => category.active);
    const descriptionsOnlyCategories = filteredCategories.map(category => category.description);

    const filteredTags = combinedFilters.filtertags.filter(tag => tag.active);
    const descriptionsOnlyTags = filteredTags.map(tag => tag.description);

    const activeCuisineGroup = await groupmodel
    .findById(currentgroupId)
    .populate({
      path: 'recipes',
    })
    .populate({
      path: 'userId',
      options: { skip: skipValue, limit: 36 }, 
    })
    .populate({
      path: 'books',
      options: { skip: skipValue, limit: 36 }, 
    });

    if (!activeCuisineGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const filteredRecipes = activeCuisineGroup.recipes.filter(recipe => {
      const categoryMatch = descriptionsOnlyCategories.length === 0 ||
        descriptionsOnlyCategories.some(cat => recipe.selectedCategories.includes(cat));

      const tagMatch = descriptionsOnlyTags.length === 0 ||
        descriptionsOnlyTags.some(tag => recipe.selectedTags.includes(tag));

      return categoryMatch && tagMatch;
    });
    const paginatedRecipes = filteredRecipes.slice(skipValue, skipValue + 36);

    const groupUsers = activeCuisineGroup.userId;
    const groupBooks = activeCuisineGroup.books;
    const groupRecipes = paginatedRecipes;

    res.status(200).json({ groupUsers, groupBooks, groupRecipes });

  } catch (error) {
    console.error('Error fetching recipes:', error);

    res.status(409).json({ message: error.message });
  }
  
};

export const backpaginationactiongroup = async (req, res) => {
  const { combinedFilters, currentpage } = req.body;
  const currentgroupId = req.params.id;
  const userId = req.userId

  try {
    const skipValue = ((currentpage-3) * 12);

    const filteredCategories = combinedFilters.filtercategories.filter(category => category.active);
    const descriptionsOnlyCategories = filteredCategories.map(category => category.description);

    const filteredTags = combinedFilters.filtertags.filter(tag => tag.active);
    const descriptionsOnlyTags = filteredTags.map(tag => tag.description);

    const activeCuisineGroup = await groupmodel
    .findById(currentgroupId)
    .populate({
      path: 'recipes',
    })
    .populate({
      path: 'userId',
      options: { skip: skipValue, limit: 36 }, 
    })
    .populate({
      path: 'books',
      options: { skip: skipValue, limit: 36 }, 
    });

    if (!activeCuisineGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }

    const filteredRecipes = activeCuisineGroup.recipes.filter(recipe => {
      const categoryMatch = descriptionsOnlyCategories.length === 0 ||
        descriptionsOnlyCategories.some(cat => recipe.selectedCategories.includes(cat));

      const tagMatch = descriptionsOnlyTags.length === 0 ||
        descriptionsOnlyTags.some(tag => recipe.selectedTags.includes(tag));

      return categoryMatch && tagMatch;
    });
    const paginatedRecipes = filteredRecipes.slice(skipValue, skipValue + 36);

    const groupUsers = activeCuisineGroup.userId;
    const groupBooks = activeCuisineGroup.books;
    const groupRecipes = paginatedRecipes;

    res.status(200).json({ groupUsers, groupBooks, groupRecipes });

  } catch (error) {
    console.error('Error fetching recipes:', error);

    res.status(409).json({ message: error.message });
  }
  
};


//groups List Page
export const forwardwardpaginationGroupsListPage = async (req, res) => {
  const {currentpage}  = req.body;

  const userId = req.userId
  try {

    if (!userId) {
      res.status(401).json({ message: 'No user ID found in the token' });
      return;
    }

    const skipValue = ((currentpage-1) * 12);


      const totalcount = await groupmodel.countDocuments({ userId: { $in: [userId] } });
      const groups = await groupmodel.find({ userId: { $in: [userId] } }).skip(skipValue).limit(36);

        res.status(200).json({ groups, totalcount });

  } catch (error) {
    console.error('Error fetching recipes:', error);

    res.status(409).json({ message: error.message });
  }
  
};

export const backwardpaginationGroupsListPage = async (req, res) => {
  const {currentpage}  = req.body;

  const userId = req.userId
  try {

 if (!userId) {
      res.status(401).json({ message: 'No user ID found in the token' });
      return;
    }
    const skipValue = ((currentpage-3) * 12);

      const totalcount = await groupmodel.countDocuments({ userId: { $in: [userId] } });
      const groups = await groupmodel.find({ userId: { $in: [userId] } }).skip(skipValue).limit(36);
        res.status(200).json({ groups, totalcount });
  } catch (error) {
    console.error('Error fetching recipes:', error);

    res.status(409).json({ message: error.message });
  }
  
};



export const getallgroups = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await usermodel
      .findById(userId)
      .populate("codes");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const groups = user.codes || [];

    return res.status(200).json({
      groups,
      totalcount: groups.length,
    });

  } catch (error) {
    console.error("Error in getallgroups:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getallgroupsnewrecipeform = async (req, res) => {
  try {
    const userId = req.userId

    if (!userId) {
      res.status(401).json({ message: 'No user ID found in the token' });
      return;
    }

    const user = await usermodel.findById(userId);

    const groupIds = user.codes
    .slice(1) 
    .map(code => {
      const [groupId] = code.split('-'); 
      return groupId;
    });


    
  const groups = await groupmodel.find({ _id: { $in: groupIds } }).exec(); 

  res.status(200).json({ groups });

  
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


  export const removeuserfromgroup = async (req, res) => {
    // to find solution if the user is the admin beacuse in this case the userId is not relevent - we dont want to delete the userId but the user._id (maybe in the client)
    const userId = req.userId
    const groupId = req.params.id;

    try {

      const user = await usermodel.findById(userId);
      
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      
        const group = await groupmodel.findById(groupId);
      if (!group) {
        res.status(404).json({ message: 'group not found' });
        return;
      }

      group.userId = group.userId.filter(id => !id.equals(user._id));
      await group.save();

    user.codes = user.codes.filter(codeId => !codeId.startsWith(group._id));
    await user.save();

      res.status(201).json(user);
    } catch (error) {
      res.status(409).json({ message: error.message });
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
  
      const groups = await groupmodel.find({ userId: { $in: [userId] } }).skip(skipValue).limit(36);

      res.status(200).json(groups);
  
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
  
      const groups = await groupmodel.find({ userId: { $in: [userId] } }).skip(skipValue).limit(36);
 
      res.status(200).json(groups);
  
    } catch (error) {
      console.error('Error fetching groups:', error);
  
      res.status(409).json({ message: error.message });
    }
    
  };

  export const handledeleteAllgroups = async (req, res) => {
    try {
      const allgroups = await groupmodel.find({});
  
      if (allgroups.length === 0) {
        return res.status(404).json({ message: 'No  found' });
      }


      const removeGroupReferences = async () => {
        await Promise.all(allgroups.map(async (group) => {
          // Iterate over each userId in the group
          await Promise.all(group.userId.map(async (userId) => {
            await usermodel.findByIdAndUpdate(
              userId,
              { $pull: { codes: group._id } }, // Pull the current group's ID from user Codes
              { new: true }
            );
          }));
        }));
      };


      await Promise.all(allgroups.map(group => group.deleteOne()));
    console.log('All groups deleted successfully'); // Log a success message

    // Await the completion of the background task to remove references
    await removeGroupReferences();

      res.json({ message: 'All  deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  export const deletegroupowner = async (req, res) => {
      const { id } = req.body;
      const userId = req.userId;
  
  try {
     const user = await usermodel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    const group = await groupmodel.findById(id);
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

   if (!group.owner.some(id => id.equals(userId))) {
  return res.status(403).json({ 
    message: "Not authorized." 
  });
}

await usermodel.updateMany(
  { codes: id },
  { $pull: { codes: id } }
);

await recipeAdminModel.updateMany(
  { groups: id },
  { $pull: { groups: id } }
);

await recipemodel.updateMany(
  { groups: id },
  { $pull: { groups: id } }
);

// 🔥 delete projects completely
await projectmodel.deleteMany({ group: id });

await groupmodel.findByIdAndDelete(id);

return res.status(200).json({  });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const addgroupowner = async (req, res) => {
  const formData2 = req.body;
  const userId = req.userId

    try {

    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

   const groupData = {
      title: formData2.title,
      password: formData2.password,
       ingFont: formData2.ingFont,
      recipeUploadPermission: formData2.recipeUploadPermission,
      owner: [userId],
      userId: [userId],
    };

   if (formData2.template) {
      groupData.image = formData2.template;
    }

    const newgroup = new groupmodel(groupData);
    await newgroup.save();

user.codes.push(newgroup._id);

    await user.save();
return res.status(200).json({ newgroup });

  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const jointogroup = async (req, res) => {
  const { id } = req.body;
  const userId = req.userId;

  try {
    const user = await usermodel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await groupmodel.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // 🔥 add user to group
    if (!group.userId?.some(uid => uid.toString() === user._id.toString())) {
      group.userId.push(user._id);
    }

    // 🔥 add group to user
    if (!user.codes?.some(cid => cid.toString() === group._id.toString())) {
      user.codes.push(group._id);
    }

    await Promise.all([
      group.save(),
      user.save()
    ]);

    return res.status(200).json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      },
      group
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
  export const getoutfromgroup = async (req, res) => {
   const { id } = req.body;
      const userId = req.userId;

     try {
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await groupmodel.findById(id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    group.owner = group.owner.filter(
      (ownerId) => ownerId.toString() !== userId.toString()
    );

    group.userId = group.userId.filter(
      (memberId) => memberId.toString() !== userId.toString()
    );

    await group.save();

    user.codes = user.codes.filter(
      (groupId) => groupId.toString() !== id.toString()
    );

    await user.save();

    return res.status(200).json({ userIdToDelete:userId });

      } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  export const getoutfromgroupadmin = async (req, res) => {
  const idData = req.body;
  const { userIDtodelete, groupIDtodelete } = idData;
  const userId = req.userId;

    try {

      const user = await usermodel.findById(userId);
      
      if (!user) {
          return res.status(401).json({ message: 'User not found' });
      }

            
        const group = await groupmodel.findById(groupIDtodelete);
      if (!group) {
        res.status(402).json({ message: 'group not found' });
        return;
      }

         if (!group.owner.some(id => id.equals(userId))) {
  return res.status(403).json({ 
    message: "Not authorized." 
  });
}

    const user2 = await usermodel.findById(userIDtodelete);
      
      if (!user2) {
          return res.status(404).json({ message: 'User2 not found' });
      }

    group.userId = group.userId.filter(
      (memberId) => memberId.toString() !== userIDtodelete.toString()
    );
    await group.save();

    user2.codes = user2.codes.filter(
      (groupId) => groupId.toString() !== groupIDtodelete.toString()
    );
    await user2.save();

    return res.status(200).json({ userIdToDelete:user2._id });

      } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

    export const editgroup = async (req, res) => {
      const editData2 = req.body;
      const userId = req.userId;
      try {
    const user = await usermodel.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
      // Find the projectmodel by id
        const group = await groupmodel.findById(editData2.id);
        if (!group) {
          return res.status(404).json({ message: "Recipe not found" });
        }
  
        // Optional: verify that the user is the owner
          if (!group.owner.some(id => id.equals(userId))) {
  return res.status(403).json({ 
    message: "Not authorized." 
  });
}

    group.title = editData2.title;
   group.ingFont = editData2.ingFont;
    group.password = editData2.password ?? null;
    group.recipeUploadPermission = editData2.recipeUploadPermission ?? 1;
    if (editData2.template !== null) {
      group.image = editData2.template;
    }
    await group.save();
  
        return res.status(200).json({ group });
      } catch (error) {
        console.error("❌ Error editing group:", error);
        return res.status(500).json({ message: "Failed to edit group" });
      }
    };

    
     export const addrecipetogroup = async (req, res) => {
  const { recipeId, groupId } = req.body;
  const userId = req.userId;

  try {
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await groupmodel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const recipe = await recipemodel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // check membership
    const isMember = group.userId.some(
      (id) => id.toString() === userId.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "User is not a member of this group",
      });
    }

    // prevent duplicates (optional safety check)
    const alreadyExists = group.recipes.some(
      (id) => id.toString() === recipeId.toString()
    );

    if (alreadyExists) {
      return res.status(409).json({
        message: "Recipe already exists in group",
      });
    }

    // ✅ bidirectional safe add
    group.recipes.addToSet(recipeId);
    recipe.groups.addToSet(groupId);

    await Promise.all([group.save(), recipe.save()]);

    return res.status(200).json({});
  } catch (error) {
    console.log("addrecipetogroup error:", error.message);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

 export const addbooktogroup = async (req, res) => {
  const { bookId, groupId } = req.body;
  const userId = req.userId;

  try {
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await groupmodel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const book = await projectmodel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // check membership
    const isMember = group.userId.some(
      (id) => id.toString() === userId.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "User is not a member of this group",
      });
    }

    // optional safety check (not required with addToSet)
    const alreadyExists = group.books.some(
      (id) => id.toString() === bookId.toString()
    );

    if (alreadyExists) {
      return res.status(409).json({
        message: "Book already exists in group",
      });
    }

    // ✅ BIDIRECTIONAL + NO DUPLICATES
    group.books.addToSet(bookId);
    book.groups.addToSet(groupId);

    await Promise.all([
      group.save(),
      book.save(),
    ]);

    return res.status(200).json({});
  } catch (error) {
    console.log("addbooktogroup error:", error.message);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const removerecipefromgroup = async (req, res) => {
  const { recipeId, groupId } = req.body;
  const userId = req.userId;

  try {
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await groupmodel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const recipe = await recipemodel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const isMember = group.userId.some(
      (id) => id.toString() === userId.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "User is not a member of this group",
      });
    }

    const existsInGroup = group.recipes.some(
      (id) => id.toString() === recipeId.toString()
    );

    if (!existsInGroup) {
      return res.status(404).json({
        message: "Recipe does not exist in group",
      });
    }

    // Remove recipe from group
    group.recipes.pull(recipeId);

    // Remove group from recipe
    recipe.groups.pull(groupId);

    await Promise.all([
      group.save(),
      recipe.save(),
    ]);

    return res.status(200).json({});
  } catch (error) {
    console.log("removerecipefromgroup error:", error.message);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const removebookfromgroup = async (req, res) => {
  const { bookId, groupId } = req.body;
  const userId = req.userId;

  try {
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await groupmodel.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const book = await projectmodel.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const isMember = group.userId.some(
      (id) => id.toString() === userId.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "User is not a member of this group",
      });
    }

    const existsInGroup = group.books.some(
      (id) => id.toString() === bookId.toString()
    );

    if (!existsInGroup) {
      return res.status(404).json({
        message: "Book does not exist in group",
      });
    }

    // Remove book from group
    group.books.pull(bookId);

    // Remove group from book
    book.groups.pull(groupId);

    await Promise.all([
      group.save(),
      book.save(),
    ]);

    return res.status(200).json({});
  } catch (error) {
    console.log("removebookfromgroup error:", error.message);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};