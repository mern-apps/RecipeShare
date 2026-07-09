import projectmodel from '../models/projectmodel.js';
import recipemodel from '../models/recipemodel.js';
import recipeAdminModel from '../models/recipeAdminModel.js';
import addtobookeventmodel from '../models/addtobookeventmodel.js';
import groupmodel from '../models/groupmodel.js';
import usermodel from '../models/usermodel.js';

import PDFDocument from 'pdfkit';
import sharp from "sharp";
import axios from 'axios';
import bidi from 'bidi-js';
import getDisplayText from 'bidi-js';

import path from 'path';
import sizeOf from 'image-size'; // ES import
import mongoose from 'mongoose';

export const bookeditfetchRecipesBookById = async (req, res) => {
      const { bookId } = req.body;
    const userId = req.userId;
  try {
    
    const book = await projectmodel.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'book not found' });
    }

    const TempRecipes = await projectmodel.findById(bookId).populate('recipes');
    const bookRecipes = TempRecipes.recipes.slice(0, 36); 
    const totalcountbookRecipes = TempRecipes.recipes.length;


    res.status(200).json({book,bookRecipes, totalcountbookRecipes});

  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

export const bookeditfetchRecipesGroupById = async (req, res) => {
      const { groupId } = req.body;
    const userId = req.userId;
  try {
    
    const group = await groupmodel
      .findById(groupId)
      .populate({
        path: "recipes",
        options: { limit: 36 },
      })
      .lean();

    if (!group) {
      return res.status(404).json({ message: "group not found" });
    }
    const groupRecipes = group.recipes || [];
    res.status(200).json({
      
      group,
      groupRecipes,
      totalcountgroupRecipes: group.recipes?.length || 0,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const bookeditfetchRecipes = async (req, res) => {
  try {
    const userId = req.userId
    if (!userId) {
      res.status(401).json({ message: 'No user ID found in the token' });
      return;
    }
      // Build the MongoDB query
    const query = {
      owner: userId,
      book: null,
    };

        const totalcount = await recipemodel.countDocuments(query);
 const recipes = await recipemodel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(36)
      .lean();

        res.status(200).json({ recipes, totalcount });
        
      } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const bookeditgetallrecipesfilter = async (req, res) => {
  try {
    const userId = req.userId
 const data = req.body;
  const { activeCategories = [], activeTags = [], currentpage, currentBookOrGroup,selectedOption, action = "all" , } = data;

    if (!userId) {
      return res.status(401).json({ message: "No user ID found in the token" });
    }

   /* ===== Helper: in-memory filter ===== */
    const filterRecipes = (recipes) => {
      return recipes.filter((recipe) => {
        const categoryMatch =
          !activeCategories.length ||
          recipe.selectedCategories?.some((cat) =>
            activeCategories.includes(cat)
          );

        const tagMatch =
          !activeTags.length ||
          recipe.selectedTags?.some((tag) =>
            activeTags.includes(tag)
          );

        return categoryMatch && tagMatch;
      });
    };

         let skipValue = 0;
    if (action === "forward") skipValue = (currentpage - 1) * 12;
    if (action === "back") skipValue = Math.max(0, (currentpage - 3) * 12);

    /* ===================== RECIPES ===================== */
    if (selectedOption === "recipes") {
      const query = {
  type: {
    $elemMatch: {
      $gte: 1,
      $lte: 1.9,
    },
  },        owner: userId,
        book: null,
      };

      if (activeCategories.length) {
        query.selectedCategories = { $in: activeCategories };
      }

      if (activeTags.length) {
        query.selectedTags = { $in: activeTags };
      }

     

      const recipes = await recipemodel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skipValue)
        .limit(36)
        .lean();

      const totalcount = await recipemodel.countDocuments(query);

      return res.status(200).json({
        recipes,
        totalcount,
      });
    }

    /* ===================== GROUPS ===================== */
    if (selectedOption === "groups") {
      if (!currentBookOrGroup) {
        return res.status(400).json({ message: "Group ID is required" });
      }

    const group = await groupmodel.findById(currentBookOrGroup).lean();

if (!group) {
  return res.status(404).json({ message: "group not found" });
}

const query = {
  _id: { $in: group.recipes },
    type: {
    $elemMatch: {
      $gte: 1,
      $lte: 1.9,
    },
  },
};

if (activeCategories.length) {
  query.selectedCategories = { $in: activeCategories };
}

if (activeTags.length) {
  query.selectedTags = { $in: activeTags };
}

const recipes = await recipemodel
  .find(query)
  .sort({ createdAt: -1 })
  .skip(skipValue)
  .limit(36)
  .lean();

const totalcount = await recipemodel.countDocuments(query);

return res.status(200).json({
  recipes,
  totalcount,
});
    }

    /* ===================== BOOKS ===================== */
    if (selectedOption === "books") {
      if (!currentBookOrGroup) {
        return res.status(400).json({ message: "Book ID is required" });
      }

       const book = await projectmodel.findById(currentBookOrGroup).lean();

if (!book) {
  return res.status(404).json({ message: "group not found" });
}

const query = {
  _id: { $in: book.recipes },
   type: {
    $elemMatch: {
      $gte: 1,
      $lte: 1.9,
    },
  },
};

if (activeCategories.length) {
  query.selectedCategories = { $in: activeCategories };
}

if (activeTags.length) {
  query.selectedTags = { $in: activeTags };
}

const recipes = await recipemodel
  .find(query)
  .sort({ createdAt: -1 })
  .skip(skipValue)
  .limit(36)
  .lean();

const totalcount = await recipemodel.countDocuments(query);

return res.status(200).json({
  recipes,
  totalcount,
});

    }

    return res.status(400).json({ message: "Invalid selectedOption" });

  } catch (error) {
    console.error("bookeditgetallrecipesfilter error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const bookeditbackwardpagination = async (req, res) => {

  const data = req.body;
  const { activeCategories = [], activeTags = [], currentpage, currentBookOrGroup,selectedOption } = data;

  try {
   const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "No user ID found in the token" });
    }

     if (!selectedOption) {
      return res.status(400).json({ message: "selectedOption is required" });
    }


    const skipValue = (currentpage - 3) * 12; 
    const safeSkip = Math.max(skipValue, 0);

     /* ===== Helper: in-memory filter ===== */
    const filterRecipes = (recipes) => {
      return recipes.filter(recipe => {
        const categoryMatch =
          !activeCategories.length ||
          recipe.selectedCategories?.some(cat =>
            activeCategories.includes(cat)
          );

        const tagMatch =
          !activeTags.length ||
          recipe.selectedTags?.some(tag =>
            activeTags.includes(tag)
          );

        return categoryMatch && tagMatch;
      });
    };

      /* ===================== RECIPES ===================== */
    if (selectedOption === "recipes") {
      const query = {
        owner: userId,
        book: null,
      };

      if (activeCategories.length) {
        query.selectedCategories = { $in: activeCategories };
      }

      if (activeTags.length) {
        query.selectedTags = { $in: activeTags };
      }

      const recipes = await recipemodel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(safeSkip)
        .limit(36)
        .lean();

      const totalcount = await recipemodel.countDocuments(query);

      return res.status(200).json({ recipes, totalcount });
    
    }
 /* ===================== GROUPS ===================== */
    if (selectedOption === "groups") {
      const group = await groupmodel
        .findById(currentBookOrGroup)
        .populate("recipes")
        .lean();

      if (!group) {
        return res.status(404).json({ message: "group not found" });
      }

      const filteredRecipes = filterRecipes(group.recipes || []);
      const recipes = filteredRecipes.slice(safeSkip, safeSkip + 36);

      return res.status(200).json({
        recipes,
        totalcount: filteredRecipes.length,
      });

    }

    /* ===================== BOOKS ===================== */
    if (selectedOption === "books") {
      const book = await projectmodel
        .findById(currentBookOrGroup)
        .populate("recipes")
        .lean();

      if (!book) {
        return res.status(404).json({ message: "book not found" });
      }

      const filteredRecipes = filterRecipes(book.recipes || []);
      const recipes = filteredRecipes.slice(safeSkip, safeSkip + 36);

        return res.status(200).json({
        recipes,
        totalcount: filteredRecipes.length,
      });
    }

    return res.status(400).json({ message: "Invalid selectedOption" });

  } catch (error) {
    console.error("bookeditbackwardpagination error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const bookeditforwardwardpagination = async (req, res) => {
  const data = req.body;
  const { activeCategories = [], activeTags = [], currentpage, currentBookOrGroup,selectedOption } = data;
  
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "No user ID found in the token" });
    }

    if (!selectedOption) {
      return res.status(400).json({ message: "selectedOption is required" });
    }

    const PAGE_SIZE = 12;
    const skipValue = Math.max(0, (currentpage - 1) * PAGE_SIZE);

    /* ===== Helper: in-memory filter ===== */
    const filterRecipes = (recipes) => {
      return recipes.filter((recipe) => {
        const categoryMatch =
          !activeCategories.length ||
          recipe.selectedCategories?.some((cat) =>
            activeCategories.includes(cat)
          );

        const tagMatch =
          !activeTags.length ||
          recipe.selectedTags?.some((tag) =>
            activeTags.includes(tag)
          );

        return categoryMatch && tagMatch;
      });
    };

    /* ===================== RECIPES ===================== */
    if (selectedOption === "recipes") {
      const query = {
        owner: userId,
        book: null,
      };

      if (activeCategories.length) {
        query.selectedCategories = { $in: activeCategories };
      }

      if (activeTags.length) {
        query.selectedTags = { $in: activeTags };
      }

      const recipes = await recipemodel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skipValue)
        .limit(PAGE_SIZE)
        .lean();

      const totalcount = await recipemodel.countDocuments(query);

      return res.status(200).json({
        recipes,
        totalcount,
      });
    }

    /* ===================== GROUPS ===================== */
    if (selectedOption === "groups") {
      if (!currentBookOrGroup) {
        return res.status(400).json({ message: "Group ID is required" });
      }

      const group = await groupmodel
        .findById(currentBookOrGroup)
        .populate("recipes")
        .lean();

      if (!group) {
        return res.status(404).json({ message: "group not found" });
      }

      const filteredRecipes = filterRecipes(group.recipes || []);
      const recipes = filteredRecipes.slice(
        skipValue,
        skipValue + PAGE_SIZE
      );

      return res.status(200).json({
        recipes,
        totalcount: filteredRecipes.length,
      });
    }

    /* ===================== BOOKS ===================== */
    if (selectedOption === "books") {
      if (!currentBookOrGroup) {
        return res.status(400).json({ message: "Book ID is required" });
      }

      const book = await projectmodel
        .findById(currentBookOrGroup)
        .populate("recipes")
        .lean();

      if (!book) {
        return res.status(404).json({ message: "book not found" });
      }

      const filteredRecipes = filterRecipes(book.recipes || []);
      const recipes = filteredRecipes.slice(
        skipValue,
        skipValue + PAGE_SIZE
      );

      return res.status(200).json({
        recipes,
        totalcount: filteredRecipes.length,
      });
    }

    return res.status(400).json({ message: "Invalid selectedOption" });

  } catch (error) {
    console.error("bookeditforwardwardpagination error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addrecipefromlist = async (req, res) => {
   const data = req.body;
  const { taskID, bookID } = data;
  const userId = req.userId;

    try {

      const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
   const project = await projectmodel.findById(bookID);

    if (!project) {
          res.status(404).json({ message: 'Project not found' });
          return;
        }

let recipe = await recipemodel.findById(taskID);
if (!recipe) {
  recipe = await recipeAdminModel.findById(taskID);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
}

 const favoriteArray = recipe.favorite.includes(userId) ? [userId] : [];
const recipeObj = recipe.toObject();
const updatedPredecessor = [
  ...(recipeObj.predecessor || []),
  {
    owner: recipeObj.owner,
    recipeID: recipeObj._id,
    typeRec: "book",
  },
];
        const recipeuserbook = {
  ...recipeObj,
  owner: userId,
  book: recipeObj._id.toString(),
   predecessor: updatedPredecessor,
  groups: [],
  favorite: favoriteArray,
};

delete recipeuserbook._id;
delete recipeuserbook.__v;

const newrecipebook = new recipemodel(recipeuserbook);
await newrecipebook.save();

      project.recipes.push(newrecipebook._id);
      await project.save();
     
      return res.status(200).json({
      newrecipebook,
    });

    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  export const removerecipefrombook = async (req, res) => {
    const data = req.body;
  const { taskID, bookID } = data;
   const userId = req.userId;

    try {

      const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = await projectmodel.findByIdAndUpdate(bookID,
      { $pull: { recipes: taskID } },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'No project found with the given id.' });
    }
    
    const removedItem = await recipemodel.findOneAndDelete({ _id: taskID });

     if (!removedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (removedItem.book && removedItem.book !== "yes") {
      const deletedEvent = await addtobookeventmodel.findOneAndDelete({
        recipe: removedItem.book,
        project: bookID,
      });

      if (!deletedEvent) {
        console.warn('Event not found for deleted recipe'); // Log it but don't send another response
      }
    }
    return res.json({ removedItem, message: 'Recipe removed successfully' });

  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ message: `An error occurred: ${error.message}` });
  }
};

export const dnd = async (req, res) => {
      const data = req.body;
  const { sourceIndex, destinationIndex, id } = data;
   const userId = req.userId;


  try {
    const project = await projectmodel.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const [removed] = project.recipes.splice(sourceIndex, 1);
    project.recipes.splice(destinationIndex, 0, removed);
    await project.save();
    return res.status(200).json(project);

  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

export const addrecipe2 = async (req, res) => {
  const { title, template, bookID,type,ingFont } = req.body;
  const userId = req.userId;``

  try {
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = await projectmodel.findById(bookID);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Build recipe payload
    const recipeData = {
      owner: userId,
      title,
      type: type,
      ingFont: ingFont,
      book: bookID, 
    };

    if (template) {
      recipeData.image = template;
    }

    // Create recipe
    const newrecipe2 = await recipemodel.create(recipeData);

    // Insert recipe _id as second item (index 1) in project.recipes
    project.recipes.splice(1, 0, newrecipe2._id);

    await project.save();

    return res.status(201).json({
      message: "Recipe2 created successfully",
    newrecipe2,
    });

  } catch (error) {
    console.error("Error in addrecipe2:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const editrecipe2 = async (req, res) => {
    const editData2 = req.body;
  const { title, id,template,type,ingFont } = editData2;
   const userId = req.userId;

   try {
    // Find the recipe
    const recipe = await recipemodel.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Only owner can edit
    if (recipe.owner.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update fields
    if (title !== undefined) recipe.title = title;
    if (type !== undefined) recipe.type = type;
    if (ingFont !== undefined) recipe.ingFont = ingFont;
    // If new template exists -> update image
    if (template) {
      recipe.image = template;
    }

    // Save recipe
    const newrecipe2 = await recipe.save();

   return res.status(201).json({
      message: "Recipe2 created successfully",
    newrecipe2,
    });

  } catch (error) {
    console.error("Error in editrecipe2:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



const fontsPath = path.join(process.cwd(), 'assets/fonts');

const registerFonts = (doc) => {
  doc.registerFont('Assistant', path.join(fontsPath, 'Assistant-Regular.ttf'));
  doc.registerFont('Assistant-Bold', path.join(fontsPath, 'Assistant-Bold.ttf'));
  doc.registerFont('Heebo-Bold', path.join(fontsPath, 'Heebo-Bold.ttf'));
  doc.registerFont('Rubik-Bold', path.join(fontsPath, 'Rubik-Bold.ttf'));

};


export const fixPdfText = (input = "") => {
  if (!input) return "";

  return String(input)
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, " ")
    .trim();
};

export const stripHtmlPreserveLines = (html = "") => {
  return String(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
};


const formatLinesWithBullets = (text) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `• ${line}`)
    .join("\n");

// ===============================
// Main render
// ===============================
export const renderRecipePage = async (doc, recipe, PAGE_WIDTH) => {
  registerFonts(doc);

  try {
    const imgUrl =
    recipe.image && recipe.image !== "null"
      ? recipe.image
      : "https://picsum.photos/1024";

  const imgData = await axios.get(imgUrl, { responseType: "arraybuffer" });
  const imgBuffer = Buffer.from(imgData.data);

  const dimensions = sizeOf(imgBuffer);

  // ✅ Compute height
const isType1 = (recipe?.type || []).some(t => Math.floor(t) === 1);

const imgHeight =
  isType1
    ? Math.round(PAGE_WIDTH * 0.37)
    : Math.round((dimensions.height / dimensions.width) * PAGE_WIDTH);

  const width = Math.round(PAGE_WIDTH);
  const height = Math.round(imgHeight);

  const croppedBuffer = await sharp(imgBuffer)
    .resize(width, height, { fit: "cover", position: "center" })
    .jpeg()
    .toBuffer();

  doc.image(croppedBuffer, { width, height, align: "center" });
  doc.moveDown(1);
} catch (err) {
  console.log("IMAGE ERROR FULL:", err);
  doc.font("Assistant").fontSize(14).text("Image failed to load", {
    align: "center",
  });
  doc.moveDown(1);
}

const types = recipe?.type || [];
let mainType = null;
if (types.some(t => Math.floor(t) === 1)) {
  mainType = 1;
} else if (types.some(t => Math.floor(t) === 2)) {
  mainType = 2;
} else if (types.some(t => Math.floor(t) === 10)) {
  mainType = 10;
}

  switch (mainType) {
    case 1: {
      // --- Title ---
      doc
        .fillColor("#30BFBF")
        .font("Rubik-Bold")
        .fontSize(28)
        .text(fixPdfText(recipe.title || ""), {
          align: "right",
          lineGap: 4,
          wordSpacing: 1,
        });

      // --- Author ---
      let startYIcons = doc.y;

      if (recipe.author) {
        const authorText = fixPdfText(recipe.author);
        const authorY = doc.y;

        doc
          .fillColor("#6C757D")
          .font("Assistant")
          .fontSize(18)
          .text(authorText, doc.page.margins.left, authorY, {
            width: PAGE_WIDTH,
            align: "right",
            lineGap: 4,
            wordSpacing: 1,
          });

        const authorHeight = doc.heightOfString(authorText, {
          width: PAGE_WIDTH,
        });

        startYIcons = authorY + authorHeight - 30;
      }

      // --- Meta icons ---
      const metaWidth = PAGE_WIDTH * 0.7;
      const gap = 32
      const itemWidth = (metaWidth - 2 * gap) / 3;
      const startX =
        doc.page.margins.left + (PAGE_WIDTH - metaWidth) / 2;

      const items = [
        { label: "קטגוריה", value: recipe.selectedCategories || "-", icon: "categories.png" },
        { label: "מנות", value: recipe.numserves || "-", icon: "numserves.png" },
        { label: "רמת קושי", value: recipe.level || "-", icon: "leveldifficulty.png" },
      ];

      const iconSize = 120;

      items.forEach((item, i) => {
        const x = startX + i * (itemWidth + gap);

        try {
          doc.image(
            path.join(process.cwd(), "assets/Icons/recipe1pdf", item.icon),
            x + (itemWidth - iconSize) / 2,
            startYIcons,
            { width: iconSize, height: iconSize }
          );
        } catch {}

        doc
          .fillColor("#30BFBF")
          .font("Heebo-Bold")
          .fontSize(16)
          .text(fixPdfText(item.label), x, startYIcons + iconSize - 38, {
            width: itemWidth,
            align: "center",
            wordSpacing: 1,
          });

        doc
          .fillColor("black")
          .font("Assistant")
          .fontSize(14)
          .text(fixPdfText(String(item.value)), x, startYIcons + iconSize - 18, {
            width: itemWidth,
            align: "center",
            wordSpacing: 1,
          });
      });


     const fixedYAfterIcons = startYIcons + iconSize + 10;

// --- Widths (100% total) ---
const colInstructions = PAGE_WIDTH * 0.63;
const divider = PAGE_WIDTH * 0.08;
const colIngredients = PAGE_WIDTH * 0.29;

// --- Fonts ---
const instructionsFontSize = recipe.insFont || 25;
const ingredientsFontSize = recipe.ingFont || 25;

const instructionsLineGap = Math.round((5 / 14) * instructionsFontSize);
const ingredientsLineGap = Math.round((5 / 14) * ingredientsFontSize);

// --- Positions ---
const startXCoulmns = doc.page.margins.left;
const boxY = fixedYAfterIcons;

const instructionsX = startXCoulmns;
const ingredientsX = startXCoulmns + colInstructions + divider;

// --- Text content ---
const instructionsText = getDisplayText(
  fixPdfText(stripHtmlPreserveLines(recipe.instructions || "-"))
);

const ingredientsText = getDisplayText(
  fixPdfText(stripHtmlPreserveLines(recipe.ingredients || "-"))
);

// --- Header height ---
const headerHeight = 28;

// 🔥 VERY IMPORTANT — lock both columns height
const maxBoxHeight = 400; // you can adjust this

// =======================
// 🔹 INSTRUCTIONS COLUMN
// =======================

doc
  .fillColor("#30BFBF")
  .font("Heebo-Bold")
  .fontSize(22)
  .text("הוראות הכנה", instructionsX, boxY, {
    width: colInstructions,
    align: "right",
    wordSpacing: 1,
  });

doc
  .fillColor("black")
  .font("Assistant")
  .fontSize(instructionsFontSize)
  .text(instructionsText, instructionsX, boxY + headerHeight, {
    width: colInstructions,
    height: maxBoxHeight,
    align: "right",
    lineGap: instructionsLineGap,
    wordSpacing: 1,
    ellipsis: true,
  });

// =======================
// 🔹 INGREDIENTS COLUMN
// =======================

doc
  .fillColor("#30BFBF")
  .font("Heebo-Bold")
  .fontSize(22)
  .text("מצרכים", ingredientsX, boxY, {
    width: colIngredients,
    align: "right",
    wordSpacing: 1,
  });

doc
  .fillColor("black")
  .font("Assistant")
  .fontSize(ingredientsFontSize)
  .text(ingredientsText, ingredientsX, boxY + headerHeight, {
    width: colIngredients,
    height: maxBoxHeight,      // 🔥 FIX
    align: "right",
    lineGap: ingredientsLineGap,
    wordSpacing: 1,
    ellipsis: true,
  });

// =======================
// 🔹 DIVIDER (fixed height)
// =======================

const dividerX = startXCoulmns + colInstructions + divider / 2;

doc
  .strokeColor("#CCCCCC")
  .lineWidth(1)
  .moveTo(dividerX, boxY)
  .lineTo(dividerX, boxY + headerHeight + maxBoxHeight)
  .stroke();
      break;
    }

    case 2:
      doc
        .font("Rubik-Bold")
        .fontSize(28)
        .text(fixPdfText(recipe.title || ""), {
          align: "center",
          wordSpacing: 1,
        });
      break;

    default:
      doc.font("Assistant").fontSize(20).text("Unknown recipe type", {
        align: "center",
      });
  }
};
export const PDFBook = async (req, res) => {
  const { BookID } = req.body;
  const userId = req.userId;

  try {
    if (!userId) return res.status(401).json({ message: 'No user ID found in the token' });

    const project = await projectmodel.findById(BookID).populate('recipes');
    if (!project) return res.status(404).json({ message: "Book not found" });

    const recipes = project.recipes;
    if (!recipes || recipes.length === 0) return res.status(400).json({ message: "Book has no recipes" });

    const doc = new PDFDocument({ size: 'A4', margin: 20 * 2.83, bufferPages: true });

    // ✅ Set headers before piping
const title = project.title || 'Book';

// Set PDF headers safely for Hebrew filenames
res.setHeader('Content-Type', 'application/pdf');
res.setHeader(
  'Content-Disposition',
  `inline; filename="Book.pdf"; filename*=UTF-8''${encodeURIComponent(title)}.pdf`
);

    doc.pipe(res);

    const PAGE_WIDTH = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    for (let i = 0; i < recipes.length; i++) {
      try {
        await renderRecipePage(doc, recipes[i], PAGE_WIDTH);
      } catch (err) {
        console.error(`Failed to render recipe ${recipes[i].title || i}:`, err);
        // Print error message in PDF instead of crashing
        doc.font('Assistant').fontSize(14).text(`Error rendering recipe ${i + 1}`, { align: 'center' });
      }
      if (i !== recipes.length - 1) doc.addPage();
    }

    doc.end();

  } catch (error) {
    console.error("PDF generation error:", error);

    if (!res.headersSent) {
      return res.status(500).json({ message: "Failed to generate PDF" });
    }
    // If headers already sent, just log
  }
};