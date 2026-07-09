
import { registerFonts } from "../registerFonts.js";

export const case10and2 = ({
  doc,
  recipe,
  mainType,
  fixPdfText,
  FONT_SIZE_OPTIONS,
  FONT_COLOR_OPTIONS,
}) => {

  registerFonts(doc);

  const pageWidth =
    doc.page.width - doc.page.margins.left - doc.page.margins.right;

  const pageHeight =
    doc.page.height - doc.page.margins.top - doc.page.margins.bottom;



  const title = fixPdfText(recipe.title || "");
  const author = fixPdfText(recipe.author || "");


  // ===== ING FONT (TITLE) =====
  const rawIng = Number(recipe?.ingFont || 2.1);
  const sizeTypeIng = Math.floor(rawIng);

  const fontSizeIngBase =
    FONT_SIZE_OPTIONS.find(s => s.type === sizeTypeIng)?.value || 25;

  const fontSizeTitle = fontSizeIngBase *2.2 ;

  const colorTypeIng = Number((rawIng % 1).toFixed(1));

  const fontColorTitle =
    FONT_COLOR_OPTIONS.find(c => c.type === colorTypeIng)?.value || "#000";

  // ===== INS FONT (AUTHOR) =====
  const rawIns = Number(recipe?.insFont || 2.1);
  const sizeTypeIns = Math.floor(rawIns);

  const fontSizeInsBase =
    FONT_SIZE_OPTIONS.find(s => s.type === sizeTypeIns)?.value || 25;

  const fontSizeAuthor = fontSizeInsBase * 1.7 ;

  const colorTypeIns = Number((rawIns % 1).toFixed(1));

  const fontColorAuthor =
    FONT_COLOR_OPTIONS.find(c => c.type === colorTypeIns)?.value || "#000";

  // ===== CENTER POSITION =====
  const textOptions = {
    align: "center",
    features: ["rtla"],
  };

  const titleHeight = doc.heightOfString(title, {
    width: pageWidth,
    ...textOptions,
  });

  const authorHeight = doc.heightOfString(author, {
    width: pageWidth,
    ...textOptions,
  });

const lineGapBetweenTitleAndAuthor = fontSizeTitle-5;

const totalHeight =
  mainType === 10
    ? titleHeight + authorHeight + lineGapBetweenTitleAndAuthor
    : titleHeight;

    const moveAllTextUp = 28;


const centerY =
  doc.page.margins.top +
  (pageHeight - totalHeight) / 2.2 -
  moveAllTextUp;

  // ===== RENDER TITLE =====
  doc
    .fillColor(fontColorTitle)
    .font("Alef-Bold")
    .fontSize(fontSizeTitle)
    .text(title, doc.page.margins.left, centerY, {
      width: pageWidth,
      ...textOptions,
    });

  // ===== RENDER AUTHOR =====
if (mainType === 10 && author) {
  doc
    .fillColor(fontColorAuthor)
    .font("Alef-Regular")
    .fontSize(fontSizeAuthor)
    .text(
      author,
      doc.page.margins.left,
      centerY + titleHeight + lineGapBetweenTitleAndAuthor,
      {
        width: pageWidth,
        ...textOptions,
      }
    );
}
console.log("ABOUT TO RENDER TITLE:", {
  text: title,
  features: textOptions.features,
  fontSize: fontSizeTitle,
  color: fontColorTitle,
});
};