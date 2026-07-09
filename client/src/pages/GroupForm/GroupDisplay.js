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
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import ItemDisplay from './ItemDisplay.js';

import { jointogroup,deletegroupowner,getoutfromgroup } from '../../actions/groupactions.js';
import { setpagemode } from '../../actions/groupactions.js';


export const GroupDisplay = ({ item,imageRecipeDisplay }) => {

  const dispatch = useDispatch();
    const navigate = useNavigate();

  const  {user}  = useSelector((state) => state.auth);
      const currentGroup = useSelector(state => state.grouppage.currentgroup);
      const usersList = useSelector(state => state.grouppage.userslist);
      const countAllUsers = useSelector(state => state.grouppage.countallusers);
      const booksList = useSelector(state => state.grouppage.bookslist);
      const countAllBooks = useSelector(state => state.grouppage.countallbooks);
      const allRecipesGroup = useSelector(state => state.grouppage.allrecipesgroup);
      const countAllrecipesGroup = useSelector(state => state.grouppage.countallrecipesgroup);


  const [openGetOutOfGroupDialog, setOpenGetOutOfGroupDialog] = useState(false);
const [getOutOfGroupId, setGetOutOfGroupId] = useState(null);

const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
const [deleteId, setDeleteId] = useState(null);


const handleOpenGetOutOfGroupDialog = (id) => {
  setGetOutOfGroupId(id);
  setOpenGetOutOfGroupDialog(true);
};

const handleCloseGetOutOfGroupDialog = () => {
  setOpenGetOutOfGroupDialog(false);
  setGetOutOfGroupId(null);
};

const handleOpenDeleteDialog = (id) => {
  setDeleteId(id);
  setOpenDeleteDialog(true);
};

const handleCloseDeleteDialog = () => {
  setOpenDeleteDialog(false);
  setDeleteId(null);
};

  


  const handleJoinToGroup = (item) => {
    dispatch(jointogroup(item._id));
  };


  const handleEditClick = (id) => {
    dispatch(setpagemode("edit"));
  };

  const handlePdfClick = (id) => {
    console.log(`ID: ${id}`);
  };

  if (!currentGroup?._id || !user) return null;

const isInCodes = (groupId) => {
  return user.codes.some((code, index) => {
    // Case 1: populated object → code._id exists
    if (code?._id) {
      return code._id?.toString() === groupId.toString();
    }
    return code?.toString?.() === groupId.toString();
  });
};

  return (
    <div>

        <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '10px' }}>
          <Grid item>
{currentGroup?.owner?.includes(user?._id) && (
        <Button
  variant="contained"
  color="error"
  startIcon={<DeleteIcon />}
  onClick={() => handleOpenDeleteDialog(currentGroup._id)}
>
  מחיקת קבוצה
</Button>
            )}
          </Grid>

          <Grid item>
{!currentGroup?.owner?.includes(user?._id) &&
  !user?.codes?.includes(currentGroup?._id) && (
                <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleJoinToGroup(currentGroup)}
            >
            הצטרפות קבוצה
            </Button>
            )}
          </Grid>


      <Grid item>
   {!currentGroup?.owner?.includes(user?._id) && isInCodes(currentGroup._id) && (

      <Button
  variant="contained"
  color="error"
  startIcon={<DeleteIcon />}
  onClick={() => handleOpenGetOutOfGroupDialog(currentGroup._id)}
>
  יציאה קבוצה
</Button>
            )}
          </Grid>

          <Grid item>
          {currentGroup?.owner?.includes(user?._id) && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick(currentGroup)}
            >
              עריכה
            </Button>
            )}
          </Grid>

                
              <Grid item>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<PictureAsPdfIcon />}
              onClick={() => handlePdfClick(currentGroup)}
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
    האם אתה בטוח שברצונך למחוק את מהקבוצה?
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteDialog} color="primary">
      ביטול
    </Button>
    <Button
      color="error"
      onClick={() => {
        dispatch(deletegroupowner(deleteId));
        handleCloseDeleteDialog();
        navigate("/groups");  
      }}
    >
      מחיקה
    </Button>
  </DialogActions>
</Dialog>

        <Dialog open={openGetOutOfGroupDialog} onClose={handleCloseGetOutOfGroupDialog}>
  <DialogTitle>מחיקת מתכון</DialogTitle>
  <DialogContent>
    האם אתה בטוח שברצונך לצאת מהקבוצה?
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseGetOutOfGroupDialog} color="primary">
      ביטול
    </Button>
    <Button
      color="error"
      onClick={() => {
        dispatch(getoutfromgroup(deleteId));
        handleCloseGetOutOfGroupDialog();
        navigate("/groups");  
      }}
    >
      יציאה
    </Button>
  </DialogActions>
</Dialog>

    </div>

  );
};

export default GroupDisplay;
