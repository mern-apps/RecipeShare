import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid,Box, Dialog } from '@mui/material';
import RecipeSmallDesign from '../../../ComponentsMobile/SmallCards/RecipeSmallDesign.js';

import { currentrecipe } from '../../../actions/recipeNewForm.js';
import { setpagemode } from '../../../actions/recipeNewForm.js';


const RecipeList = ({ items, activeCategories, activeTags,chosenRecipe,setChosenRecipe}) => {
    const dispatch = useDispatch();

  const  {user}  = useSelector((state) => state.auth);


  const navigate = useNavigate();
  
const handleClick = (task) => {
  setChosenRecipe(task);
};


   if (!items || items.length === 0) return null;

 
return (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center", 
      gap: 3,
    }}
  >
   {items.map((task) => {
  return (
       <Box
            key={task._id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", // ✅ card centered inside column
            }}
          >
      {/* ================= MAIN CARD ================= */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          border:
            chosenRecipe?._id === task._id
              ? "3px solid #6B4BCC"
              : "1px solid #E5E7EB",
          boxShadow:
            chosenRecipe?._id === task._id
              ? "0 12px 28px rgba(107,75,204,0.22)"
              : "0 4px 12px rgba(0,0,0,0.06)",

          transition: "all 0.25s ease",

          transform:
            chosenRecipe?._id === task._id
              ? "scale(1.02)"
              : "scale(1)",
        }}
      >
        {/* SELECTION INDICATOR */}
        {chosenRecipe?._id === task._id && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#6B4BCC",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: 700,
              zIndex: 10,
              boxShadow: "0 6px 16px rgba(107,75,204,0.35)",
            }}
          >
            ✓
          </Box>
        )}

        <Box onClick={() => handleClick(task)}>
          <RecipeSmallDesign task={task} />
        </Box>
      </Box>
    </Box>
  );
})}
  </Box>
);
};


export default RecipeList;