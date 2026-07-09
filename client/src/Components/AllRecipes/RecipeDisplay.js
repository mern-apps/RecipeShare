import React, { useState,useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button,Grid, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useSelector, useDispatch } from 'react-redux';
import ItemDisplay from '../../pages/TaskForm/ItemDisplay.js';

import {copyrecipeCuisine,addtofavoriterecipe,removefavoriterecipe} from '../../actions/recipespage.js';
import { deleterecipe } from '../../actions/recipespage.js';
import { setpagemode } from '../../actions/recipeNewForm.js';
import { useNavigate } from 'react-router-dom';



export const RecipeDisplay = ({ item,imageRecipeDisplay }) => {

  const  {user}  = useSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState(false);

const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
const [deleteId, setDeleteId] = useState(null);





const handleOpenDeleteDialog = (id) => {
  setDeleteId(id);
  setOpenDeleteDialog(true);
};

const handleCloseDeleteDialog = () => {
  setOpenDeleteDialog(false);
  setDeleteId(null);
};

  useEffect(() => {
  if (!user || !user.favorite) {
    setIsFavorite(false);
    return;
  }
  const favoriteExists = user.favorite.includes(item._id);
  setIsFavorite(favoriteExists);
}, [user, item._id]);


  const handleAddIconClickCuisine = (item) => {
    dispatch(copyrecipeCuisine(item));
  };

  const handleFavoriteAdding = (item) => {
    dispatch(addtofavoriterecipe(item));
  };
  const handleFavoriteRemovalClick = (item) => {
    dispatch(removefavoriterecipe(item));
  };

 

  const handleEditClick = (id) => {
    dispatch(setpagemode("edit"));
  };

  const handlePdfClick = (id) => {
    console.log(`ID: ${id}`);
  };

  return (
    <div>

        <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '10px' }}>
          <Grid item>
          {item.owner === user._id && (
      <Button
  variant="contained"
  color="error"
  startIcon={<DeleteIcon />}
  onClick={() => handleOpenDeleteDialog(item._id)}
>
  מחיקת מתכון
</Button>
            )}
          </Grid>

          <Grid item>
          {item.owner !== user._id && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleAddIconClickCuisine(item)}
            >
              העברת מתכון לרשימה שלך
            </Button>
            )}
          </Grid>

          <Grid item>
          {item.owner === user._id && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick(item)}
            >
              עריכה
            </Button>
            )}
          </Grid>

          <Grid item>
          {!isFavorite && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<FavoriteIcon />}
              onClick={() => handleFavoriteAdding(item)}
            >
              הוספה למועדפים
            </Button>
            )}
          </Grid>
       
          <Grid item>
          {isFavorite && (

            <Button
              variant="contained"
              color="secondary"
              startIcon={<FavoriteIcon />}
              onClick={() => handleFavoriteRemovalClick(item)}
            >
              הסרה למועדפים
            </Button>
            )}
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PictureAsPdfIcon />}
              onClick={() => handlePdfClick(item)}
            >
              PDF/הדפסה
            </Button>
          </Grid>
        </Grid>
        <div style={{ transform: 'scale(0.65)', transformOrigin: 'top', border: '2px solid #000', borderRadius: '8px' }}>
          <ItemDisplay item={item} imageRecipeDisplay={imageRecipeDisplay}  />
        </div>

        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <DialogTitle>מחיקת מתכון</DialogTitle>
  <DialogContent>
    האם אתה בטוח שברצונך למחוק את המתכון?
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteDialog} color="primary">
      ביטול
    </Button>
    <Button
      color="error"
      onClick={() => {
        dispatch(deleterecipe(deleteId));
        handleCloseDeleteDialog();
        navigate("/myrecipes");  
      }}
    >
      מחיקה
    </Button>
  </DialogActions>
</Dialog>


    </div>

  );
};

export default RecipeDisplay;
