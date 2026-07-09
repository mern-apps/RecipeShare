import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Container,
  Typography,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { improvementaccessibility } from '../../actions/accessibilityactions'; // Adjust the path if needed

const Contact = () => {
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
        color: '#000'
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
    <Container maxWidth="sm" dir="rtl">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          ...getAccessibleStyles(),
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: adjustedFontSize(2),
            textAlign: 'center',
            ...getAccessibleStyles()
          }}
        >
          טופס הצעה לשיפור נגישות
        </Typography>

        <Grid container spacing={2} direction="column">
  <Grid item>
    <TextField
      fullWidth
      name="email"
      label="אימייל"
      variant="outlined"
      value={formData.email}
      onChange={handleChange}
      sx={{
        fontSize: adjustedFontSize(1.2),
        ...getAccessibleStyles('#fff'),
        '& .MuiInputLabel-root': {
          textAlign: 'right',  // Align the label text to the right
          transformOrigin: 'right center', // Ensure the label floats to the right when focused
        },
        '& .MuiInputBase-root': {
          textAlign: 'right',  // Align the input field text to the right
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
  </Grid>

  <Grid item>
    <TextField
      fullWidth
      name="message"
      label="הודעה"
      multiline
      rows={5}
      variant="outlined"
      value={formData.message}
      onChange={handleChange}
      sx={{
        fontSize: adjustedFontSize(1.2),
        ...getAccessibleStyles('#fff'),
        '& .MuiInputLabel-root': {
          textAlign: 'right',  // Align the label text to the right
          transformOrigin: 'right center', // Ensure the label floats to the right when focused
        },
        '& .MuiInputBase-root': {
          textAlign: 'right',  // Align the input field text to the right
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
  </Grid>

  {error && (
    <Grid item>
      <Alert severity="error" sx={{ fontSize: adjustedFontSize(1.1) }}>
        {error}
      </Alert>
    </Grid>
  )}

  <Grid item>
    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
        mt: 2,
        fontSize: adjustedFontSize(1.3),
        borderRadius: 3,
        height: 56,
        ...getAccessibleStyles('blue'),
        color: 'white',
        '&:hover': {
          backgroundColor: '#00509e'
        }
      }}
    >
      שלח הצעה
    </Button>
  </Grid>
</Grid>
      </Box>
    </Container>
  );
};

export default Contact;
