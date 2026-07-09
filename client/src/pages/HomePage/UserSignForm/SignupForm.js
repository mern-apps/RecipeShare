import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../../actions/userActions';
import { Checkbox,FormControlLabel, TextField, Button, CircularProgress, Typography,Box,Grid } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';  

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


  const handleConsent = (approval) => {
    setCookieConsent(approval);
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
      setErrorcookie('נא למלא את כל השדות כולל הסכמה לעוגיות (1 או 0)');
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
הרשמה    </Typography>

        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
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
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
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
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
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
          fullWidth
          required
          margin="normal"
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
    ...getAccessibleStyles('#f8f9fa', '#000', '#FFF', '#FFF'),
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    marginTop: '15px',
    border: '1px solid #ddd',
  }}
>
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
                      fontSize: adjustedFontSize(1.1),
                      textAlign: 'center',
                      color: 
                      (accessibilityData.contrastMode || accessibilityData.darkContrast) 
                        ? '#FFF' 
                        : (accessibilityData.lightContrast ? '#000' : 'navy'),
                       textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
                    }}
                    gutterBottom
                  >
    האתר משתמש בקבצי "עוגיות" לצורך שיפור חוויית הגלישה. עליך להסכים לשימוש ב"עוגיות" על מנת להמשיך להשתמש באתר.
    </Typography>


    <Grid
  container
  justifyContent="center"
  spacing={2}
  sx={{
  }}
>
  <Grid item>
      <Button
      onClick={() => handleConsent(0)}
      aria-label="סירוב"
      aria-keyshortcuts="Alt+D"
      sx={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.5)",
border: "2px solid #a3bffa",
        fontSize: adjustedFontSize(1.1),
        height: 35,
        minWidth: 90,
        borderRadius: 3,
        ...getAccessibleStyles("#FFF", "#000", "#FFF", "#000"),
        ...(cookieConsent !== 1 && {
          borderWidth: '4px',
          borderColor: '#0288d1',
        }),
      }}
      variant="contained"
    >
      סירוב
      {accessibilityData.characterKeyShortcuts ? ' (Alt+D)' : ''}

    </Button>
    </Grid>

    <Grid item>

    <Button
      onClick={() => handleConsent(1)}
      aria-label="אישור"
      aria-keyshortcuts="Alt+C"
      sx={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.5)",
border: "2px solid #a3bffa",
        fontSize: adjustedFontSize(1.1),
        height: 35,
        minWidth: 90,
        borderRadius: 3,
        ...getAccessibleStyles("#FFF", "#000", "#FFF", "#000"), 
        ...(cookieConsent === 1 && {
          borderWidth: '4px',
          borderColor: '#0288d1',
        }),
      }}
      variant="contained"
    >
      אישור
      {accessibilityData.characterKeyShortcuts ? ' (Alt+C)' : ''}

    </Button>
    </Grid>

    </Grid>
    </Box>

    <Grid
  container
  justifyContent="center"
  spacing={2}
  sx={{
    marginTop: '10px',
  }}
>
  <Box
  sx={{
    display: 'flex',
    flexDirection: 'row-reverse', // checkbox on the right
    alignItems: 'center',
    mb: 2, // margin bottom
    textAlign: 'right', // ensures Hebrew text is RTL
  }}
>
  <FormControlLabel
    control={
      <Checkbox
        checked={agreeTerms}
        onChange={(e) => setAgreeTerms(e.target.checked)}
        sx={{ color: '#000' }}
      />
    }
    label={
      <Typography
        variant="body2"
        sx={{
          fontSize: adjustedFontSize(1.1),
          color:
            accessibilityData.contrastMode || accessibilityData.darkContrast
              ? '#FFF'
              : accessibilityData.lightContrast
              ? '#000'
              : 'navy',
          direction: 'rtl', // makes text read right-to-left
        }}
      >
        אני מאשר שהבנתי שהאתר כרגע פתוח להרשמה בלבד, ויפתח לשימוש מלא בתאריך 15 לאוקטובר
      </Typography>
    }
    labelPlacement="start" // checkbox on the right
  />
</Box>

  <Grid item>
<Button 
                    onClick={onClose}
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

                  </Grid>
                  <Grid item>



             <Button type="submit" variant="contained" color="primary" disabled={loading}
                  aria-label="הרשמה"
                  aria-keyshortcuts="Alt+A"
                  sx={{
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.5)",
        border: "2px solid #a3bffa",
                    fontSize: adjustedFontSize(1.1),
                    height: 45,
                    minWidth: 120,
                    borderRadius: 3,
                    ...getAccessibleStyles("#039be5", "#FFF", "#0288d1", "#FFF"),
                  }}
                  >
               {loading ? (
                 <CircularProgress size={24} />
               ) : (
                 <>
                   הרשמה
                   {accessibilityData.characterKeyShortcuts ? ' (Alt+A)' : ''}
                 </>
               )}        </Button>
                </Grid>

                </Grid>
        {error && (
          <Typography color="error" variant="body2"
          sx={{
            textDecoration: accessibilityData.contrastMode ? 'underline' : 'none',
            fontSize: adjustedFontSize(1.1),
            textAlign: 'center',
            color: 
            (accessibilityData.contrastMode || accessibilityData.darkContrast) 
              ? '#FFF' 
              : (accessibilityData.lightContrast ? '#000' : 'navy'),
             textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
          }}
          gutterBottom
        >
            {error.message}
          </Typography>
        )}


        {errorcookie && (
          <Snackbar open={Boolean(errorcookie)} autoHideDuration={6000} onClose={() => setErrorcookie('')}>
            <Alert severity="error" onClose={() => setErrorcookie('')}>
              {errorcookie}
            </Alert>
          </Snackbar>
        )}

</Box>

  );
};

export default SignupForm;
