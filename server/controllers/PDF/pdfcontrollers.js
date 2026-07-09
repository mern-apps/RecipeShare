import projectmodel from '../../models/projectmodel.js';
import recipemodel from '../../models/recipemodel.js';
import recipeAdminModel from '../../models/recipeAdminModel.js';

import PDFDocument from 'pdfkit';
import sharp from "sharp";
import axios from 'axios';

import { renderIngredientsAndInstructions } from './cases/case1/renderIngredientsAndInstructions.js';
import { case1 } from "./cases/case1/case1.js";
import { case10and2 } from "./cases/case10and2.js";

import { registerFonts } from "./registerFonts.js";

import { FONT_COLOR_OPTIONS } from '../../assets/fontColor.js';
import { FONT_SIZE_OPTIONS } from '../../assets/fontSize.js';

import path from 'path';
import sizeOf from 'image-size'; // ES import
import mongoose from 'mongoose';



export const fixPdfText = (input = "") => {
  if (!input) return "";
  const normalized = String(input)
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();
  return normalized;
};

// ===============================
// Main render
// ===============================
export const renderRecipePage = async (doc, recipe, PAGE_WIDTH) => {
  registerFonts(doc);

  let mainType = null;

  try {

       const types = recipe?.type || [];
if (types.some(t => Math.floor(t) === 1)) {
  mainType = 1;
} else if (types.some(t => Math.floor(t) === 2)) {
  mainType = 2;
} else if (types.some(t => Math.floor(t) === 10)) {
  mainType = 10;
}

    const imgUrl =
    recipe.image && recipe.image !== "null"
      ? recipe.image
      : "https://picsum.photos/1024";

  const imgData = await axios.get(imgUrl, { responseType: "arraybuffer" });
  const imgBuffer = Buffer.from(imgData.data);

  const dimensions = sizeOf(imgBuffer);

  // ✅ Compute height
const pageHeight = doc.page.height - doc.page.margins.top - doc.page.margins.bottom;

const imgHeight =
  mainType === 1
    ? Math.round(PAGE_WIDTH * 0.37)
    : Math.round(pageHeight);  

  const width = Math.round(PAGE_WIDTH);
  const height = Math.round(imgHeight);

  const croppedBuffer = await sharp(imgBuffer)
    .resize(width, height, { fit: "cover", position: "center" })
    .jpeg()
    .toBuffer();

  doc.image(croppedBuffer, { width, height, align: "center" });

} catch (err) {
  console.log("IMAGE ERROR FULL:", err);
  doc.font("Assistant").fontSize(14).text("Image failed to load", {
    align: "center",
  });


if (mainType === 1) {
  doc.moveDown(0.3);
}
}

  switch (mainType) {
      case 1: 
  await case1({
    doc,
    recipe,
    PAGE_WIDTH,
  });

  break;

case 2:
case 10:
  case10and2({
    doc,
    recipe,
    mainType,
    fixPdfText,
    FONT_SIZE_OPTIONS,
    FONT_COLOR_OPTIONS,
  });
  break;

    default:
      doc.font("Assistant").fontSize(20).text("Unknown recipe type", {
        align: "center",
      });
  }
};
export const PDFBook = async (req, res) => {
  const { BookID,RecipeID } = req.body;
  const userId = req.userId;

  try {
    if (!userId) return res.status(401).json({ message: 'No user ID found in the token' });

    let project = null;
   let recipes = [];

  // 🍳 SINGLE RECIPE MODE (priority)
if (RecipeID) {
  let recipe = await recipemodel.findById(RecipeID);
  if (!recipe) {
    recipe = await recipeAdminModel.findById(RecipeID);
  }
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  recipes = [recipe];
}
  // 📘 BOOK MODE (fallback)
  else {
  project = await projectmodel.findById(BookID).populate('recipes');

  if (!project) {
    return res.status(404).json({ message: "Book not found" });
  }

  recipes = project.recipes || [];
}

let title = RecipeID
  ? recipes[0]?.title || "Recipe"
  : project?.title || "Book";

if (!recipes || recipes.length === 0) return res.status(400).json({ message: "Book has no recipes" });
const doc = new PDFDocument({ size: 'A4', margin: 20 * 2.83, bufferPages: true });

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





