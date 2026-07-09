import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import GroupIcon from "@mui/icons-material/Group";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import UserForm from './UserSignForm/UserForm.js';
import { signinbyid } from '../../actions/userActions.js';

import Homepageimage1 from '../../pictures/Homepageimage1.jpg';
import BlockHomePage from '../../Components/Block/BlockHomePage.js';

const Homepage = () => {
  const homePageBlock = useSelector((state) => state.general.homePage);
  const { user } = useSelector((state) => state.auth);
  const step = useSelector((state) => state.auth.signupstep);

  const dispatch = useDispatch();
  const theme = useTheme();

  const valueCards = [
    {
      icon: <BookmarkIcon color="primary" sx={{ fontSize: 36 }} />,
      title: "שמרו את המתכונים שלכם",
      description: "כל המתכונים שלכם במקום אחד — גישה מהירה, נוחה ובטוחה מכל מכשיר.",
    },
    {
      icon: <GroupIcon color="primary" sx={{ fontSize: 36 }} />,
      title: "שתפו עם חברים",
      description: "שתפו מתכונים עם המשפחה, החברים או הקהילה — קבלו השראה מהאחרים ובשלו יחד.",
    },
    {
      icon: <MenuBookIcon color="primary" sx={{ fontSize: 36 }} />,
      title: "צרו ספר מתכונים משותף",
      description: "צרו ספר מתכונים אישי או קבוצתי — מושלם כמתנה, פרויקט משפחתי או ספר שפים קטן משלכם.",
    },
  ];

  useEffect(() => {
    if (user && user._id) {
      dispatch(signinbyid());
    }
  }, [step]);

  if (homePageBlock) {
    return <BlockHomePage />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        width: '100%',
      }}
    >

      {/* HERO SECTION */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={6}
        >

          {/* LEFT / TEXT */}
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <Typography
              variant="h3"
              dir="rtl"
              sx={{
                fontWeight: 750,
                color: "primary.main",
                lineHeight: 1.3,
                mb: 3,
              }}
            >
              פלטפורמה לשמירת מתכונים,
              <br />
              שיתוף עם חברים והכנת
              <br />
              ספר מתכונים אישי או משותף
            </Typography>

            <UserForm />
          </Grid>

          {/* RIGHT / IMAGE */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={Homepageimage1}
              alt="homepage"
              sx={{
                width: '100%',
                maxHeight: 580,
                objectFit: 'cover',
                borderRadius: 3,
                boxShadow: '0 24px 48px rgba(0,0,0,0.08)',
              }}
            />
          </Grid>

        </Grid>
      </Box>

      {/* VALUE CARDS SECTION */}
      <Box component="section" sx={{ pb: { xs: 8, md: 12 } }}>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}
        >
          {valueCards.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease',
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    px: 3,
                    py: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.light,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    {card.icon}
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, mb: 2 }}
                    dir="rtl"
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h6"
                    color="text.secondary"
                    dir="rtl"
                  >
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
};

export default Homepage;
