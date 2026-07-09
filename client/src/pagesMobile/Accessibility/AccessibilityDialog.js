import React, { useRef,useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { updateaccessibility } from "../../actions/accessibilityactions";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Box,
  Grid,
  Typography,
  Divider,
  ButtonGroup
} from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import FeedbackIcon from '@mui/icons-material/Feedback';
import InfoIcon from '@mui/icons-material/Info';

const AccessibilityDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const accessibilitySettings = useSelector((state) => state.auth.accessibility);
  const [formAccessibilityData, setFormAccessibilityData] = useState(accessibilitySettings);

  const navigate = useNavigate();

  
  useEffect(() => {
    if (user && user.accessibility) {
      setFormAccessibilityData(user.accessibility);
    } else {
      setFormAccessibilityData(accessibilitySettings);
    }
  }, [open, user, accessibilitySettings]);

    const adjustedFontSize = (size) => `${(size * formAccessibilityData.fontSizeAdjustments) / 100}rem`;
    const getAccessibleStyles = (defaultBg) => {
      const { darkContrast, lightContrast, contrastMode } = formAccessibilityData;
    
      if (darkContrast) {
        return {
          backgroundColor: "#000",
          color: "#FFF"
        };
      }
    
      if (lightContrast) {
        return {
          backgroundColor: "#FFF",
          color: "#000"
        };
      }
      if (contrastMode) {
        return {
          backgroundColor: "#000", // Dark background
          color: "#FFF",           // Light text
          fontWeight: "bold",
          textDecoration: "underline"
        };
      }
    
      return {
        backgroundColor: defaultBg,
      };
    };
    
    
 
  const shortcuts = {
    darkContrast: "Alt+D",
    lightContrast: "Alt+L",
    contrastMode: "Alt+C",
    clearcontrast: "Alt+X",
    lowSaturation: "Alt+O",
    highSaturation: "Alt+H",
    clearsaturation: "Alt+J",
    fontSizeAdjustments: "Alt+F",
    characterKeyShortcuts: "Alt+K",
    clearaccessibility: "Alt+Q",
    closeaccessibility: "Alt+E",
    submitaccessibility: "Alt+Enter", // special case
    contactForImprovement: "Alt+I",
  policyAccessibilityInfo: "Alt+P",
  };

  const fontSizeAdjustmentsRef = useRef(null);
  const [fontSizeAdjustmentsOpen, setFontSizeAdjustmentsOpen] = useState(false);
  const dialogContentRef = useRef(null);

  const handleNavigateAndClose = (path) => {
    onClose(); // Close the dialog
    navigate(path); // Navigate to the new route
  };


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!event.altKey) return;
  
      const key = event.key.toUpperCase();

      const dialogContent = dialogContentRef.current;

      switch (key) {
        case "D": // darkContrast
        setFormAccessibilityData((prev) => ({
          ...prev,
          darkContrast: true,
          lightContrast: false,
          contrastMode: false,

        }));
         break;
        case "L": // lightContrast
        setFormAccessibilityData((prev) => ({
          ...prev,
          darkContrast: false,
          lightContrast: true,
          contrastMode: false,        }));
          break;
        case "C": // contrastMode
        setFormAccessibilityData((prev) => ({
          ...prev,
          darkContrast: false,
          lightContrast: false,
          contrastMode: true,        }));
        break;
        case "X": // clearcontrast
        handleClearContrast();
          break;
      
          case "F": 
          if (fontSizeAdjustmentsRef.current) {
            fontSizeAdjustmentsRef.current.focus();
            setFontSizeAdjustmentsOpen(true); // ✅ open the dropdown manually
          }
          break;

        case "O": // lowSaturation
        setFormAccessibilityData((prev) => ({
          ...prev,
          lowSaturation: true,
          highSaturation: false,
               }));    
                break;
        case "H": // highSaturation
        setFormAccessibilityData((prev) => ({
          ...prev,
          lowSaturation: false,
          highSaturation: true,
               })); 
                    break;
        case "J": // clearsaturation
        handleClearSaturation();
          break;

        case "Escape": // Close dropdown on Escape
        if (fontSizeAdjustmentsRef.current) fontSizeAdjustmentsRef.current.blur();
          break;

        case "K": // characterKeyShortcuts
        setFormAccessibilityData((prevData) => ({
          ...prevData,
          characterKeyShortcuts: !prevData.characterKeyShortcuts, 
        }));             break;
        case "Q": // clearaccessibility
        handleClear();
          break;
        case "E": // closeaccessibility
        onClose();
        break;
        case "ENTER": // Handle Enter key press 
        // Check if any of the Select elements are focused
        if (document.activeElement === fontSizeAdjustmentsRef.current) {
          return;
        } else {
          handleSubmit();
        }
        break;

        case "I": // Navigate to contact
        handleNavigateAndClose('/contact-for-improvement');
        break;

      case "P": // Navigate to policy
      handleNavigateAndClose('/policy-accessibility');
        break;

        case "ARROWDOWN":
          dialogContent.scrollBy(0, 50); // Scroll down by 50px when down arrow is pressed
          break;

        case "ARROWUP":
          dialogContent.scrollBy(0, -50); // Scroll up by 50px when up arrow is pressed
          break;


        default:
          break;
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  

  const defaultAccessibilityValues = { 
    darkContrast: false,
    lightContrast: false,
    contrastMode: false,
    fontSizeAdjustments: 100,
    lowSaturation: false,
    highSaturation: false,
    characterKeyShortcuts: false,
  };


  const handleClearContrast = () => {
    setFormAccessibilityData(prevData => ({
      ...prevData,
      darkContrast: false,
      lightContrast: false,
      contrastMode: false,
    }));
  };

  const handleClearSaturation = () => {
    setFormAccessibilityData((prevData) => ({
      ...prevData,
      lowSaturation: false,
      highSaturation: false,
    }));
  };

  const handleClear = () => {
    setFormAccessibilityData(defaultAccessibilityValues);
  };



  const handleChange = (field, value) => {
    setFormAccessibilityData((prev) => ({ ...prev, [field]: value }));
  };
  

  const handleSubmit = () => {
    dispatch(updateaccessibility(formAccessibilityData));
    onClose();
  };


  return (
<Dialog 
  open={open} 
  onClose={onClose} 
  fullWidth 
  maxWidth={false}
  PaperProps={{
    sx: {
      width: "70%",
      maxWidth: "70%",
      direction: "rtl",
      ...getAccessibleStyles("White"),
    }  }}
>
<DialogTitle
  sx={{
    textAlign: "center",
    fontWeight: "bold",
    fontSize: adjustedFontSize(2),
  }}
>
  הגדרות נגישות
</DialogTitle>

<DialogContent
      ref={dialogContentRef}  // Reference to the dialog content
    sx={{
      maxHeight: '70vh', // Adjust this value to control the scrollable area
      overflowY: 'auto', // Enable vertical scrolling when content overflows
    }}
  >
              {/* Color & Contrast - Change to Radio Group */}
              <Box sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 1, ...getAccessibleStyles ("#fafafa") }}>
              <Typography variant="h6" gutterBottom   sx={{
            fontSize: adjustedFontSize(1.5),
            ...(formAccessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
          }}
          >צבע וניגודיות</Typography>
              <ButtonGroup fullWidth sx={{ gap: 1.5, direction: "rtl" }}>
              {/* Regular Button - Resets all */}
    <Button
      variant="outlined"
      onClick={handleClearContrast}
      sx={{
        fontSize: adjustedFontSize(1.1),
        height: 56,
        minWidth: 40,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        flexDirection: "row-reverse", 
        padding: formAccessibilityData.fontSizeAdjustments > 100
        ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
        : "8px 16px",        ...(formAccessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
        ...(formAccessibilityData.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
        ...(formAccessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
        mx: 0.5,
        border: "2px solid purple",
        color: formAccessibilityData.contrastMode
        ? "#FFF" 
        : formAccessibilityData.darkContrast
          ? "#FFF" 
          : "purple", 
        '&:hover': {
          fontWeight: "bold",
        },
      }}
        aria-label="deafult contrast"
  aria-keyshortcuts="Alt+X"
      startIcon={<Brightness6Icon />}
    >
איפוס   
{formAccessibilityData.characterKeyShortcuts ? ' (Alt+X)' : ''}

 </Button>
    
    {/* Contrast Mode Buttons */}
    {["darkContrast", "lightContrast", "contrastMode"].map((value) => (
      <Button
        key={value}
        variant={formAccessibilityData[value] ? "contained" : "outlined"}
        onClick={() => setFormAccessibilityData(prevData => ({
          ...prevData,
          darkContrast: value === "darkContrast",
          lightContrast: value === "lightContrast",
          contrastMode: value === "contrastMode",
        }))}

        sx={{
          fontSize: adjustedFontSize(1.1),
          height: 56,
          minWidth: 50,
          flexDirection: "row-reverse",
          borderRadius: 3,
          mx: 0.5,
          padding: formAccessibilityData.fontSizeAdjustments > 100
          ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
          : "8px 16px",          ...(formAccessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
          ...(formAccessibilityData.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
          ...(formAccessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
          ...(formAccessibilityData[value] && {
            border: "3px solid",
            borderColor: "primary.main",
            fontWeight: "bold",
          }),
            color: formAccessibilityData.contrastMode
            ? "#FFF" 
            : formAccessibilityData.darkContrast
              ? "#FFF" 
              : "blue",
          
      
          // ✅ Hover style
          '&:hover': {
            fontWeight: "bold",
          },
        }}
        aria-label={
          value === "darkContrast"
            ? "Dark Contrast"
            : value === "lightContrast"
            ? "Light Contrast"
            : "Contrast Mode"
        }
        aria-keyshortcuts={
          value === "darkContrast"
            ? "Alt+D"
            : value === "lightContrast"
            ? "Alt+L"
            : "Alt+C"
        }

        startIcon={
          value === "darkContrast" ? (
            <DarkModeIcon />
          ) : value === "lightContrast" ? (
            <LightModeIcon />
          ) : (
            <Brightness6Icon />
          )
        }
      >
{value === "darkContrast" 
  ? `ניגודיות גבוהה${formAccessibilityData.characterKeyShortcuts ? ' (Alt+D)' : ''}` 
  : value === "lightContrast" 
  ? `ניגודיות נמוכה${formAccessibilityData.characterKeyShortcuts ? ' (Alt+L)' : ''}` 
  : value === "contrastMode" 
  ? `מצב ניגודיות${formAccessibilityData.characterKeyShortcuts ? ' (Alt+C)' : ''}` 
  : null}
        </Button>
    ))}
  </ButtonGroup>
</Box>

{/* Saturation Levels */}

<Box sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 1, ...getAccessibleStyles ("#fafafa") }}>

<Typography variant="h6" gutterBottom   sx={{
            fontSize: adjustedFontSize(1.5),
            ...(formAccessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
          }}
          >רמות רוויה</Typography>


<ButtonGroup fullWidth sx={{ gap: 1.5, direction: "rtl" }}>
{/* Regular Button - Resets all */}
  <Button
       variant="outlined"
    onClick={handleClearSaturation}
    sx={{
      fontSize: adjustedFontSize(1.1),
      height: 56,
      minWidth: 50,
      borderRadius: 3,
      display: 'flex',
      alignItems: 'center',
      flexDirection: "row-reverse", // Aligns content to the left
      padding: formAccessibilityData.fontSizeAdjustments > 100
      ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
      : "8px 16px",      ...(formAccessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
      ...(formAccessibilityData.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
      ...(formAccessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
      mx: 0.5,
      border: "1px solid purple",
      color: formAccessibilityData.contrastMode
      ? "#FFF" 
      : formAccessibilityData.darkContrast
        ? "#FFF" 
        : "purple",      // ✅ Hover style
      '&:hover': {
        fontWeight: "bold",
      },
    }}
      aria-label="deafult Saturation"
aria-keyshortcuts="Alt+J"
    startIcon={<Brightness6Icon />}

  >
    איפוס
    {formAccessibilityData.characterKeyShortcuts ? ' (Alt+J)' : ''}

  </Button>



  {/* Saturation Buttons */}
  {["lowSaturation", "highSaturation"].map((value) => (
    <Button
      key={value}
      variant={formAccessibilityData[value] ? "contained" : "outlined"}
      onClick={() =>
        setFormAccessibilityData((prevData) => ({
          ...prevData,
          lowSaturation: value === "lowSaturation",
          highSaturation: value === "highSaturation",
        }))
      }
    sx={{
      fontSize: adjustedFontSize(1.1),
      height: 56,
      minWidth: 100,
      borderRadius: 3,
      display: 'flex',
      alignItems: 'center',
      flexDirection: "row-reverse", // Aligns content to the left
      padding: formAccessibilityData.fontSizeAdjustments > 100
      ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
      : "8px 16px",      ...(formAccessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
      ...(formAccessibilityData.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
      ...(formAccessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
      mx: 0.5,
    textAlign: "right", 
    ...(formAccessibilityData[value] && {
      border: "3px solid",
      borderColor: "primary.main",
      fontWeight: "bold",
    }),
    color: formAccessibilityData.contrastMode
    ? "#FFF" 
    : formAccessibilityData.darkContrast
      ? "#FFF" 
      : "blue", 
    // ✅ Hover style
    '&:hover': {
      fontWeight: "bold",
    },
  }}

  aria-label={
    value === "lowSaturation"
      ? "low Saturation"
      : "High Saturation"
  }
  aria-keyshortcuts={
    value === "lowSaturation"
      ? "Alt+O"
      : "Alt+H"
  }

      startIcon={
        value === "lowSaturation" ? (
          <Brightness6Icon />
        ) : (
          <Brightness7Icon />
        )
      }
    >

  {value === "lowSaturation" 
  ? `רוויה נמוכה${formAccessibilityData.characterKeyShortcuts ? ' (Alt+O)' : ''}` 
  : value === "highSaturation" 
  ? `רוויה גבוהה${formAccessibilityData.characterKeyShortcuts ? ' (Alt+H)' : ''}` 
  : null}
  </Button>
  ))}
</ButtonGroup>
</Box>

<Box sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 1, ...getAccessibleStyles ("#fafafa") }}>
<Typography variant="h6" gutterBottom   sx={{
            fontSize: adjustedFontSize(1.5),
            ...(formAccessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
          }}
          
        >גודל טקסט והתאמה
            {formAccessibilityData.characterKeyShortcuts && ' (Alt+F)'}
            </Typography>

  {/* Font Size Adjustment */}
  <Grid container spacing={2} justifyContent="flex-start" sx={{ mb: 2 }}>
  <Grid item md={3}>
  <FormControl variant="outlined" fullWidth
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: formAccessibilityData.darkContrast
        ? "#000"
        : formAccessibilityData.lightContrast
        ? "#FFF"
        : formAccessibilityData.contrastMode
        ? "#000"
        : "#fafafa",
        color: formAccessibilityData.contrastMode
        ? "#FFF" 
        : formAccessibilityData.darkContrast
          ? "#FFF" 
          : "blue", 
      "& fieldset": {
        borderColor: "#1976d2", // Always blue
        borderWidth: formAccessibilityData.contrastMode ? 2 : 1.5, // Thicker border in contrast mode
      },
      "&:hover fieldset": {
        borderColor: "#1976d2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1976d2",
      },
    },
  }}
>

  <InputLabel 
    id="font-size-adjustment-label"
    sx={{
      fontSize: adjustedFontSize(1.2),
      color: formAccessibilityData.darkContrast
        ? "#FFF"
        : formAccessibilityData.lightContrast
        ? "#000"
        : "inherit",
    }}
  >
    התאמת גודל גופן
  </InputLabel>

  <Select
   open={fontSizeAdjustmentsOpen}
   onOpen={() => setFontSizeAdjustmentsOpen(true)}
   onClose={() => setFontSizeAdjustmentsOpen(false)}
    inputRef={fontSizeAdjustmentsRef}
    value={formAccessibilityData.fontSizeAdjustments}
    onChange={(e) => handleChange("fontSizeAdjustments", e.target.value)}
    labelId="font-size-adjustment-label"
    label="התאמת גודל גופן"
    sx={{
      fontSize: adjustedFontSize(1.2),
      color: formAccessibilityData.darkContrast
        ? "#FFF"
        : formAccessibilityData.lightContrast
        ? "#000"
        : "inherit",
      backgroundColor: formAccessibilityData.darkContrast
        ? "#000"
        : formAccessibilityData.lightContrast
        ? "#FFF"
        : formAccessibilityData.contrastMode
        ? "#f5f5f5"
        : "#fafafa",
      "& .MuiSelect-icon": {
        color: formAccessibilityData.contrastMode
        ? "#FFF" 
        : formAccessibilityData.darkContrast
          ? "#FFF" 
          : "blue", 
      },
    }}
  >
    {[100, 133, 165, 200].map((size) => (
      <MenuItem
        key={size}
        value={size}
        sx={{
          backgroundColor: formAccessibilityData.darkContrast
            ? "#f5f5f5"
            : formAccessibilityData.lightContrast
            ? "#FFF"
            : formAccessibilityData.contrastMode
            ? "#f5f5f5"
            : "inherit",
          color: formAccessibilityData.lightContrast
            ? "#000"
            : "inherit",
          fontSize: adjustedFontSize(1.1),
        
        "&:hover, &:focus, &.Mui-selected, &.Mui-focusVisible": {
    fontWeight: "bold",
  },
        }}
      >
        {size}%
      </MenuItem>
    ))}
  </Select>
</FormControl>

  </Grid>
</Grid>

</Box>

   
           {/* Keyboard Navigation */}
           <Box sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 1, ...getAccessibleStyles ("#fafafa") }}>
           <Typography
  variant="h6"
  gutterBottom
  sx={{
    fontSize: adjustedFontSize(1.5),
    ...(formAccessibilityData.contrastMode && {
      fontWeight: "bold",
      textDecoration: "underline",
    }),
  }}
>
  ניווט באמצעות מקלדת (Alt+K)
</Typography>

                 <Grid container spacing={2}>
    {/* Increase Content Size Switch */}
    <Grid item md={3}> {/* Control the width here */}
  {/* Increase Content Size Switch */}
  <Box 
    sx={{
      mb: 2,
      p: 1,
      borderRadius: 2,
      border: "2px solid",
      borderColor: "primary.main",
      display: "inline-block",
      ...getAccessibleStyles("#fafafa"),
      }}>

  <FormControlLabel
            label="ניווט באמצעות מקלדת"
            control={
      <Switch checked={formAccessibilityData.characterKeyShortcuts} onChange={(e) => handleChange("characterKeyShortcuts", e.target.checked)} 
        inputProps={{
          'aria-label': 'הפעל או כבה הצגת ניווט באמצעות מקלדת',
          'aria-checked': formAccessibilityData.characterKeyShortcuts,
        }}
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: formAccessibilityData.darkContrast ? '#FFF' : '#1976d2',
            '& + .MuiSwitch-track': {
              backgroundColor: formAccessibilityData.darkContrast ? '#666' : '#90caf9',
            },
          },
          '& .MuiSwitch-track': {
            backgroundColor: formAccessibilityData.darkContrast ? '#444' : '#e0e0e0',
          },
        }}
      />
    }
    sx={{
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      "& .MuiTypography-root": {
        fontWeight: 500,
        fontSize: adjustedFontSize(1.1),
           color:
          formAccessibilityData.contrastMode || formAccessibilityData.darkContrast
            ? "#FFF"
            : "blue",
      },
    }}
  />
</Box>
</Grid>
</Grid>
        </Box>

           {/* Defualt */}

           <Box sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 1, ...getAccessibleStyles ("#fafafa") }}>
           <Grid container spacing={2}>
    <Grid item md={3}>

            <Button
        onClick={handleClear}
        variant="outlined"
        color="secondary"
        sx={{
          mt: 2,
          fontSize: adjustedFontSize(1.1),
          height: 56,
          minWidth: 100,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: "row-reverse", // Aligns content to the left
          padding: formAccessibilityData.fontSizeAdjustments > 100
          ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
          : "8px 16px",
                    ...(formAccessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
          ...(formAccessibilityData.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
          ...(formAccessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
          mx: 0.5,
          border: "1px solid purple",
          color: formAccessibilityData.contrastMode
          ? "#FFF" 
          : formAccessibilityData.darkContrast
            ? "#FFF" 
            : "purple",
          '&:hover': {
            fontWeight: "bold",
          },
        }}
          aria-label="deafult form"
    aria-keyshortcuts="Alt+Q"
        startIcon={<Brightness6Icon />}
      >
        אפס את כל ההגדרות
        {formAccessibilityData.characterKeyShortcuts ? ' (Alt+Q)' : ''}

      </Button>   
        </Grid>
        </Grid>
        </Box>

      </DialogContent>

      <DialogActions
  sx={{
    display: 'flex',
    justifyContent: 'flex-start', // Align buttons to the right
    gap: 2,
    mr: 3,
  }}
>

      <Button
        onClick={handleSubmit}
        variant="outlined"
        color="secondary"
        sx={{
          mt: 2,
          fontSize: adjustedFontSize(1.1),
          height: 56,
          minWidth: 100,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: "row-reverse", // Aligns content to the left
          padding: formAccessibilityData.fontSizeAdjustments > 100
          ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
          : "8px 16px",
                    ...(formAccessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
          ...(formAccessibilityData.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
          ...(formAccessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
          mx: 0.5,
          border: "1px solid green",
          color: formAccessibilityData.darkContrast ? "#FFF" : "green", // Set text color based on contrast mode
          // ✅ Hover style
          '&:hover': {
            fontWeight: "bold",
            borderColor: "blue", // Always black text on hover
          },
        }}
          aria-label="save form"
    aria-keyshortcuts="Alt+Enter"
    startIcon={<SaveIcon />}
        >
שמירה
{formAccessibilityData.characterKeyShortcuts ? ' (Alt+Enter)' : ''}

      </Button>  

      <Button
        onClick={onClose}
        variant="outlined"
        color="secondary"
        sx={{
          mt: 2,
          fontSize: adjustedFontSize(1.1),
          height: 56,
          minWidth: 100,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: "row-reverse", // Aligns content to the left
          padding: formAccessibilityData.fontSizeAdjustments > 100
          ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
          : "8px 16px",          ...(formAccessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
          ...(formAccessibilityData.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
          ...(formAccessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
          mx: 0.5,
          border: "1px solid red",
          color: formAccessibilityData.darkContrast ? "#FFF" : "red", // Set text color based on contrast mode
          // ✅ Hover style
          '&:hover': {
            fontWeight: "bold",
            borderColor: "blue", // Always black text on hover
          },
        }}
          aria-label="close form"
    aria-keyshortcuts="Alt+E"
    startIcon={<CloseIcon />}
      >
סגירה
{formAccessibilityData.characterKeyShortcuts ? ' (Alt+E)' : ''}

      </Button>   

      <Button
          onClick={() => handleNavigateAndClose("/contact-for-improvement")}
          variant="outlined"
        sx={{
          mt: 2,
          fontSize: adjustedFontSize(1.1),
          height: 56,
          minWidth: 100,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: "row-reverse",
         padding: formAccessibilityData.fontSizeAdjustments > 100
          ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
          : "8px 16px",        ...(formAccessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
          ...(formAccessibilityData.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
          ...(formAccessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
          mx: 0.5,
          border: "2px solid navy",
          color: formAccessibilityData.contrastMode
          ? "#FFF" 
          : formAccessibilityData.darkContrast
            ? "#FFF" 
            : "navy", 
            '&:hover': {
              fontWeight: "bold",
              borderColor: "blue",
            },
        }}
        aria-label="contact for improvement"
        aria-keyshortcuts="Alt+I"
        startIcon={<FeedbackIcon />}
      >
        הצעה לשיפור
        {formAccessibilityData.characterKeyShortcuts ? ' (Alt+I)' : ''}
      </Button>

      {/* Accessibility Policy */}
      <Button
        onClick={() => handleNavigateAndClose('/policy-accessibility')}
        variant="outlined"
        sx={{
          mt: 2,
          fontSize: adjustedFontSize(1.1),
          height: 56,
          minWidth: 100,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: "row-reverse",
          padding: formAccessibilityData.fontSizeAdjustments > 100
          ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
          : "8px 16px",        ...(formAccessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
          ...(formAccessibilityData.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
          ...(formAccessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
          mx: 0.5,
          border: "2px solid navy",
          color: formAccessibilityData.contrastMode
          ? "#FFF" 
          : formAccessibilityData.darkContrast
            ? "#FFF" 
            : "navy", 
          '&:hover': {
            fontWeight: "bold",
            borderColor: "blue",
          },
        }}
        aria-label="accessibility info"
        aria-keyshortcuts="Alt+P"
        startIcon={<InfoIcon />}
      >
        תקנון ומידע לגבי נגישות
        {formAccessibilityData.characterKeyShortcuts ? ' (Alt+P)' : ''}
      </Button>


      </DialogActions>
    </Dialog>
  );
};

export default AccessibilityDialog;

