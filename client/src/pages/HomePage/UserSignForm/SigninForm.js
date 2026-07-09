import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../../actions/userActions';
import { TextField, Button, CircularProgress, Typography, DialogActions, DialogTitle, DialogContent,Grid,Box } from '@mui/material';

const SigninForm = ({ onClose }) => {


  const accessibilitySettings = useSelector((state) => state.auth.accessibility);
              const [accessibilityData, setAccessibilityData] = useState(accessibilitySettings);
      const { user } = useSelector((state) => state.auth);
    
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
                        handleSubmit();
            break;
            case "B":
              cancel();
              break;
                      default:
                        break;
                    }
                  };
              
                  window.addEventListener("keydown", handleKeyDown);
                  return () => window.removeEventListener("keydown", handleKeyDown);
                }, []);


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(formData));
    setFormData({
      email: '',
      password: '',
    });
    onClose(); // Close the dialog after submitting
  };

  const cancel = () => {
    onClose();
  };
  

  return (

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              ...getAccessibleStyles('#FFF', '#000', '#FFF', '#FFF'),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 2,
              p: 4,
              mr: 3,
              maxWidth: 560,
              border: '1px solid #ddd',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              bgcolor: '#fff',
            }}
          >

                <Typography
                  variant="h2"
                  sx={{
                    fontWeight:'bold',
                    textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
                    fontSize: adjustedFontSize(2.2),
                    textAlign: 'center',
                    color: 
                    (accessibilityData.contrastMode || accessibilityData.darkContrast) 
                      ? '#FFF' 
                      : (accessibilityData.lightContrast ? '#000' : 'navy'),
                     textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
                  }}
                  gutterBottom
                >
כניסה לרשומים
</Typography>



        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{
            marginTop: '16px', // Add margin-top here
            fontSize: adjustedFontSize(1.1),
            minWidth: 280,
            backgroundColor: '#FFF', // White background
            color: '#000', // Black text
            '& .MuiInputBase-root': {
              color: '#000', // Ensure text color is black inside the input
            },
            '& .MuiInputLabel-root': {
              color: '#000', // Ensure label color is black
            },
            '& .MuiOutlinedInput-root': {
              borderColor: '#000', // Border color is black
              '&:hover fieldset': {
                borderColor: '#000', // Border color on hover is black
              },
              '&.Mui-focused fieldset': {
                borderColor: '#000', // Border color when focused is black
              },
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          sx={{
            marginTop: '16px', // Add margin-top here
            fontSize: adjustedFontSize(1.1),
            minWidth: 280,
            backgroundColor: '#FFF', // White background
            color: '#000', // Black text
            '& .MuiInputBase-root': {
              color: '#000', // Ensure text color is black inside the input
            },
            '& .MuiInputLabel-root': {
              color: '#000', // Ensure label color is black
            },
            '& .MuiOutlinedInput-root': {
              borderColor: '#000', // Border color is black
              '&:hover fieldset': {
                borderColor: '#000', // Border color on hover is black
              },
              '&.Mui-focused fieldset': {
                borderColor: '#000', // Border color when focused is black
              },
            },
          }}
        />

<Box
       sx={{
        display: 'flex',           // Align buttons side by side
        gap: 2,  
        mr: 1,
        mt: 1.5,
            }}
      >

<Button 
            onClick={cancel} 
            variant="contained" 
            color="secondary"
            aria-label="ביטול"
            aria-keyshortcuts="Alt+B"
            sx={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.5)",
  border: "2px solid #a3bffa",
              fontSize: adjustedFontSize(1.1),
              height: 45,
              minWidth: 120,
              borderRadius: 3,
              ...getAccessibleStyles("#ff7961", "#FFF", "#f44336", "#FFF"),  // Lighter red for cancel
            }}
            >
            ביטול
            {accessibilityData.characterKeyShortcuts ? ' (Alt+B)' : ''}

          </Button>

        <Button type="submit" variant="contained" color="primary" disabled={loading}
          aria-label="כניסה"
          aria-keyshortcuts="Alt+A"
          sx={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.5)",
border: "2px solid #a3bffa",
            fontSize: adjustedFontSize(1.1),
            height: 45,
            minWidth: 120,
            borderRadius: 3,
            ...getAccessibleStyles("#039be5", "#FFF", "#0288d1", "#FFF"),  // Submit button styles
          }}
          >
{loading ? (
  <CircularProgress size={24} />
) : (
  <>
    כניסה
    {accessibilityData.characterKeyShortcuts ? ' (Alt+A)' : ''}
  </>
)}        </Button>


        
 </Box>

        {error && (
              <Typography variant="subtitle1"
              sx={{
                fontSize: adjustedFontSize(1.2),
                color: getAccessibleStyles('red').color,
                fontWeight: accessibilityData.contrastMode ? 'bold' : 'normal',
                textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
              }}
                    gutterBottom
                  >
            {error.message}
            </Typography>


        )}
      </Box>

  );
};

export default SigninForm;
