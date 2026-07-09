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
  <Box
    sx={{
      width: "100%",
      backgroundColor: "#F5F5F5",
      display: "flex",
      flexDirection: "column",
      direction: "rtl",
    }}
  >
    {/* MAIN CONTENT */}
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        px: 2,
        pb: 2,
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
          pt: 1,
        }}
      >
        <Tooltip title="סגור">
          <IconButton
            onClick={() => setRecipesListOpen(false)}
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              border: "1px solid #e22f0f",
              backgroundColor: "#fff",
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Tooltip>

        <Typography
          sx={{
            fontSize: adjustedFontSize(1.4),
            fontWeight: 700,
            textAlign: "right",
            flex: 1,
            mr: 1,
          }}
        >
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

      {/* ACTION BAR (MOBILE STACKED) */}
      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          alignItems: "center",
        }}
      >
        {/* STATUS TEXT */}
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontWeight: 700, fontSize: adjustedFontSize(1) }}>
            {chosenRecipe ? "מתכון נבחר מוכן להוספה" : "בחר מתכון להוספה"}
          </Typography>

          <Typography
            sx={{
              color: "#6b7280",
              fontSize: adjustedFontSize(0.82),
            }}
          >
            {chosenRecipe ? "לחץ להוספה לקבוצה" : "יש לבחור מתכון מהרשימה"}
          </Typography>
        </Box>

        {/* BUTTON ROW */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            mb:5,
            width: "100%",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={() => setRecipesListOpen(false)}
            variant="outlined"
            sx={{
              minWidth: 100,
              height: 44,
              borderRadius: "12px",
              borderColor: "#ef4444",
              color: "#ef4444",
              fontWeight: 700,
            }}
          >
            בטל
          </Button>

          <Button
            variant="contained"
            disabled={!chosenRecipe}
            startIcon={<CheckRoundedIcon />}
            onClick={handleSubmitRecipe}
            sx={{
              minWidth: 160,
              height: 44,
              fontWeight: 700,
              borderRadius: "12px",
              color: "#fff",
              background: chosenRecipe
                ? "linear-gradient(135deg, #16A34A, #22C55E)"
                : "#d1d5db",
              boxShadow: chosenRecipe
                ? "0 8px 20px rgba(34,197,94,0.25)"
                : "none",
            }}
          >
            הוסף לקבוצה
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>
);
};

export default MainAllRecipes;