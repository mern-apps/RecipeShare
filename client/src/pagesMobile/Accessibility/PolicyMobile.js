import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PolicyMobile = () => {
  const { user } = useSelector((state) => state.auth);
  const accessibilitySettings = useSelector((state) => state.auth.accessibility);
  const [accessibilityData, setAccessibilityData] = useState(accessibilitySettings);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.accessibility) {
      setAccessibilityData(user.accessibility);
    } else {
      setAccessibilityData(accessibilitySettings);
    }
  }, [user, accessibilitySettings]);

  const adjustedFontSize = (size) => `${(size * accessibilityData.fontSizeAdjustments) / 100}rem`;

  const getAccessibleStyles = (defaultBg) => {
    const { darkContrast, lightContrast, contrastMode } = accessibilityData;

    if (darkContrast) {
      return { backgroundColor: "#000", color: "#FFF" };
    }
    if (lightContrast) {
      return { backgroundColor: "#FFF", color: "#000" };
    }
    if (contrastMode) {
      return {
        backgroundColor: "#000",
        color: "#FFF",
        fontWeight: "bold",
        textDecoration: "underline",
      };
    }
    return { backgroundColor: defaultBg, color: "#000" };
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!event.altKey) return;
      const key = event.key.toUpperCase();
      if (key === "I") {
        navigate('/contact-for-improvement');
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Grid
      container
      direction="column"
      sx={{
        px: 2,
        py: 3,
        direction: 'rtl',
        textAlign: 'right',
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: adjustedFontSize(1.8),
        }}
      >
        מדיניות נגישות לאתר
      </Typography>

      <Typography
        sx={{ fontSize: adjustedFontSize(1.1), mt: 2 }}
        paragraph
      >
        אנו מחויבים לספק חוויית גלישה נגישה לכלל המשתמשים, כולל אנשים עם מוגבלויות. האתר עומד בדרישות
        <strong> WCAG A+AA</strong> ומספק את ההתאמות הנדרשות לפי תקנות שוויון זכויות לאנשים עם מוגבלות (תשנ"ג–2013).
      </Typography>

      <Typography
        sx={{ fontSize: adjustedFontSize(1.1), mt: 2 }}
        paragraph
      >
        האתר עומד בתקן הנגישות <strong>5568</strong>, ואנו עושים כל שביכולתנו להבטיח שהאתר יהיה נגיש לכלל המשתמשים.
      </Typography>

      <Typography
        sx={{ fontSize: adjustedFontSize(1.1), mt: 2 }}
        paragraph
      >
        במידה ונתקלתם בקושי או תקלה כלשהי הקשורה לנגישות האתר, נשמח שתפנו אלינו דרך{' '}
        <Box
          component="span"
          onClick={() => navigate('/contact-for-improvement')}
          sx={{
            cursor: 'pointer',
            color: 'primary.main',
            textDecoration: 'underline',
            fontWeight: 'bold',
          }}
        >
          טופס יצירת קשר
        </Box>{' '}
        ואנו נעשה כמיטב יכולתנו לתקן ולשפר בהתאם.
      </Typography>

      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          textAlign: 'center',
          ...getAccessibleStyles('#f0f0f0'),
        }}
      >
        <Typography sx={{ fontSize: adjustedFontSize(1), fontWeight: 500 }}>
          ניתן גם להשתמש בקיצור המקלדת <strong>Alt + I</strong> (דרך מחשב) על מנת לגשת ישירות לטופס יצירת קשר לשיפור הנגישות.
        </Typography>
      </Box>
    </Grid>
  );
};

export default PolicyMobile;
