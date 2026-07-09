import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import Step2Dialog from './Step2Dialog';


import { LocalizationProvider } from '@mui/x-date-pickers';  
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  

 
import { logout } from '../../../actions/userActions';
import { signupstepaction } from '../../../actions/userActions';

import { Stack,Button, Dialog, DialogContent, DialogTitle,Box,Typography,Grid } from '@mui/material';

const UserForm = () => {

  const step  = useSelector((state) => state.auth.signupstep);
    const isLogOut = useSelector((state) => state.auth.islogout);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();


  //useEffect(() => {
    //if (isLogOut === 1) {
      //navigate('/');
   // }
 // }, [isLogOut]); // Runs on load & when `isLogOut` updates


  const handleLogout = () => {
    dispatch(logout());
  };

  const closeDialog = () => {
    dispatch(signupstepaction(0));
  };


  const openSigninDialog = () => {
    dispatch(signupstepaction(10));
  };

  const openSignupDialog = () => {
    dispatch(signupstepaction(1));
  };


return (
  <>
    {/* ---------- MAIN MOBILE CONTAINER ---------- */}
    <Box
      sx={{
        px: 2,
        py: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
   gap: 2.5,
    width: "100%",
    mt: 2,

                  flexDirection: "column",
          borderRadius: 3,
              alignItems: "center",
          background: "linear-gradient(180deg,#fff 0%,#f7f9ff 100%)",
          border: "1px solid #E6EAF2",
          boxShadow: "0 8px 22px rgba(0,0,0,0.06)",
        }}
      >
        {/* TITLE */}
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1.6rem",
            mb: 2,
            color: "#263238",
          }}
        >
          התחבר/י או צור/י חשבון
        </Typography>

        {/* BUTTONS */}


  {/* SIGN UP */}
    {user?.useradmin === 10 && (
  <Button
    onClick={openSignupDialog}
    variant="contained"
    sx={{
     minWidth: 190,
      height: 58,
      mb: 1,
      borderRadius: "18px",
      background: "linear-gradient(135deg,#7B4BCC,#5A4BCC)",
      color: "#fff",
      fontSize: "1.4rem",
      textTransform: "none",
      letterSpacing: 0,
      boxShadow: "0 10px 24px rgba(90,75,204,.28)",

      transition: "all .25s cubic-bezier(.4,0,.2,1)",

      "&:hover": {
        background: "linear-gradient(135deg,#6A3BE0,#4D3AC7)",
        transform: "translateY(-2px)",
        boxShadow: "0 14px 30px rgba(90,75,204,.38)",
      },

      "&:active": {
        transform: "scale(.97)",
      },
    }}
  >
    רישום ראשוני
  </Button>
)}
  {/* SIGN IN */}
  <Button
    onClick={openSigninDialog}
    variant="contained"
    sx={{
     minWidth: 190,
      height: 58,
              mb: 2,

      borderRadius: "18px",
      background: "linear-gradient(135deg,#2196F3,#1976D2)",
      color: "#fff",
      fontSize: "1.4rem",
      textTransform: "none",
      letterSpacing: 0,
      boxShadow: "0 10px 24px rgba(25,118,210,.28)",
      transition: "all .25s cubic-bezier(.4,0,.2,1)",
      "&:hover": {
        background: "linear-gradient(135deg,#1E88E5,#1565C0)",
        transform: "translateY(-2px)",
        boxShadow: "0 14px 30px rgba(25,118,210,.38)",
      },

      "&:active": {
        transform: "scale(.97)",
      },
    }}
  >
    כנס/י
  </Button>
      </Box>
    </Box>

    {/* ---------- SIGN IN DIALOG ---------- */}
    <Dialog
      open={step === 10}
      onClose={closeDialog}
      fullScreen
    >
      <Box sx={{ p: 2 }}>
        <SigninForm onClose={closeDialog} />
      </Box>
    </Dialog>

    {/* ---------- SIGN UP DIALOG ---------- */}
    <Dialog
      open={step === 1}
      onClose={closeDialog}
      fullScreen
    >
      <Box sx={{ p: 2 }}>
        <SignupForm
          onSubmit={() => dispatch(signupstepaction(2))}
          onClose={closeDialog}
        />
      </Box>
    </Dialog>

    {/* ---------- STEP 2 DIALOG ---------- */}
    <Dialog
      open={step === 2}
      onClose={closeDialog}
      fullScreen
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ p: 2 }}>
          <Step2Dialog
            onNext2to3={() => dispatch(signupstepaction(0))}
            onClose={closeDialog}
          />
        </Box>
      </LocalizationProvider>
    </Dialog>
  </>
);
}

export default UserForm;

