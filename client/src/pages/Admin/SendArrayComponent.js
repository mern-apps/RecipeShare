import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addnewrecipeAdmin } from '../../actions/recipeNewForm.js';
import {apiAIImage } from '../../actions/recipeNewForm.js';
import { generateRecipePrompt } from '../../actions/recipeNewForm.js';
import { uploadimageAdminBest } from '../../actions/imagesactions.js';

const SendArrayComponent = () => {
  const dispatch = useDispatch();
  const [imageAI, setimageAI] = useState(null);
  const [loading, setLoading] = useState(false);

const type = [6.5];

const recipesArray = [
  {
    ingFont: 1.1,
    insFont: 1.1,
   title: "מרק קארי תאילנדי ירוק עם עוף וירקות",
    author: "Admin",
   ingredients: `400 גרם חזה עוף חתוך לקוביות
1 כף משחת קארי ירוק תאילנדי
1 קופסת חלב קוקוס (400 מ"ל)
2 גבעולי למון גראס
3 פרוסות ג’ינג’ר
1 פלפל ירוק חריף קצוץ
200 גרם קישואים ופלפלים חתוכים לקוביות
2 כפות רוטב דגים
מיץ ליים לפי הטעם
חופן כוסברה קצוצה`,
    instructions: `מחממים מחבת רחבה ומטגנים את משחת הקארי הירוק עד שמפיצה ריח.
מוסיפים חלב קוקוס ולמון גראס ומביאים לרתיחה עדינה.
מוסיפים את קוביות העוף ומבשלים 5-6 דקות.
מוסיפים את הירקות ומבשלים 4-5 דקות נוספות.
מתבלים ברוטב דגים ומיץ ליים.
מגישים חם עם כוסברה מעל.`,
    selectedCategories: "מרקים",
    selectedTags: ["עוף", "חריף", "מהיר / קל להכנה"],
    level: "בינוני",
    numserves: "3-4",
    country: "Thailand"
  },
  {
   ingFont: 1.1,
    insFont: 1.1,
        title: "מרק פאד תאי (Pad Thai Soup) עם טופו ואטריות אורז",
    author: "Admin",
   ingredients: `200 גרם אטריות אורז דקות
150 גרם טופו חתוך לקוביות
1 ליטר ציר ירקות או עוף
2 כפות רוטב סויה
1 כף שמן שומשום
2 גבעולי בצל ירוק קצוצים
1 פלפל אדום פרוס דק
חופן בוטנים קלויים קצוצים
מיץ חצי ליים`,
    instructions: `מרתיחים את הציר ומוסיפים את אטריות האורז, מבשלים עד שהן רכות.
מטגנים את הטופו עם שמן שומשום ומוסיפים למרק.
מוסיפים את רוטב הסויה והירקות ומבשלים 2-3 דקות.
מגישים חם עם בוטנים קצוצים, בצל ירוק ומיץ ליים מעל.`,
    selectedCategories: "מרקים",
    selectedTags: ["צמחוני", "מהיר / קל להכנה"],
    level: "קל",
    numserves: "2-3",
    country: "Thailand"
  }
];
  const handleGenerateAll = async () => {
    try {
      setLoading(true);

      for (const item of recipesArray) {

        let { title, ingredients } = item;

             const formData = {
          type: type,
   ingFont: 1.1,
    insFont: 1.1,
             title: item.title,
          author: item.author,
          ingredients: item.ingredients,
          instructions: item.instructions,
          selectedCategories: item.selectedCategories,
          selectedTags: item.selectedTags,
          level: item.level,
          numserves: item.numserves,
          country: item.country,
        };
        
        // 1️⃣ Save recipe
        const savedRecipe = await dispatch(addnewrecipeAdmin(formData));
        let savedItemID = savedRecipe._id;

        // 2️⃣ Trim title + ingredients
        title = title.trim();
        ingredients = ingredients.trim();

        // 3️⃣ Generate prompt
        const imagedata = {
          title,
          ingredients,
        };

        const selectedOption = "ImageAI";

        const PromptAPI = await dispatch(generateRecipePrompt(imagedata, selectedOption));

        const { imagePrompt } = PromptAPI;
        const imageAI = await dispatch(apiAIImage(imagePrompt));
      
  console.log('2222222imageAI:', imageAI);

        // 5️⃣ Convert image URL to File
        const response = await fetch(imageAI);
        const blob = await response.blob();
        const file = new File([blob], "ai-generated.png", { type: blob.type });

        const imagePreview = {
          file,
          name: file.name,
          type: file.type,
        };

        // 6️⃣ Upload image
        const imagefile = imagePreview.file;
        const fileDetails = {
          fileName: imagePreview.name,
          fileType: imagePreview.type,
          operation: "upload",
          savedItemID,
        };

        await dispatch(uploadimageAdminBest(imagefile, fileDetails));
      }

      alert("All recipes generated successfully 🚀");

    } catch (error) {
      console.error(error);
      alert("Something failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateAll} disabled={loading}>
        {loading ? "Generating..." : "Generate All Recipes"}
      </button>
    </div>
  );
};

export default SendArrayComponent;

