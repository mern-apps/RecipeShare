import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { FONT_COLOR_OPTIONS } from '../../../assets/fontColorRecipe2.js';
import { FONT_SIZE_OPTIONS } from '../../../assets/fontSize.js';


const ItemDisplay2 = ({ item }) => {
  if (!item) return null;

  const imageDisplay = item.image;
    
      const raw = Number(item?.ingFont || 1.1);
    // 🔹 Extract parts
    const sizeType = Math.floor(raw);
    const colorType = Number((raw % 1).toFixed(1));
    
    // 🔹 Find size
    const sizeOption = FONT_SIZE_OPTIONS.find(
      (s) => s.type === sizeType
    );
    const fontSizeIng = sizeOption?.value || 25;
    
    // 🔹 Find color
    const colorOption = FONT_COLOR_OPTIONS.find(
      (c) => c.type === colorType
    );
    const fontColorIng = colorOption?.value || "#000000";
      

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
  return (
    <Paper
      elevation={3} 
  sx={{
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
       alignItems: "stretch",
        borderRadius: 2,
        gap: 2,
      }}
    >
      {/* Full background image */}
     <Box
        component="img"
        src={imageDisplay}
        alt="cover"
        sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
      />

      {/* Title overlay that uses Quill styling */}
                 <Grid container justifyContent="center" alignItems="center" sx={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', textAlign: 'center' }}>
               <Typography
          component="div"
      sx={{
    px: 2,
    fontWeight: 800,
    fontSize: `${fontSizeIng}px`,
    lineHeight: 1.15,
    color: fontColorIng || "#FFFFFF",
    textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
    textAlign: "center",
    direction: "rtl",
  }}
          dangerouslySetInnerHTML={{ __html: displayTitle }}
        />  
              </Grid>
    </Paper>
  );
};

export default ItemDisplay2;
