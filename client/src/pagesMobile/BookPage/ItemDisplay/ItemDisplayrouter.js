import React, { useState } from 'react';
import ItemDisplay1 from './ItemDisplay1';
import ItemDisplay2 from './ItemDisplay2';
import { Box } from "@mui/material";

const ItemDisplayrouter = ({ item }) => {
  // ✅ Hooks must be at the top level
  const [scale, setScale] = useState(0.75);

  // If no item, return nothing
  if (!item) return null;

  // A4 portrait size
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;


  const typeArray = item?.type || [];

const showItemDisplay2 = typeArray.some(
  (t) => (t >= 2 && t < 3) || t >= 9.9
);

  return (
    <Box
      sx={{
        width: `${A4_WIDTH}px`,
        height: `${A4_HEIGHT}px`,
        mx: "auto",
        background: "#fff",
        border: "1px solid #d4d4d4",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        mt: 2
      }}
    >
  {showItemDisplay2 ? (
      <ItemDisplay2 item={item} />
    ) : (
      <ItemDisplay1 item={item} />
    )}

    </Box>
  );
};

export default ItemDisplayrouter;
