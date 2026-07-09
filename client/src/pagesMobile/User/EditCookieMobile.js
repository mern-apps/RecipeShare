import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, Box, Typography, Button, Slide } from '@mui/material';
import { cookieedit } from '../../actions/userActions';

const EditCookieMobile = ({ currentUser, onClose }) => {
  const [cookieState, setCookieState] = useState(currentUser?.cookie || 0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setCookieState(currentUser.cookie || 0);
    }
  }, [currentUser]);

  const handleSubmit = () => {
    if (cookieState !== currentUser?.cookie) {
      dispatch(cookieedit(cookieState));
    }
    onClose();
  };

  return (
    <Dialog 
      open 
      fullScreen 
      TransitionComponent={Slide} 
      transitionDuration={300}
      sx={{ '& .MuiPaper-root': { backgroundColor: '#f5f5f5' } }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
          ניהול קובצי עוגיות 🍪
        </Typography>

        <Typography variant="body1" sx={{ color: '#555', mb: 4 }}>
          אנו משתמשים בקובצי "עוגיות" לשיפור חוויית המשתמש. אנא בחר את ההגדרה שלך.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          <Button
            onClick={() => setCookieState(1)}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: cookieState === 1 ? '#4caf50' : '#e0e0e0',
              color: cookieState === 1 ? '#fff' : '#000',
              fontWeight: 'bold',
              py: 1.5,
              '&:hover': { backgroundColor: cookieState === 1 ? '#45a044' : '#d6d6d6' },
            }}
          >
            הסכים
          </Button>
          <Button
            onClick={() => setCookieState(0)}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: cookieState === 0 ? '#ff6b6b' : '#e0e0e0',
              color: cookieState === 0 ? '#fff' : '#000',
              fontWeight: 'bold',
              py: 1.5,
              '&:hover': { backgroundColor: cookieState === 0 ? '#ff4d4d' : '#d6d6d6' },
            }}
          >
            דחה
          </Button>
        </Box>

        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#2196f3',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '8px',
            py: 1.5,
            '&:hover': { backgroundColor: '#1976d2' },
          }}
        >
          שמור שינויים
        </Button>

        {/* Cancel Button */}
        <Button
          onClick={onClose}
          variant="text"
          fullWidth
          sx={{
            color: '#555',
            fontWeight: 'bold',
            mt: 2,
            '&:hover': { color: '#000' },
          }}
        >
          ביטול
        </Button>
      </Box>
    </Dialog>
  );
};

export default EditCookieMobile;
