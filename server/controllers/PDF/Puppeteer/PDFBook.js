import puppeteer from "puppeteer";

import ItemDisplayPDF1 from "./ItemDisplayPDF1.js";
import ItemDisplayPDF2 from "./ItemDisplayPDF2.js";
import ItemDisplayPDF10 from "./ItemDisplayPDF10.js";

import projectmodel from "../../../models/projectmodel.js";
import recipemodel from "../../../models/recipemodel.js";
import recipeAdminModel from "../../../models/recipeAdminModel.js";

export const PDFBook = async (req, res) => {
  const { BookID, RecipeID } = req.body;
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(401).json({ message: "No user ID found in token" });
    }

    let project = null;
    let recipes = [];

    // =====================
    // LOAD DATA
    // =====================

    if (RecipeID) {
      let recipe = await recipemodel.findById(RecipeID);
      if (!recipe) recipe = await recipeAdminModel.findById(RecipeID);

      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      recipes = [recipe];
    } else {
      project = await projectmodel.findById(BookID).populate("recipes");

      if (!project) {
        return res.status(404).json({ message: "Book not found" });
      }

      recipes = project.recipes || [];
    }

    // =====================
    // DESIGN ENGINE
    // =====================

    const getMainType = (typeArray = []) => {
      const normalized = typeArray.map((t) => Math.floor(Number(t)));

      if (normalized.some((t) => t === 1)) return 1;
      if (normalized.some((t) => t === 2)) return 2;
      return 10;
    };

    const designMap = {
      1: ItemDisplayPDF1,
      2: ItemDisplayPDF2,
      10: ItemDisplayPDF10,
    };

    // =====================
    // HTML BUILD
    // =====================

    const recipesHTML = recipes
      .map((item) => {
        const mainType = getMainType(item?.type || []);
        const Template = designMap[mainType] || ItemDisplayPDF1;

        return `
          <div class="page">
            ${Template({ item })}
          </div>
        `;
      })
      .join("");

    const html = `
      <html dir="rtl">
        <head>
          <meta charset="utf-8" />

          <style>
            * {
              box-sizing: border-box;
            }

            html, body {
              margin: 0;
              padding: 0;
            }

            .page {
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 0;

              position: relative;
              overflow: hidden;

              page-break-after: always;
              break-after: page;
            }

            .page:last-child {
              page-break-after: auto;
            }
          </style>
        </head>

        <body>
          ${recipesHTML}
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    await page.emulateMediaType("screen");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
      },
      displayHeaderFooter: true,
      headerTemplate: `<div></div>`,
      footerTemplate: `
        <div style="width:100%;text-align:center;font-size:10px;color:#999;">
          <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
      `,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="book.pdf"',
    });

    return res.send(pdfBuffer);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "PDF generation failed" });
  }
};