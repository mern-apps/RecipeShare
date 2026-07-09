import React, { useState, useEffect } from 'react';
import { Paper, Grid, Button, Typography, Switch, FormControlLabel, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MessageArea from './MessageArea'; 
import { useSelector, useDispatch } from 'react-redux';



const HeaderMessages = ({ 
    servermesssages,
    selectedMatch,
    items, 
    currentpage, 
    countallgroups, 
    handleForwardClick, 
    handleBackClick, 
    addMessageToSelectedMatch,
  }) => {
    
    const [inputheader, setInputheader] = useState(false);
    const [header, setHeader] = useState(false);
    const { user } = useSelector((state) => state.auth);

     const accessibilitySettings = useSelector((state) => state.auth.accessibility);
              const [accessibilityData, setAccessibilityData] = useState(accessibilitySettings);
    
              useEffect(() => {
                  if (user && user.accessibility) {
                    setAccessibilityData(user.accessibility);
                  } else {
                    setAccessibilityData(accessibilitySettings);
                  }
                }, [user, accessibilitySettings]);
              
                const adjustedFontSize = (size) => `${(size * accessibilityData.fontSizeAdjustments) / 100}rem`;
              
                const getAccessibleStyles = (defaultBg) => {
                  const { darkContrast, lightContrast, contrastMode } = accessibilityData;
              
                  if (darkContrast) {
                    return {
                      backgroundColor: "#000",
                      color: "#FFF",
                    };
                  }
              
                  if (lightContrast) {
                    return {
                      backgroundColor: "#FFF",
                      color: "#000",
                    };
                  }
              
                  if (contrastMode) {
                    return {
                      backgroundColor: "#000",
                      color: "#FFF",
                      fontWeight: "bold",
                      textDecoration: "underline",
                    };
                  }
              
                  return {
                    backgroundColor: defaultBg,
                    color: "#000",
                  };
                };
              
              
              
                useEffect(() => {
                  const handleKeyDown = (event) => {
                    if (!event.altKey) return;
              
                    const key = event.key.toUpperCase();
                    switch (key) {
                      case "C":
            break;
                      default:
                        break;
                    }
                  };
              
                  window.addEventListener("keydown", handleKeyDown);
                  return () => window.removeEventListener("keydown", handleKeyDown);
                }, []);
        
      const step  = useSelector((state) => state.auth.signupstep);
    
    
         
    return (

      <Box
      sx={{
        ...getAccessibleStyles('white'),
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 3, // similar to Paper elevation={3}
      }}
    >
      

      {inputheader && (
  <Grid container justifyContent="right" sx={{ marginBottom: 2 }}>
    <FormControlLabel
      control={
        <Switch
          checked={header}
          onChange={() => setHeader((prev) => !prev)}
          color="primary" // Material-UI primary color (blue by default)
          sx={{
            '& .MuiSwitch-track': {
              backgroundColor: '#0D47A1', // Dark blue track color
            },
            '& .Mui-checked': {
              color: '#0D47A1', // Dark blue checked color
            },
            '& .Mui-checked + .MuiSwitch-track': {
              backgroundColor: '#0D47A1', // Dark blue background when checked
            },
          }}
        />
      }
      label={
        <Typography
          variant="body1"
          sx={{
            color: '#0D47A1', // Dark blue text color
            fontWeight: 'bold', // Make the text bold
          }}
        >
          הצג הודעות
        </Typography>
      }
    />
  </Grid>
)}



        <Grid container direction="column" justifyContent="flex-end" alignItems="flex-end">
        <Grid item container justifyContent="flex-end" alignItems="center" style={{marginBottom: '10px'}}>
        {header && items && items.length > 0 && (

<Grid
container
alignItems="center"
justifyContent="right"
sx={{
    marginRight: '12px', // Adjust the margin value as needed

}}
>
                                                        <Grid item>
                                                          
                                                                          <Button 
                                                                                variant="contained" 
                                                                                aria-label="הבא"
                                                                                aria-keyshortcuts="Alt+A"
                                                                                sx={{
                                                                                  fontSize: adjustedFontSize(1.2),
                                                                                  minWidth: 80,
                                                                                  height: 47,
                                                                                  borderRadius: 3,
                                                                                  display: 'flex',
                                                                                  alignItems: 'center',
                                                                                  flexDirection: "row-reverse", // Aligns content to the left
                                                                                  ...(accessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
                                                                                  ...(accessibilityData.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
                                                                                  ...(accessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
                                                                                  border: "1px solid purple",
                                                                                  color: accessibilityData.contrastMode
                                                                                  ? "#FFF" 
                                                                                  : accessibilityData.darkContrast
                                                                                    ? "#FFF" 
                                                                                    : "purple",
                                                                                  '&:hover': {
                                                                                    fontWeight: "bold",
                                                                                  },
                                                                                }}
                                                                                onClick={handleForwardClick}
                                                                                disabled={(currentpage * 12) >= countallgroups}
                                                                                >
                                                                                  הבא
                                                                                    {accessibilityData.characterKeyShortcuts ? ' (Alt+A)' : ''}
                                                                                </Button>
                                                        </Grid>

                                                        <Grid item>
                                                            <Typography 
                                                            variant="body1" 
                                                            sx={{
                                                              fontSize: adjustedFontSize(1.2),
                                                              color: getAccessibleStyles('#fce4ec').color,
                                                              fontWeight: accessibilityData.contrastMode ? 'bold' : 'normal',
                                                              textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
                                                            }}
                                                          >
                                                            מציג הודעות {((currentpage - 1) * 12) + 1}-
                                                            {(((currentpage - 1) * 12) + 1 + items.length - 1)} מתוך {countallgroups}
                                                            </Typography>
                                                        </Grid>

                                                            <Grid item>
                                                                          <Button 
                                                                                    variant="contained" 
                                                                                    color="primary" 
                                                                                    aria-label="הקודם"
                                                                                    aria-keyshortcuts="Alt+B"
                                                                                    sx={{
                                                                                      fontSize: adjustedFontSize(1.2),
                                                                                      minWidth: 80,
                                                                                      height: 47,
                                                                                      borderRadius: 3,
                                                                                      display: 'flex',
                                                                                      alignItems: 'center',
                                                                                      flexDirection: "row-reverse", // Aligns content to the left
                                                                                      ...(accessibilityData.darkContrast && { color: "#FFF", backgroundColor: "#000" }),
                                                                                      ...(accessibilityData.lightContrast && { color: "#000", backgroundColor: "#FFF" }),
                                                                                      ...(accessibilityData.contrastMode && { fontWeight: "bold", textDecoration: "underline" }),
                                                                                      border: "1px solid purple",
                                                                                      color: accessibilityData.contrastMode
                                                                                      ? "#FFF" 
                                                                                      : accessibilityData.darkContrast
                                                                                        ? "#FFF" 
                                                                                        : "purple",
                                                                                      '&:hover': {
                                                                                        fontWeight: "bold",
                                                                                      },
                                                                                    }}
                                                                                    onClick={currentpage > 1 ? handleBackClick : undefined}
                                                                disabled={currentpage <= 1}
                                                                                    >
                                                                                        הקודם
                                                                                        {accessibilityData.characterKeyShortcuts ? ' (Alt+B)' : ''}

                                                                                    </Button>
                                                </Grid>
                                            </Grid>
                            )}
                        
                        </Grid>

                        <Grid
  container
  sx={{
    ...getAccessibleStyles('white'),
    flex: 1,
    borderRadius: 2,
    overflow: 'hidden',
    width: '98%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Centers content vertically
  }}
>
  <Grid item xs={12}>
    <MessageArea 
    selectedMatch={selectedMatch}
    items={items} 
    addMessageToSelectedMatch={addMessageToSelectedMatch}

    />
  </Grid>
</Grid>
            
  </Grid>
  </Box>

);
};

export default HeaderMessages;
