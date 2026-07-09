import React, { useEffect, useState } from 'react';   
import { Paper, Grid, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MatchList from './MatchList'; 
import { useSelector, useDispatch } from 'react-redux';




const HeaderMatches = ({ 
    items, 
    currentpage, 
    countallgroups, 
    handleForwardClick, 
    handleBackClick, 
    handleMatchSelect,
    selectedMatch,
  }) => {

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
  console.log("currentpage:", currentpage);
  console.log("countallgroups:", countallgroups);
  console.log("items length:", items ? items.length : 0);
}, [currentpage, countallgroups, items]);

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
                      case "A":
                        handleForwardClick();
            break;
            case "B":
              handleBackClick();
              break;
                      default:
                        break;
                    }
                  };
              
                  window.addEventListener("keydown", handleKeyDown);
                  return () => window.removeEventListener("keydown", handleKeyDown);
                }, []);
        
      const step  = useSelector((state) => state.auth.signupstep);
    
    



    //if (!items || items.length === 0) {
      //  return null; // Return null to render nothing if the condition fails
     // }

    return (

      <Box
      sx={{
        ...getAccessibleStyles('white'),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 3,
        padding: 2,
        textAlign: 'center',
        borderBottom: '1px solid #FFFFFF33',
      }}
    >
        

        <Typography
        variant="h6"
        sx={{
          fontSize: adjustedFontSize(2),
          color: getAccessibleStyles('#fce4ec').color,
          fontWeight:'bold',
          textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
        }}
      >
        ההתאמות שלך
        </Typography>



        <Grid container direction="column" justifyContent="flex-end" alignItems="flex-end">
                                   <Grid item container justifyContent="center" alignItems="center" sx={{ ...getAccessibleStyles('white'),marginBottom: '10px' }}>
{countallgroups >= 13 && (
                                                                  <Grid 
                                                              container
                                                              direction="row"
                                                              alignItems="center"
                                                              justifyContent="center"
                                                              spacing={2}
                                                              sx={{ 
                                                                ...getAccessibleStyles('#f5f5f5'),
                                                                width: 'auto',  
                                                                display: 'inline-flex', 
                                                                whiteSpace: 'nowrap',
                                                              }}
                                                            >
                                                        
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

                                                                            <Grid item>
                                                                                <Typography 
                                                                                variant="body1" 
                                                                                sx={{
                                                                                  fontSize: adjustedFontSize(1.2),
                                                                                  color: getAccessibleStyles('#fce4ec').color,
                                                                                  fontWeight: accessibilityData.contrastMode ? 'bold' : 'normal',
                                                                                  textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
                                                                                }}
                                                                                gutterBottom
                                                                              >
                                                                              {countallgroups === 0
    ? 'מציג 0 פריטים מתוך 0'
    : `מציג קבוצות ${((currentpage - 1) * 12) + 1}-${((currentpage - 1) * 12) + 1 + items.length - 1} מתוך ${countallgroups}`
  }
                                                                                </Typography>
                                                                            </Grid>

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
                                                                </Grid>
                            
                         )}

                                             </Grid>

                    <Grid 
                    item 
                    sx={{
                      ...getAccessibleStyles('white'),
                      display: 'flex', 
                      justifyContent: 'center', 
                      backgroundColor: '#f5f5f5', 
                      width: '100%',
                      padding: '5px',
                    }} 
                  >
                    <MatchList
                      Matchedlist={items}
                      selectedMatch={selectedMatch}
                      onMatchSelect={handleMatchSelect}
                    />
                  </Grid>
            
  </Grid>
  </Box>

);
};

export default HeaderMatches;
