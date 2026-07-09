import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import { useSelector, useDispatch } from 'react-redux';


import {copyrecipe,addtofavoriterecipe,removefavoriterecipe} from '../../actions/recipespage.js';
import { deleterecipe } from '../../actions/recipespage.js';
import { PDFRecipe } from '../../actions/recipespage.js';


import { setpagemode } from '../../actions/recipeNewForm.js';


import categories from '../../assets/Icons/recipe1pdf/categories.png';
import leveldifficulty from '../../assets/Icons/recipe1pdf/leveldifficulty.png';
import numserves from '../../assets/Icons/recipe1pdf/numserves.png';

import { Grid, Box, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import Divider from '@mui/material/Divider';

import { FONT_COLOR_OPTIONS } from '../../assets/fontColorRecipe1.js';
import { FONT_SIZE_OPTIONS } from '../../assets/fontSize.js';

const A4_WIDTH = 21;
const A4_HEIGHT = 29.7;

const ItemDisplayView = ({ item, imageRecipeDisplay }) => {

    const imageDisplay = imageRecipeDisplay || item.image

  const { user } = useSelector((state) => state.auth);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const previouspage = useSelector(state => state.general.previouspage);
  const [pdfLoading, setPdfLoading] = useState(false);

  const dispatch = useDispatch();
      const navigate = useNavigate();

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingY: 1.5,
  paddingX: 3,
  minHeight: 50, // same height for all buttons
  borderRadius: 2.5,
  fontWeight: "bold",
  fontSize: "1.1rem", // enlarged text
  textTransform: "none",
  color: "#000", // black font
  boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.25)",
  },
  "&:active": {
    transform: "translateY(1px)",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },
};

// Button gradients by type
const gradients = {
  delete: "linear-gradient(145deg, #FF6B6B, #D94FFF)",       // red → purple
  add: "linear-gradient(145deg, #80D0FF, #B388FF)",          // light blue → purple
  edit: "linear-gradient(145deg, #FFD580, #FFB388)",         // yellow → orange
  favorite: "linear-gradient(145deg, #FF6B6B, #D94FFF)",     // red → purple
  pdf: "linear-gradient(145deg, #80D0FF, #B388FF)",          // light blue → purple
};


  if (!item) return null;

const raw = Number(item?.ingFont || 1.1);
    // 🔹 Extract parts
    const sizeType = Math.floor(raw);
    const colorType = Number((raw % 1).toFixed(1));
    
    // 🔹 Find size
    const sizeOption = FONT_SIZE_OPTIONS.find(
      (s) => s.type === sizeType
    );
    const fontSizeIng = sizeOption?.value || 25;
    
    // 🔹 Find color
    const colorOption = FONT_COLOR_OPTIONS.find(
      (c) => c.type === colorType
    );
    const fontColorIng = colorOption?.value || "#000000";


    //

    const rawIns = Number(item?.insFont || 1.1);
        // 🔹 Extract parts
        const sizeTypeIns = Math.floor(rawIns);
        const colorTypeIns = Number((rawIns % 1).toFixed(1));
        
        // 🔹 Find size
        const sizeOptionIns = FONT_SIZE_OPTIONS.find(
          (s) => s.type === sizeTypeIns
        );
        const fontSizeIns = sizeOptionIns?.value || 25;
        
        // 🔹 Find color
        const colorOptionIns = FONT_COLOR_OPTIONS.find(
          (c) => c.type === colorTypeIns
        );
        const fontColorIns = colorOptionIns?.value || "#000000";

  return (
    <Box
  sx={{
    display: "flex",
    gap: 2, // space between main content and buttons
  }}
>
 <Box
  sx={{
    width: `${A4_WIDTH}cm`,
    height: `${A4_HEIGHT}cm`,
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',

    pt: 2,
    px: 2,
    pb: 2,
  }}
>

      {/* ================= ROW 1 — IMAGE ================= */}
      <Box sx={{ width: '100%', height: '25%' }}>
        <Box
          component="img"
          src={imageDisplay}
          alt="Recipe"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* ================= ROW 2 — TITLE + AUTHOR ================= */}
      <Box sx={{ width: '100%', textAlign: 'right' }}>
        <Typography
          sx={{
            color: '#30BFBF',
            fontFamily: 'Roboto',
            fontWeight: 600,
            fontSize: '3rem',
          }}
        >
          {item.title}
        </Typography>

        <Typography
          sx={{
            color: '#7A6D8E',
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '2rem',
          }}
        >
          {item.author}
        </Typography>
      </Box>

      {/* ================= ROW 3 — ICONS ================= */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: -5, mb: 3 }}>
        <Grid container sx={{ width: '70%', textAlign: 'center' }}>

          <Grid item xs={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box component="img" src={categories} sx={{ width: 140, height: 140 }} />
              <Typography sx={{ fontSize: 28, color: '#30BFBF', fontWeight: 550, mt: -5 }}>
                קטגוריה
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#444' }}>
                {item.selectedCategories}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box component="img" src={numserves} sx={{ width: 140, height: 140 }} />
              <Typography sx={{ fontSize: 28, color: '#30BFBF', fontWeight: 550, mt: -5 }}>
                מספר מנות
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#444' }}>
                {item.numserves}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box component="img" src={leveldifficulty} sx={{ width: 140, height: 140 }} />
              <Typography sx={{ fontSize: 28, color: '#30BFBF', fontWeight: 550, mt: -5 }}>
                רמת קושי
              </Typography>
              <Typography sx={{ fontSize: 18, color: '#444' }}>
                {item.level}
              </Typography>
            </Box>
          </Grid>

        </Grid>
      </Box>

      {/* ================= ROW 4 — CONTENT ================= */}
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>

       <Grid item xs={4.5}>
          <Box sx={{ height: '100%', textAlign: 'right' }}>
            <Typography sx={{ color: '#30BFBF', fontSize: '2rem', mb: 1,fontWeight: 'bold' }}>
              מרכיבים
            </Typography>

          <Typography
  sx={{
             fontFamily: "'Inter', sans-serif",
   fontSize: `${fontSizeIng}px`,
    color: fontColorIng || "#FFFFFF",
    direction: 'rtl',
    lineHeight: 1.6,
    '& p': {
      margin: 0, // 🔥 זה העיקר
    },
  }}
  dangerouslySetInnerHTML={{ __html: item.ingredients }}
/>
          </Box>
        </Grid>
  

          <Grid item xs={0.3} sx={{ display: 'flex', justifyContent: 'center' }}>
    <Divider
      orientation="vertical"
      sx={{
        height: '95%',
        alignSelf: 'center',
        borderColor: '#d9d9d9',
      }}
    />
  </Grid>

   <Grid item xs={7}>
          <Box sx={{ height: '100%', textAlign: 'right' }}>
            <Typography sx={{ color: '#30BFBF', fontSize: '2rem', mb: 1,fontWeight: 'bold' }}>
              הוראות הכנה
            </Typography>

            <Typography
  sx={{
               fontFamily: "'Inter', sans-serif",
   fontSize: `${fontSizeIns}px`,
    color: fontColorIns || "#FFFFFF",
    direction: 'rtl',
    lineHeight: 1.6,
    '& p': {
      margin: 0, // 🔥 זה העיקר
    },
  }}
  dangerouslySetInnerHTML={{ __html: item.instructions }}
/>
          </Box>
        </Grid>

            </Grid>

    
    </Box>
    

    </Box>

    
  );
  
};

export default ItemDisplayView;
