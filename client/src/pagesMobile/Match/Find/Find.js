import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';


import { Box, Typography, Button, Dialog } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Step2Dialog from '../UserSignForm/Step2Dialog';
import Step3Dialog from '../UserSignForm/Step3Dialog';


import FindPage from './FindPage';
import { signupstepaction } from '../../actions/userActions';

import BlockPageFind from '../../Components/Block/BlockPageFind';

const Find = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
 const blockPageredux = useSelector((state) => state.general.find);
  const [blockPageconst, setBlockPageconst] = useState(false);

    const { user } = useSelector((state) => state.auth);
        const isLogOut = useSelector((state) => state.auth.islogout);

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
        handleCompleteClick();
        break;
                  default:
                    break;
                }
              };
          
              window.addEventListener("keydown", handleKeyDown);
              return () => window.removeEventListener("keydown", handleKeyDown);
            }, []);
    
  const step  = useSelector((state) => state.auth.signupstep);



    useEffect(() => {
      if (isLogOut === 1 || !user?._id) {
        navigate('/');
        }
      }, [isLogOut,user, navigate]);
      

    const closeDialog = () => {
    dispatch(signupstepaction(0));
    };
  

                    //user.images?.length > 0 &&  (to make it valid after images will be done in the code) (move it upto qnr)


//replace birthday with minBirthdate
const checkUserData = () => {
  if (!user) return false;
  return user.birthday && user.qnr;
                      //user.images?.length > 0 &&  (to make it valid after images will be done in the code) (move it upto qnr)
};
  
    const handleCompleteClick = () => {
      if (user?.birthday) {
    dispatch(signupstepaction(3));
      } else {
    dispatch(signupstepaction(2));
      }
    };
  
    const renderContent = () => {
  if (blockPageredux && user.useradmin !== 10) {
        return <BlockPageFind />;
      }
         
      if (checkUserData()) {
        return <FindPage />;
      }
      return (
        
        <Box
          sx={{
        ...getAccessibleStyles('#fce4ec'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '100vh',
        padding: 3,
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      }}
        >
          <Typography
        variant="h4"
        sx={{
          fontSize: adjustedFontSize(2),
          color: getAccessibleStyles('#fce4ec').color,
          fontWeight: accessibilityData.contrastMode ? 'bold' : 'normal',
          textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
        }}
        gutterBottom
      >
        Missing Information
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: adjustedFontSize(1),
          color: getAccessibleStyles('#fce4ec').color,
          fontWeight: accessibilityData.contrastMode ? 'bold' : 'normal',
          textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
        }}
        gutterBottom
      >
        Please complete all the required information to proceed.
      </Typography>
      <Button
  variant="contained"
  color="primary"
  onClick={handleCompleteClick}
  aria-label="השלמת פרטים"
  aria-keyshortcuts="Alt+C"
  sx={{
    mt: 2,
    fontSize: adjustedFontSize(1.1),
    height: 56,
    minWidth: 100,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    flexDirection: "row-reverse",
    padding:
      accessibilityData.fontSizeAdjustments > 100
        ? `${(accessibilityData.fontSizeAdjustments / 100) * 8}px ${(accessibilityData.fontSizeAdjustments / 100) * 16}px`
        : "8px 16px",
    ...(accessibilityData.darkContrast && {
      color: "#FFF",
      backgroundColor: "#000",
    }),
    ...(accessibilityData.lightContrast && {
      color: "#000",
      backgroundColor: "#FFF",
    }),
    ...(accessibilityData.contrastMode && {
      fontWeight: "bold",
      textDecoration: "underline",
    }),
    mx: 0.5,
    border: "2px solid navy",
    color: accessibilityData.contrastMode
      ? "#FFF"
      : accessibilityData.darkContrast
      ? "#FFF"
      : "navy",
    '&:hover': {
      color: "#000",
      borderColor: "blue",
    },
  }}
>
  השלמת פרטים
  {accessibilityData.characterKeyShortcuts ? ' (Alt+C)' : ''}
</Button>
        </Box>
      );
    };
  

    return (
      <>
        {renderContent()}
        {/* Step 2 Dialog */}
        <Dialog
  open={step === 2}
  onClose={closeDialog}
  fullWidth maxWidth="lg"
    sx={{
  }}
>
<LocalizationProvider dateAdapter={AdapterDayjs}>
        <Step2Dialog onNext2to3={() => dispatch(signupstepaction(3))} onClose={closeDialog} />
      </LocalizationProvider>
      </Dialog>

      <Dialog open={step === 3} onClose={closeDialog} sx={{ width: '100%' }}>
      <Step3Dialog onNext3to4={() => dispatch(signupstepaction(0))} onSubmit={() => dispatch(signupstepaction(2))} onClose={closeDialog} />
      </Dialog>




      </>
    );
  };
  
  export default Find;


