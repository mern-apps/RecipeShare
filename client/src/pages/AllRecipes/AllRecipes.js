import React, { useRef, useState,useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel, Grid } from '@mui/material';

import Typography from '@mui/material/Typography';

import { Box } from '@mui/material';


import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import HeaderUserSign from '../../Components/HeaderUserSign.js';

import BooksRecipes from '../../Components/HomePage/BooksRecipes.js';
import GroupsRecipes from '../../Components/HomePage/GroupRecipes/GroupsRecipes.js';

import LayoutFilter from '../../Components/HomePage/Layout1Filter.js';
import Best from '../../Components/HomePage/Best.js'; //best
import Allrecipes from '../../Components/AllRecipes/Allrecipes.js';
import AllrecipesFavorite from '../../Components/AllRecipes/Favorite/AllrecipesFavorite.js';
import Cuisine from '../../Components/HomePage/Cuisine.js';
import Categories from '../../Components/HomePage/Categories.js';
import Tags from '../../Components/HomePage/Tags.js';

import { setfiltercategories } from '../../actions/recipespage.js';
import { setfiltertags } from '../../actions/recipespage.js';
    import { newformID } from '../../actions/bookPageActions.js';
 import { previouspage } from '../../actions/recipeNewForm.js';


const AllRecipes = () => {
    const dispatch = useDispatch();
      const location = useLocation();
    
   useEffect(() => {
               dispatch(newformID(null));
             }, []);
    const  {user}  = useSelector((state) => state.auth);

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
   dispatch(newformID(null));
   dispatch(previouspage(location.pathname + location.search));
   }, [dispatch]);

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
    
    <div>
<div style={{ backgroundColor: '#F5F5F5' }}>
<Grid container justifyContent="center" style={{ marginTop: '10px' }}>

      </Grid>


      <Grid container spacing={2} justifyContent="flex-end" style={{ textAlign: 'right' }}>
        {/* Left Column */}
                             <Grid item xs={12} md={2}>
                    
                              </Grid>

        {/* Middle Column */}
        <Grid item xs={12} md={8}>
            <Grid container direction="column" justifyContent="flex-end" style={{ textAlign: 'right' }}>
                         
            <Grid item xs={12} style={{ marginBottom: '0px' }}>
                                        <LayoutFilter
                                        activeCategories={activeCategories}
                                        filtercategories={filtercategories}
                                        handleButtonClickcategorytest={handleButtonClickcategorytest}
                                        activeTags={activeTags}
                                        filtertags={filtertags}
                                        handleButtonClicktagtest={handleButtonClicktagtest}
                                      />
                          </Grid>                     

                                    
              {user?._id && (
                <>
                       <Grid item xs={12} style={{ marginBottom: '20px' }}>
                          <Allrecipes
                                activeCategories={activeCategories}
                                activeTags={activeTags}
                                filtercategories={filtercategories}
                                filtertags={filtertags}
                            />
                              </Grid> 

                              <Grid item xs={12} style={{ marginBottom: '20px' }}>
                          <AllrecipesFavorite
                                activeCategories={activeCategories}
                                activeTags={activeTags}
                                filtercategories={filtercategories}
                                filtertags={filtertags}
                            />
                              </Grid> 
     
                        </>
                )}

{!user?._id && (
  <Grid
  item
  xs={12}
  style={{
    marginTop: '30px',   // added top margin
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  }}
>
  <Box
    sx={{
      width: '100%',
      maxWidth: 400,
    background: 'linear-gradient(135deg, #e6e0f8, #d0e7ff)', // ultra soft lavender → soft baby blue
      borderRadius: 3,
      p: 3,
      textAlign: 'right',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)', // slightly stronger shadow
      border: '1px solid rgba(255,255,255,0.4)', // subtle border for elegance
    }}
  >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: '#1a237e',
          fontSize: '1.5rem',
        }}
      >
        אינך מחובר
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#3f51b5',
          mb: 1,
          fontSize: '1.3rem',
        }}
      >
        נא להתחבר כדי לראות את המתכונים שלך
      </Typography>
     <Button
  id="home-page-button" // for keyboard shortcut Alt+F
  component={Link}
  to="/"
  variant="contained"
  sx={{
    background: 'linear-gradient(135deg, #5c74eeff, rgba(57, 74, 172, 1))', // soft pastel blue
    color: '#ffffffff',
    fontWeight: 'bold',
    borderRadius: 2,
    padding: '10px 20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
    transition: 'all 0.3s ease',
    fontSize: adjustedFontSize(1.1),           // accessibility
    lineHeight: adjustedLineHeight(1.3),      // accessibility
    letterSpacing: adjustedLetterSpacing(0.04), // accessibility
    wordSpacing: adjustedWordSpacing(0.02),     // accessibility
    '&:hover': {
      background: 'linear-gradient(135deg, #5c6bc0, #7986cb)',
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
    },
  }}
>
  חזרה לדף הבית
</Button>
          </Box>
  </Grid>
)}

                               <Grid item xs={12} style={{ marginBottom: '0px' }}>                                 
                       <Best
                                         activeCategories={activeCategories}
                                         activeTags={activeTags}
                                         filtercategories={filtercategories}
                                         filtertags={filtertags}
                                      />
                          </Grid> 


                          <Grid item xs={12} style={{ marginBottom: '20px' }}>
                          <Cuisine
                                activeCategories={activeCategories}
                                activeTags={activeTags}
                                filtercategories={filtercategories}
                                filtertags={filtertags}
                            />
                              </Grid> 

                                  </Grid>
        </Grid>

                {/* Right Column */}
                
                <Grid item xs={12} md={2}>
          

                </Grid>
      </Grid>
    </div>
        
   </div>



  );
};

export default AllRecipes;
