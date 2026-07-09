import React, { useState,useEffect } from 'react';
import { Grid,Box } from '@mui/material';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { backwardpaginationBooksListPage,forwardwardpaginationBooksListPage,getallbooks} from '../../actions/booksactions.js';

import { setpagemode,currentbookNull } from '../../actions/bookPageActions.js';

import Headergroup from  './Headergroup.js';
import { newformID } from '../../actions/bookPageActions.js';

  const BooksListMobile = ({ 

  }) => {

     const dispatch = useDispatch();

        useEffect(() => {
      dispatch(newformID(null));
    }, []);

    const  {user}  = useSelector((state) => state.auth);
    const allgroups = useSelector(state => state.projects.allprojects);
    const countallgroups = useSelector(state => state.projects.allprojectscount);
////

    const [items, setItems] = useState(allgroups);
    const [countitems, setCountitems] = useState(countallgroups);
console.log("ITEMS DEBUG:", items);
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
          case 'N': // Alt+N → New group
            event.preventDefault();
            document.getElementById('newgroup-button')?.click();
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
        dispatch(getallbooks());
        console.log('[UPDATE] countallgroups changed:');
        setCurrentpage(1);
        setTempPagination(1);
      }, []); 


  useEffect(() => {
      setCountitems(countallgroups);
        console.log('[UPDATE] countallgroups changed:', countallgroups);
      }, [countallgroups]); 

    
    useEffect(() => {
      if (currentpage > 1) {
        setTempPagination(2);
      } else {
        setItems(allgroups.slice(0, 12));
        setTempPagination(1);
      }
    }, [allgroups]);


    useEffect(() => {
        if (tempPagination === 1) {
          setItems(allgroups.slice(0, 12));
        }   else if (tempPagination === 2) {
          setItems(allgroups.slice(12, 24));
        }
        else {
          setItems(allgroups.slice(24, 36));
        }

    }, [tempPagination]);



  const handleBackClick = () => {
    setTempPagination(prevTemp => prevTemp - 1);
      dispatch(backwardpaginationBooksListPage(currentpage,countallgroups));
      setCurrentpage(prevPage => prevPage - 1);

  };
  
  const handleForwardClick = () => {
    setTempPagination(prevTemp => prevTemp + 1);
    dispatch(forwardwardpaginationBooksListPage(currentpage,countallgroups));
    setCurrentpage(prevPage => prevPage + 1);

  };


    return (
   <Box sx={{ px: 2, pb: 2 }}>
      <Box sx={{ textAlign: "right", mt: 2 }}>

        <Typography sx={{ fontSize: 27, fontWeight: "bold" }}>
          כל הספרים שלך
        </Typography>
           <Button
  component={Link}
  to="/new-book"
  variant="contained"
  onClick={() => {
    dispatch(currentbookNull(null));
    dispatch(setpagemode("new"));
  }}
  sx={{
    mb: 2,
    borderRadius: 2,
    background: "linear-gradient(135deg,#6B4BCC,#8C70FF)",
    px: 3,
    py: 1.2,
    width: "fit-content",
    alignSelf: "flex-end",
    fontSize: "0.95rem",
    fontWeight: 500,
  }}
>
  הוסף ספר חדש  
</Button>
      </Box>

      {/* PAGINATION + LIST */}
      <Headergroup
        items={items}
        currentpage={currentpage}
        countallgroups={countitems}
        handleForwardClick={handleForwardClick}
        handleBackClick={handleBackClick}
      />
    </Box>
  );
};

export default BooksListMobile;

