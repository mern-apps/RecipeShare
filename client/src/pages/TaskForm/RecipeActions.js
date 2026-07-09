import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  copyrecipe,
  addtofavoriterecipe,
  removefavoriterecipe,
  deleterecipe,
  PDFRecipe,
} from "../../actions/recipespage.js";

import { setpagemode } from "../../actions/recipeNewForm.js";

const RecipeActions = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const previouspage = useSelector((state) => state.general.previouspage);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    const favorites = Array.isArray(user?.favorite) ? user.favorite : [];
    const favoritesAdmin = Array.isArray(user?.favoriteAdmin) ? user.favoriteAdmin : [];
    setIsFavorite(
      favorites.includes(item._id) || favoritesAdmin.includes(item._id)
    );

     console.log("🔍 item._id:", item._id);
  console.log("👤 user.favorite:", favorites);
  console.log("👑 user.favoriteAdmin:", favoritesAdmin);

  console.log("✅ is in favorite:", favorites.includes(item._id));
  console.log("✅ is in favoriteAdmin:", favoritesAdmin.includes(item._id));
  
  }, [user, item._id]);

  const buttonStyle = {
    minHeight: 50,
    borderRadius: 2.5,
    fontWeight: "bold",
    fontSize: "1.1rem",
    textTransform: "none",
    color: "#000",
  };

  const gradients = {
    delete: "linear-gradient(145deg, #FF6B6B, #D94FFF)",
    add: "linear-gradient(145deg, #80D0FF, #B388FF)",
    edit: "linear-gradient(145deg, #FFD580, #FFB388)",
    favorite: "linear-gradient(145deg, #FF6B6B, #D94FFF)",
    pdf: "linear-gradient(145deg, #80D0FF, #B388FF)",
  };

    const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };
  
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  const handleConfirmDelete = () => {
    dispatch(deleterecipe(item));
    setOpenDeleteDialog(false);
      navigate(previouspage || "/myrecipes");
  };

    const handlePdfClick = async (RecipeID) => {
      if (pdfLoading) return;
    
      try {
        setPdfLoading(true);
        dispatch(PDFRecipe(RecipeID));
      } finally {
        setPdfLoading(false);
      }
    };
  


  return (
     <>
  <Grid
    container
    spacing={1}
    justifyContent="center"
   sx={{
  flexWrap: 'nowrap',
  overflowX: 'auto',   // גלילה אם אין מקום
}}
  >
      <Grid item>
        <Button onClick={() => navigate(previouspage || "/myrecipes")}>
          חזור
        </Button>
      </Grid>

      {user?._id && item.owner === user._id && (
        <Grid item>
          <Button
            startIcon={<DeleteIcon />}
      onClick={handleDeleteClick}
            sx={{ ...buttonStyle, background: gradients.delete }}
          >
            מחיקה
          </Button>
        </Grid>
      )}

      {user?._id && item.owner !== user._id && (
        <Grid item>
          <Button
            startIcon={<AddIcon />}
onClick={() => dispatch(copyrecipe(item, navigate))}
            sx={{ ...buttonStyle, background: gradients.add }}
          >
            העתקה
          </Button>
        </Grid>
      )}

      {user?._id && item.owner === user._id && (
        <Grid item>
          <Button
            startIcon={<EditIcon />}
            onClick={() => dispatch(setpagemode("edit"))}
            sx={{ ...buttonStyle, background: gradients.edit }}
          >
            עריכה
          </Button>
        </Grid>
      )}

      <Grid item>
        <Button
          startIcon={<FavoriteIcon />}
          onClick={() =>
            isFavorite
              ? dispatch(removefavoriterecipe(item))
              : dispatch(addtofavoriterecipe(item))
          }
          sx={{ ...buttonStyle, background: gradients.favorite }}
        >
          {isFavorite ? "הסר מועדפים" : "הוסף למועדפים"}
        </Button>
      </Grid>

      <Grid item>
        <Button
          startIcon={<PictureAsPdfIcon />}
            onClick={() => handlePdfClick(item._id)}
    disabled={pdfLoading}
          sx={{ ...buttonStyle, background: gradients.pdf }}
        >
          {pdfLoading ? "טוען..." : "PDF"}
        </Button>
      </Grid>

 

    </Grid>
               <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        disableEscapeKeyDown
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          למחוק את המתכון?
        </DialogTitle>
      
        <DialogContent>
          <DialogContentText>
            פעולה זו אינה ניתנת לשחזור.  
            האם אתה בטוח שברצונך למחוק את המתכון "{item.title}"?
          </DialogContentText>
        </DialogContent>
      
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            variant="outlined"
          >
            ביטול
          </Button>
      
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            מחיקה
          </Button>
        </DialogActions>
      </Dialog>
       </>
  );
};

export default RecipeActions;