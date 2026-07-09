
import React, { useState,useEffect } from 'react';
import { Grid } from '@mui/material';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sendforwardpaginationactionmyrecipes} from '../../actions/recipespage.js';
import { sendbackwardpaginationactionmyrecipes} from '../../actions/recipespage.js';
import { getallrecipes } from '../../actions/recipespage.js';
import { currentrecipe } from '../../actions/recipeNewForm.js';
import { setpagemode } from '../../actions/recipeNewForm.js';

import Header from  './Template/Header.js';


  const Allrecipes = ({ 
    activeCategories,
    activeTags,
    filtercategories,
    filtertags
  }) => {

    const dispatch = useDispatch();
    
    const  {user}  = useSelector((state) => state.auth);

    const allrecipes = useSelector(state => state.recipespage.allrecipes);
    //const currentclientpagination = useSelector(state => state.recipespage.currentclientpaginationfavorite);
    const countallrecipes = useSelector(state => state.recipespage.countallrecipes);

    const [items, setItems] = useState(allrecipes);
    const [countitems, setCountitems] = useState(countallrecipes);

    //const [currentpagination, setCurrentpagination] = useState(1001);
    const [currentpage, setCurrentpage] = useState(1);
    const [tempPagination, setTempPagination] = useState(1);

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

// Keyboard shortcuts (for demo)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey) {
        switch (event.key.toUpperCase()) {
          case 'N': // Alt+N → New Recipe
            event.preventDefault();
            document.getElementById('newrecipe-button')?.click();
            break;
          default:
            break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


      useEffect(() => {
            const activeCuisineid = 111;
          const combinedFilters = {
            activeCategories,
          activeTags,
            activeCuisineid,
            currentpage: 1,
            action: "all",
          };
                dispatch(getallrecipes(combinedFilters,countallrecipes));
                setCurrentpage(1);
                setTempPagination(1);
            }, [activeCategories, activeTags, dispatch]); 



    useEffect(() => {
      setCountitems(countallrecipes);
      }, [countallrecipes]); 

    
    useEffect(() => {
      if (currentpage > 1) {
        setTempPagination(2);
      } else {
        setItems(allrecipes.slice(0, 12));
        setTempPagination(1);
      }
    }, [allrecipes]);


    useEffect(() => {
        if (tempPagination === 1) {
          setItems(allrecipes.slice(0, 12));
        }   else if (tempPagination === 2) {
          setItems(allrecipes.slice(12, 24));
        }
        else {
          setItems(allrecipes.slice(24, 36));
        }

    }, [tempPagination]);


const handleBackClick = () => {
            const activeCuisineid = 111;
   setTempPagination(prevTemp => prevTemp - 1);
   const combinedFilters = {
      activeCategories,
    activeTags,
        activeCuisineid,
      currentpage,
      action: "back",
    };
          dispatch(getallrecipes(combinedFilters,countallrecipes));
      setCurrentpage(prevPage => prevPage - 1);

  };
  
  const handleForwardClick = () => {
            const activeCuisineid = 111;
    setTempPagination(prevTemp => prevTemp + 1);
          const combinedFilters = {
      activeCategories,
    activeTags,
      activeCuisineid,
      currentpage,
      action: "forward",
    };
          dispatch(getallrecipes(combinedFilters,countallrecipes));
    setCurrentpage(prevPage => prevPage + 1);

  };


    return (
  <Grid
    container
    direction="column"
    sx={{
      textAlign: "right",
      
    }}
  >
    {/* TOP ACTION ROW */}
    <Grid
      item
      container
      direction="column"
      alignItems="flex-end"
      sx={{ mt: 2 }}
    >
      {/* BUTTON */}
      <Grid item>
        <Button
          id="newrecipe-button"
          component={Link}
          to="/new-recipe"
          aria-label="הוסף מתכון חדש"
          title="הוסף מתכון חדש (Alt+N)"
          role="link"
          variant="contained"
          onClick={() => {
            dispatch(currentrecipe(null));
            dispatch(setpagemode("new"));
          }}
          sx={{
            borderRadius: 3,
            fontSize: adjustedFontSize(1.2),
            lineHeight: adjustedLineHeight(1.3),
            letterSpacing: adjustedLetterSpacing(0.05),
            wordSpacing: adjustedWordSpacing(0.02),
            mr:1,
            px: 2.5,
            py: 1.2,
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
          הוסף מתכון חדש
        </Button>
      </Grid>

    </Grid>

    {/* HEADER / PAGINATION */}
    <Grid item sx={{ mt: 2 }}>
      <Header
        items={items}
        currentpage={currentpage}
        countallrecipes={countitems}
        handleForwardClick={handleForwardClick}
        handleBackClick={handleBackClick}
        activeCategories={activeCategories}
        activeTags={activeTags}
      />
    </Grid>
  </Grid>
);
};

export default Allrecipes;

