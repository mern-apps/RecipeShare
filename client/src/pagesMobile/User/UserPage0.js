import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';

import { Box, Typography, Button, IconButton, Card, CardMedia, CardContent, CardActions, Avatar} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import EditIcon from '@mui/icons-material/Edit'; // Import EditIcon

import { Dialog } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';  
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  

import  Edit2  from './Edit2';
import  EditCookie  from './EditCookie';

import UserCard0 from '../../Components/UserCard/UserCard0';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import QuizIcon from '@mui/icons-material/Quiz';


const UserPage0 = ({ currentUser }) => {
  const  {user}  = useSelector((state) => state.auth);

  const [openEdit2, setOpenEdit2] = useState(false);
  const [openEditCookie, setOpenEditCookie] = useState(false);
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
                  
                    const getAccessibleStyles = (defaultBg, defaultColor, hoverBg, hoverColor) => {
                      const { darkContrast, lightContrast, contrastMode } = accessibilityData;
                  
                      if (darkContrast) {
                        return {
                          backgroundColor: "#000",
                          color: "#FFF",
                          border: '2px solid #FFF',
                          fontWeight: "bold",
                          textDecoration: "underline",
                          '&:hover': {
                            backgroundColor: '#111', // Darken on hover
                            color: '#FFF',
                          },
                        };
                      }
                  
                      if (lightContrast) {
                        return {
                          backgroundColor: "#FFF",
                          color: "#000",
                          border: '2px solid #000',
                          '&:hover': {
                            backgroundColor: '#f0f0f0', // Lighten on hover
                            color: '#000',
                          },
                        };
                      }
                  
                      if (contrastMode) {
                        return {
                          backgroundColor: "#000",
                          color: "#FFF",
                          border: '2px solid #FFF',
                          fontWeight: "bold",
                          textDecoration: "underline",
                          '&:hover': {
                            backgroundColor: '#111', // Darken on hover
                            color: '#FFF',
                          },
                        };
                      }
                  
                      return {
                        backgroundColor: defaultBg || "#00bcd4", // Default light blue if not provided
                        color: defaultColor || "#000", // Default black text if not provided
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 3D light shadow by default
                        '&:hover': {
                          backgroundColor: hoverBg || '#0097a7', // Default darker blue on hover if not provided
                          color: hoverColor || '#000',
                          fontWeight: "bold",
                          // Default black text on hover if not provided
                        },
                      };
                    };
                  
                  
                  
                 
                                     useEffect(() => {
                                       const handleKeyDown = (event) => {
                                         if (!event.altKey) return;
                                   
                                         const key = event.key.toUpperCase();
                                         switch (key) {
                                           case "A":
                                 break;
                                 case "B":
                                   break;
                                   case "C":
                                     break;
                                     case "D":
                                       break;
                                           default:
                                             break;
                                         }
                                       };
                                   
                                       window.addEventListener("keydown", handleKeyDown);
                                       return () => window.removeEventListener("keydown", handleKeyDown);
                                     }, []);


  return (

    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
    }}
  >

<Typography
  variant="h6"
  sx={{
    marginTop: '10px',
    fontSize: adjustedFontSize(3.3), // slightly larger
    textAlign: 'right',
    fontWeight: 700,
    lineHeight: 1.2,
    background: accessibilityData?.contrastMode || accessibilityData?.darkContrast 
      ? 'linear-gradient(90deg, #FFFFFF, #B0C4FF)'  // white → light blue
      : accessibilityData?.lightContrast
        ? 'linear-gradient(90deg, #4B0082, #00B0FF)' // purple → blue
        : 'linear-gradient(90deg, #5E55D6, #00B0FF)', // slightly darker default purple → blue
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: accessibilityData?.contrastMode || accessibilityData?.darkContrast 
      ? '2px 2px 6px rgba(0,0,0,0.5)'
      : '3px 3px 10px rgba(0,0,0,0.35)', // subtle stronger shadow
    textDecoration: accessibilityData?.contrastMode ? 'underline' : 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      textShadow: '4px 4px 14px rgba(0,0,0,0.45)',
      transform: 'translateY(-2px)',
    }
  }}
  gutterBottom
>
  הדף שלי
</Typography>




                                        <Box
                                sx={{
                                  display: "flex",
                                  gap: 2,
                                  marginTop: 1,
                                  direction: "rtl",
                                }}
                              >
<Button
  variant="contained"
  onClick={() => setOpenEdit2(true)}
  sx={{
    textTransform: 'none',
    borderRadius: 3,
    fontSize: '1.1rem',
    paddingX: 3,
    paddingY: 1.2,
    background: 'linear-gradient(135deg, #7158E2, #00B0FF)', // more purple to light blue
    color: '#fff',
    fontWeight: 500,
    boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      background: 'linear-gradient(135deg, #624fd1, #00a6e6)', // hover: slightly darker purple
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
    '& .MuiButton-startIcon': {
      marginLeft: 1,
      color: '#fff',
    },
  }}
  startIcon={<EditIcon />}
>
  עריכת מידע אישי
</Button>


                              </Box>

    <Box
      sx={{
        marginTop: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
    
      {/* Main Container */}
      <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column' }}>
        <UserCard0
          currentUser={currentUser} 
        />
      </Box>

      <Dialog open={openEdit2} fullWidth maxWidth="lg" onClose={() => setOpenEdit2(false)} >
        <Edit2 onClose={() => setOpenEdit2(false)} />
      </Dialog>




      <Dialog open={openEditCookie} fullWidth maxWidth="lg" onClose={() => setOpenEditCookie(false)}>
        <EditCookie 
                  currentUser={currentUser} 
        onClose={() => setOpenEditCookie(false)} /> 
      </Dialog>


    </Box>

    </Box>

  );
};

export default UserPage0;