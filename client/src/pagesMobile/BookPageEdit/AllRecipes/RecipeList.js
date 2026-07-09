import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { addrecipefromlist } from '../../../actions/bookEditPageActions.js';
import { setpagemode as setpagemodebook } from '../../../actions/bookPageActions.js';
import { currentrecipe } from '../../../actions/recipeNewForm.js';

import RecipeSmallDesign from '../../../ComponentsMobile/SmallCards/RecipeSmallDesign.js';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Snackbar, Alert } from '@mui/material';
import {
  Grid,
  Typography,
  IconButton,
  Box,
} from '@mui/material';

const RecipeList = ({ items, activeCategories, activeTags,handleItemDisplayClick}) => {

    const dispatch = useDispatch();

  const  {user}  = useSelector((state) => state.auth);
    const book = useSelector(state => state.currentproject.currentproject);

        const bookRecipeSmallDesign = useSelector(state => state.currentproject.currentproject);
      const book10 = useSelector(state => state.currentproject.currentproject);
      const [alreadyAssigned, setAlreadyAssigned] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);


  const navigate = useNavigate();


   if (!items || items.length === 0) return null;


           const assignedTask = (task) => {
           let isProjectAssigned = false;
   if (book10?.recipes?.length > 0) {
         isProjectAssigned = book10?.recipes?.some(recipe => recipe.book === task._id);
       }
          if (isProjectAssigned) {
         setAlreadyAssigned(true);
       setOpenSnackbar(true);
         return;
           } else {
             const data = { taskID: task._id, bookID: book10._id };
              dispatch(addrecipefromlist(data));
                      setAlreadyAssigned(false);
           dispatch(setpagemodebook("view"));
             }

         };


return (
  <>
    {/* Snackbar */}
    <Snackbar
      open={openSnackbar}
      autoHideDuration={1600}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Box
        sx={{
          background: "linear-gradient(135deg, #6B7CFF 0%, #9A4DFF 100%)",
          color: "white",
          px: 3,
          py: 1.2,
          borderRadius: "14px",
          fontWeight: 400,
          fontSize: "1.2rem",
          boxShadow: "0 6px 22px rgba(120, 90, 255, 0.45)",
          backdropFilter: "blur(10px)",
          direction: "rtl",
        }}
      >
        המתכון כבר נמצא בספר
      </Box>
    </Snackbar>

    {/* Grid */}
    <Grid
      container
      sx={{
        gap: 2,
        justifyContent: "center",
      }}
    >
      {items.map((task) => (
        <Grid
          item
          key={task._id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {/* Recipe */}
          <Box
            onClick={() => handleItemDisplayClick(task)}
            sx={{ cursor: "pointer" }}
          >
            <RecipeSmallDesign task={task} />
          </Box>

          {/* Button next to it */}
         <Button
  variant="outlined"
  onClick={() => assignedTask(task)}
  sx={{
    color: "#000000",
    borderColor: "#2ecc71",
    textTransform: "none",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
    padding: "10px 6px",
    transition: "all 0.2s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow:
        "0 10px 0 #1e8f4f, 0 18px 28px rgba(0,0,0,0.18)",
      backgroundColor: "rgba(46, 204, 113, 0.08)",
      borderColor: "#2ecc71",
    },

  }}
>
  {/* 3D Plus Icon */}
  <Box
    sx={{
      width: 34,
      height: 34,
      borderRadius: "50%",
      background:
        "linear-gradient(145deg, #2ecc71, #27ae60)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow:
        "inset 2px 2px 6px rgba(255,255,255,0.3), inset -3px -3px 6px rgba(0,0,0,0.2)",
      marginBottom: "6px",
    }}
  >
    <AddIcon
      sx={{
        color: "white",
        fontSize: 20,
        filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.35))",
      }}
    />
  </Box>

  {/* טקסט בטור */}
  <Box sx={{ textAlign: "center", lineHeight: 1.1 }}>
    <Box>הוספה</Box>
    <Box>לספר</Box>
  </Box>
</Button>

        </Grid>
      ))}
    </Grid>
  </>
);
};


export default RecipeList;