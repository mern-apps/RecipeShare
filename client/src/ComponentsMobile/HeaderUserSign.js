import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

//import { LocalizationProvider } from '@mui/x-date-pickers';  
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  
 
import { logout } from '../actions/userActions';
import { signupstepaction } from '../actions/userActions';

import { Stack,Button, Dialog, DialogContent, DialogTitle,Box } from '@mui/material';

const HeaderUserSign = ({ setSettingsOpen }) => {

  const step  = useSelector((state) => state.auth.signupstep);

     const dispatch = useDispatch();
     const navigate = useNavigate();

      const { user } = useSelector((state) => state.auth);
    
      const localaccessibilitySettings = useSelector((state) => state.auth.accessibility);
      const [accessibilityData, setAccessibilityData] = useState(localaccessibilitySettings);
          
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
          signup: "Alt+U",
          signin: "Alt+S",
        };
      
        useEffect(() => {
          const handleKeyDown = (event) => {
            if (event.altKey) {
              switch (event.key.toUpperCase()) {
               case "U":
          event.preventDefault();
          openSignupDialog();
          break;
                 case "I":
          event.preventDefault();
          openSigninDialog();
          break;
                default:
                  break;
              }
            }
          };
        
          window.addEventListener("keydown", handleKeyDown);
          return () => window.removeEventListener("keydown", handleKeyDown);
        }, [user, dispatch]);


  const closeDialog = () => {
    dispatch(signupstepaction(0));
      setSettingsOpen(false);
  };

  const openSigninDialog = () => {
    dispatch(signupstepaction(10));
      setSettingsOpen(false);
    navigate("/");
  };

  const openSignupDialog = () => {
    dispatch(signupstepaction(1));
      setSettingsOpen(false);
    navigate("/");
  };


  return (
    <div>

  <Button
  onClick={openSignupDialog}
  variant="contained"
  sx={{
    maxHeight: "40px",
    mb: 2,
    borderRadius: 3,
    fontSize: adjustedFontSize(1.3),
    lineHeight: adjustedLineHeight(1.5),
    wordSpacing: adjustedWordSpacing(1),
    letterSpacing: adjustedLetterSpacing(0.05),
    padding: accessibilityData?.increaseContentSize ? "12px 24px" : "8px 16px",

    // Accessibility colors
    ...(accessibilityData?.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
    ...(accessibilityData?.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
    ...(accessibilityData?.contrastMode && { color: "#FFF" }),
    fontWeight: accessibilityData?.contrastMode ? "bold" : "normal",
    textDecoration: accessibilityData?.contrastMode ? "underline" : "none",

    // Modern purple theme
    background: 'linear-gradient(135deg, #6B4BCC, #8C70FF)',
    color: '#fff',
    boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
    border: '1px solid rgba(255,255,255,0.3)',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 28px rgba(0,0,0,0.3)',
      background: 'linear-gradient(135deg, #5839B5, #755EFF)',
      border: '1px solid #fff',
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
    },
    '&:focus': {
      outline: '3px solid #FF6347',
    },
  }}
  aria-label="Sign up"
  aria-keyshortcuts="Alt+U"
>
  {accessibilityData.characterKeyShortcuts ? `רישום חדש (${shortcuts.signup})` : "רישום חדש"}
</Button>

<Button
  onClick={openSigninDialog}
  variant="contained"
  sx={{
    maxHeight: "40px",
    mb: 2,
        mr: 1,
    borderRadius: 3,
    fontSize: adjustedFontSize(1.3),
    lineHeight: adjustedLineHeight(1.5),
    wordSpacing: adjustedWordSpacing(1),
    letterSpacing: adjustedLetterSpacing(0.05),
    padding: accessibilityData?.increaseContentSize ? "12px 24px" : "8px 16px",

    // Accessibility colors
    ...(accessibilityData?.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
    ...(accessibilityData?.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
    ...(accessibilityData?.contrastMode && { color: "#FFF" }),
    fontWeight: accessibilityData?.contrastMode ? "bold" : "normal",
    textDecoration: accessibilityData?.contrastMode ? "underline" : "none",

    // Modern blue theme
    background: 'linear-gradient(135deg, #00A4FF, #1EA8FF)',
    color: '#fff',
    boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
    border: '1px solid rgba(255,255,255,0.3)',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 28px rgba(0,0,0,0.3)',
      background: 'linear-gradient(135deg, #008ED6, #149EFF)',
      border: '1px solid #fff',
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
    },
    '&:focus': {
      outline: '3px solid #FF6347',
    },
  }}
  aria-label="Sign in"
  aria-keyshortcuts="Alt+I"
>
  {accessibilityData.characterKeyShortcuts ? `כנס/י שוב (${shortcuts.signin})` : "כנס/י שוב"}
</Button>



    </div>
  );
}

export default HeaderUserSign;