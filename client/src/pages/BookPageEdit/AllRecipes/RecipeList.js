import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Grid, Dialog } from '@mui/material';


import ItemDisplay from '../../../pages/TaskForm/ItemDisplay.js';
import RecipeSmallDesign from './RecipeSmallDesign';

import { currentrecipe } from '../../../actions/recipeNewForm.js';
import { addrecipefromlist } from '../../../actions/bookEditPageActions.js';

const RecipeList = ({ items, activeCategories, activeTags,handleItemDisplayClick}) => {

    const dispatch = useDispatch();

  const  {user}  = useSelector((state) => state.auth);
    const book = useSelector(state => state.currentproject.currentproject);

  const [alreadyAssigned, setAlreadyAssigned] = useState(false);

  const navigate = useNavigate();


   if (!items || items.length === 0) return null;


 return (
<Grid 
  container 
   sx={{
    gap: 2,
    justifyContent: "center",
  }}
>
  {items.map(task => (
    <Grid
      item
      key={task._id}
      onClick={() => handleItemDisplayClick(task)}
    >
        <RecipeSmallDesign task={task} />
    </Grid>
  ))}
</Grid>
  );
};


export default RecipeList;