import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Dialog } from '@mui/material';
import RecipeSmallDesign from './RecipeSmallDesign/RecipeSmallDesign.js';
import { useNavigate } from 'react-router-dom';
import { currentrecipe } from '../../../actions/recipeNewForm.js';
import ItemDisplay from '../../../pages/TaskForm/ItemDisplay.js';


const RecipeList = ({ items,setSelectedItemdisplay}) => {
  
    const dispatch = useDispatch();

  const  {user}  = useSelector((state) => state.auth);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTask, setDialogTask] = useState(null);

  const navigate = useNavigate();




  const handleClick = (task) => {
   // dispatch(currentrecipe(task));
    //navigate(`/recipe/${task._id}`);
    setSelectedItemdisplay(task);
  };


  const closeZoomDialog = () => {
    setDialogOpen(false);
    setDialogTask(null);
  };

     



  // Filtering function


 return (
    <Grid container>
      <Grid item xs={12}>
<Grid
  container
  direction="column" 
  alignItems="flex-end"
  spacing={0}
>
          {items.map(task => (
<Grid
  item
  key={task._id}
  xs={12} 
  style={{ marginBottom: "6px" }}
>              
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