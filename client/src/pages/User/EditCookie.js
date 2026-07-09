import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { cookieedit } from '../../actions/userActions';

const EditCookie = ({ currentUser, onClose }) => {
  const [cookieState, setCookieState] = useState(currentUser?.cookie || 0);
  const dispatch = useDispatch();

  useEffect(() => { 
    console.log('cookieState:',cookieState); 
  }, [cookieState]);


  useEffect(() => {
    if (currentUser) {
      setCookieState(currentUser.cookie || 0);
    }
  }, [currentUser]);

  const handleSubmit = () => {
    if (cookieState !== currentUser?.cookie) {
      console.log('cookieState2:',cookieState); 
      dispatch(cookieedit(cookieState));
    }
    console.log('cookieState3:',cookieState); 

    onClose();
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        marginTop: '15px',
        border: '1px solid #ddd',
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ fontWeight: 'bold', mb: 2, color: '#4a4a4a' }}
      >
        ניהול קובצי עוגיות 🍪
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        האתר משתמש בקובצי "עוגיות" לצורך שיפור חוויית הגלישה. עליך להסכים לשימוש ב"עוגיות" על מנת להמשיך להשתמש באתר.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <Button
          onClick={() => setCookieState(1)}
          sx={{
            backgroundColor: cookieState === 1 ? '#4caf50' : '#e0e0e0',
            color: cookieState === 1 ? '#fff' : '#000',
            fontWeight: cookieState === 1 ? 'bold' : 'normal',
            '&:hover': { backgroundColor: cookieState === 1 ? '#45a044' : '#d6d6d6' },
          }}
          variant="contained"
        >
          הסכים
        </Button>
        <Button
          onClick={() => setCookieState(0)}
          sx={{
            backgroundColor: cookieState === 0 ? '#ff6b6b' : '#e0e0e0',
            color: cookieState === 0 ? '#fff' : '#000',
            fontWeight: cookieState === 0 ? 'bold' : 'normal',
            '&:hover': { backgroundColor: cookieState === 0 ? '#ff4d4d' : '#d6d6d6' },
          }}
          variant="contained"
        >
          דחה
        </Button>
      </Box>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        sx={{
          backgroundColor: '#2196f3',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
          '&:hover': { backgroundColor: '#1976d2' },
        }}
        variant="contained"
      >
        שמור שינויים
      </Button>

      <Button
          onClick={onClose}
          sx={{
            color: '#555',
            fontWeight: 'bold',
            borderRadius: '8px',
            '&:hover': { color: '#000' },
          }}
          variant="text"
        >
          ביטול
        </Button>


      
    </Box>
  );
};

export default EditCookie;
