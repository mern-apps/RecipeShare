import React, { useState } from 'react';
import ItemDisplay1 from './ItemDisplay1';
import ItemDisplay2 from './ItemDisplay2';
import { Box } from "@mui/material";

const ItemDisplayrouter = ({ item,imageRecipeDisplay }) => {
  console.log("ItemDisplayrouter 111111");
  
  const designType = Math.floor(item?.type || 1);

  // If no item, return nothing
  if (!item) return null;

  // A4 portrait size
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const height = 600; // 👈 אתה קובע גובה קבוע למובייל
const width = height * (A4_WIDTH / A4_HEIGHT);

return (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      mt: 2,
    }}
  >
    <Box
      sx={{
        height: `${height}px`,   // 👈 קבוע
        width: `${width}px`,     // 👈 נגזר לפי יחס A4

        maxWidth: "95vw",        // 👈 safety למובייל
        maxHeight: "80vh",

        background: "#fff",
        border: "1px solid #d4d4d4",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        overflow: "hidden",

        display: "flex",
        flexDirection: "column",
      }}
    >

{(!item?.type || (item?.type || []).some(t => [2, 10].includes(Math.floor(t)))) ? (
    <ItemDisplay2 item={item} imageRecipeDisplay={imageRecipeDisplay} />
  ) : (
    <ItemDisplay1 item={item} imageRecipeDisplay={imageRecipeDisplay} />
  )}


    </Box>
      </Box>

  );
};

export default ItemDisplayrouter;
