import groupmodel from '../models/groupmodel.js';
import recipemodel from '../models/recipemodel.js';
import usermodel from '../models/usermodel.js';
import projectmodel from '../models/projectmodel.js';

import mongoose from 'mongoose';

//Group Page

export const getbook = async (req, res) => {
      const { id } = req.body;
    const userId = req.userId;
  try {
    
      const book = await projectmodel
      .findById(id)
      .populate({
        path: 'recipes',
        options: { limit: 36 }, // limit populated recipes
      })
      .populate({
        path: 'owner',
        select: '_id firstName image',
      })
      .populate({
        path: 'group',
        select: '_id title',
      });

    if (!book) {
      return res.status(404).json({ message: 'book not found' });
    }

        const bookRecipes = book.recipes.slice(0, 36); 
    const totalcountbookRecipes = bookRecipes.recipes.length;

    res.status(200).json({book,bookRecipes,totalcountbookRecipes });

  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

export const getgroup = async (req, res) => {
      const { id } = req.body;
    const userId = req.userId;
  try {
    
    const group = await groupmodel.findById(id);

    if (!group) {
      return res.status(404).json({ message: 'group not found' });
    }

 const TempUsers = await groupmodel.findById(id).populate('userId');
const groupUsers = TempUsers.userId.slice(0, 36).map(user => ({
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  favorite: user.favorite,
  images: user.images,
}));
    const totalcountgroupUsers = TempUsers.userId.length;

    const TempBooks = await groupmodel.findById(id).populate('books');
    const groupBooks = TempBooks.books.slice(0, 36); 
    const totalcountgroupBooks = TempBooks.books.length;


    const TempRecipes = await groupmodel.findById(id).populate('recipes');
    const groupRecipes = TempRecipes.recipes.slice(0, 36); 
    const totalcountgroupRecipes = TempRecipes.recipes.length;


    res.status(200).json({group, groupUsers, totalcountgroupUsers,groupBooks,totalcountgroupBooks,groupRecipes,totalcountgroupRecipes });

  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

export const forwardwardpaginationBooksgrouppage = async (req, res) => {
  const groupbooks  = req.body;
  const { currentpage, currentGroup } = groupbooks;
  const userId = req.userId

    try {
    if (!userId) {
      return res.status(401).json({ message: 'No user ID found in the token' });
    }

    const skipValue = (currentpage - 1) * 12;

    const groupBooks = await projectmodel
      .find({ group: currentGroup })
      .skip(skipValue)
      .limit(36);

    const totalcountgroupBooks = await projectmodel.countDocuments({
      group: currentGroup
    });

    return res.status(200).json({
      groupBooks,
      totalcountgroupBooks
    });

  } catch (error) {
    console.error('forwardwardpaginationBooksgrouppage error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const backwardpaginationBooksgrouppage = async (req, res) => {
  const groupbooks = req.body;
  const { currentpage, currentGroup } = groupbooks;
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(401).json({ message: 'No user ID found in the token' });
    }

    const skipValue = (currentpage - 3) * 12;

    const safeSkip = Math.max(skipValue, 0);

    const groupBooks = await projectmodel
      .find({ group: currentGroup })
      .skip(safeSkip)
      .limit(36);

    const totalcountgroupBooks = await projectmodel.countDocuments({
      group: currentGroup
    });

    return res.status(200).json({
      groupBooks,
      totalcountgroupBooks
    });

  } catch (error) {
    console.error('backwardpaginationBooksgrouppage error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const forwardwardpaginationUsersgrouppage = async (req, res) => {
  const groupusers  = req.body;
  const { currentpage, currentGroup } = groupbooks;
  const userId = req.userId

     try {
    if (!userId) {
      return res.status(401).json({ message: 'No user ID found in the token' });
    }

    const skipValue = (currentpage - 1) * 12;

    const groupUsers = await usermodel
      .find({ codes: mongoose.Types.ObjectId(currentGroup) })
      .select('firstName image') 
      .skip(skipValue)
      .limit(36);

    const totalcountgroupUsers = await usermodel.countDocuments({
      codes: mongoose.Types.ObjectId(currentGroup)
    });

    // 4️⃣ Return response
    return res.status(200).json({
      groupUsers,
      totalcountgroupUsers
    });

  } catch (error) {
    console.error('forwardwardpaginationUsersgrouppage error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const backwardpaginationUsersgrouppage = async (req, res) => {
  const groupusers = req.body;
  const { currentpage, currentGroup } = groupusers;
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(401).json({ message: 'No user ID found in the token' });
    }

    const skipValue = (currentpage - 3) * 12;
    const safeSkip = Math.max(skipValue, 0);

    const groupUsers = await usermodel
      .find({ codes: mongoose.Types.ObjectId(currentGroup) })
      .select('firstName image') // only firstName + image
      .skip(safeSkip)
      .limit(36);

    const totalcountgroupUsers = await usermodel.countDocuments({
      codes: mongoose.Types.ObjectId(currentGroup)
    });

    return res.status(200).json({
      groupUsers,
      totalcountgroupUsers
    });

  } catch (error) {
    console.error('backwardpaginationUsersgrouppage error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};



export const forwardwardpaginationRecipesgrouppage = async (req, res) => {
  const grouprecipes = req.body;
  const { activeCategories = [], activeTags = [], currentpage, currentGroup } = grouprecipes;

  try {
   const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "No user ID found in the token" });
    }

if (!currentGroup) {
      return res.status(400).json({ message: "currentGroup is required" });
    }

    const PAGE_SIZE = 12;
const skipValue = Math.max(0, (currentpage - 1) * PAGE_SIZE);

    const query = {
      groups: currentGroup,
      book: null,
    };

      if (activeCategories.length > 0) {
      query.selectedCategories = { $in: activeCategories };
    }

    if (activeTags.length > 0) {
      query.selectedTags = { $in: activeTags };
    }

    const groupRecipes = await recipemodel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skipValue)
      .limit(36)
      .lean();

    const totalcountgroupRecipes = await recipemodel.countDocuments(query);

    return res.status(200).json({
      groupRecipes,
      totalcountgroupRecipes
    });

  } catch (error) {
    console.error('forwardwardpaginationRecipesgrouppage error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


export const backwardpaginationRecipesgrouppage = async (req, res) => {

  const grouprecipes = req.body;
  const { activeCategories = [], activeTags = [], currentpage, currentGroup } = grouprecipes;

  try {
   const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "No user ID found in the token" });
    }

if (!currentGroup) {
      return res.status(400).json({ message: "currentGroup is required" });
    }

    const skipValue = (currentpage - 3) * 12; 
    const safeSkip = Math.max(skipValue, 0);

    const query = {
      groups: currentGroup,
      book: null,
    };

      if (activeCategories.length > 0) {
      query.selectedCategories = { $in: activeCategories };
    }

    if (activeTags.length > 0) {
      query.selectedTags = { $in: activeTags };
    }

    const groupRecipes = await recipemodel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(safeSkip)
      .limit(36)
      .lean();

    const totalcountgroupRecipes = await recipemodel.countDocuments(query);

    return res.status(200).json({
      groupRecipes,
      totalcountgroupRecipes
    });

  } catch (error) {
    console.error('forwardwardpaginationRecipesgrouppage error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
  
  export const getallrecipesgroupfilter = async (req, res) => {
  try {
    const userId = req.userId
 const grouprecipes = req.body;
  const { activeCategories = [], activeTags = [], currentpage, currentGroup } = grouprecipes;

    if (!userId) {
      return res.status(401).json({ message: "No user ID found in the token" });
    }

if (!currentGroup) {
      return res.status(400).json({ message: "currentGroup is required" });
    }

    const query = {
      groups: currentGroup,
      book: null,
    };

      if (activeCategories.length > 0) {
      query.selectedCategories = { $in: activeCategories };
    }

    if (activeTags.length > 0) {
      query.selectedTags = { $in: activeTags };
    }

    const groupRecipes = await recipemodel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(36)
      .lean();

    const totalcountgroupRecipes = await recipemodel.countDocuments(query);

    return res.status(200).json({
      groupRecipes,
      totalcountgroupRecipes
    });

  } catch (error) {
    console.error('forwardwardpaginationRecipesgrouppage error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
///


//group page - add recipe to group
  export const addrecipegroup = async (req, res) => {
    const recipe = req.body;
    const userId = req.userId
    const groupId = req.params.id;

    try {
      const recipeId = recipe._id;


      const updatedrecipe = await recipemodel.findByIdAndUpdate(
        recipeId,
        { $addToSet: { groups: groupId } },
        { new: true }
      );
  
      if (!updatedrecipe) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      const updatedGroup = await groupmodel.findByIdAndUpdate(
        groupId,
        { $addToSet: { recipes: recipeId } },
        { new: true }
      );
      
      if (!updatedGroup) {
        return res.status(404).json({ message: 'Group not found' });
      }

      
      res.status(201).json(updatedrecipe);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
    
  };

  export const addbookgroup = async (req, res) => {
    const book = req.body;
    const userId = req.userId
    const groupId = req.params.id;

    try {
      
      const bookId = book._id;


      const updatedbook = await projectmodel.findByIdAndUpdate(
        bookId,
        { $addToSet: { groups: groupId } },
        { new: true }
      );
  
      if (!updatedbook) {
        return res.status(404).json({ message: "Book not found" });
      }


      const updatedGroup = await groupmodel.findByIdAndUpdate(
        groupId,
        { $addToSet: { books: bookId } },
        { new: true }
      );
      
      if (!updatedGroup) {
        return res.status(404).json({ message: 'Group not found' });
      }

      
      res.status(201).json(updatedbook);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
    
  };
  

  export const removerecipefromgroup = async (req, res) => {
    const { itemid } = req.body;
    const groupId = req.params.id;
    
    try {
        const removedItem = await recipemodel.findOneAndDelete({ _id: itemid });
 
      const group = await groupmodel.findById(groupId);
      if (!group) {
        res.status(404).json({ message: 'group not found' });
        return;
      }
      group.recipes = group.recipes.filter(recipeId => recipeId.toString() !== itemid);
      await group.save();

      if (removedItem) {
        res.json(removedItem);
      } else {
        res.status(404).json({ message: 'Item not found' });
      }

    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ message: `An error occurred: ${error.message}` });
    }
  };
  

  
  
  export const getallusersgroup = async (req, res) => {
    try {
      const groupId = req.params.id;

      const groupusers = await groupmodel.findById(groupId).populate('userId');

      if (!groupusers) {
        return res.status(404).json({ message: 'groupusers not found' });
      }

   
      res.status(200).json(groupusers.userId);

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
    // Find the group by id and remove it
     // 1️⃣ Find the group first
    const group = await groupmodel.findById(id);
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    // 2️⃣ Check if owner matches the logged-in user
      if (!group.owner.some(id => id.equals(userId))) {
  return res.status(403).json({ 
    message: "not Unauthorized" 
  });
}


    // 3️⃣ Now delete the group
    await groupmodel.findByIdAndDelete(id);
  
    // Background task to remove groupId from related collections
    const removeGroupFromCollections = async () => {
      await Promise.all(group.recipes.map(async (recipeId) => {
        await recipemodel.findByIdAndUpdate(
          recipeId,
          { $pull: { groups: id } },  // Use `id` instead of `groupId`
          { new: true }
        );
      }));

      await Promise.all(group.books.map(async (bookId) => {
        await projectmodel.findByIdAndUpdate(
          bookId,
          { $pull: { groups: id } },  // Use `id` instead of `groupId`
          { new: true }
        );
      }));

      await Promise.all(group.userId.map(async (userid) => {
        await usermodel.findByIdAndUpdate(
          userid,
          { $pull: { codes: id } },  // Use `id` instead of `groupId`
          { new: true }
        );
      }));
    };

    // Execute the background task and catch any errors
    removeGroupFromCollections().catch(error => console.error('Error in background removal:', error));

const groupId = group._id;
return res.status(200).json({ groupId });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const addgroupowner = async (req, res) => {
  const formData = req.body;
  const userId = req.userId

    try {

       const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const groupData = {
      ...formData,
     owner: [userId],
      userId: [userId],
      usersNum:1,
    };

    // ⭐ Only set image if template URL exists
    if (formData.template) {
      groupData.image = formData.template;
    }
    delete groupData.template;

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

    // ================= ADD USER TO GROUP =================
    if (!group.userId.some(uid => uid.toString() === user._id.toString())) {
      group.userId.push(user._id);

      // ⬅️ increment usersNum ONLY when actually joining
      group.usersNum = (group.usersNum || 0) + 1;

      await group.save();
    }

    // ================= ADD GROUP TO USER =================
    if (!user.codes.some(gid => gid.toString() === group._id.toString())) {
      user.codes.push(group._id);
      await user.save();
    }


  const filteredUser = {
  _id: user._id,
  firstName: user.firstName,
  lastName: user.lastName,
  favorite: user.favorite,
  images: user.image,
};

    return res.status(200).json({ filteredUser });

      } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  export const getoutfromgroup = async (req, res) => {
   const { id } = req.body;
      const userId = req.userId;

    try {

      const user = await usermodel.findById(userId);
      
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      
        const group = await groupmodel.findById(id);
      if (!group) {
        res.status(404).json({ message: 'group not found' });
        return;
      }

    group.userId = group.userId.filter(
      (memberId) => memberId.toString() !== user._id.toString()
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
      const editData = req.body;
      const userId = req.userId;
      try {
    const user = await usermodel.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
      // Find the projectmodel by id
        const group = await groupmodel.findById(editData.id);
        if (!group) {
          return res.status(404).json({ message: "Recipe not found" });
        }
  
        // Optional: verify that the user is the owner
       if (!group.owner.some(id => id.equals(userId))) {
  return res.status(403).json({ 
    message: "Not authorized." 
  });
}
  
      // 4. Update fields
        group.title = editData.title;
        // Save template ONLY if not null
        if (editData.template !== null) {
          group.image = editData.template;
        }
  
        await group.save();
  
        return res.status(200).json({ group });
      } catch (error) {
        console.error("❌ Error editing group:", error);
        return res.status(500).json({ message: "Failed to edit group" });
      }
    };


    


///
export const forwardpaginationmyrecipes = async (req, res) => {
  const grouprecipes = req.body;
    const { activeCategories = [], activeTags = [] ,currentGroup,currentpage} = grouprecipes;

  const userId = req.userId
   try {

    const query = {};

    // ✅ recipe must belong to this group
    if (currentGroup) {
      query.groups = new mongoose.Types.ObjectId(currentGroup);
    }

    // ✅ selectedCategories (string) inside activeCategories (array)
    if (activeCategories.length > 0) {
      query.selectedCategories = { $in: activeCategories };
    }

    // ✅ selectedTags (array) intersects activeTags (array)
    if (activeTags.length > 0) {
      query.selectedTags = { $in: activeTags };
    }

    const skipValue = (currentpage - 1) * 12;

    const groupRecipes = await recipemodel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skipValue)
      .limit(36)
      .lean();

    const totalcountgroupRecipes = await recipemodel.countDocuments(query);

    res.status(200).json({
    groupRecipes,
      totalcountgroupRecipes,
    });
  } catch (error) {
    console.error("forwardpaginationmyrecipes error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const backwardpaginationmyrecipes = async (req, res) => {
  const grouprecipes = req.body;

  const {
    activeCategories = [],
    activeTags = [],
    currentGroup,
    currentpage,
  } = grouprecipes;

  try {
    const skipValue = (currentpage - 3) * 12;
    const safeSkip = Math.max(skipValue, 0);

    const query = {};

    // recipe must belong to this group
    if (currentGroup) {
      query.groups = new mongoose.Types.ObjectId(currentGroup);
    }

    // selectedCategories (string) inside activeCategories (array)
    if (activeCategories.length > 0) {
      query.selectedCategories = { $in: activeCategories };
    }

    // selectedTags (array) intersects activeTags (array)
    if (activeTags.length > 0) {
      query.selectedTags = { $in: activeTags };
    }

    const groupRecipes = await recipemodel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(safeSkip)
      .limit(36)
      .lean();

    const totalcountgroupRecipes = await recipemodel.countDocuments(query);

    res.status(200).json({
      groupRecipes,
      totalcountgroupRecipes,
    });
  } catch (error) {
    console.error("backwardpaginationmyrecipes error:", error);
    res.status(500).json({ message: "Server error" });
  }
};