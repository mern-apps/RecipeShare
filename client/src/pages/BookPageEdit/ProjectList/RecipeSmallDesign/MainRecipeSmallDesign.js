import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from '@mui/material';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import ItemDisplay2 from '../../ItemDisplay/ItemDisplay2.js';

import { setrecipe2 } from '../../../../actions/bookEditPageActions.js';
import { setpagemode2 } from '../../../../actions/bookEditPageActions.js';
import { PDFBook } from '../../../../actions/bookEditPageActions.js';

import { removerecipefrombook } from '../../../../actions/bookEditPageActions.js';
import { deletebookowner } from '../../../../actions/bookPageActions.js';
import { setpagemode as setpagemodebook } from '../../../../actions/bookPageActions.js';
import { previouspage } from '../../../../actions/recipeNewForm.js';
import { currentrecipe } from '../../../../actions/recipeNewForm.js';
import { setpagemode as setpagemoderecipe } from '../../../../actions/recipeNewForm.js';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import RecipeSmallDesign from '../../../../Components/SmallCards/RecipeSmallDesign.js';
import GroupSmallDesign from '../../../../Components/SmallCards/GroupSmallDesign.js';


const MainRecipeSmallDesign = ({ task,pagemode }) => {


    const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const bookRecipeSmallDesign = useSelector(state => state.currentproject.currentproject);
     const countAllrecipesBook = useSelector(
            state =>
              state.currentproject.currentproject?.recipes?.filter(r =>
                (r?.type || []).some(t => Math.floor(t) === 1)
              ).length || 0
          );
  const { user } = useSelector((state) => state.auth);

  const [openDeleteDialog1, setOpenDeleteDialog1] = useState(false);
  const [deleteId1, setDeleteId1] = useState(null);

    const [pdfLoading, setPdfLoading] = useState(false);

  const handlePdfClick = async (bookId) => {
    if (pdfLoading) return;
  
    try {
      setPdfLoading(true);
      dispatch(PDFBook(bookId));
    } finally {
      setPdfLoading(false);
    }
  };

    const handleOpenDeleteDialog1 = (id) => {
    setDeleteId1(id);
    setOpenDeleteDialog1(true);
  };
  const handleCloseDeleteDialog1 = () => {
    setOpenDeleteDialog1(false);
    setDeleteId1(null);
  };

const handleEdit = () => {
  const types = task?.type || [];
  const isType1 = types.some(t => t >= 1 && t < 2);
  const isType2 = types.some(t => t >= 2 && t < 3);
  const isType10 = types.some(t => t >= 10 && t < 11);

  if (isType1) {
    dispatch(currentrecipe(task));
    dispatch(setpagemoderecipe("edit"));
    dispatch(previouspage(location.pathname + location.search))
    navigate(`/recipe/${task._id}`);
  } 
  else if (isType2) {
    dispatch(setrecipe2(task));
    dispatch(previouspage(location.pathname + location.search))
    navigate('/newpage2');

  }
  else if (isType10) {
dispatch(setpagemodebook("edit"));
  }
};

  const handleDelete = () => {
      const types = task?.type || [];
  const isType1 = types.some(t => t >= 1 && t < 2);
  const isType2 = types.some(t => t >= 2 && t < 3);
  const isType10 = types.some(t => t >= 10 && t < 11);
if (isType1 || isType2) {
     if (!bookRecipeSmallDesign?._id) return;
    const data = { taskID: task._id, bookID: bookRecipeSmallDesign._id };
    dispatch(removerecipefrombook(data));
  } 
  else if (isType10) {

handleOpenDeleteDialog1(bookRecipeSmallDesign._id)
  }

 
  };

const typeList = (task?.type || []).map(t => Math.floor(t));

const hasType1 = typeList.includes(1);
const hasType10 = typeList.includes(10);
const hasType2 = typeList.includes(2);

return (
    <Box
  sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {/* ICONS ON LEFT */}
    
{hasType1 ? (
  <RecipeSmallDesign task={task} />
) : hasType10 ? (
<Box
  sx={{

  }}
>
    <GroupSmallDesign item={task} />
  </Box>
) : hasType2 ? (
<Box
  sx={{
    width: 121, // 50% of 220
    height: 176, // 50% of 320
    mx: "auto",
    background: "#fff",
    border: "1px solid #d4d4d4",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    mt: 2,
  }}
>
    <GroupSmallDesign item={task} />
  </Box>
) : (
  <RecipeSmallDesign task={task} />
)}

{task?.owner?.includes(user?._id) && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.1,
        }}
      >
   {hasType10 && (
  <>
      <Typography
      component="span"
      sx={{
        fontSize: "1.5rem",
        color: "#64748b",
        fontWeight: 400,
      }}
    >
      {countAllrecipesBook || 0} מתכונים
    </Typography>

    {pagemode === "view" && (
        
    <Button
     onClick={() => dispatch(setpagemodebook("edit1"))}
       sx={{
      color: '#1976D2',
      border: '1px solid #1976D2',
      borderRadius: 2,
      padding: '2px',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: 'rgba(25,118,210,0.10)',
        borderColor: '#125cae',
      },
    }}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          הוספת מתכון       </Typography>
    </Button>
    )}



    <Button
      onClick={() => {
        dispatch(setpagemode2("new"));
        navigate("/newpage2");
      }}
       sx={{
      color: '#1976D2',
      border: '1px solid #1976D2',
      borderRadius: 2,
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: 'rgba(25,118,210,0.10)',
        borderColor: '#125cae',
      },
    }}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
הוספת קטגוריה      </Typography>
    </Button>

    

    <Button
      onClick={() => handlePdfClick(bookRecipeSmallDesign._id)}
      disabled={pdfLoading}
       sx={{
      color: '#1976D2',
      border: '1px solid #1976D2',
      borderRadius: 2,
      padding: '2px',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: 'rgba(25,118,210,0.10)',
        borderColor: '#125cae',
      },
    }}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {pdfLoading ? "מכין..." : "שמירה כקובץ"}
      </Typography>

    </Button>
  </>
)}

     <>
  <IconButton
    onClick={handleEdit}
    sx={{
      color: '#1976D2',
      border: '1px solid #1976D2',
      borderRadius: 2,
      padding: '2px',
      display: 'flex',
      alignItems: 'center',
      gap: hasType10 ? 0.5 : 0,   // only spacing when text exists
      '&:hover': {
        backgroundColor: 'rgba(25,118,210,0.10)',
        borderColor: '#125cae',
      },
    }}
  >
    <EditIcon fontSize="small" />

    {hasType10 && (
      <Typography
        component="span"
        sx={{
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#1976D2",
          lineHeight: 1,
        }}
      >
        עריכה
      </Typography>
    )}
  </IconButton>

  <IconButton
    onClick={handleDelete}
    sx={{
      color: 'purple',
      border: '1px solid purple',
      borderRadius: 2,
      padding: '2px',
      display: 'flex',
      alignItems: 'center',
      gap: hasType10 ? 0.5 : 0,
      '&:hover': {
        backgroundColor: 'rgba(128,0,128,0.10)',
      },
    }}
  >
    <DeleteIcon fontSize="small" />

    {hasType10 && (
      <Typography
        component="span"
        sx={{
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "purple",
          lineHeight: 1,
        }}
      >
        מחיקה
      </Typography>
    )}
  </IconButton>
</>
      </Box>
)}

<Dialog open={openDeleteDialog1} onClose={handleCloseDeleteDialog1} dir="rtl">
        <DialogTitle>מחיקת ספר</DialogTitle>
        <DialogContent>
          <Typography>האם אתה בטוח שברצונך למחוק את הספר?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog1} color="inherit">
            ביטול
          </Button>
          <Button
            onClick={async () => {
              if (deleteId1) {
                await dispatch(deletebookowner(deleteId1));
                handleCloseDeleteDialog1();
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

export default MainRecipeSmallDesign;