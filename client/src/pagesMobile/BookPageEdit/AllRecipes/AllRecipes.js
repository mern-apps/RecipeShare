
import React, { useState, useEffect, useRef } from "react";
import { Grid } from '@mui/material';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { currentrecipe } from '../../../actions/recipeNewForm.js';
import { setpagemode } from '../../../actions/recipeNewForm.js';
import { bookeditgetallrecipesfilter} from '../../../actions/bookEditPageActions.js';
import {bookeditbackwardpagination,bookeditforwardwardpagination} from '../../../actions/bookEditPageActions.js';

  
import Header from  './Header.js';

  const AllRecipes = ({ 
    activeCategories,
    activeTags,
    selectedOption,
    chooserecipe,
  handleItemDisplayClick,
allrecipes,
countallrecipes

  }) => {

    const dispatch = useDispatch();

        const { user } = useSelector((state) => state.auth);
        
  const currentBook111 = useSelector(state => state.currentproject.editbookallrecipessectioncurrentbook);
  const currentGroup111 = useSelector(state => state.currentproject.editbookallrecipessectioncurrentgroup);

    const editBookrecipesSection = useSelector((state) => state.currentproject.editBookrecipesSection || {});

    const [items, setItems] = useState(allrecipes);
    const [countitems, setCountitems] = useState(countallrecipes);

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

const didMountRef = useRef(false);

   useEffect(() => {
      if (!didMountRef.current) {
    didMountRef.current = true;
    return;
  }
      if (!selectedOption) return;

 let currentBookOrGroup = null;

if (selectedOption === "groups") {
  currentBookOrGroup = currentGroup111?._id || null;
}

if (selectedOption === "books") {
  currentBookOrGroup = currentBook111?._id || null;
}

if (selectedOption === "recipes") {
  currentBookOrGroup = 0; // or null if backend prefers
}

const data = {
  activeCategories,
  activeTags,
  currentBookOrGroup,
  currentpage: 1,
  selectedOption,
   action: "all",
};

dispatch(bookeditgetallrecipesfilter(data));
      setCurrentpage(1);
  setTempPagination(1);
      }, [activeCategories, activeTags]); 


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
 let currentBookOrGroup = null;
if (selectedOption === "groups") {
  currentBookOrGroup = currentGroup111?._id || null;
}
if (selectedOption === "books") {
  currentBookOrGroup = currentBook111?._id || null;
}
if (selectedOption === "recipes") {
  currentBookOrGroup = 0; // or null if backend prefers
}
if (!selectedOption) return;
const data = {
  activeCategories,
  activeTags,
  currentBookOrGroup,
 currentpage,
  selectedOption,
  action: "back",
};
      dispatch(bookeditgetallrecipesfilter(data,countallrecipes));
      setCurrentpage(prevPage => prevPage - 1);

  };

  
  const handleForwardClick = () => {
    setTempPagination(prevTemp => prevTemp + 1);

 let currentBookOrGroup = null;
if (selectedOption === "groups") {
  currentBookOrGroup = currentGroup111?._id || null;
}
if (selectedOption === "books") {
  currentBookOrGroup = currentBook111?._id || null;
}
if (selectedOption === "recipes") {
  currentBookOrGroup = 0; // or null if backend prefers
}
if (!selectedOption) return;
const data = {
  activeCategories,
  activeTags,
  currentBookOrGroup,
 currentpage,
  selectedOption,
  action: "forward",
};
    dispatch(bookeditgetallrecipesfilter(data,countallrecipes));
    setCurrentpage(prevPage => prevPage + 1);

  };


    return (
    <Grid container direction="column" style={{textAlign: 'right' }}>
                   
      <Grid item >
        <Header
          items={items}
          currentpage={currentpage}
          countallrecipes={countitems}
          handleForwardClick={handleForwardClick}
          handleBackClick={handleBackClick}
          activeCategories={activeCategories}
          activeTags={activeTags}
            handleItemDisplayClick={handleItemDisplayClick}
        />
      </Grid>

    </Grid>
  );
};

export default AllRecipes;

