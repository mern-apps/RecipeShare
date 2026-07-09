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
      ...getAccessibleStyles("#FFF", "#000", "#FFF", "#FFF"),

      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",

      px: 2,
      py: 2,
      gap: 2.2,

      direction: "rtl",
    }}
  >
    {/* ---------- TITLE ---------- */}
    <Typography
      sx={{
        fontWeight: 800,
        fontSize: "1.4rem",
        textAlign: "center",
        color:
          accessibilityData.contrastMode ||
          accessibilityData.darkContrast
            ? "#FFF"
            : accessibilityData.lightContrast
            ? "#000"
            : "#1a237e",
        mb: 1,
      }}
    >
      כניסה לרשומים
    </Typography>

    {/* ---------- EMAIL ---------- */}
    <TextField
      label="אימייל"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          fontSize: adjustedFontSize(1.05),
          backgroundColor: "#fff",
        },
      }}
    />

    {/* ---------- PASSWORD ---------- */}
    <TextField
      label="סיסמה"
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          fontSize: adjustedFontSize(1.05),
          backgroundColor: "#fff",
        },
      }}
    />

    {/* ---------- BUTTONS ---------- */}
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        mt: 1,
      }}
    >
      {/* CANCEL */}
      <Button
        onClick={cancel}
        variant="outlined"
        fullWidth
        sx={{
          height: 48,
          borderRadius: 3,
          textTransform: "none",
         fontSize: "1.1rem",
          border: "2px solid #ef5350",
          color: "#ef5350",
          backgroundColor: "#fff",
          "&:hover": {
            backgroundColor: "#ffebee",
          },
        }}
      >
        ביטול
      </Button>

      {/* SUBMIT */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          height: 48,
          borderRadius: 3,
          textTransform: "none",
           fontSize: "1.1rem",
          background:
            "linear-gradient(135deg,#2196F3,#1976D2)",
          boxShadow: "0 8px 18px rgba(25,118,210,0.25)",

          "&:active": {
            transform: "scale(0.98)",
          },
        }}
      >
        {loading ? (
          <CircularProgress size={22} sx={{ color: "#fff" }} />
        ) : (
          "כניסה"
        )}
      </Button>
    </Box>

    {/* ---------- ERROR ---------- */}
    {error && (
      <Typography
        sx={{
          mt: 1,
          textAlign: "center",
          fontSize: adjustedFontSize(1.1),
          color: "red",
          fontWeight: 600,
        }}
      >
        {error.message}
      </Typography>
    )}
  </Box>
);
};

export default SigninForm;
