import React, { useRef, useState,useEffect } from 'react';

import {
  Button,
  Box,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/material/Typography';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import LayoutFilter from './LayoutFilter.js';
import Allrecipes from './Allrecipes.js';

import { setfiltercategories } from '../../../actions/recipespage.js';
import { setfiltertags } from '../../../actions/recipespage.js';

import { addrecipetogroup } from '../../../actions/groupactions.js';
import { newformID } from '../../../actions/bookPageActions.js';

const MainAllRecipes = ({
  setRecipesListOpen,
  chosenRecipe,
  setChosenRecipe
}) => {
        const dispatch = useDispatch();

    const  {user}  = useSelector((state) => state.auth);
  const currentGroup = useSelector(state => state.grouppage.currentgroup);

 // ♿ Accessibility
        const localaccessibilitySettings = useSelector((state) => state.auth.accessibility);
        const [accessibilityData, setAccessibilityData] = useState(localaccessibilitySettings);
      
        useEffect(() => {
          if (user && user.accessibility) {
            setAccessibilityData(user.accessibility);
          } else {
            setAccessibilityData(localaccessibilitySettings);
          }
        }, [user, localaccessibilitySettings]);
      
        const adjustedFontSize = (size) => `${(size * (accessibilityData?.fontSizeAdjustments || 100)) / 100}rem`;
        const adjustedLineHeight = (defaultValue) => defaultValue * (accessibilityData?.lineSpacing || 1);
        const adjustedWordSpacing = (defaultValue) => defaultValue * (accessibilityData?.wordSpacing || 1);
        const adjustedLetterSpacing = (defaultValue) => defaultValue * (accessibilityData?.letterSpacing || 1);
      
    // Keyboard shortcuts for accessibility
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.altKey) {
          switch (event.key.toUpperCase()) {
            case 'F':
              event.preventDefault();
              document.getElementById('home-page-button')?.click();
              break;
            default:
              break;
          }
        }
      };
 window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);


  const filtercategories = useSelector(state => state.recipespage.filtercategories);
  const filtertags = useSelector(state => state.recipespage.filtertags);

 const [activeCategories, setActiveCategories] = useState([]);
 const [activeTags, setActiveTags] = useState([]);


useEffect(() => {
  const resetCategories = filtercategories.map(cat => ({
    ...cat,
    active: false
  }));
  const resetTags = filtertags.map(tag => ({
    ...tag,
    active: false
  }));

  dispatch(setfiltercategories(resetCategories));
  dispatch(setfiltertags(resetTags));
}, []); // only on first render
  

   useEffect(() => {
  // Update activeCategories to contain only descriptions of active categories
  setActiveCategories(
    filtercategories
      .filter(category => category.active)
      .map(category => category.description)
  );
}, [filtercategories]);

useEffect(() => {
  // Update activeTags to contain only descriptions of active tags
  setActiveTags(
    filtertags
      .filter(tag => tag.active)
      .map(tag => tag.description)
  );
}, [filtertags]);

 const handleButtonClickcategorytest = (categoryDescription) => {
  const updatedFiltercategories = filtercategories.map(category =>
    category.description === categoryDescription
      ? { ...category, active: !category.active } // יצירת אובייקט חדש
      : category
  );
  dispatch(setfiltercategories(updatedFiltercategories));
};

const handleButtonClicktagtest = (tagDescription) => {
  const updatedFiltertags = filtertags.map(tag =>
    tag.description === tagDescription
      ? { ...tag, active: !tag.active } // יצירת אובייקט חדש
      : tag
  );
  dispatch(setfiltertags(updatedFiltertags));
};
  
const handleSubmitRecipe = async () => {
  if (!chosenRecipe || !currentGroup?._id) return;

  const data = {
    chosenRecipe,
    groupId: currentGroup._id,
  };
  await dispatch(addrecipetogroup(data));
  dispatch(newformID(null));
  setChosenRecipe(null);
  setRecipesListOpen(false);
};

  return (
    <Box sx={{ backgroundColor: "#F5F5F5"}}>
      {/* HEADER */}
 

      {/* MAIN CONTENT (NO GRID) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1, // 🔥 tight vertical spacing
          px: 2,
        }}
      >

             <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
        }}
      >
       

        <Tooltip title="סגור">
          <IconButton
            onClick={() => setRecipesListOpen(false)}
            sx={{
              width: 44,
              height: 44,
              borderRadius: "14px",
              border: "1px solid #e22f0f",
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Tooltip>

         <Typography sx={{ fontSize: adjustedFontSize(2), fontWeight: 700 }}>
          הוספת מתכון לקבוצה
        </Typography>

      </Box>

        {/* FILTERS */}
        <LayoutFilter
          activeCategories={activeCategories}
          filtercategories={filtercategories}
          handleButtonClickcategorytest={handleButtonClickcategorytest}
          activeTags={activeTags}
          filtertags={filtertags}
          handleButtonClicktagtest={handleButtonClicktagtest}
        />

        {/* LIST */}
        <Box>
          <Allrecipes
            activeCategories={activeCategories}
            activeTags={activeTags}
            filtercategories={filtercategories}
            filtertags={filtertags}
            chosenRecipe={chosenRecipe}
            setChosenRecipe={setChosenRecipe}
          />
        </Box>

        {/* ACTION BAR */}
    <Box
  sx={{
    mt: 1,
    mb: 2,
    p: 1.5,

    width: "fit-content",
    minWidth: 500,       // optional
    maxWidth: 800,       // optional

    mx: "auto",          // ⭐ center horizontally

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,

    background: "rgba(255,255,255,0.92)",
    borderRadius: "16px",
    border: "1px solid rgba(229,231,235,0.8)",
  }}
>
  <Button
    onClick={() => setRecipesListOpen(false)}
    variant="outlined"
    sx={{
      minWidth: 90,
      height: 44,
      borderRadius: "14px",

      borderColor: "#ef4444",
      color: "#ef4444",

      fontWeight: 700,
      fontSize: adjustedFontSize(0.95),

      transition: "all 0.22s ease",

      "&:hover": {
        borderColor: "#dc2626",
        color: "#dc2626",

        backgroundColor: "rgba(239,68,68,0.06)",

        transform: "translateY(-2px)",

        boxShadow: "0 8px 20px rgba(239,68,68,0.18)",
      },
    }}
  >
    בטל
  </Button>

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: adjustedFontSize(1) }}>
              {chosenRecipe ? "מתכון נבחר מוכן להוספה" : "בחר מתכון להוספה"}
            </Typography>

            <Typography sx={{ color: "#6b7280", fontSize: adjustedFontSize(0.82) }}>
              {chosenRecipe ? "לחץ להוספה לקבוצה" : "יש לבחור מתכון מהרשימה"}
            </Typography>
          </Box>

          <Button
            variant="contained"
            disabled={!chosenRecipe}
            startIcon={<CheckRoundedIcon />}
            onClick={handleSubmitRecipe}
        sx={{
  minWidth: 180,
  height: 52,

  fontSize: adjustedFontSize(1),
  fontWeight: 700,

  borderRadius: "14px",

  color: "#fff",

  background: chosenRecipe
    ? "linear-gradient(135deg, #16A34A, #22C55E)"
    : "#d1d5db",

  boxShadow: chosenRecipe
    ? "0 10px 24px rgba(34,197,94,0.28)"
    : "none",

  transition: "all 0.25s ease",

  "&:hover": {
    background: chosenRecipe
      ? "linear-gradient(135deg, #15803D, #16A34A)"
      : "#d1d5db",

    transform: chosenRecipe ? "translateY(-2px)" : "none",

    boxShadow: chosenRecipe
      ? "0 14px 30px rgba(34,197,94,0.35)"
      : "none",
  },

  "&:disabled": {
    color: "#ffffff",
    background: "#d1d5db",
  },
}}
          >
            הוסף לקבוצה
          </Button>


        </Box>
      </Box>
    </Box>
  );
};

export default MainAllRecipes;