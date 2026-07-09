import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Dialog } from '@mui/material';
import RecipeSmallDesign from '../../SmallCards/RecipeSmallDesign.js';
import { useNavigate } from 'react-router-dom';
import { currentrecipe } from '../../../actions/recipeNewForm.js';
import { setpagemode } from '../../../actions/recipeNewForm.js';

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
    <Grid container>
      <Grid item xs={12}>
        <Grid container style={{ display: 'flex', justifyContent: 'flex-end' }} spacing={0}>

          {items.map(task => (
            <Grid item key={task._id} style={{ marginBottom: "6px", marginRight: "30px" }}>
              
              {/* Wrapper so we can place icons on top */}
              <div style={{ position: "relative" }}>

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