
import path from "path";
import { renderIngredientsAndInstructions } from './renderIngredientsAndInstructions.js';

export const fixPdfText = (input = "") => {
  if (!input) return "";
  const normalized = String(input)
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();
  return normalized;
};

export const case1 = async ({
  doc,
  recipe,
  PAGE_WIDTH,
}) => {

  const textOptionstitle = {
    align: "right",
    features: ["rtla"],
  };

  // --- Title ---
  doc
    .fillColor("#30BFBF")
    .font("Alef-Bold")
    .fontSize(28)
    .text(recipe.title, textOptionstitle);

  // --- Author ---
  let startYIcons = doc.y;

  if (recipe.author) {
    const authorText = fixPdfText(recipe.author);
    const authorY = doc.y;

    doc
      .fillColor("#6C757D")
      .font("Alef-Regular")
      .fontSize(18)
      .text(
        recipe.author,
        doc.page.margins.left,
        authorY - 3,
        textOptionstitle
      );

    const authorHeight = doc.heightOfString(authorText, {
      width: PAGE_WIDTH,
    });

    startYIcons = authorY + authorHeight - 30;
  }

  // --- Meta icons ---
  const metaWidth = PAGE_WIDTH * 0.7;
  const gap = 32;
  const itemWidth = (metaWidth - 2 * gap) / 3;

  const startX =
    doc.page.margins.left + (PAGE_WIDTH - metaWidth) / 2;

  const items = [
    {
      label: "קטגוריה",
      value: recipe.selectedCategories || "-",
      icon: "categories.png",
    },
    {
      label: "מנות",
      value: recipe.numserves || "-",
      icon: "numserves.png",
    },
    {
      label: "רמת קושי",
      value: recipe.level || "-",
      icon: "leveldifficulty.png",
    },
  ];

  const iconSize = 120;

  items.forEach((item, i) => {
    const x = startX + i * (itemWidth + gap);

    try {
      doc.image(
        path.join(
          process.cwd(),
          "assets/Icons/recipe1pdf",
          item.icon
        ),
        x + (itemWidth - iconSize) / 2,
        startYIcons,
        {
          width: iconSize,
          height: iconSize,
        }
      );
    } catch {}

    const label = fixPdfText(item.label || "-");
    const value = fixPdfText(item.value || "-");

    const textOptionslogo = {
      width: itemWidth,
      align: "center",
      features: ["rtla"],
    };

    // Label
    doc
      .fillColor("#30BFBF")
      .font("Alef-Regular")
      .fontSize(16)
      .text(
        label,
        x,
        startYIcons + iconSize - 45,
        textOptionslogo
      );

    // Value
    doc
      .fillColor("black")
      .font("Alef-Regular")
      .fontSize(14)
      .text(
        value,
        x,
        startYIcons + iconSize - 26,
        textOptionslogo
      );
  });

  const fixedYAfterIcons =
    startYIcons + iconSize + 10;

  renderIngredientsAndInstructions(
    doc,
    recipe,
    PAGE_WIDTH,
    fixedYAfterIcons
  );
};