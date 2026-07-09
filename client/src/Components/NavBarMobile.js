import React, { useState } from 'react';
import { Grid, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility'; // Import a different icon
import AccessibilityDialogMobile from "../pages/Accessibility/AccessibilityDialogMobile.js";


import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBarMobile() {
  const [value, setValue] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const [dialogOpen, setDialogOpen] = useState(false); // State to manage the dialog visibility


  const navigate = useNavigate();

  const handleNavigation = (newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/find');
        break;
      case 2:
        navigate('/matches');
        break;
      case 3  :
        navigate('/groups');
        break;
        case 4  :
          navigate(`/user-page/${user._id}`);
          break;
      default:
        break;
    }
  };


  const openAccessibilityDialog = () => {
    setDialogOpen(true);
  };

  const closeAccessibilityDialog = () => {
    setDialogOpen(false);
  };


  return (
    <Grid
      container
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        zIndex: 1000,
        boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)', // Adds subtle shadow above the navbar
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => handleNavigation(newValue)}
        sx={{
          width: '100%',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <BottomNavigationAction label="מסך הבית" icon={<HomeIcon />} />
        <BottomNavigationAction label="חיפוש התאמות" icon={<SearchIcon />} />
        <BottomNavigationAction label="הודעות" icon={<ChatIcon />} />
{user && user._id && (
          <BottomNavigationAction label="קבוצות" icon={<PersonIcon />}/>
        )}
  {user && user._id && (
          <BottomNavigationAction label="הדף שלי" icon={<PersonIcon />}/>
        )}
             {user.useradmin === 10 && (
                        <BottomNavigationAction label="לוח ניהול" icon={<AdminPanelSettingsIcon />}/>
                )}

<BottomNavigationAction
          label="נגישות"
          icon={<SettingsAccessibilityIcon />}
          onClick={openAccessibilityDialog}
        />
      </BottomNavigation>

      <AccessibilityDialogMobile
        open={dialogOpen}
        onClose={closeAccessibilityDialog}
      />


    </Grid>
  );
}

export default NavBarMobile;
