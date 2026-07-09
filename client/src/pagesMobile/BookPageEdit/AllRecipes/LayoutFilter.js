// FilterSearch.js
import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Grid,Box,Button, ToggleButton,Typography, ToggleButtonGroup } from '@mui/material';

import { currentrecipe } from '../../../actions/recipeNewForm.js';
import { setpagemode } from '../../../actions/recipeNewForm.js';


const LayoutFilter = ({ activeCategories, filtercategories, handleFiltercategories, activeTags, filtertags, handleFiltertags }) => {
        const dispatch = useDispatch();
        const { user } = useSelector((state) => state.auth);
        const countAllrecipesGroup = useSelector(state => state.grouppage.countallrecipesgroup);
       
        // ♿ Accessibility
      const localaccessibilitySettings = useSelector((state) => state.auth.accessibility);
      const [accessibilityData, setAccessibilityData] = useState(localaccessibilitySettings);
    
      useEffect(() => {
        if (user && user.accessibility) {
          setAccessibilityData(user.accessibility);
        } else {
          setAccessibilityData(localaccessibilitySettings);
        }
      }, [user, localaccessibilitySettings]);
    
      const adjustedFontSize = (size) => `${(size * (accessibilityData?.fontSizeAdjustments || 100)) / 100}rem`;
      const adjustedLineHeight = (defaultValue) => defaultValue * (accessibilityData?.lineSpacing || 1);
      const adjustedWordSpacing = (defaultValue) => defaultValue * (accessibilityData?.wordSpacing || 1);
      const adjustedLetterSpacing = (defaultValue) => defaultValue * (accessibilityData?.letterSpacing || 1);

    return (

 <Box
    sx={{
      width: "100%",
      display: "flex",
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
          justifyContent: "flex-end", // 🔥 right align
          gap: 1,
        }}
      >
        {filtercategories.map((category, index) => (
          <ToggleButton
            key={index}
            value={category.description}
            onClick={() =>
              handleFiltercategories(category.description)
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
          justifyContent: "flex-end", // 🔥 right align
          gap: 1,
        }}
      >
        {filtertags.map((tag, index) => (
          <ToggleButton
            key={index}
            value={tag.description}
            onClick={() => handleFiltertags(tag.description)}
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

