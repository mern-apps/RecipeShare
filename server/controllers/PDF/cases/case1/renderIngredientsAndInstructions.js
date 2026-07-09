
import { FONT_COLOR_OPTIONS } from '../../../../assets/fontColor.js';
import { FONT_SIZE_OPTIONS } from '../../../../assets/fontSize.js';

const formatRtlText = (input = "") => {
  if (!input) return "";
  const normalized = String(input)
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();
  return normalized;
};

const getFontConfig = (value = 1.1) => {
  const raw = Number(value);
  const sizeType = Math.floor(raw);
  const colorType = Number((raw % 1).toFixed(1));
  // TRUE when there is 0.01
  const withBullets =
    Math.floor((raw * 100) % 10) !== 0;
  return {
    fontSize:
      FONT_SIZE_OPTIONS.find(s => s.type === sizeType)?.value || 25,
    fontColor:
      FONT_COLOR_OPTIONS.find(c => c.type === colorType)?.value || "#000",
    withBullets,
  };
};


export const renderIngredientsAndInstructions = (doc, recipe, PAGE_WIDTH, startY) => {
  const startX = doc.page.margins.left;
  const colInstructions = PAGE_WIDTH * 0.63;
  const dividerGap = PAGE_WIDTH * 0.08;
  const colIngredients = PAGE_WIDTH * 0.29;
  const headerHeight = 28;
  const maxBoxHeight = 400;

  const bodyOffset = 5;
let currentYIngredients = startY + headerHeight + bodyOffset;
let currentYInstructions = startY + headerHeight + bodyOffset;

  const marginBottom = doc.page.margins.bottom || 40;

const {
  fontSize: fontSizeIng,
  fontColor: fontColorIng,
  withBullets: withBulletsIng,
} = getFontConfig(recipe.ingFont);

const {
  fontSize: fontSizeIns,
  fontColor: fontColorIns,
  withBullets: withBulletsIns,
} = getFontConfig(recipe.insFont);

  const ingredientsX = startX + colInstructions + dividerGap;
  const instructionsX = startX;
const lineGapIng = fontSizeIng * 0.08;
const lineGapIns = fontSizeIns * 0.08;

  const textIngredientsOptions = {
    width: colIngredients,
    align: "right",
    features: ["rtla"],
  };
  // -------- HEADER --------
  const headerIngredientsText = "רכיבים";
  doc
    .fillColor("#30BFBF")
    .font("Alef-Regular")
    .fontSize(22)
    .text(headerIngredientsText, ingredientsX, startY, textIngredientsOptions);
  // -------- BODY --------
  doc
   .fillColor(fontColorIng)
.font("Alef-Regular")
.fontSize(fontSizeIng);
  const rawIngredients = recipe.ingredients?.trim() || "-";
  const paragraphsIngredients = formatRtlText(rawIngredients)
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);


    //
    //PdfKit automatically wraps long lines inside the column width.
//When a line wraps, PdfKit aligns the new line to the right edge of the box, not the exact X coordinate.
//If the line starts with a short word, it can look slightly “outdented.”
//The solution
//Manually splitting each paragraph into lines that fit inside the column width.
//Rendering each line individually at the fixed ingredientsX position.


paragraphsIngredients.forEach((para) => {
  const paraWithBullet = withBulletsIng
    ? `• ${para}`
    : para;

  // Use pdfkit's built-in wrapping, don't manually split
 doc.text(paraWithBullet, ingredientsX, currentYIngredients, {
  width: colIngredients,
  align: "right",
  features: ["rtla"],
  continued: false,
  // trailingIndent is tricky in PDFKit, usually you simulate it manually
});

  // Update Y
  currentYIngredients += doc.heightOfString(paraWithBullet, {
    width: colIngredients,
    align: "right",
    features: ["rtla"],
  }) + lineGapIng;
});
  //////////

  const textOptions = {
    width: colInstructions,
    align: "right",
    features: ["rtla"],
  };

  // -------- HEADER --------
  const headerText = "הוראות הכנה";

  doc
    .fillColor("#30BFBF")
    .font("Alef-Regular")
    .fontSize(22)
    .text(headerText, instructionsX, startY, textOptions);

  // -------- BODY --------
  doc
  .fillColor(fontColorIns)
.font("Alef-Regular")
.fontSize(fontSizeIns);

  const rawInstructions = recipe.instructions?.trim() || "-";

  // Split into paragraphs
  const paragraphs = formatRtlText(rawInstructions)
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  paragraphs.forEach((para, index) => {
    // no bidi reversal needed
const processedPara = withBulletsIns
  ? `• ${para}`
  : para;
  
    // Calculate height for page break
    const textHeight = doc.heightOfString(processedPara, textOptions);

    if (currentYInstructions + textHeight > doc.page.height - marginBottom) {
      doc.addPage();
      currentYInstructions = doc.page.margins.top;
    }

    doc.text(processedPara, instructionsX, currentYInstructions, textOptions);
    currentYInstructions += textHeight + lineGapIns;

  });

  // 5. DIVIDER
  const dividerX = startX + colInstructions + (dividerGap / 2);
  doc.strokeColor("#CCCCCC").lineWidth(1)
     .moveTo(dividerX, startY).lineTo(dividerX, startY + headerHeight + maxBoxHeight).stroke();
    
  return startY + headerHeight + maxBoxHeight;
};