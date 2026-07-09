// FilterSearch.js
import React from 'react';
import { Grid, Box,Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

const LayoutFilter = ({ activeCategories, filtercategories, handleButtonClickcategorytest, activeTags, filtertags, handleButtonClicktagtest }) => {
return (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "column",
      textAlign: "right",
      mt: 1,
    }}
  >

    {/* ================= CATEGORIES ================= */}
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={{
          margin: "0 0 8px 0",
          color: "#1e60d6",
          fontWeight: 600,
        }}
      >
        קטגוריות
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {filtercategories.map((category, index) => (
          <ToggleButton
            key={index}
            value={category.description}
            onClick={() =>
              handleButtonClickcategorytest(category.description)
            }
            style={{
              backgroundColor: category.active ? "#1976D2" : "#E0E0E0",
              color: category.active ? "white" : "black",
              borderRadius: "15px",
              padding: "4px 12px",
              fontSize: "14px",
              border: "none",
              whiteSpace: "nowrap",
            }}
          >
            {category.description}
          </ToggleButton>
        ))}
      </Box>
    </Box>

    {/* ================= TAGS ================= */}
    <Box sx={{ mb: 1 }}>
      <Typography
        sx={{
          margin: "0 0 8px 0",
          color: "#1e60d6",
          fontWeight: 600,
        }}
      >
        תגיות
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {filtertags.map((tag, index) => (
          <ToggleButton
            key={index}
            value={tag.description}
            onClick={() => handleButtonClicktagtest(tag.description)}
            style={{
              backgroundColor: tag.active ? "#1976D2" : "#E0E0E0",
              color: tag.active ? "white" : "black",
              borderRadius: "15px",
              padding: "4px 12px",
              fontSize: "14px",
              border: "none",
              whiteSpace: "nowrap",
            }}
          >
            {tag.description}
          </ToggleButton>
        ))}
      </Box>
    </Box>
  </Box>
);
};

export default LayoutFilter;
