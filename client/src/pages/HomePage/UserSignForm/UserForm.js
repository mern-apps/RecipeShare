import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import Step2Dialog from './Step2Dialog';


import { LocalizationProvider } from '@mui/x-date-pickers';  
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';  

 
import { logout } from '../../../actions/userActions';
import { signupstepaction } from '../../../actions/userActions';

import { Stack,Button, Dialog, DialogContent, DialogTitle,Box } from '@mui/material';

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
    <div>

<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
<Stack direction="row" spacing={2}>
  {/* More Purple Button */}
  {user?.useradmin === 10 && (
  <Button
    onClick={openSignupDialog}
    variant="contained"
    sx={{
      textTransform: 'none',
      fontWeight: 'bold',
      borderRadius: 3,
      px: 3,
      py: 1.5,
      fontSize: '1.15rem',
      background: 'linear-gradient(135deg, #5A4BCC, #7B63FF)', // deeper purple
      color: '#fff',
      boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
        background: 'linear-gradient(135deg, #4B3DB8, #6B52FF)',
      },
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      },
    }}
  >
    הירשם/י
  </Button>
)}
  {/* More Intense Blue Button */}
  <Button
    onClick={openSigninDialog}
    variant="contained"
    sx={{
      textTransform: 'none',
      fontWeight: 'bold',
      borderRadius: 3,
      px: 3,
      py: 1.5,
      fontSize: '1.15rem',
      background: 'linear-gradient(135deg, #0099FF, #1DA1FF)', // vibrant blue
      color: '#fff',
      boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
        background: 'linear-gradient(135deg, #0088e6, #1691ff)',
      },
      '&:active': {
        transform: 'translateY(0)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      },
    }}
  >
    כנס/י שוב
  </Button>
</Stack>




</Box>

      

       {/* Sign In Dialog */}
    <Dialog
  open={step === 10}
  onClose={closeDialog}
  fullWidth
  maxWidth="sm" 
  PaperProps={{
    sx: {
      borderRadius: 3,
      p: 2,
      maxHeight: '90vh',
      overflowY: 'auto',
    },
  }}
>       <DialogContent>
          <SigninForm onClose={closeDialog} />
        </DialogContent>
      </Dialog>



      {/* Signup Dialog */}
    <Dialog
  open={step === 1}
  onClose={closeDialog}
  fullWidth
  maxWidth="sm" 
  PaperProps={{
    sx: {
      borderRadius: 3,
      p: 2,
      maxHeight: '90vh',
      overflowY: 'auto',
    },
  }}
>
        <SignupForm onSubmit={() => dispatch(signupstepaction(2))} onClose={closeDialog} />
      </Dialog>


      {/* Step 2 Dialog */}
      <Dialog
  open={step === 2}
  onClose={closeDialog}
  fullWidth maxWidth="lg"
  PaperProps={{
    sx: { width: '70%', height: '80%', maxWidth: 'none' }
  }}
>
<LocalizationProvider dateAdapter={AdapterDayjs}>
        <Step2Dialog onNext2to3={() => dispatch(signupstepaction(0))} onClose={closeDialog} />
      </LocalizationProvider>
      </Dialog>


    </div>
  );
}

export default UserForm;

