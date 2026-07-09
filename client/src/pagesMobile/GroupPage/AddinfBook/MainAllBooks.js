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

import BooksList from './BooksList.js';
import { newformID } from '../../../actions/bookPageActions.js';
import { addbooktogroup } from '../../../actions/groupactions.js';

const MainAllBooks = ({
  setBooksListOpen,
  chosenBook,
  setChosenBook
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


const handleSubmitRecipe = async () => {
  if (!chosenBook || !currentGroup?._id) return;

  const data = {
    chosenBook,
    groupId: currentGroup._id,
  };
  await dispatch(addbooktogroup(data));
  dispatch(newformID(null));
  setChosenBook(null);
  setBooksListOpen(false);
};

 return (
  <Box sx={{ width: "100%", backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
    {/* HEADER BAR */}
    <Box
      sx={{
        zIndex: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        py: 1.5,
        mb: 2,
        backdropFilter: "blur(16px)",
        background: "rgba(255,255,255,0.82)",
        borderBottom: "1px solid rgba(229,231,235,0.7)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
      }}
    >
      <Typography
        sx={{
          fontSize: adjustedFontSize(1.15),
          fontWeight: 700,
          color: "#111827",
        }}
      >
        הוספת ספר לקבוצה
      </Typography>

      <Tooltip title="סגור">
        <IconButton
          onClick={() => setBooksListOpen(false)}
          aria-label="סגור חלון הוספת ספר"
          sx={{
            width: 44,
            height: 44,
            borderRadius: "14px",
            background: "#fff",
            border: "1px solid #e5e7eb",
            transition: "all 0.22s ease",
            "&:hover": {
              background: "#f9fafb",
              transform: "scale(1.05)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Tooltip>
    </Box>

    {/* MAIN CONTENT */}
<Box sx={{ display: "flex", justifyContent: "center" }}>
      {/* CENTER CONTENT (mobile only so no md grid) */}
      <Box sx={{ width: "100%", textAlign: "right" }}>
          <BooksList
            chosenBook={chosenBook}
            setChosenBook={setChosenBook}
          />

        {/* BOTTOM STICKY BAR */}
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            mt: 3,
            p: 2,
            backdropFilter: "blur(18px)",
            background: "rgba(255,255,255,0.92)",
            borderTop: "1px solid rgba(229,231,235,0.8)",
            boxShadow: "0 -8px 24px rgba(0,0,0,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "18px 18px 0 0",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#111827",
                fontSize: adjustedFontSize(1),
              }}
            >
              {chosenBook
                ? "ספר נבחר מוכן להוספה"
                : "בחר ספר להוספה"}
            </Typography>

            <Typography
              sx={{
                color: "#6b7280",
                fontSize: adjustedFontSize(0.82),
              }}
            >
              {chosenBook
                ? "לחץ להוספה לקבוצה"
                : "יש לבחור ספר מהרשימה"}
            </Typography>
          </Box>

          <Button
            variant="contained"
            disabled={!chosenBook}
            startIcon={<CheckRoundedIcon />}
            onClick={handleSubmitRecipe}
            sx={{
              minWidth: 160,
              height: 52,
              borderRadius: "16px",
              fontWeight: 700,
              fontSize: adjustedFontSize(0.95),
              background: chosenBook
                ? "linear-gradient(135deg, #6B4BCC, #8C70FF)"
                : "#d1d5db",
              boxShadow: chosenBook
                ? "0 10px 24px rgba(107,75,204,0.28)"
                : "none",
              transition: "all 0.25s ease",
              "&:hover": {
                transform: chosenBook
                  ? "translateY(-2px)"
                  : "none",
                boxShadow: chosenBook
                  ? "0 14px 30px rgba(107,75,204,0.35)"
                  : "none",
              },
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

export default MainAllBooks;
