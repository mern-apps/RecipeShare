import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { ToggleButton } from "@mui/material";

import {deletebookowner,setpagemode} from '../../actions/bookPageActions.js';

export const BookInfo = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const currentBook = useSelector(state => state.currentproject.currentproject);

const totalRecipes = currentBook?.recipes?.length || 0;

const recipesInPages =
  currentBook?.recipes?.filter(
    r => r.type?.some(t => t < 2)
  ).length || 0;


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


  const handleEditClick = () => {
    dispatch(setpagemode("edit"));
  };

  const handlePdfClick = (id) => {
    console.log(`ID: ${id}`);
  };


  if (!currentBook?._id || !user) return null;


  // Extract title + image from item
const bookTitle = item?.title
  ? item.title.replace(/<[^>]*>/g, "").trim()
  : "קבוצה ללא שם";
  const bookImage = item?.image || item?.imageUrl || null;


const editGroupBtn = {
  px: 2.5,
  py: 1,
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#fff",
  background: "linear-gradient(135deg,#1e3a8a,#3b82f6)", // vibrant blue gradient
  boxShadow: "0 6px 18px rgba(30,58,138,0.35)",
  transition: "all .22s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 28px rgba(30,58,138,0.45)",
  },
};

const deleteGroupBtn = {
  px: 2.5,
  py: 1,
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#fff",
  background: "linear-gradient(135deg,#9f1239,#be123c)", // wine red
  boxShadow: "0 6px 18px rgba(159,18,57,0.35)",
  transition: "all .22s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 10px 26px rgba(159,18,57,0.45)",
  },
};

const joinGroupBtn = {
  px: 2.5,
  py: 1,
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#fff",
  background: "linear-gradient(135deg,#4d7c0f,#65a30d)", // olive green
  boxShadow: "0 6px 18px rgba(77,124,15,0.35)",
  transition: "all .22s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 10px 26px rgba(77,124,15,0.45)",
  },
};

const leaveGroupBtn = {
  px: 2.5,
  py: 1,
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#fff",
  background: "linear-gradient(135deg,#6b7280,#4b5563)", // warm gray
  boxShadow: "0 6px 18px rgba(75,85,99,0.35)",
  transition: "all .22s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 10px 26px rgba(75,85,99,0.45)",
  },
};
  return (
 <Box
  sx={{
    mb: 1,
    px: 2,
    direction: "rtl",
  }}
>
  <Grid container alignItems="center" spacing={3}>

    <Grid item>
      <Avatar
        src={bookImage || undefined}
        alt={bookTitle}
        sx={{
          width: 96,
          height: 96,
          borderRadius: 4,
          fontSize: "2.2rem",
          fontWeight: 800,
          bgcolor: "#e5e7eb",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        }}
      >
        {!bookImage && bookTitle?.charAt(0)}
      </Avatar>
    </Grid>

    <Grid item xs>
      <Typography
        variant="h2"
        fontWeight={900}
  sx={{ 
    letterSpacing: "-0.03em",
color:
    currentBook?.fontColor?.toLowerCase() === "#ffffff"
      ? "#0b3d91"
      : currentBook?.fontColor || "#000",
        }}      >
        {bookTitle}
      </Typography>
    </Grid>

    {/* Show Users Button */}
    
  </Grid>

  <Box sx={{ mt: 1, mr: 1 }}>
  <Typography
    variant="h6"
    sx={{
      color: "#1E3A8A",
      fontWeight: 700,
    }}
  >
    כמות מתכונים: {recipesInPages}
  </Typography>

  <Typography
    variant="h6"
   sx={{
      color: "#1E3A8A",
      fontWeight: 700,
    }}
  >
    סה״כ עמודים בספר: {totalRecipes-1}
  </Typography>
</Box>



 <Grid container spacing={2} sx={{ mt: 1 }}>

{currentBook?.owner?.includes(user?._id) && (
      <Grid item>
      <Button
        startIcon={<EditIcon />}
        onClick={handleEditClick}
        sx={editGroupBtn}
      >
        עריכת ספר
      </Button>
    </Grid>
  )}

{currentBook?.owner?.includes(user?._id) && (
      <Grid item>
      <Button
        startIcon={<DeleteIcon />}
        onClick={() => handleOpenDeleteDialog(currentBook._id)}
        sx={deleteGroupBtn}
      >
        מחיקת ספר
      </Button>
    </Grid>
  )}


</Grid>
<Dialog
  open={openDeleteDialog}
  onClose={handleCloseDeleteDialog}
  dir="rtl"
>
  <DialogTitle>מחיקת ספר</DialogTitle>
  <DialogContent>
    <Typography>האם אתה בטוח שברצונך למחוק את הספר?</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteDialog} color="inherit">
      ביטול
    </Button>
    <Button
      onClick={async () => {
        if (deleteId) {
          await dispatch(deletebookowner(deleteId));
          handleCloseDeleteDialog();
          navigate("/books");
        }
      }}
      color="error"
      variant="contained"
      startIcon={<DeleteIcon />}
    >
      מחיקה
    </Button>
  </DialogActions>
</Dialog>

</Box>
  );
};

export default BookInfo;
