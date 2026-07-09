import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Grid,Box,Button, Typography } from '@mui/material';

import { backwardpaginationBooksListPage,forwardwardpaginationBooksListPage,getallbooks} from '../../../actions/booksactions.js';

import { setpagemode,currentbookNull } from '../../../actions/bookPageActions.js';
import { newformID } from '../../../actions/bookPageActions.js';
import { previouspage } from '../../../actions/recipeNewForm.js';
import Headergroup from  './Headergroup.js';

  const BooksList = ({ 
      chosenBook,
  setChosenBook
  }) => {

     const dispatch = useDispatch();
    const  {user}  = useSelector((state) => state.auth);
      const currentGroup = useSelector(state => state.grouppage.currentgroup);
    
    const allgroups = useSelector(state => state.projects.allprojects);
    const countallgroups = useSelector(state => state.projects.allprojectscount);
////

    const [items, setItems] = useState(allgroups);
    const [countitems, setCountitems] = useState(countallgroups);
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
  <Box
    sx={{
      textAlign: "right",
      justifyContent: "center",
    }}
  >
    
    <Box
   sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 2,
        mt: 2,
      }}
    >
      <Box>
        <Button
          id="newbook-button"
          component={Link}
          to="/new-book"
          aria-label="הוסף ספר מתכונים חדש"
          title="הוסף ספר מתכונים חדש (Alt+N)"
          role="link"
          variant="contained"
          onClick={() => {
            dispatch(currentbookNull());
            dispatch(setpagemode("new"));
            dispatch(newformID(currentGroup?._id));
            dispatch(previouspage(`/group/${currentGroup?._id}`));
          }}
          sx={{
    width: "fit-content",   // ✅ ONLY text size
    borderRadius: 3,
    fontSize: adjustedFontSize(1),
    lineHeight: adjustedLineHeight(1.3),
    letterSpacing: adjustedLetterSpacing(0.05),
    wordSpacing: adjustedWordSpacing(0.02),
    padding: "10px 16px",
    background: "linear-gradient(135deg, #6B4BCC, #8C70FF)",
    color: "#fff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
    border: "1px solid rgba(255,255,255,0.3)",
    transition: "all 0.25s ease",
    fontWeight: "bold",
    mb: 3,

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 28px rgba(0,0,0,0.3)",
      background: "linear-gradient(135deg, #5839B5, #755EFF)",
    },

    "&:focus-visible": {
      outline: "3px solid #FF6347",
      outlineOffset: "3px",
    },
  }}
        >
          הוסף ספר מתכונים חדש
        </Button>
      </Box>

      <Box>
        <h1
          style={{
            color: "#1e60d6",
            fontSize: "28px",
            fontFamily: "Kroshe Hebrew, sans-serif",
            fontWeight: "bold",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          כל ספרי המתכונים שלך
        </h1>
      </Box>

      <Box sx={{ mt: 1,
 }}>
        <Headergroup
          items={items}
          currentpage={currentpage}
          countallgroups={countitems}
          handleForwardClick={handleForwardClick}
          handleBackClick={handleBackClick}
          chosenBook={chosenBook}
          setChosenBook={setChosenBook}
        />
      </Box>
    </Box>
  </Box>
);

};

export default BooksList;

