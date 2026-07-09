import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  Avatar,
  Dialog,
  Grid,
  Divider,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';




import Edit2Mobile from './Edit2Mobile';
import  EditCookieMobile  from './EditCookieMobile';

import easypic from '../../pictures/easypic.png'; 

import UserCardMobile from '../../Components/UserCardMobile';

const UserPage0Mobile = ({ user, setMessage, currentUser }) => {

 const placeholderImage = easypic;

  const [openEdit2, setOpenEdit2] = useState(false);
  const [openEditCookie, setOpenEditCookie] = useState(false); // State for Personal Info dialog

  return (
    <Box sx={{ p: 1, textAlign: 'center' }}>
<Box sx={{ width: '80%', maxWidth: '600px', margin: 'auto', mb: 4,mt: -10 }}>
  <Typography 
    variant="h4" // Big but optimized for mobile
    sx={{ 
      fontWeight: 'bold', 
      mb: 1.5, 
      letterSpacing: '0.05em', 
      color: '#6a5acd', // Soft purple (SlateBlue)
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Subtle shadow
      fontFamily: "'Varela Round', sans-serif", // Rounded, modern font
    }}
  >
   העמוד שלי 
  </Typography>
  <Divider sx={{ borderBottomWidth: 3, borderColor: '#a8b8e8' }} /> {/* Light blue divider */}
</Box>



      {/* Buttons */}
      <Box sx={{ width: '70%', maxWidth: '600px', margin: 'auto', mt: 2,mb: 5 }}>
      <Grid container alignItems="center" spacing={2} sx={{ mb: 1 }}>
      <Grid item>
          <IconButton
            onClick={() => setOpenEdit2(true)}
            aria-label="Edit Personal Info"
            sx={{
              border: '1px solid lightgray',
              borderRadius: 8,
              p: 0.5,
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item xs>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            מידע אישי
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray', whiteSpace: 'pre-line' }}>
  {user.minBirthdate 
    ? 'מידע קיים' 
    : 'מידע חסר'}
</Typography>
        </Grid>

        <Grid item>
          {user.minBirthdate ? (
            <CheckCircleIcon color="success" fontSize="large" />
          ) : (
            <ErrorOutlineIcon color="error" fontSize="large" />
          )}
        </Grid>

      </Grid>


      <Grid container alignItems="center" spacing={2}>
       
      <Grid item>
          <IconButton
            onClick={() => setOpenEditCookie(true)}
            aria-label="Edit Cookie"
            sx={{
              border: '1px solid lightgray',
              borderRadius: 8,
              p: 0.5,
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <EditIcon />
          </IconButton>
        </Grid>    
  
        <Grid item xs>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            עריכת עוגיות
          </Typography>
          <Typography variant="body2" sx={{ color: 'gray', whiteSpace: 'pre-line' }}>
     מידע קיים
</Typography>
        </Grid>

        <Grid item>
            <IconButton
              aria-label="Maintenance"
              sx={{
                border: '1px solid lightgray',
                borderRadius: 8,
                p: 0.5,
                '&:hover': { backgroundColor: '#f5f5f5' },
              }}
            >
              <BuildIcon />
            </IconButton>
          </Grid>

      </Grid>
    </Box>

    <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column' }}>
        <UserCardMobile
          currentUser={currentUser} 
          size={'39vh'} 
        />
      </Box>
           

      {/* Dialogs */}
      <Dialog open={openEdit2} fullScreen onClose={() => setOpenEdit2(false)}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Edit2Mobile onClose={() => setOpenEdit2(false)} />
        </LocalizationProvider>
      </Dialog>

       <Dialog open={openEditCookie} fullWidth maxWidth="lg" onClose={() => setOpenEditCookie(false)}>
              <EditCookieMobile onClose={() => setOpenEditCookie(false)} /> 
            </Dialog>

    </Box>
  );
};

export default UserPage0Mobile;
