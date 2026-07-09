import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { improvementaccessibility } from '../../actions/accessibilityactions';

const ContactMobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const accessibilitySettings = useSelector((state) => state.auth.accessibility);
  const [accessibilityData, setAccessibilityData] = useState(accessibilitySettings);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    message: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.accessibility) {
      setAccessibilityData(user.accessibility);
    } else {
      setAccessibilityData(accessibilitySettings);
    }
  }, [user, accessibilitySettings]);

  const adjustedFontSize = (size) =>
    `${(size * accessibilityData.fontSizeAdjustments) / 100}rem`;

  const getAccessibleStyles = (defaultBg = '#f0f0f0') => {
    const { darkContrast, lightContrast, contrastMode } = accessibilityData;

    if (darkContrast) {
      return {
        backgroundColor: '#000',
        color: '#FFF',
        border: '2px solid #FFF'
      };
    }

    if (lightContrast) {
      return {
        backgroundColor: '#FFF',
        color: '#000',
        border: '2px solid #FFF'
      };
    }

    if (contrastMode) {
      return {
        backgroundColor: '#000',
        color: '#FFF',
        fontWeight: 'bold',
        textDecoration: 'underline',
        border: '2px solid #FFF'
      };
    }

    return {
      backgroundColor: defaultBg,
      color: '#000'
    };
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, message } = formData;

    if (!validateEmail(email)) {
      setError('אימייל לא תקין');
      return;
    }

    if (!message.trim()) {
      setError('נא להכניס תוכן ההודעה');
      return;
    }

    dispatch(improvementaccessibility(formData));
    setError('');
    setFormData({ email: user?.email || '', message: '' });
    alert('ההודעה נשלחה בהצלחה, נציגנו יצור איתך קשר');
    navigate('/');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      dir="rtl"
      sx={{
        p: 2,
        m: 2,
        borderRadius: 3,
        ...getAccessibleStyles(),
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: adjustedFontSize(2),
          textAlign: 'center',
          mb: 2,
          ...getAccessibleStyles()
        }}
      >
        טופס הצעה לשיפור נגישות
      </Typography>

      <TextField
        fullWidth
        name="email"
        label="אימייל"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        sx={{
          mb: 2,
          ...getAccessibleStyles('#fff'),
          '& .MuiInputLabel-root': {
            textAlign: 'right',
            transformOrigin: 'right center',
          },
          '& .MuiInputBase-root': {
            textAlign: 'right',
          }
        }}
        InputLabelProps={{
          style: {
            fontSize: adjustedFontSize(1.2),
            color: getAccessibleStyles().color,
          }
        }}
        inputProps={{
          style: {
            fontSize: adjustedFontSize(1.2),
            color: getAccessibleStyles().color
          }
        }}
      />

      <TextField
        fullWidth
        name="message"
        label="הודעה"
        multiline
        rows={4}
        variant="outlined"
        value={formData.message}
        onChange={handleChange}
        sx={{
          mb: 2,
          ...getAccessibleStyles('#fff'),
          '& .MuiInputLabel-root': {
            textAlign: 'right',
            transformOrigin: 'right center',
          },
          '& .MuiInputBase-root': {
            textAlign: 'right',
          }
        }}
        InputLabelProps={{
          style: {
            fontSize: adjustedFontSize(1.2),
            color: getAccessibleStyles().color,
          }
        }}
        inputProps={{
          style: {
            fontSize: adjustedFontSize(1.2),
            color: getAccessibleStyles().color
          }
        }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2, fontSize: adjustedFontSize(1.1) }}>
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          fontSize: adjustedFontSize(1.3),
          borderRadius: 3,
          height: 50,
          mt: 1,
          backgroundColor: '#002b5c',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#00509e'
          },
          ...getAccessibleStyles()
        }}
      >
        שלח הצעה
      </Button>
    </Box>
  );
};

export default ContactMobile;


