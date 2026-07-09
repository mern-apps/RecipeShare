
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid,Box,Button, Typography} from '@mui/material';

import { setpagemode } from '../../../actions/bookPageActions.js';
import { previouspage } from '../../../actions/recipeNewForm.js';

import { getallbooksgroup } from '../../../actions/groupactions.js';

import Header from  './Header.js';
import { newformID } from '../../../actions/bookPageActions.js';


 const Allbooks = ({
  setBooksListOpen,
}) => {

    const dispatch = useDispatch();
  
   

    const  {user}  = useSelector((state) => state.auth);
  const currentGroup = useSelector(state => state.grouppage.currentgroup);

    const allrecipes = useSelector(state => state.grouppage.bookslist);
    //const currentclientpagination = useSelector(state => state.recipespage.currentclientpaginationfavorite);
    const countallrecipes = useSelector(state => state.grouppage.countallbooks);

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
        activeCuisineid,
      currentpage,
      action: "back",
    };
          dispatch(getallbooksgroup(combinedFilters,countallrecipes));
      setCurrentpage(prevPage => prevPage - 1);

  };
  
  const handleForwardClick = () => {
            const activeCuisineid = 111;
    setTempPagination(prevTemp => prevTemp + 1);
          const combinedFilters = {
      activeCuisineid,
      currentpage,
      action: "forward",
    };
      dispatch(getallbooksgroup(combinedFilters,countallrecipes));
    setCurrentpage(prevPage => prevPage + 1);

  };


  return (
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
          כל הספרים בקבוצה
        </Typography>

        <Button
          onClick={() => setBooksListOpen(true)}
          sx={{
            borderRadius: 3,
            fontSize: adjustedFontSize(1.2),
            lineHeight: adjustedLineHeight(1.3),
            letterSpacing: adjustedLetterSpacing(0.05),
            padding: '10px 22px',
            background: 'linear-gradient(135deg, #6B4BCC, #8C70FF)',
            color: '#fff',
            boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
            border: '1px solid rgba(255,255,255,0.3)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 28px rgba(0,0,0,0.3)',
            },
          }}
        >
          הוסף ספר לקבוצה
        </Button>

      </Box>

      {/* CONTENT */}
      <Box sx={{ width: '100%' }}>
        <Header
          items={items}
          currentpage={currentpage}
          countallrecipes={countitems}
          handleForwardClick={handleForwardClick}
          handleBackClick={handleBackClick}
        />
      </Box>
    </Box>
  );
};

export default Allbooks;