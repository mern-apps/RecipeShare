
const formatRtlText = (input = "") => {
  if (!input) return "";

  const normalized = String(input)
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();

  return normalized;
};

// --- RENDER FUNCTION ---

export const renderInstructions = (doc, recipe, PAGE_WIDTH, startY) => {
  const colInstructions = PAGE_WIDTH * 0.63;
  const headerHeight = 35;
  const fontSize = recipe.insFont || 16;
  const instructionsX = doc.page.margins.left;

  const textOptions = {
    width: colInstructions,
    align: "right", // keeps block anchored to the right
    features: ["rtla"], // optional: proper RTL ligatures
  };

  // -------- HEADER --------
  const headerText = "הוראות הכנה"; // raw Hebrew


  doc
    .fillColor("#30BFBF")
    .font("Alef-Regular")
    .fontSize(22)
    .text(headerText, instructionsX, startY, textOptions);

  // -------- BODY --------
  doc
    .fillColor("black")
    .font("Alef-Regular")
    .fontSize(fontSize);

  const rawInstructions = recipe.instructions?.trim() || "-";
  // Split into paragraphs
  const paragraphs = formatRtlText(rawInstructions)
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  let currentY = startY + headerHeight;
  const lineGap = 8;
  const marginBottom = doc.page.margins.bottom || 40;

  paragraphs.forEach((para, index) => {

    // no bidi reversal needed
    const processedPara = para;

    // Calculate height for page break
    const textHeight = doc.heightOfString(processedPara, textOptions);

    if (currentY + textHeight > doc.page.height - marginBottom) {
      doc.addPage();
      currentY = doc.page.margins.top;
    }

    doc.text(processedPara, instructionsX, currentY, textOptions);
    currentY += textHeight + lineGap;

  });

  return currentY;
};