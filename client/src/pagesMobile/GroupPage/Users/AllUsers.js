
import React, { useState,useEffect } from 'react';
import { Grid } from '@mui/material';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getallusersgroup } from '../../../actions/groupactions.js';

import Header from  './Header.js';


 const Allbooks = ({

}) => {

    const dispatch = useDispatch();
    
    const  {user}  = useSelector((state) => state.auth);

    const allrecipes = useSelector(state => state.grouppage.userslist);
    //const currentclientpagination = useSelector(state => state.recipespage.currentclientpaginationfavorite);
    const countallrecipes = useSelector(state => state.grouppage.countallusers);

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
          dispatch(getallusersgroup(combinedFilters,countallrecipes));
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
      dispatch(getallusersgroup(combinedFilters,countallrecipes));
    setCurrentpage(prevPage => prevPage + 1);

  };


    return (
    <Grid container direction="column" style={{textAlign: 'right', padding: '10px' }}>

                         <Grid item container direction="row" alignItems="center" justifyContent="flex-end" style={{ marginTop: '20px' }}>
  <Grid item sx={{ marginRight:5 }}>
      
        </Grid>



                        </Grid>

                      


      <Grid item container direction="row" alignItems="center" justifyContent="flex-end" style={{  }}>


      </Grid>

      <Grid item style={{ marginTop: '20px' }}>
     <Header
  items={items}
  currentpage={currentpage}
  countallrecipes={countitems}
  handleForwardClick={handleForwardClick}
  handleBackClick={handleBackClick}

/>
      </Grid>

    </Grid>
  );
};

export default Allbooks;

