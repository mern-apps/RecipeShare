import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, styled } from '@mui/material';
import { initializeproject } from '../actions/projectactions.js';
import {initializegroup } from '../actions/groupactions.js';
import {initializetask } from '../actions/recipeNewForm.js';

import { useDispatch } from 'react-redux';
import { closemodal } from '../actions/editrecipepage.js';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(to right, #AA5AAE, #6495ED)', // Lighter Blue to Emphasized Purple
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'flex-end', // Move content to the right
  padding: '0 20px', // Adjust the padding as needed
  '& > div': {
    display: 'flex',
    alignItems: 'center', // Align items vertically
  },
  '& > div > button, & > div > a': {
    fontSize: '18px', // Adjust the font size for buttons and links
    marginLeft: '20px', // Add some space between links
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'white',
});

const Header = () => {

  const dispatch = useDispatch();
  
  const handleClick = () => {
    //recipe
    dispatch(initializetask());
    //project
    dispatch(initializeproject());
    dispatch(closemodal());
    //group
    dispatch(initializegroup());
  };


  return (
    <StyledAppBar position="static">
      <Box width="100%">
        <StyledToolbar>
          <div style={{ marginRight: '200px' }}>
            <Button color="inherit" component={StyledLink} to="/">
              מסך הבית
            </Button>
            <Button color="inherit" component={StyledLink} to="newrecipe"
            onClick={handleClick}>
              מתכון חדש
            </Button>
           <Button color="inherit" component={StyledLink} to="/newbook" 
           onClick={handleClick}>
              ספר מתכונים חדש
            </Button>
            <Button color="inherit" component={StyledLink} to="/projects">
              כל ספרי המתכונים
            </Button>

            <Button color="inherit" component={StyledLink} to="/newgroup"
            onClick={handleClick}>

              יצירת קבוצה חדשה
            </Button>
            
            <Button color="inherit" component={StyledLink} to="/groups">
קבוצות            </Button>


            <Button color="inherit" component={StyledLink} to="/test">
              test
            </Button>
            <Button color="inherit" component={StyledLink} to="/test1">
              LIAN + ALON
            </Button>

            <Button color="inherit" component={StyledLink} to="/dashboard">
            dashboard
            </Button>

            <Button color="inherit" component={StyledLink} to="/recipes">
            חיפוש מתכונים
            </Button>

            <Button color="inherit" component={StyledLink} to="/myrecipes">
            מתכונים שלי 
            </Button>

            <Button color="inherit" component={StyledLink} to="/signup">
            signup
            </Button>
          </div>
          
          <Typography variant="subtitle1" style={{ color: 'white', marginRight: '70px' }}>
            Your Slogan Here
          </Typography>

          <Typography variant="h6">
            <StyledLink to="/" style={{ color: 'white' }}>
              YourLogo
            </StyledLink>
          </Typography>
        </StyledToolbar>
      </Box>
    </StyledAppBar>
  );
};

export default Header;
