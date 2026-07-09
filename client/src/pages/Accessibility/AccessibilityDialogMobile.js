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

const AccessibilityDialogMobile = ({ open, onClose }) => {
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
    

  const [fontSizeAdjustmentsOpen, setFontSizeAdjustmentsOpen] = useState(false);

  const handleNavigateAndClose = (path) => {
    onClose(); // Close the dialog
    navigate(path); // Navigate to the new route
  };


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
  PaperProps={{
    sx: {
      width: "100%", // Ensure it's full width for mobile
      maxWidth: "100%", // Avoid any unnecessary restriction
      direction: "rtl", // Right-to-left direction
      ...getAccessibleStyles("White"),
    },
  }}
>
  <DialogTitle
    sx={{
      textAlign: "center",
      fontWeight: "bold",
      fontSize: adjustedFontSize(2), // Adjust size for mobile
    }}
  >
    הגדרות נגישות
  </DialogTitle>

  <DialogContent>
    {/* Color & Contrast - Change to Radio Group */}
    <Box sx={{ mb: 2, borderRadius: 2, boxShadow: 1, ...getAccessibleStyles("#fafafa") }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: adjustedFontSize(1.5),
          ...(formAccessibilityData.contrastMode && {
            fontWeight: "bold",
            textDecoration: "underline"
          }),
          '@media (max-width:600px)': {
            fontSize: adjustedFontSize(1.3),
          }
        }}
      >
        צבע וניגודיות
      </Typography>
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
              : "8px 16px",
            ...(formAccessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
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
              color: "#000", // Always black text on hover
            },
          }}
          aria-label="default contrast"
          startIcon={<Brightness6Icon />}
        >
          איפוס
        </Button>
        {/* Contrast Mode Buttons */}
        {["darkContrast", "lightContrast", "contrastMode"].map((value) => (
          <Button
            key={value}
            variant={formAccessibilityData[value] ? "contained" : "outlined"}
            onClick={() =>
              setFormAccessibilityData((prevData) => ({
                ...prevData,
                darkContrast: value === "darkContrast",
                lightContrast: value === "lightContrast",
                contrastMode: value === "contrastMode",
              }))
            }
            sx={{
              fontSize: adjustedFontSize(1.1),
              height: 56,
              minWidth: 50,
              flexDirection: "row-reverse",
              borderRadius: 3,
              mx: 0.5,
              padding: formAccessibilityData.fontSizeAdjustments > 100
                ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
                : "8px 16px",
              ...(formAccessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
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
              '&:hover': {
                color: "#000", // Always black text on hover
              },
            }}
            aria-label={
              value === "darkContrast"
                ? "Dark Contrast"
                : value === "lightContrast"
                ? "Light Contrast"
                : "Contrast Mode"
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
            </Button>
        ))}
      </ButtonGroup>
    </Box>

    {/* Saturation Levels */}
    <Box sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 1, ...getAccessibleStyles("#fafafa") }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontSize: adjustedFontSize(1.5),
          ...(formAccessibilityData.contrastMode && {
            fontWeight: "bold",
            textDecoration: "underline"
          }),
          '@media (max-width:600px)': {
            fontSize: adjustedFontSize(1.3),
          }
        }}
      >
        רמות רוויה
      </Typography>

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
              color: "#000", // Always black text on hover
            },
          }}
          aria-label="default Saturation"
          startIcon={<Brightness6Icon />}
        >
          איפוס
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
                : "8px 16px",
              ...(formAccessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
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
              '&:hover': {
                color: "#000", // Always black text on hover
              },
            }}
            aria-label={value === "lowSaturation" ? "low Saturation" : "High Saturation"}
            startIcon={value === "lowSaturation" ? <Brightness6Icon /> : <Brightness7Icon />}
          />
        ))}
      </ButtonGroup>
</Box>

<Box sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 1, ...getAccessibleStyles("#fafafa") }}>
  <Typography
    variant="h6"
    gutterBottom
    sx={{
      fontSize: adjustedFontSize(1.5),
      ...(formAccessibilityData.contrastMode && {
        fontWeight: "bold",
        textDecoration: "underline"
      }),
      // Mobile responsiveness
      '@media (max-width:600px)': {
        fontSize: adjustedFontSize(1.3), // Smaller font size for mobile
      }
    }}
  >
    גודל טקסט והתאמה
  </Typography>

  {/* Font Size Adjustment */}
  <Grid container spacing={2} justifyContent="flex-start" sx={{ mb: 2 }}>
    <Grid item xs={12}>
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
            color: formAccessibilityData.contrastMode ? "#FFF" : formAccessibilityData.darkContrast ? "#FFF" : "blue",
            "& fieldset": {
              borderColor: "#1976d2", 
              borderWidth: formAccessibilityData.contrastMode ? 2 : 1.5,
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
          value={formAccessibilityData.fontSizeAdjustments}
          onChange={(e) => handleChange("fontSizeAdjustments", e.target.value)}
          labelId="font-size-adjustment-label"
          label="התאמת גודל גופן"
          sx={{
            fontSize: adjustedFontSize(1.2),
            color: formAccessibilityData.darkContrast ? "#FFF" : formAccessibilityData.lightContrast ? "#000" : "inherit",
            backgroundColor: formAccessibilityData.darkContrast ? "#000" : formAccessibilityData.lightContrast ? "#FFF" : formAccessibilityData.contrastMode ? "#f5f5f5" : "#fafafa",
            "& .MuiSelect-icon": {
              color: formAccessibilityData.contrastMode ? "#FFF" : formAccessibilityData.darkContrast ? "#FFF" : "blue", 
            },
          }}
        >
          {[100, 133, 165, 200].map((size) => (
            <MenuItem
              key={size}
              value={size}
              sx={{
                backgroundColor: formAccessibilityData.darkContrast ? "#000" : formAccessibilityData.lightContrast ? "#FFF" : formAccessibilityData.contrastMode ? "#f5f5f5" : "inherit",
                color: formAccessibilityData.darkContrast ? "#FFF" : formAccessibilityData.lightContrast ? "#000" : "inherit",
                fontSize: adjustedFontSize(1.1),
                '&:hover, &:focus, &.Mui-selected, &.Mui-focusVisible': {
                  backgroundColor: "#e0e0e0", 
                  color: "#000", 
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
<Box sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 1, ...getAccessibleStyles("#fafafa") }}>
  <Typography
    variant="h6"
    gutterBottom
    sx={{
      fontSize: adjustedFontSize(1.5),
      ...(formAccessibilityData.contrastMode && {
        fontWeight: "bold",
        textDecoration: "underline"
      }),
      '@media (max-width:600px)': {
        fontSize: adjustedFontSize(1.3),
      }
    }}
  >
    ניווט באמצעות מקלדת (Alt+K)
  </Typography>

  <Grid container spacing={2}>
    <Grid item xs={12}> {/* Full width on mobile */}
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
            <Switch
              checked={formAccessibilityData.characterKeyShortcuts}
              onChange={(e) => handleChange("characterKeyShortcuts", e.target.checked)}
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
              color: formAccessibilityData.contrastMode || formAccessibilityData.darkContrast ? "#FFF" : "blue",
            },
          }}
        />
      </Box>
    </Grid>
  </Grid>
</Box>

{/* Default */}
<Box sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 1, ...getAccessibleStyles("#fafafa") }}>
  <Grid container spacing={2}>
    <Grid item xs={12}> {/* Full width on mobile */}
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
          flexDirection: "row-reverse", 
          padding: formAccessibilityData.fontSizeAdjustments > 100
            ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
            : "8px 16px",
          ...(formAccessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
          ...(formAccessibilityData.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
          ...(formAccessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
          mx: 0.5,
          border: "1px solid purple",
          color: formAccessibilityData.contrastMode ? "#FFF" : formAccessibilityData.darkContrast ? "#FFF" : "purple",
          '&:hover': {
            color: "#000",
          },
        }}
        aria-label="default form"
        startIcon={<Brightness6Icon />}
      >
        אפס את כל ההגדרות
      </Button>
    </Grid>
  </Grid>
</Box>

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
      flexDirection: 'row-reverse',
      padding: formAccessibilityData.fontSizeAdjustments > 100
        ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
        : '8px 16px',
      ...(formAccessibilityData.darkContrast && { color: '#FFF', backgroundColor: '#000' }),
      ...(formAccessibilityData.lightContrast && { color: '#000', backgroundColor: '#FFF' }),
      ...(formAccessibilityData.contrastMode && { fontWeight: 'bold', textDecoration: 'underline' }),
      mx: 0.5,
      border: '1px solid green',
      color: formAccessibilityData.darkContrast ? '#FFF' : 'green',
      '&:hover': {
        color: '#000',
        borderColor: 'blue',
      },
      '@media (max-width:600px)': {
        minWidth: '100%',  // Full width button on mobile
        fontSize: '16px',  // Adjust font size for mobile
        height: 48,        // Adjust button height for mobile
      },
    }}
    aria-label="save form"
    startIcon={<SaveIcon />}
  >
    שמירה
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
      flexDirection: 'row-reverse',
      padding: formAccessibilityData.fontSizeAdjustments > 100
        ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
        : '8px 16px',
      ...(formAccessibilityData.darkContrast && { color: '#FFF', backgroundColor: '#000' }),
      ...(formAccessibilityData.lightContrast && { color: '#000', backgroundColor: '#FFF' }),
      ...(formAccessibilityData.contrastMode && { fontWeight: 'bold', textDecoration: 'underline' }),
      mx: 0.5,
      border: '1px solid red',
      color: formAccessibilityData.darkContrast ? '#FFF' : 'red',
      '&:hover': {
        color: '#000',
        borderColor: 'blue',
      },
      '@media (max-width:600px)': {
        minWidth: '100%',  // Full width button on mobile
        fontSize: '16px',  // Adjust font size for mobile
        height: 48,        // Adjust button height for mobile
      },
    }}
    aria-label="close form"
    startIcon={<CloseIcon />}
  >
    סגירה
  </Button>

  <Button
    onClick={() => handleNavigateAndClose('/contact-for-improvement')}
    variant="outlined"
    sx={{
      mt: 2,
      fontSize: adjustedFontSize(1.1),
      height: 56,
      minWidth: 100,
      borderRadius: 3,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row-reverse',
      padding: formAccessibilityData.fontSizeAdjustments > 100
        ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
        : '8px 16px',
      ...(formAccessibilityData.darkContrast && { color: '#FFF', backgroundColor: '#000' }),
      ...(formAccessibilityData.lightContrast && { color: '#000', backgroundColor: '#FFF' }),
      ...(formAccessibilityData.contrastMode && { fontWeight: 'bold', textDecoration: 'underline' }),
      mx: 0.5,
      border: '2px solid navy',
      color: formAccessibilityData.contrastMode
        ? '#FFF'
        : formAccessibilityData.darkContrast
        ? '#FFF'
        : 'navy',
      '&:hover': {
        color: '#000',
        borderColor: 'blue',
      },
      '@media (max-width:600px)': {
        minWidth: '100%',  // Full width button on mobile
        fontSize: '16px',  // Adjust font size for mobile
        height: 48,        // Adjust button height for mobile
      },
    }}
    aria-label="contact for improvement"
    startIcon={<FeedbackIcon />}
  >
    הצעה לשיפור
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
      flexDirection: 'row-reverse',
      padding: formAccessibilityData.fontSizeAdjustments > 100
        ? `${(formAccessibilityData.fontSizeAdjustments / 100) * 8}px ${(formAccessibilityData.fontSizeAdjustments / 100) * 16}px`
        : '8px 16px',
      ...(formAccessibilityData.darkContrast && { color: '#FFF', backgroundColor: '#000' }),
      ...(formAccessibilityData.lightContrast && { color: '#000', backgroundColor: '#FFF' }),
      ...(formAccessibilityData.contrastMode && { fontWeight: 'bold', textDecoration: 'underline' }),
      mx: 0.5,
      border: '2px solid navy',
      color: formAccessibilityData.contrastMode
        ? '#FFF'
        : formAccessibilityData.darkContrast
        ? '#FFF'
        : 'navy',
      '&:hover': {
        color: '#000',
        borderColor: 'blue',
      },
      '@media (max-width:600px)': {
        minWidth: '100%',
        fontSize: '16px',
        height: 48,
      },
    }}
    aria-label="accessibility info"
    startIcon={<InfoIcon />}
  >
    תקנון ומידע לגבי נגישות
  </Button>


      </DialogContent>

    </Dialog>
  );
};

export default AccessibilityDialogMobile;

