import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

import ItemDisplay from './ItemDisplay.js';

import {addtofavoritebook,removefavoritebook} from '../../actions/projectactions.js';
import { deletebookowner } from '../../actions/projectactions.js';
import { setpagemode } from '../../actions/projectactions.js';


export const GroupDisplay = ({ item,imageRecipeDisplay }) => {

  const dispatch = useDispatch();
    const navigate = useNavigate();

  const  {user}  = useSelector((state) => state.auth);
      const currentBook = useSelector(state => state.currentproject.currentproject);

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
  if (!user || !user.favoritebook|| !item) {
    setIsFavorite(false);
    return;
  }

  const favoriteExists = user.favoritebook.includes(currentBook._id);
  setIsFavorite(favoriteExists);
}, [user, currentBook]);


  const handleFavoriteAdding = (item) => {
    dispatch(addtofavoritebook(item._id));
  };
  const handleFavoriteRemovalClick = (item) => {
    dispatch(removefavoritebook(item._id));
  };


  const handleEditClick = (id) => {
    dispatch(setpagemode("edit"));
  };

  const handlePdfClick = (id) => {
    console.log(`ID: ${id}`);
  };

 if (!item || !user) return null;

  return (
    <div>

        <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '10px' }}>
          <Grid item>
{currentBook?.owner?.includes(user?._id) && (
        <Button
  variant="contained"
  color="error"
  startIcon={<DeleteIcon />}
  onClick={() => handleOpenDeleteDialog(currentBook._id)}
>
  מחיקת קבוצה
</Button>
            )}
          </Grid>

      

          <Grid item>
{currentBook?.owner?.includes(user?._id) && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick(currentBook)}
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
              onClick={() => handleFavoriteAdding(currentBook)}
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
              onClick={() => handleFavoriteRemovalClick(currentBook)}
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
              onClick={() => handlePdfClick(currentBook)}
            >
              PDF/הדפסה
            </Button>
          </Grid>
        </Grid>
        <div style={{ transform: 'scale(0.65)', transformOrigin: 'top', border: '2px solid #000', borderRadius: '8px' }}>
          <ItemDisplay item={item} imageRecipeDisplay={imageRecipeDisplay}  />
        </div>

        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <DialogTitle>מחיקת ספר</DialogTitle>
  <DialogContent>
    האם אתה בטוח שברצונך למחוק את הספר?
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteDialog} color="primary">
      ביטול
    </Button>
    <Button
      color="error"
      onClick={() => {
        dispatch(deletebookowner(deleteId));
        handleCloseDeleteDialog();
        navigate("/books");  
      }}
    >
      מחיקה
    </Button>
  </DialogActions>
</Dialog>


    </div>

  );
};

export default GroupDisplay;
