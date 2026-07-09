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

const HomepageMobile = () => {
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
        width: '100%',
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* HERO SECTION */}
      <Box
        component="section"
        sx={{
          py: 4,
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* TEXT */}
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h4"
            dir="rtl"
            sx={{
              fontWeight: 750,
              color: "primary.main",
              lineHeight: 1.3,
              mb: 3,
              fontSize: "1.8rem",
            }}
          >
            פלטפורמה לשמירת מתכונים,
            <br />
            שיתוף עם חברים והכנת
            <br />
            ספר מתכונים אישי או משותף
          </Typography>

          <UserForm />
        </Box>

        {/* IMAGE */}
        <Box
          component="img"
          src={Homepageimage1}
          alt="homepage"
          sx={{
            width: "100%",
            maxHeight: 360,
            objectFit: "cover",
            borderRadius: 3,
            boxShadow: '0 24px 48px rgba(0,0,0,0.08)',
            mt: 3,
          }}
        />
      </Box>

      {/* VALUE CARDS SECTION (GRID ONLY PLACE) */}
      <Box component="section" sx={{ pb: 6, px: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{
          }}
        >
          {valueCards.map((card, index) => (
            <Grid item xs={12} key={index}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: '1px solid #e5e7eb',
                   justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    py: 3,
                    px: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.light,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {card.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1 }}
                    dir="rtl"
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="body2"
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

export default HomepageMobile;