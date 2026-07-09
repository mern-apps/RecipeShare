import fs from "fs";
import { FONT_SIZE_OPTIONS} from "../../../assets/fontSize.js";
import { FONT_COLOR_OPTIONS } from "../../../assets/fontColor.js";


const toBase64 = (filePath) => {
  const file = fs.readFileSync(filePath);
  return `data:image/png;base64,${file.toString("base64")}`;
};

// =========================
// 🔥 SHARED RENDERER
// =========================
const renderTextBlock = ({
  text = "",
  fontValue = 1.1,
  fontSizeOptions,
  fontColorOptions,
}) => {
  const sizeType = Math.floor(fontValue);
  const colorType = Number((fontValue % 1).toFixed(1));
  const bulletsEnabled = Math.floor((fontValue * 100) % 10) !== 0;

  const sizeOption = fontSizeOptions.find((s) => s.type === sizeType);
  const fontSize = sizeOption?.value || 25;

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
          text-indent: -20px;
          padding-right: 20px;
          margin-bottom: 6px;
        ">
          ${bulletsEnabled ? "• " : ""}${line}
        </div>
      `
    )
    .join("");

  return `
    <div style="
      font-family: 'Inter', sans-serif;
      font-size: ${fontSize}px;
      color: ${fontColor};
      line-height: 1.6;
      text-align: right;
      white-space: normal;
    ">
      ${html}
    </div>
  `;
};

const ItemDisplayPDF1 = ({ item }) => {
  const imageUrl =
    item?.image ||
    "https://media.istockphoto.com/id/1368935114/photo/vegan-asian-recipes.jpg";

  // =========================
  // ICONS (EC2 SAFE - BASE64)
  // =========================
  const levelIcon = toBase64("./assets/Icons/recipe1pdf/leveldifficulty.png");
  const servesIcon = toBase64("./assets/Icons/recipe1pdf/numserves.png");
  const categoryIcon = toBase64("./assets/Icons/recipe1pdf/categories.png");

  // =========================
  // RENDER BLOCKS
  // =========================
  const ingredientsHTML = renderTextBlock({
    text: item?.ingredients,
    fontValue: item?.ingFont || 1.1,
    fontSizeOptions: FONT_SIZE_OPTIONS,
    fontColorOptions: FONT_COLOR_OPTIONS,
  });

  const instructionsHTML = renderTextBlock({
    text: item?.instructions,
    fontValue: item?.insFont || 1.1,
    fontSizeOptions: FONT_SIZE_OPTIONS,
    fontColorOptions: FONT_COLOR_OPTIONS,
  });

  return `
    <div class="page" style="
      position: relative;
      width: 210mm;
      height: 297mm;
      overflow: hidden;
      background: white;
    ">

      <!-- SAFE FRAME -->
      <div style="
        position:absolute;
        top:12mm;
        left:12mm;
        right:12mm;
        bottom:12mm;
        overflow:hidden;
        border-radius:10px;
        display:flex;
        flex-direction:column;
        box-sizing:border-box;
      ">

        <!-- IMAGE -->
        <img
          src="${imageUrl}"
          style="
            width:100%;
            height:60mm;
            object-fit:cover;
            border-radius:12px;
            flex-shrink:0;
          "
        />

        <!-- TITLE -->
        <h1 style="
          text-align:right;
          color:#30BFBF;
          font-size:44px;
          margin:15px 0 5px 0;
          padding-right:4mm;
        ">
          ${item?.title || ""}
        </h1>

        <!-- AUTHOR -->
        ${
          item?.author
            ? `
              <h3 style="
                text-align:right;
                color:#666;
                font-weight:normal;
                          font-size:34px;
                margin:0 0 10px 0;
                padding-right:4mm;
              ">
                ${item.author}
              </h3>
            `
            : ""
        }

        <!-- META WRAPPER -->
        <div style="
          display:flex;
          justify-content:center;
          width:100%;
          flex-shrink:0;
          padding-top:25px;
        ">

          <div style="
            display:flex;
            justify-content:space-between;
            width:50%;
            text-align:center;
          ">

            <div style="flex:1; position:relative;">
              <img src="${levelIcon}" style="
                position:absolute;
                top:-70px;
                left:50%;
                transform:translateX(-50%);
                width:170px;
                opacity:0.7;
              "/>

              <div style="color:#30BFBF; font-size:18px; font-weight:600;">
                רמת קושי
              </div>
              <div style="font-size:16px;">
                ${item?.level || "-"}
              </div>
            </div>

            <div style="flex:1; position:relative;">
              <img src="${servesIcon}" style="
                position:absolute;
                top:-70px;
                left:50%;
                transform:translateX(-50%);
                width:170px;
                opacity:0.7;
              "/>

              <div style="color:#30BFBF; font-size:18px; font-weight:600;">
                מנות
              </div>
              <div style="font-size:16px;">
                ${item?.numserves || "-"}
              </div>
            </div>

            <div style="flex:1; position:relative;">
              <img src="${categoryIcon}" style="
                position:absolute;
                top:-70px;
                left:50%;
                transform:translateX(-50%);
                width:170px;
                opacity:0.7;
              "/>

              <div style="color:#30BFBF; font-size:18px; font-weight:600;">
                קטגוריה
              </div>
              <div style="font-size:16px;">
                ${item?.selectedCategories || "-"}
              </div>
            </div>

          </div>
        </div>

        <!-- MAIN ROW -->
        <div style="
          display:flex;
          width:100%;
          align-items:stretch;
          margin-top:10px;
        ">

          <!-- INGREDIENTS -->
          <div style="width:36%; padding-right:10px; box-sizing:border-box;">
            <h2 style="
              color:#30BFBF;
              margin:10px 0 5px 0;
              font-size:31px;
              font-weight:250;
              text-align:right;
              padding-right:2mm;
            ">
              מצרכים
            </h2>

            ${ingredientsHTML}
          </div>

          <!-- DIVIDER -->
          <div style="width:3%; display:flex; justify-content:center;">
            <div style="
              width:2px;
              background:#D0D6DD;
              border-radius:2px;
              height:150mm;
            "></div>
          </div>

          <!-- INSTRUCTIONS -->
          <div style="width:61%; padding-left:10px; box-sizing:border-box;">
            <h2 style="
              color:#30BFBF;
              margin:10px 0 5px 0;
              font-size:31px;
              font-weight:250;
              text-align:right;
              padding-right:2mm;
            ">
              הוראות הכנה
            </h2>

            ${instructionsHTML}
          </div>

        </div>

      </div>
    </div>
  `;
};

export default ItemDisplayPDF1;