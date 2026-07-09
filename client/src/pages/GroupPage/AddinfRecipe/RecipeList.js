import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Dialog } from '@mui/material';
import RecipeSmallDesign from '../../../Components/SmallCards/RecipeSmallDesign.js';

import { useNavigate } from 'react-router-dom';
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
   <Grid container>
  <Grid item xs={12}>
    <Grid
      container
      style={{ display: "flex", justifyContent: "flex-end" }}
      spacing={0}
    >
      {items.map((task) => (
        <Grid
          item
          key={task._id}
          style={{ marginBottom: "6px", marginRight: "30px" }}
        >
          {/* Wrapper */}
          <div
            style={{
              position: "relative",
              cursor: "pointer",
              transform:
                chosenRecipe?._id === task._id
                  ? "scale(1.03)"
                  : "scale(1)",
              transition: "all 0.25s ease",
              borderRadius: "16px",
              border:
                chosenRecipe?._id === task._id
                  ? "2px solid #6B4BCC"
                  : "1px solid #e5e7eb",
              boxShadow:
                chosenRecipe?._id === task._id
                  ? "0 12px 28px rgba(107,75,204,0.22)"
                  : "0 4px 12px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            {/* Selection indicator */}
            {chosenRecipe?._id === task._id && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: "28px",
                  height: "28px",
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
              </div>
            )}

            {/* Main clickable item */}
            <div onClick={() => handleClick(task)}>
              <RecipeSmallDesign
                task={task}
              />
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  </Grid>
</Grid>
  );
};


export default RecipeList;