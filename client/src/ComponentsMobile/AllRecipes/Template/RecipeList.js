import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Grid,Box, Dialog } from '@mui/material';

import { currentrecipe } from '../../../actions/recipeNewForm.js';
import { setpagemode } from '../../../actions/recipeNewForm.js';

import RecipeSmallDesign from '../../SmallCards/RecipeSmallDesign.js';

const RecipeList = ({ items, activeCategories, activeTags}) => {
    const dispatch = useDispatch();

  const  {user}  = useSelector((state) => state.auth);


  const navigate = useNavigate();

  const handleClick = (task) => {

    dispatch(currentrecipe(task));
    dispatch(setpagemode("view"));
    navigate(`/recipe/${task._id}`);
  };


   if (!items || items.length === 0) return null;

 
 return (
  <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  }}
>
  {items.map((task) => (
    <Box
      key={task._id}
      sx={{
        width: "100%",
        mb:3,
        boxizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ================= MAIN CARD ================= */}
      <Box onClick={() => handleClick(task)}>
        <RecipeSmallDesign task={task} />
      </Box>
    </Box>
  ))}
</Box>
);
};


export default RecipeList;