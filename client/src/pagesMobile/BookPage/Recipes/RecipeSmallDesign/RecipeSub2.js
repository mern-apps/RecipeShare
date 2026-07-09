// RecipeSub2.js
import React from "react";
import { Card, CardMedia, Box, Typography } from "@mui/material";


const RecipeSub2 = ({ task }) => {
  if (!task) return null;
  
const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, "").trim();

const wrapRichText = (html, maxCharsPerLine = 12, maxLines = 3) => {
  const words = stripHtml(html).split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;

    if (next.length > maxCharsPerLine) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    } else {
      line = next;
    }
  }

  if (lines.length < maxLines && line) {
    lines.push(line);
  }

  return lines.join("<br/>");
};

const displayTitle = wrapRichText(task.title);



  const image = task.image;
  const fontColor = task.author; 

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* Full background image */}
      <CardMedia
        component="img"
        image={image}
        alt={task.title}
        sx={{
      position: "absolute",
      inset: 0,              // top:0 right:0 bottom:0 left:0
      width: "100%",
      height: "100%",
      objectFit: "cover",    // 🔥 this is the key
    }}
      />   

      {/* ===== TITLE CENTERED ===== */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <Typography
          component="div"
          sx={{
            color: fontColor || "#fff",
            fontWeight: 700,
            fontSize: "1.85rem",
            lineHeight: 1.2,
            textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
            textAlign: "center",
            direction: "rtl",
          }}
          dangerouslySetInnerHTML={{ __html: displayTitle }}
        />
      </Box>
    </Card>
  );
};

export default RecipeSub2;
