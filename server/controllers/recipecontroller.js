import recipemodel from '../models/recipemodel.js';
import recipeAdminModel from '../models/recipeAdminModel.js';
import projectmodel from '../models/projectmodel.js';
import groupmodel from '../models/groupmodel.js';
import usermodel from '../models/usermodel.js';

import mongoose from 'mongoose';

import Replicate from "replicate";

import PDFDocument from 'pdfkit';
import axios from 'axios';
import path from 'path';
import sizeOf from 'image-size';


export const addnewrecipeAdmin = async (req, res) => {
  const formData = req.body;
  const userId = req.userId;
  try {
 const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new recipe using formData
    const newRecipe = new recipeAdminModel({
      owner: userId,
      type: formData.type || [1],
            ingFont: formData.ingFont || 1.1,
            insFont: formData.insFont || 1.1,    
    title: formData.title,
      author: formData.author,
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      selectedCategories: formData.selectedCategories || "",
      selectedTags: formData.selectedTags || [],
      level: formData.level || "",
      numserves: formData.numserves || "",
      country: formData.country || "",
    });

    // Save to DB
    const savedRecipe = await newRecipe.save();

    return res.status(200).json({
      recipe: savedRecipe,
    });
  } catch (error) {
    console.error("❌ Error creating recipe:", error);
    return res.status(500).json({ message: "Failed to create recipe" });
  }
};



export const addnewrecipe1fileimage = async (req, res) => {
  const recipe = req.body;
  const userId = req.userId;
  try {

  let imageData = null;
  if (recipe.imageFile) {
    // Remove the prefix from base64 data if present
    const base64Data = recipe.imageFile.replace(/^data:image\/\w+;base64,/, '');
    const contentType = `image/${recipe.imageExtension}`;

    imageData = {
      data: base64Data, 
      contentType: contentType  
    };
  }
  
  delete recipe.imageExtension;

  const recipeuser = new recipemodel({
    ...recipe, 
    imageFile: imageData,
    image: "", 
    owner: userId,
  });

    const newrecipe = await recipeuser.save();

    if (recipe.groups && recipe.groups.length === 1) {
      const groupId = recipe.groups[0];
      await groupmodel.findByIdAndUpdate(
        groupId,
        { $addToSet: { recipes: newrecipe._id } },
        { new: true }
      );
    }

    res.status(201).json(newrecipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const addnewrecipe1urlimage = async (req, res) => {
  const recipe = req.body;
  const userId = req.userId
  try {

  const recipeuser = {
    ...recipe,
    owner: userId,
  };

  const newrecipe = new recipemodel(recipeuser);

    await newrecipe.save();

    if (recipe.groups && recipe.groups.length === 1) {
      const groupId = recipe.groups[0];
      await groupmodel.findByIdAndUpdate(
        groupId,
        { $addToSet: { recipes: newrecipe._id } },
        { new: true }
      );
    }
    
    res.status(201).json(newrecipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

  export const editrecipepage = async (req, res) => {
    const recipe = req.body;
  
    const imageFiletype = recipe.imageFiletype;
    console.log("Image File Type:", recipe);

    let updatedRecipe;

    try {

    if (imageFiletype === 1) {
      // Find the recipe by its _id and update it with the properties from the recipe object
      updatedRecipe = await recipemodel.findByIdAndUpdate(
        recipe.id,
        {
          title: recipe.title,
          author: recipe.author,
                    ingFont: recipe.ingFont,
          insFont: recipe.insFont,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          image: recipe.image,
          imageFile: recipe.imageFile,
          selectedCategories: recipe.selectedCategories,
          selectedTags: recipe.selectedTags,
          level: recipe.level,
          numserves: recipe.numserves,
          groups: recipe.groups,
        },
        { new: true }
      );

      console.log("updatedRecipe 1:", updatedRecipe);

    } else if (imageFiletype === 2) {
      updatedRecipe = await recipemodel.findByIdAndUpdate(
        recipe.id,
        {
          ingFont: recipe.ingFont,
          insFont: recipe.insFont,
          title: recipe.title,
          author: recipe.author,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          image: "",
          imageFile: recipe.imageFile,
          selectedCategories: recipe.selectedCategories,
          selectedTags: recipe.selectedTags,
          level: recipe.level,
          numserves: recipe.numserves,
          groups: recipe.groups,
        },
        { new: true }
      );
    } else {

      let imageData = null;
        // Remove the prefix from base64 data if present
        const base64Data = recipe.imageFile.replace(/^data:image\/\w+;base64,/, '');
        const contentType = `image/${recipe.imageExtension}`;
    
        imageData = {
          data: base64Data, 
          contentType: contentType  
        };
      

      updatedRecipe = await recipemodel.findByIdAndUpdate(
        recipe.id,
        {
    ingFont: recipe.ingFont,
          insFont: recipe.insFont,
          title: recipe.title,
          author: recipe.author,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          image: "",
          imageFile: imageData,
          selectedCategories: recipe.selectedCategories,
          selectedTags: recipe.selectedTags,
          level: recipe.level,
          numserves: recipe.numserves,
          groups: recipe.groups,
        },
        { new: true }
      );
    
    }

     
       if (Array.isArray(recipe.groups) && recipe.groups.length > 0) {
       const groupId = recipe.groups[0]; // Extract the single group ID
       const group = await groupmodel.findById(groupId).exec();
       if (group) {
        // Check if the recipe ID is already in the group's recipes array
        if (!group.recipes.includes(updatedRecipe._id)) {
          group.recipes.push(updatedRecipe._id); // Add recipe ID if it doesn't exist
          await group.save(); // Save the updated group
        }
      }
    }

    res.status(201).json(updatedRecipe);
  }
   catch (error) {
    res.status(409).json({ message: error.message });
  }
};


  
  export const updaterecipe = async (req, res) => {
    const { id } = req.params;
    const recipe = req.body;
  

    try {

      const updatedRecipe = await recipemodel.findByIdAndUpdate(id, recipe, { new: true });

      
      if (!updatedRecipe) {
        return res.status(404).json({ message: "No recipe with that id found" });
      }
  
      res.json(updatedRecipe);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const geteditrecipepage = async (req, res) => {
    const { id } = req.params;
  
    try {
      const recipe = await recipemodel.findById(id);
  
      if (!recipe) {
        return res.status(404).json({ message: 'recipe not found' });
      }
  
      res.json(recipe);
  
    } catch (error) {
      res.status(500).json({ message: error.message }); // Send the error message if an error occurred
    }
  };

  
    export const deleteallrecipes = async (req, res) => {
    try {
      // Find all recipes
      const allRecipes = await recipemodel.find({});
  
      if (allRecipes.length === 0) {
        return res.status(404).json({ message: 'No recipes found' });
      }

      
      // Delete all recipes
      await Promise.all(allRecipes.map((recipe) => recipe.deleteOne()));
      console.log('All recipes deleted successfully'); // Log a success message

      res.json({ message: 'All recipes deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  //NEW
  //New recipe
  //Prompt for API image

  
function cleanHTML(text) {
  return text
    ?.replace(/<[^>]*>/g, "")  // remove HTML tags
    ?.replace(/&nbsp;/g, " ")
    ?.replace(/\s+/g, " ")
    ?.trim();
}

export const generateRecipePrompt = async (req, res) => {
  const imagedata = req.body;
  const userId = req.userId;

  try {
    // 1️⃣ Validate user
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
if (user.creditImage <= 20) {
  return res.status(403).json({ error: "No image credits remaining" });
}
    // 2️⃣ Extract fields
    const { title, ingredients } = imagedata;
    if (!title && !ingredients) {
      return res
        .status(400)
        .json({ error: "At least one field (title, ingredients) is required" });
    }

    const cleanIngredients = cleanHTML(ingredients);
    // 3️⃣ Build prompt
    const parts = [];
    if (title) parts.push(`Title: "${title}"`);
if (cleanIngredients) parts.push(`Ingredients: "${cleanIngredients}"`);

const fullPrompt = `
You are a culinary expert and cookbook page designer specializing in A4 print layouts and professional food photography prompts.

You receive partial or full recipe information:
${parts.join("\n")}

Step 1 — Content validation

Determine whether the provided content is related to a food dish or recipe.

If the content is NOT related to food or recipes, you MUST respond ONLY with the following JSON and nothing else:

{
  "shortRecipeName": "No recipe related",
  "imagePrompt": "No recipe related"
}

Do NOT generate an image prompt in this case.

Step 2 — If the content IS food or recipe related

Create a short 1–2 word recipe name that visually represents the dish.
Examples:
"Mushroom Pizza"
"Chocolate Cake"
"Avocado Salad"
"Lemon Pasta"

Then generate a professional food photography prompt optimized for Stable Diffusion SDXL.

The generated food image will be used for:
✔ A4 cookbook printing (300 DPI)
✔ Website display
✔ Google Discover thumbnails

The food photography prompt must emphasize:

Food presentation:
- beautiful plating
- visible texture and detail
- appetizing and realistic appearance
- fresh ingredients and natural color

Photography style:
- professional studio food photography
- soft natural light or controlled studio lighting
- shallow depth of field
- 85mm or 50mm food photography lens
- crisp focus on the food

Composition rules:
- wide landscape banner composition
- main dish centered in the frame
- subject within the central 60% of the frame
- safe margins around edges for cropping
- no important elements touching edges
- slight top-down or 45° camera angle allowed

Background:
- neutral and subtle
- minimal props allowed (napkin, plate, wooden board)
- background must not distract from the dish

Technical requirements:
Aspect ratio: approximately 2.7:1  
Resolution target: around 2700 × 1000 pixels  
Orientation: landscape banner

Cropping safety:
The image must allow safe cropping to 482 × 178 pixels without losing the main dish or key visual elements.

Restrictions:
- no text
- no watermarks
- no logos
- no people
- no hands
- no overlays

Style:
- realistic food photography
- cookbook professional look
- natural lighting
- highly detailed
- photorealistic

Output rules:
- Must describe a finished dish (not just a raw ingredient)
- Must always respond in English
- Output JSON only
- No explanations

Respond exactly with:

{
  "shortRecipeName": "...",
  "imagePrompt": "..."
}
`;

    // 4️⃣ Call Replicate
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });


const MODEL_ID = "meta/llama-4-maverick-instruct";

const output = await replicate.run(MODEL_ID, {
  input: {
    prompt: fullPrompt,
    max_tokens: 200,
    temperature: 0.7,
    top_p: 1,
  
  system_prompt: "You are a culinary expert and image prompt designer. Your job is to analyze recipe-related input and respond with a short recipe name and a detailed image prompt. Always reply in valid JSON format with no extra commentary. If the input is not food-related, return 'No recipe related' for both fields."
},
});

    // Parse JSON
    let shortRecipeName = "No recipe related";
    let imagePrompt = "No recipe related";

let messageClean = "";

// When model returns an array of events with { text }:
if (Array.isArray(output)) {
  messageClean = output.join("").trim();   // ✅ THIS FIXES IT
} else if (typeof output === "string") {
  messageClean = output.trim();
}

    try {
      const parsed = JSON.parse(messageClean);
      shortRecipeName = parsed.shortRecipeName || shortRecipeName;
      imagePrompt = parsed.imagePrompt || imagePrompt;
    } catch {
      const jsonMatch = messageClean.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
     try {
      const parsed = JSON.parse(jsonMatch[0]);
      shortRecipeName = parsed.shortRecipeName || shortRecipeName;
      imagePrompt = parsed.imagePrompt || imagePrompt;
    } catch (err) {
      console.warn("⚠️ Failed fallback JSON parse:", err);
    }
      }
    }

    user.creditImage = Math.max(0, user.creditImage - 0.1);
    await user.save();

return res.status(200).json({ shortRecipeName, imagePrompt, creditImage: user.creditImage });


  } catch (error) {
    console.error("❌ Error generating recipe prompt:", error);
    return res.status(500).json({ error: "Failed to generate recipe prompt" });
  }
};


export const fetchUnsplashImages = async (req, res) => {
  try {
    const userId = req.userId;
    const { shortRecipeName } = req.body;
    if (!shortRecipeName) {
      return res.status(400).json({ message: "shortRecipeName is required" });
    }

   const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
if (user.creditImage <= 20) {
  return res.status(403).json({ error: "No image credits remaining" });
}

    const accessKey = process.env.UNSPLASH_ACCESS_KEY; 
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(shortRecipeName)}&client_id=${accessKey}&per_page=20`
    );

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return res.status(200).json({ images: [] });
    }

    const suitableImages = data.results
      .filter((result) => (result.width / result.height) >= 1)
      .map((result) => result.urls.small);

    const firstNineImages = suitableImages.slice(0, 9);

        user.creditImage = Math.max(0, user.creditImage - 0.3);
    await user.save();

return res.status(200).json({ firstNineImages, creditImage: user.creditImage });

  } catch (error) {
    console.error("❌ Unsplash API Error:", error.message);
    return res.status(500).json({ message: "Unsplash fetch failed" });
  }
};


export const apiAIImage = async (req, res) => {
  try {
    const userId = req.userId;
    const { imagePrompt } = req.body;

        if (!imagePrompt) {
      return res.status(400).json({ message: "imagePrompt is required" });
    }

    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.creditImage <= 20) {
      return res.status(403).json({ error: "No image credits remaining" });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

const version = "stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc";
        let prediction = await replicate.predictions.create({
      version,
      input: {
        prompt: imagePrompt,
        width: 1024,
        height: 1024,
        num_inference_steps: 40,
        guidance_scale: 7.5,
        refine: "expert_ensemble_refiner",
        apply_watermark: false,
      }
    });

    // ✅ Wait until completed
    while (prediction.status !== "succeeded" && prediction.status !== "failed") {
      await new Promise(resolve => setTimeout(resolve, 2000));
      prediction = await replicate.predictions.get(prediction.id);
    }

    if (prediction.status === "failed") {
      throw new Error("Model failed to generate image");
    }

    const imageAI = prediction.output[0];

    console.log("✅ AI Image created:", imageAI);

    if (!imageAI) {
      throw new Error("No output image URL returned from model");
    }

    // Deduct 1 credit
    user.creditImage = Math.max(0, user.creditImage - 1);
    await user.save();

    return res.status(200).json({
      imageAI,
      creditImage: user.creditImage
    });

  } catch (error) {
    console.error("❌ AI Image Error:", error.message);
    return res.status(500).json({ message: "AI Image generation failed" });
  }
};





export const addnewrecipe = async (req, res) => {
  const formData = req.body;
  const userId = req.userId;
  try {
 const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new recipe using formData
    const newRecipe = new recipemodel({
      owner: userId,
      type: formData.type || [1],
      ingFont: formData.ingFont || 1.1,
      insFont: formData.insFont || 1.1,
      title: formData.title,
      author: formData.author,
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      selectedCategories: formData.selectedCategories || "",
      selectedTags: formData.selectedTags || [],
      level: formData.level || "",
      numserves: formData.numserves || "",
groups: formData.groupId ? [formData.groupId] : [],
    });

    // Save to DB
    const savedRecipe = await newRecipe.save();

 if (formData.groupId) {
   await groupmodel.findByIdAndUpdate(
    formData.groupId,
    {
          $addToSet: { recipes: savedRecipe._id },
          $inc: { recipesNum: 1 },
        },      { new: true }
    );
  }

  user.creditImage = user.creditImage + 3;
await user.save();

    return res.status(200).json({
      recipe: savedRecipe,
    });
  } catch (error) {
    console.error("❌ Error creating recipe:", error);
    return res.status(500).json({ message: "Failed to create recipe" });
  }
};


export const editrecipe = async (req, res) => {
  const editData = req.body;
  const userId = req.userId;
  try {
  
 const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

const isAdmin = (editData.type || []).some(t => t > 4);

let recipe;

if (isAdmin) {
  recipe = await recipeAdminModel.findById(editData.id);
} else {
  recipe = await recipemodel.findById(editData.id);
}

if (!recipe) {
  return res.status(405).json({ message: "Recipe not found" });
}


    // Optional: verify that the user is the owner
    if (recipe.owner.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
            console.log(recipe);

recipe.owner = userId;
    recipe.type = editData.type || [1];
    recipe.ingFont = editData.ingFont || 1.1;
    recipe.insFont = editData.insFont || 1.1;
            console.log(editData.insFont);

      recipe.title = editData.title;
    recipe.author = editData.author;
    recipe.ingredients = editData.ingredients;
    recipe.instructions = editData.instructions;
    recipe.selectedCategories = editData.selectedCategories || "";
    recipe.selectedTags = editData.selectedTags || [];
    recipe.level = editData.level || "";
    recipe.numserves = editData.numserves || "";
    recipe.groups = editData.groups || [];

    // Save the update
    const updatedRecipe = await recipe.save();
    console.log(updatedRecipe);

    return res.status(200).json({ recipe: updatedRecipe });
  } catch (error) {
    console.error("❌ Error editing recipe:", error);
    return res.status(500).json({ message: "Failed to edit recipe" });
  }
};

export const fetchRecipeById = async (req, res) => {
    const { id } = req.body;
  const userId = req.userId;

  try {
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the recipe by id
    const recipe = await recipemodel.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    return res.status(200).json({ recipe });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addtofavoriterecipe = async (req, res) => {
  const modalTaskCuisine = req.body;
  const userId = req.userId
  try {
    const types = modalTaskCuisine?.type || [];
const isAdminRecipe = types.some(t => Math.floor(t) >= 3);
    const Model = isAdminRecipe ? recipeAdminModel : recipemodel;

  const updatedModalTaskCuisine = await Model.findByIdAndUpdate(
    modalTaskCuisine._id,
    { $addToSet: { favorite: userId } },
    { new: true }
  );

   const updatedUser = await usermodel.findByIdAndUpdate(
      userId,
      isAdminRecipe
        ? { $addToSet: { favoriteAdmin: modalTaskCuisine._id } }
        : { $addToSet: { favorite: modalTaskCuisine._id } },
      { new: true }
    );
     return res.status(200).json({ updatedModalTaskCuisine });
  } catch (error) {
    res.status(500).json({ message: "Failed to favorite" });  
  }
};

export const removefavoriterecipe = async (req, res) => {
  const modalTaskCuisine = req.body;
  const userId = req.userId
  try {
   
const types = modalTaskCuisine?.type || [];
const isAdminRecipe = types.some(t => Math.floor(t) >= 3);
    const Model = isAdminRecipe ? recipeAdminModel : recipemodel;
  const updatedRecipe  = await Model.findByIdAndUpdate(
    modalTaskCuisine._id,
    { $pull: { favorite: userId } },
    { new: true }
  );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    
   const updatedUser = await usermodel.findByIdAndUpdate(
      userId,
      isAdminRecipe
        ? { $pull: { favoriteAdmin: modalTaskCuisine._id } }
        : { $pull: { favorite: modalTaskCuisine._id } },
      { new: true }
    );

 return res.status(200).json({ updatedRecipe });

  } catch (error) {
    res.status(500).json({ message: "Failed to favorite" });  
  }
};
  export const deleterecipe = async (req, res) => {
  const { deleteId } = req.body;
  const userId = req.userId

  try {
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const recipe = await recipemodel.findById(deleteId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.owner.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this recipe' });
    }

    await recipemodel.findByIdAndDelete(deleteId);

 
// remove from favorite
const favIndex = user.favorite.findIndex(
  (favId) => favId.toString() === deleteId
);
if (favIndex !== -1) {
  user.favorite.splice(favIndex, 1);
}
// remove from favoriteAdmin
const favAdminIndex = user.favoriteAdmin.findIndex(
  (favId) => favId.toString() === deleteId
);
if (favAdminIndex !== -1) {
  user.favoriteAdmin.splice(favAdminIndex, 1);
}
await user.save();
    

return res.status(200).json({ deleteRecipeId: deleteId });

  } catch (error) {
    console.error('Delete recipe error:', error);
    return res.status(500).json({ message: 'Failed to delete recipe' });
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
    .split("\n")
    .map(line =>
      line
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .reverse()
        .join(" ")
    )
    .join("\n");
};

export const stripHtmlPreserveLines = (html = "") => {
  return String(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
};

// ===============================
// Main render
// ===============================
export const renderRecipePage = async (doc, recipe, PAGE_WIDTH) => {
  registerFonts(doc);

  // --- Image ---
  const imgUrl = recipe.image || "https://via.placeholder.com/1024x1024";

  try {
    const imgData = await axios.get(imgUrl, { responseType: "arraybuffer" });
    const imgBuffer = Buffer.from(imgData.data, "binary");
    const dimensions = sizeOf(imgBuffer);

    const isType1 = (recipe?.type || []).some(t => Math.floor(t) === 1);
const imgHeight =
  isType1
    ? Math.round(PAGE_WIDTH * 0.37)
    : Math.round((dimensions.height / dimensions.width) * PAGE_WIDTH);

    doc.image(imgBuffer, {
      width: PAGE_WIDTH,
      height: imgHeight,
      align: "center",
    });


    doc.moveDown(1);
  } catch {
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

      doc.y = startYIcons + iconSize + 10;

// --- Columns ---
const colInstructions = PAGE_WIDTH * 0.63;
const divider = PAGE_WIDTH * 0.08;
const colIngredients = PAGE_WIDTH * 0.29;
const startY = doc.y;

// Adjust amount to shift left (e.g., 20 points)
const shiftLeft = 20;

// Instructions
doc.x = doc.page.margins.left - shiftLeft;
doc
  .fillColor("#30BFBF")
  .font("Heebo-Bold")
  .fontSize(22)
  .text(fixPdfText("הוראות הכנה"), {
    width: colInstructions,
    align: "right",
    wordSpacing: 1,
  });

doc.moveDown(0.5);

const instructionsText = fixPdfText(
  stripHtmlPreserveLines(recipe.instructions || "-")
);

doc
  .fillColor("black")
  .font("Assistant")
  .fontSize(14)
  .text(instructionsText, {
    width: colInstructions,
    align: "right",
    lineGap: 5,
    wordSpacing: 1,
  });

// Ingredients (unchanged X)
doc.y = startY;
doc.x = doc.page.margins.left + colInstructions + divider;

doc
  .fillColor("#30BFBF")
  .font("Heebo-Bold")
  .fontSize(22)
  .text(fixPdfText("מצרכים"), {
    width: colIngredients,
    align: "right",
    wordSpacing: 1,
  });

doc.moveDown(0.5);

const ingredientsText = fixPdfText(
  stripHtmlPreserveLines(recipe.ingredients || "-")
);

doc
  .fillColor("black")
  .font("Assistant")
  .fontSize(14)
  .text(ingredientsText, {
    width: colIngredients,
    align: "right",
    lineGap: 5,
    wordSpacing: 1,
  });

// Divider (shifted left)
const dividerX =
  doc.page.margins.left + colInstructions + divider / 2 - shiftLeft;

const bottom = Math.max(
  startY + doc.heightOfString(instructionsText, { width: colInstructions }),
  startY + doc.heightOfString(ingredientsText, { width: colIngredients })
);

doc
  .strokeColor("#CCCCCC")
  .lineWidth(1)
  .moveTo(dividerX, startY + 5)
  .lineTo(dividerX, bottom + 300)
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
 export const PDFRecipe = async (req, res) => {
  const { RecipeID } = req.body;
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(401).json({
        message: "No user ID found in token",
      });
    }

    const recipe = await recipemodel.findById(RecipeID);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    // ===== SAME DOCUMENT SETTINGS =====
    const doc = new PDFDocument({
      size: "A4",
      margin: 20 * 2.83,
    });

    const title = recipe.title || "Recipe";

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="Recipe.pdf"; filename*=UTF-8''${encodeURIComponent(title)}.pdf`
    );

    doc.pipe(res);

    const PAGE_WIDTH =
      doc.page.width -
      doc.page.margins.left -
      doc.page.margins.right;

    // ✅ THIS IS YOUR DESIGN
    await renderRecipePage(doc, recipe, PAGE_WIDTH);

    doc.end();
  } catch (error) {
    console.error("PDF single recipe error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        message: "Failed to generate PDF",
      });
    }
  }
};


export const copyrecipe = async (req, res) => {
  const item = req.body;
  const userId = req.userId
  try {

const types = item?.type || [];
const isType1 = types.every(t => Math.floor(t) < 3 || Math.floor(t) > 9);

const Model = isType1 ? recipemodel : recipeAdminModel;
const isAdminRecipe = !isType1;

    const favoriteArray = item.favorite.includes(userId) ? [userId] : [];

const updatedPredecessor = [
  ...(item.predecessor || []),
  {
    owner: item.owner,
    recipeID: item._id,
    typeRec: "copy",
  },
];
    const recipeuser = {
      ...item,
      owner: userId,
      type: [1],
   predecessor: updatedPredecessor,
      book: null, 
      groups: [],
      favorite: favoriteArray, 
    };

  delete recipeuser._id;

    const newrecipe = new recipemodel(recipeuser); 
    await newrecipe.save();


    const updatedFavoriteArray = item.favorite.filter(id => id !== userId);

const previousrecipe = await Model.findByIdAndUpdate(
      item._id,
      { 
        $set: { favorite: updatedFavoriteArray } // Update the favorite array
      },      { new: true }
    );

      const user = await usermodel.findById(userId);
    if (user) {
if (isAdminRecipe) {
  // 🔹 Check in favoriteAdmin
  const favIndex = user.favoriteAdmin.findIndex(
    (favId) => favId.toString() === item._id.toString()
  );
  if (favIndex !== -1) {
    // remove from favoriteAdmin
    user.favoriteAdmin.splice(favIndex, 1);
    // add to favorite
    user.favorite.push(newrecipe._id);
    await user.save();
  }
} else {
  // 🔹 Regular recipe → replace inside favorite
  const favIndex = user.favorite.findIndex(
    (favId) => favId.toString() === item._id.toString()
  );

  if (favIndex !== -1) {
    user.favorite[favIndex] = newrecipe._id;
    await user.save();
  }
}
      // If not found, do nothing
    }


    res.status(201).json({ newrecipe,previousrecipe});
  } catch (error) {
    res.status(500).json({ message: "Failed to copy recipe." });  
  }
};