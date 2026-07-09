import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { FONT_COLOR_OPTIONS } from '../../../assets/fontColorRecipe2.js';
import { FONT_SIZE_OPTIONS } from '../../../assets/fontSize.js';

const ItemDisplay2 = ({ item,imageRecipeDisplay }) => {

  const imageUrltemplate =
  "https://media.istockphoto.com/id/1368935114/photo/vegan-asian-recipes-assorted-brown-rice-curry-masala-poke-do.jpg?s=1024x1024&w=is&k=20&c=Ff4aFup2u0kQI57KQTjfwC4yUuT5CzzX3s0zeN8Rbew=";

  if (!item) return null;
const imageSrc = imageRecipeDisplay || item?.image || imageUrltemplate;
  
        const raw = Number(item?.ingFont || 2.1);
      const sizeType = Math.floor(raw);
      const colorType = Number((raw % 1).toFixed(1));
      // 🔹 Find size
      const sizeOption = FONT_SIZE_OPTIONS.find(
        (s) => s.type === sizeType
      );
const fontSizeIng = sizeOption?.value ? sizeOption.value * 4 : 75;
const colorOption = FONT_COLOR_OPTIONS.find(
        (c) => c.type === colorType
      );
      const fontColorIng = colorOption?.value || "#000000";

    
     const rawIns = Number(item?.insFont || 2.1);
      const sizeTypeIns = Math.floor(rawIns);
      const colorTypeIns = Number((rawIns % 1).toFixed(1));
      // 🔹 Find size
      const sizeOptionIns = FONT_SIZE_OPTIONS.find(
        (s) => s.type === sizeTypeIns
      );
      const fontSizeIns = sizeOptionIns?.value ? sizeOptionIns.value * 2.5 : 60;

      const colorOptionIns = FONT_COLOR_OPTIONS.find(
        (c) => c.type === colorTypeIns
      );
      const fontColorIns = colorOptionIns?.value || "#000000";
       console.log("INSSSS FONT DEBUG:", {
        rawIns,
  fontColorIns,
});

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, "");

  const wrapRichText = (html, maxCharsPerLine = 12, maxLines = 3) => {
    const text = stripHtml(html);
    const words = text.split(" ");
    const wrappedTitle = [];
    let currentLine = "";

    for (let word of words) {
      if (
        (currentLine + (currentLine ? " " : "") + word).length >
        maxCharsPerLine
      ) {
        wrappedTitle.push(currentLine);
        currentLine = word;
        if (wrappedTitle.length >= maxLines) break;
      } else {
        currentLine += (currentLine ? " " : "") + word;
      }
    }
    if (wrappedTitle.length < maxLines && currentLine) {
      wrappedTitle.push(currentLine);
    }
    return wrappedTitle.join("<br/>");
  };

  const displayTitle = wrapRichText(item?.title || "", 12, 3);
    const displayAuthor = wrapRichText(item?.author || "", 12, 3);

return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative", // 🔥 קריטי
        overflow: "hidden",
        borderRadius: 2,
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <Box
        component="img"
        src={imageSrc}
        alt="cover"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // 🔥 ממלא את כל הכרטיס
        }}
      />

      {/* DARK OVERLAY לשיפור קריאות */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55))",
        }}
      />

      {/* CONTENT */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        {/* TITLE */}
        <Typography
          component="div"
          sx={{
            fontWeight: 800,
            fontSize: `${fontSizeIng}px`,
            lineHeight: 1.1,
            color: fontColorIng,
            textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
            direction: "rtl",
          }}
          dangerouslySetInnerHTML={{ __html: displayTitle }}
        />

        {/* AUTHOR */}
        {(item?.type || []).some((t) => Math.floor(t) === 10) && (
          <Typography
            component="div"
            sx={{
              fontWeight: 600,
              fontSize: `${fontSizeIns}px`,
              lineHeight: 1.1,
              color: fontColorIns,
              textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
              direction: "rtl",
              mt: 1,
            }}
            dangerouslySetInnerHTML={{ __html: displayAuthor }}
          />
        )}
      </Box>
    </Box>
  );
};


export default ItemDisplay2;
