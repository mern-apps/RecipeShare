import { FONT_SIZE_OPTIONS} from "../../../assets/fontSize.js";
import { FONT_COLOR_OPTIONS } from "../../../assets/fontColor.js";


const renderTextBlock = ({
  text = "",
  fontValue = 1.1,
  fontSizeOptions,
  fontColorOptions,
    isIngredients = false,

}) => {
  const sizeType = Math.floor(fontValue);
  const colorType = Number((fontValue % 1).toFixed(1));

  const sizeOption = fontSizeOptions.find((s) => s.type === sizeType);
const multiplier = isIngredients ? 4.2 : 2.5;
const fontSize = ((sizeOption?.value || 25) * multiplier);

  const colorOption = fontColorOptions.find((c) => c.type === colorType);
  const fontColor = colorOption?.value || "#000000";

  const lines = (text || "")
    .replace(/<\/p>/g, "\n")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]*>/g, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const html = lines
    .map(
      (line) => `
        <div style="
          margin-bottom: 6px;
        ">
          ${line}
        </div>
      `
    )
    .join("");

  return `
    <div style="
      font-family: 'Inter', sans-serif;
      font-size: ${fontSize}px;
      color: ${fontColor};
      line-height: 1.2;
      white-space: normal;
    ">
      ${html}
    </div>
  `;
};

const ItemDisplayPDF10 = ({ item }) => {
  if (!item) return "";

  const imageUrl =
    item?.image ||
    "https://media.istockphoto.com/id/1368935114/photo/vegan-asian-recipes.jpg";

      const ingredientsHTML = renderTextBlock({
        text: item?.title,
        fontValue: item?.ingFont || 1.1,
        fontSizeOptions: FONT_SIZE_OPTIONS,
        fontColorOptions: FONT_COLOR_OPTIONS,
          isIngredients: true,

      });
    
      const instructionsHTML = renderTextBlock({
        text: item?.author,
        fontValue: item?.insFont || 1.1,
        fontSizeOptions: FONT_SIZE_OPTIONS,
        fontColorOptions: FONT_COLOR_OPTIONS,
          isIngredients: false,

      });


  return `
    <div style="
      position: relative;
      width: 210mm;
      height: 297mm;
      overflow: hidden;
      background: white;
    ">

      <!-- SAFE FRAME (YOUR REAL MARGINS) -->
      <div style="
        position:absolute;
        top:12mm;
        left:12mm;
        right:12mm;
        bottom:12mm;

        overflow:hidden;
        border-radius:10px;
      ">

        <!-- BACKGROUND IMAGE (ONLY INSIDE FRAME) -->
        <img
          src="${imageUrl}"
          style="
            position:absolute;
            top:0;
            left:0;
            width:100%;
            height:100%;
            object-fit:cover;
          "
        />

        <!-- DARK OVERLAY -->
        <div style="
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
          background: rgba(0,0,0,0.25);
        "></div>

        <!-- CONTENT -->
       <div style="
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  width:80%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  color:white;
  box-sizing:border-box;
">

          <!-- TITLE -->
          <div style="
            font-weight:700;
           text-align:center;

          ">
            ${ingredientsHTML}
          </div>

          <!-- AUTHOR -->
          ${
            (item?.type || []).some((t) => Math.floor(t) === 10)
              ? `
            <div style="
              margin-top:1px;
              font-weight:500;
                text-align:center;
            ">
            ${instructionsHTML}
            </div>
          `
              : ""
          }

        </div>

      </div>
    </div>
  `;
};

export default ItemDisplayPDF10;