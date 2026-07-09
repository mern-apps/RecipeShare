
import React, { useState,useEffect } from 'react';
import { Grid,Box,Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { sendforwardpaginationactionmyrecipes} from '../../../actions/recipespage.js';
import { sendbackwardpaginationactionmyrecipes} from '../../../actions/recipespage.js';
import { getallrecipesgroup } from '../../../actions/groupactions.js';
import { setpagemode } from '../../../actions/recipeNewForm.js';

import Header from  './Header.js';

 const Allrecipes = ({
  activeCategories,
  activeTags,
  filtercategories,
  filtertags,
}) => {

    const dispatch = useDispatch();
    
    const  {user}  = useSelector((state) => state.auth);

      const currentGroup = useSelector(state => state.grouppage.currentgroup);
    
    const allrecipes = useSelector(state => state.grouppage.allrecipesgroup);
    //const currentclientpagination = useSelector(state => state.recipespage.currentclientpaginationfavorite);
    const countallrecipes = useSelector(state => state.grouppage.countallrecipesgroup);

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
          const combinedFilters = {
            activeCategories,
          activeTags,
        activeCuisineid: currentGroup?._id,
            currentpage: 1,
            action: "all",
          };
                dispatch(getallrecipesgroup(combinedFilters,countallrecipes));
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
   setTempPagination(prevTemp => prevTemp - 1);
   const combinedFilters = {
      activeCategories,
    activeTags,
  activeCuisineid: currentGroup?._id,
      currentpage,
      action: "back",
    };
          dispatch(getallrecipesgroup(combinedFilters,countallrecipes));
      setCurrentpage(prevPage => prevPage - 1);

  };
  
  const handleForwardClick = () => {
    setTempPagination(prevTemp => prevTemp + 1);
          const combinedFilters = {
      activeCategories,
    activeTags,
  activeCuisineid: currentGroup?._id,
      currentpage,
      action: "forward",
    };
          dispatch(getallrecipesgroup(combinedFilters,countallrecipes));
    setCurrentpage(prevPage => prevPage + 1);

  };


 return (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      textAlign: "right",
    }}
  >
  <Header
        items={items}
        currentpage={currentpage}
        countallrecipes={countitems}
        handleForwardClick={handleForwardClick}
        handleBackClick={handleBackClick}
        activeCategories={activeCategories}
        activeTags={activeTags}
      />
  </Box>
);
};

export default Allrecipes;

