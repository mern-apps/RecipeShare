import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Contrast } from "@mui/icons-material";

import AccessibilityDialog from "../pages/Accessibility/AccessibilityDialog.js";
import Logout from '../pages/HomePage/UserSignForm/Logout.js'; 
import  EditCookie  from '../pages/User/EditCookie.js';
import CookieIcon from '@mui/icons-material/Cookie'; // Add this import
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';

import HeaderUserSign from './HeaderUserSign.js';
import logo from '../pictures/logo.png';

const Header = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const localaccessibilitySettings = useSelector((state) => state.auth.accessibility);
  const [accessibilityData, setAccessibilityData] = useState(localaccessibilitySettings);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [openEditCookie, setOpenEditCookie] = useState(false);

//temp
  const [isActive, setIsActive] = useState(false);

  //preferbly to take from user.
  useEffect(() => {
    if (user && user.accessibility) {
      setAccessibilityData(user.accessibility);
    } else {
      setAccessibilityData(localaccessibilitySettings);
    }
  }, [user, localaccessibilitySettings]);



  //functions
      const adjustedFontSize = (size) => `${(size * accessibilityData.fontSizeAdjustments) / 100}rem`;
      const adjustedLineHeight = (defaultValue) => defaultValue * accessibilityData.lineSpacing;
      const adjustedWordSpacing = (defaultValue) => defaultValue * accessibilityData.wordSpacing;
      const adjustedLetterSpacing = (defaultValue) => defaultValue * accessibilityData.letterSpacing;

    const shortcuts = {
      home: "Alt+S",
      userPage: "Alt+U",
      groups: "Alt+Y",
      books: "Alt+T",
            recipes: "Alt+R",
            search: "Alt+F",
      adminSignin: "Alt+I",
      accessibility: "Alt+Shift+A",
    };
  
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.altKey) {
          if (event.shiftKey && event.key.toUpperCase() === "A") {
            setDialogOpen(true);
            return;
          }
    
          switch (event.key.toUpperCase()) {
            case "S":
              window.location.href = "/";
              break;
            case "U":
              if (user?._id) window.location.href = `/user-page/${user._id}`;
              break;
            case "M":
              window.location.href = "/matches";
              break;
            case "F":
              window.location.href = "/find";
              break;
              case "Q":
                window.location.href = "/groups";
                break;
            default:
              break;
          }
        }
      };
    
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [user, dispatch]);


      return (
       <AppBar
  position="static"
  sx={{
    background: accessibilityData.darkContrast
      ? "#000"
      : accessibilityData.lightContrast
      ? "#FFF"
      :"#FFFFFF",
borderBottom: "1px solid rgba(15,23,42,0.08)",
    color: accessibilityData.darkContrast ? "#FFF" : accessibilityData.lightContrast ? "#000" : "inherit",
    filter: accessibilityData.lowSaturation
      ? "grayscale(100%)"
      : accessibilityData.highSaturation
      ? "saturate(1.5)"
      : "none",
    height: accessibilityData.increaseContentSize ? "90px" : "72px",
    padding: accessibilityData.increaseContentSize ? "12px 24px" : "8px 16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // subtle shadow under AppBar
  }}
>
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: accessibilityData.increaseContentSize ? "0 30px" : "0 20px",
      minHeight: accessibilityData.increaseContentSize ? "80px" : "64px", 
    }}
  >
 
    
 <Box display="flex" alignItems="center" sx={{
    marginLeft: "auto",
    gap: "12px",
  }}>


{(user?.useradmin === 10) && (
  <Button 
  color="inherit" 
  component={Link} 
  to="/admin" 
  sx={{
    minHeight: "40px",
    maxHeight: "44px",
    fontSize: adjustedFontSize(1.3),
    lineHeight: adjustedLineHeight(1.5),
    wordSpacing: adjustedWordSpacing(1),
    letterSpacing: adjustedLetterSpacing(0.05),
    padding: accessibilityData?.increaseContentSize ? "12px 24px" : "8px 16px",
   color: accessibilityData
      ? accessibilityData.darkContrast
        ? "#FFF"
        : accessibilityData.lightContrast
        ? "#000"
        : accessibilityData.contrastMode
        ? "#FFF"
        : "#FFF" // Default for white navbar
      : "#FFF",

    // Background
background: accessibilityData
  ? accessibilityData.darkContrast
    ? "#000"
    : accessibilityData.lightContrast
    ? "#FFF"
    : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)"
  : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)",

    fontWeight: accessibilityData?.contrastMode ? "bold" : "normal",
    textDecoration: accessibilityData?.contrastMode ? "underline" : "none",
    '&:hover': {
      boxShadow: '0 3px 12px rgba(90, 79, 207, 0.4)',
      borderRadius: 2,
      color: '#FFF',
    },
    '&:focus': {
      outline: '3px solid #FF6347',
    },
  }}
  aria-label="Go to Admin Page"
  aria-keyshortcuts="Alt+A"
>
  Admin
</Button>
          )}

          {user?._id && (
          <Button 
          color="inherit" 
          component={Link} 
          to={user?._id ? `/user-page/${user._id}` : '/'} 
          sx={{
            minHeight: "40px",
            maxHeight: "44px",
            fontSize: adjustedFontSize(1.3),
            lineHeight: adjustedLineHeight(1.5),
            wordSpacing: adjustedWordSpacing(1),
            letterSpacing: adjustedLetterSpacing(0.05),
            padding: accessibilityData?.increaseContentSize ? "12px 24px" : "8px 16px",
            color: accessibilityData
      ? accessibilityData.darkContrast
        ? "#FFF"
        : accessibilityData.lightContrast
        ? "#000"
        : accessibilityData.contrastMode
        ? "#FFF"
        : "#FFF" // Default for white navbar
      : "#FFF",

    // Background
background: accessibilityData
  ? accessibilityData.darkContrast
    ? "#000"
    : accessibilityData.lightContrast
    ? "#FFF"
    : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)"
  : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)",

            fontWeight: accessibilityData?.contrastMode ? "bold" : "normal",
            textDecoration: accessibilityData?.contrastMode ? "underline" : "none",
            '&:hover': {
              boxShadow: '0 3px 12px rgba(90, 79, 207, 0.4)',
              transform: 'translateY(-1px)',
              borderRadius: 2,
              color: '#FFF',
            },
            '&:focus': {
              outline: '3px solid #FF6347',
            },
          }}
          aria-label="Go to My Page"
          aria-keyshortcuts="Alt+U"
        >
          הדף שלי
        </Button>
)}

 {user?._id && (
          <Button 
          color="inherit" 
           component={Link} 
          to="/groups" 
          sx={{
            minHeight: "40px",
            maxHeight: "44px",
            fontSize: adjustedFontSize(1.3),
            lineHeight: adjustedLineHeight(1.5),
            wordSpacing: adjustedWordSpacing(1),
            letterSpacing: adjustedLetterSpacing(0.05),
            padding: accessibilityData?.increaseContentSize ? "12px 24px" : "8px 16px",
               color: accessibilityData
      ? accessibilityData.darkContrast
        ? "#FFF"
        : accessibilityData.lightContrast
        ? "#000"
        : accessibilityData.contrastMode
        ? "#FFF"
        : "#FFF" // Default for white navbar
      : "#FFF",

    // Background
background: accessibilityData
  ? accessibilityData.darkContrast
    ? "#000"
    : accessibilityData.lightContrast
    ? "#FFF"
    : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)"
  : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)",
            fontWeight: accessibilityData?.contrastMode ? "bold" : "normal",
            textDecoration: accessibilityData?.contrastMode ? "underline" : "none",
            '&:hover': {
              boxShadow: '0 3px 12px rgba(90, 79, 207, 0.4)',
              transform: 'translateY(-1px)',
              borderRadius: 2,
              color: '#FFF',
            },
            '&:focus': {
              outline: '3px solid #FF6347',
            },
          }}
          aria-label="Go to groups List"
          aria-keyshortcuts="Alt+Y"
        >
          קבוצות
        </Button>
)}

 {user?._id && (
          <Button 
          color="inherit" 
           component={Link} 
          to="/books" 
          sx={{
            minHeight: "40px",
            maxHeight: "44px",
            fontSize: adjustedFontSize(1.3),
            lineHeight: adjustedLineHeight(1.5),
            wordSpacing: adjustedWordSpacing(1),
            letterSpacing: adjustedLetterSpacing(0.05),
            padding: accessibilityData?.increaseContentSize ? "12px 24px" : "8px 16px",
              color: accessibilityData
      ? accessibilityData.darkContrast
        ? "#FFF"
        : accessibilityData.lightContrast
        ? "#000"
        : accessibilityData.contrastMode
        ? "#FFF"
        : "#FFF" // Default for white navbar
      : "#FFF",

    // Background
background: accessibilityData
  ? accessibilityData.darkContrast
    ? "#000"
    : accessibilityData.lightContrast
    ? "#FFF"
    : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)"
  : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)",
            fontWeight: accessibilityData?.contrastMode ? "bold" : "normal",
            textDecoration: accessibilityData?.contrastMode ? "underline" : "none",
            '&:hover': {
              boxShadow: '0 3px 12px rgba(90, 79, 207, 0.4)',
              transform: 'translateY(-1px)',
              borderRadius: 2,
              color: '#FFF',
            },
            '&:focus': {
              outline: '3px solid #FF6347',
            },
          }}
          aria-label="Go to books List"
          aria-keyshortcuts="Alt+T"
        >
          ספרים
        </Button>
)}
          <Button 
  color="inherit" 
  component={Link} 
  to="/myrecipes"
  sx={{
     mr: 1,
    minHeight: "40px",
    maxHeight: "44px",
    fontSize: adjustedFontSize(1.3),
    lineHeight: adjustedLineHeight(1.5),
    wordSpacing: adjustedWordSpacing(1),
    letterSpacing: adjustedLetterSpacing(0.05),
    padding: accessibilityData?.increaseContentSize ? "12px 24px" : "8px 16px",
      color: accessibilityData
      ? accessibilityData.darkContrast
        ? "#FFF"
        : accessibilityData.lightContrast
        ? "#000"
        : accessibilityData.contrastMode
        ? "#FFF"
        : "#FFF" // Default for white navbar
      : "#FFF",

    // Background
background: accessibilityData
  ? accessibilityData.darkContrast
    ? "#000"
    : accessibilityData.lightContrast
    ? "#FFF"
    : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)"
  : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)",
    fontWeight: accessibilityData?.contrastMode ? "bold" : "normal",
    textDecoration: accessibilityData?.contrastMode ? "underline" : "none",
    '&:hover': {
      boxShadow: '0 3px 12px rgba(90, 79, 207, 0.4)',
      transform: 'translateY(-1px)',
      borderRadius: 2,
      color: '#FFF',
    },
    '&:focus': {
      outline: '3px solid #FF6347',
    },
  }}
  aria-label="Find Matches"
  aria-keyshortcuts="Alt+R"
>
  מתכונים  
</Button>

{isActive && (
<Button 
  color="inherit" 
  component={Link} 
  to="/meal-planner"
  sx={{
    minHeight: "40px",
    maxHeight: "44px",
    fontSize: adjustedFontSize(1.3),
    lineHeight: adjustedLineHeight(1.5),
    wordSpacing: adjustedWordSpacing(1),
    letterSpacing: adjustedLetterSpacing(0.05),
    padding: accessibilityData?.increaseContentSize ? "12px 24px" : "8px 16px",
     color: accessibilityData
      ? accessibilityData.darkContrast
        ? "#FFF"
        : accessibilityData.lightContrast
        ? "#000"
        : accessibilityData.contrastMode
        ? "#FFF"
        : "#FFF" // Default for white navbar
      : "#FFF",

    // Background
background: accessibilityData
  ? accessibilityData.darkContrast
    ? "#000"
    : accessibilityData.lightContrast
    ? "#FFF"
    : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)"
  : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)",
    fontWeight: accessibilityData?.contrastMode ? "bold" : "normal",
    textDecoration: accessibilityData?.contrastMode ? "underline" : "none",
    '&:hover': {
      boxShadow: '0 3px 12px rgba(90, 79, 207, 0.4)',
      transform: 'translateY(-1px)',
      borderRadius: 2,
      color: '#FFF',
    },
    '&:focus': {
      outline: '3px solid #FF6347',
    },
  }}
  aria-label="Find Matches"
  aria-keyshortcuts="Alt+F"
>
  תכנון ארוחה
</Button>
)}

{!user?._id && <HeaderUserSign/>}

{(user?.useradmin === 10) && (
<Button
  color="inherit"
  component={Link}
  to="/"
  sx={{
    minHeight: "40px",
    maxHeight: "44px",
    mr: 0,
    fontSize: adjustedFontSize(1.3),
    lineHeight: adjustedLineHeight(1.5),
    wordSpacing: adjustedWordSpacing(1),
    letterSpacing: adjustedLetterSpacing(0.05),
    padding: accessibilityData?.increaseContentSize
      ? "12px 24px"
      : "8px 16px",

    // Text color
    color: accessibilityData
      ? accessibilityData.darkContrast
        ? "#FFF"
        : accessibilityData.lightContrast
        ? "#000"
        : accessibilityData.contrastMode
        ? "#FFF"
        : "#FFF" // Default for white navbar
      : "#FFF",

    // Background
background: accessibilityData
  ? accessibilityData.darkContrast
    ? "#000"
    : accessibilityData.lightContrast
    ? "#FFF"
    : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)"
  : "linear-gradient(90deg, #5B4BAF 0%, #6B63E6 100%)",

    fontWeight: accessibilityData?.contrastMode ? "bold" : 500,
    textDecoration: accessibilityData?.contrastMode ? "underline" : "none",
    borderRadius: 2,
    transition: "all 0.25s ease",

    "&:hover": {
      boxShadow: "0 3px 12px rgba(90, 79, 207, 0.4)",
      transform: "translateY(-1px)",
      color: "#FFF",
    },

    "&:focus": {
      outline: "3px solid #FF6347",
      outlineOffset: "2px",
    },
  }}
  aria-label="Go to Home"
  aria-keyshortcuts="Alt+S"
>
  {accessibilityData.characterKeyShortcuts
    ? `מסך הבית (${shortcuts.home})`
    : "מסך הבית"}
</Button>
)}
          {user?._id && (
                  <>
                    <Logout />
                    
                    <Typography 
              variant="subtitle1" 
              sx={{
                color: "#000",
                marginLeft: 2,
                marginRight: 1,
                fontSize: adjustedFontSize(1.3),
                lineHeight: adjustedLineHeight(1.5),
                wordSpacing: adjustedWordSpacing(1),
                letterSpacing: adjustedLetterSpacing(0.05),
                ...(accessibilityData.darkContrast && { color: "#FFF" }),
                ...(accessibilityData.lightContrast && { color: "#000" }),
              }}
            >
              ברוך הבא, {user.firstName}
            </Typography>

                  </>
                )}

<Tooltip title="עריכת נגישות">
           <IconButton 
          onClick={() => setDialogOpen(true)} 
          sx={{ color: "#44009c", marginLeft: 1,
          }} 
          aria-label="Open accessibility settings"
        >
          <Contrast />
        </IconButton>
        </Tooltip>

        {user && (
  <Tooltip title="עריכת עוגיות">
    <IconButton 
      onClick={() => setOpenEditCookie(true)}
      sx={{ color: "#44009c"}}
      aria-label="Edit cookie preferences"
    >
      <CookieIcon />
    </IconButton>
  </Tooltip>
)}


      </Box>

      <Box display="flex" alignItems="center">

        <Typography 
          variant="h6" 
          sx={{
            fontSize: adjustedFontSize(1.5),
            lineHeight: adjustedLineHeight(1.5),
            wordSpacing: adjustedWordSpacing(1),
            letterSpacing: adjustedLetterSpacing(0.05),
            ...(accessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
            ...(accessibilityData.darkContrast && { color: "#FFF" }),
            ...(accessibilityData.lightContrast && { color: "#000" }),
          }}
        >
<Link to="/" style={{ textDecoration: "none" }}>
  <img
    src={logo}
    alt="RecipesBook"
    style={{ height: "110px", objectFit: "contain" }}
  />
</Link>
                      </Typography>
        
  
      </Box>


            </Toolbar>
            <AccessibilityDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />

            <Dialog open={openEditCookie} fullWidth maxWidth="lg" onClose={() => setOpenEditCookie(false)}>
            <EditCookie 
                      currentUser={user} 
                     onClose={() => setOpenEditCookie(false)} /> 
          </Dialog>


          </AppBar>
      );
    };
    
    export default Header;

    