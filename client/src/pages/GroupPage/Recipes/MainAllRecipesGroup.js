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


const MainAllRecipesGroup = ({
  setRecipesListOpen,
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


  return (
    
    <>
  

 <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'right',
      }}
    >

              <Box
  sx={{
    justifyContent: "left",
    alignItems: "center",
    px: 2,
     }}
>
<Typography variant="h1" sx={{ color: "#1e60d6", fontSize: "40px", fontFamily: "Kroshe Hebrew, sans-serif", fontWeight: "bold", mr: "10px" }}>
  כל המתכונים בקבוצה
  </Typography>

  <Button
    onClick={() => setRecipesListOpen(true)}
   sx={{
    borderRadius: 3,
    fontSize: adjustedFontSize(1.2),
    lineHeight: adjustedLineHeight(1.3),
    letterSpacing: adjustedLetterSpacing(0.05),
    wordSpacing: adjustedWordSpacing(0.02),
    padding: "10px 22px",
    background: "linear-gradient(135deg, #6B4BCC, #8C70FF)",
    color: "#fff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
    border: "1px solid rgba(255,255,255,0.3)",
    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 28px rgba(0,0,0,0.3)",
      background: "linear-gradient(135deg, #5839B5, #755EFF)",
      border: "1px solid #fff",
    },
    "&:focus-visible": {
      outline: "3px solid #FF6347",
      outlineOffset: "3px",
    },
  }}
  >
    הוסף מתכון לקבוצה
  </Button>
</Box>
                         
      <Box sx={{ width: '100%', mt: 2 }}>
                                        <LayoutFilter
                                        activeCategories={activeCategories}
                                        filtercategories={filtercategories}
                                        handleButtonClickcategorytest={handleButtonClickcategorytest}
                                        activeTags={activeTags}
                                        filtertags={filtertags}
                                        handleButtonClicktagtest={handleButtonClicktagtest}
                                      />
               
                       
                            <Allrecipes
  activeCategories={activeCategories}
  activeTags={activeTags}
  filtercategories={filtercategories}
  filtertags={filtertags}

/>

            </Box>

   </Box>
                      

   </>



  );
};

export default MainAllRecipesGroup;
