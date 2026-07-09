import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../../actions/userActions';
import { Checkbox,FormControlLabel, TextField, Button, CircularProgress, Typography,Box,Grid } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';  
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import CookieIcon from "@mui/icons-material/Cookie";

const SignupForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cookie: '',
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  
  const { loading, error, user } = useSelector((state) => state.auth);

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
                          onSubmit();
              break;
              case "B":
                onClose();
                break;
                case "C":
                  handleConsent(1);
                  break;
                  case "D":
                    handleConsent(0);
                    break;
                        default:
                          break;
                      }
                    };
                
                    window.addEventListener("keydown", handleKeyDown);
                    return () => window.removeEventListener("keydown", handleKeyDown);
                  }, []);
                  

  const [cookieConsent, setCookieConsent] = useState(1); 
  const [openCookie, setOpenCookie] = useState(true);
  const [errorcookie, setErrorcookie] = useState('');

  const dispatch = useDispatch();


const handleConsent = (checked) => {
  if (checked) {
    setCookieConsent(1);
  } else {
    setCookieConsent(0);
  }
  setOpenCookie(false);
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const validateForm = () => {
  if (
    !formData.firstName ||
    !formData.email ||
    !formData.password ||
    (cookieConsent !== 1 && cookieConsent !== 0) ||
    !agreeTerms // 🔹 must check the box
  ) {
    return false;
  }
  return true;
};


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorcookie('נא למלא את כל השדות כולל אישור לעוגיות');
      return; // Stop submission if form is not valid
    }

    const updatedFormData = { ...formData, cookie: cookieConsent };
    dispatch(signup(updatedFormData))
    setFormData({
      firstName: '',
      email: '',
      password: '',
      cookie: '',
    });

    setCookieConsent(null); // Reset cookie consent value
    setErrorcookie('');
    setOpenCookie(true);
    // Call the onSubmit function passed from UserForm to move to Step 2
    onSubmit();
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

      width: '100%',
      maxWidth: 520,
      mx: 'auto',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',

      gap: 2.2,
      p: 3,

      border: '1px solid #E0E0E0',
      borderRadius: 3,
      bgcolor: '#fff',
      boxShadow: '0 6px 18px rgba(0,0,0,0.08)',

      direction: 'rtl', // 🔥 IMPORTANT for Hebrew mobile UX
    }}
  >
    {/* TITLE */}
    <Box sx={{ textAlign: 'center', mb: 1 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          fontSize: adjustedFontSize(2.1),
          textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
          color:
            accessibilityData.contrastMode || accessibilityData.darkContrast
              ? '#000'
              : accessibilityData.lightContrast
              ? '#000'
              : '#1a237e',
        }}
      >
        הרשמה
      </Typography>
    </Box>

    {/* INPUTS */}
   <TextField
  label="שם פרטי"
  name="firstName"
  value={formData.firstName}
  onChange={handleChange}
  fullWidth
  required
  sx={{
    direction: "rtl",
    "& .MuiInputBase-input": {
      textAlign: "right",
    },
    "& .MuiInputLabel-root": {
      right: 14,
      left: "auto",
      transformOrigin: "top right",
    },
  }}
/>
    <TextField
      label="שם משפחה"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
      fullWidth
      required
       sx={{
    direction: "rtl",
    "& .MuiInputBase-input": {
      textAlign: "right",
    },
    "& .MuiInputLabel-root": {
      right: 14,
      left: "auto",
      transformOrigin: "top right",
    },
  }}
    />

    <TextField
      label="אימייל"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      fullWidth
      required
       sx={{
    direction: "rtl",
    "& .MuiInputBase-input": {
      textAlign: "right",
    },
    "& .MuiInputLabel-root": {
      right: 14,
      left: "auto",
      transformOrigin: "top right",
    },
  }}
    />

    <TextField
      label="סיסמה"
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      fullWidth
      required
       sx={{
    direction: "rtl",
    "& .MuiInputBase-input": {
      textAlign: "right",
    },
    "& .MuiInputLabel-root": {
      right: 14,
      left: "auto",
      transformOrigin: "top right",
    },
  }}
    />

    {/* COOKIE BOX */}
    <Box
      sx={{
        mt: 1,
        p: 2,
        borderRadius: 3,
        border: '1px solid #E0E0E0',
        bgcolor: '#FAFAFA',
      }}
    >
  <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "right",
    p: 1,
    borderRadius: 3,
    background: "linear-gradient(135deg, #f7f9ff, #eef3ff)",
    border: "1px solid rgba(25, 118, 210, 0.15)",
  }}
>
  {/* Icon */}
  <CookieIcon
    sx={{
      fontSize: 42,
      color: "#ffb300", // צבע עוגייה חזק
      filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.15))",
    }}
  />

  {/* Title */}
  <Typography
    sx={{
      fontSize: adjustedFontSize(1.15),
      fontWeight: 700,
      color: "#0d47a1", // כחול כהה מאוד
      textAlign: "center",
    }}
  >
    שימוש בעוגיות (Cookies)
  </Typography>

<FormControlLabel
  control={
    <Checkbox
      checked={cookieConsent}
      onChange={(e) => handleConsent(e.target.checked)}
      color="primary"
    />
  }
  label={
    <Typography
      sx={{
        fontSize: adjustedFontSize(1),
        color: "#1a237e",
      }}
    >
      האתר משתמש בעוגיות כדי לאפשר הרשמה וכניסה למערכת בצורה בטוחה ונוחה,
      ולשמור אותך מחובר בזמן השימוש באתר.
    </Typography>
  }
  sx={{
    justifyContent: "center",
    width: "100%",
    mx: 0,
  }}
/>

</Box>

    </Box>

    {/* TERMS CHECKBOX */}
    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
        />
        <Typography
         sx={{ 
      fontSize: adjustedFontSize(1.05),
      textAlign: "center",
      color: "#1a237e",
      lineHeight: 1.6,
   }}>
          אני מאשר תנאי שימוש והצהרת פרטיות
        </Typography>
      </Box>
    </Box>

    {/* ACTION BUTTONS */}
    <Grid container spacing={2} sx={{ }}>

      <Grid item xs={6}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={22} /> : 'הרשמה'}
        </Button>
      </Grid>

            <Grid item xs={6}>
        <Button
          fullWidth
          onClick={onClose}
          variant="outlined"
          color="error"
        >
          ביטול
        </Button>
      </Grid>

    </Grid>

    {/* ERROR */}
    {error && (
      <Typography
        sx={{
          color: 'red',
          textAlign: 'center',
          fontSize: adjustedFontSize(1),
        }}
      >
        {error.message}
      </Typography>
    )}

    {/* COOKIE ERROR */}
    {errorcookie && (
      <Snackbar
        open={Boolean(errorcookie)}
        autoHideDuration={6000}
        onClose={() => setErrorcookie('')}
      >
        <Alert severity="error">{errorcookie}</Alert>
      </Snackbar>
    )}
  </Box>
);
};

export default SignupForm;
