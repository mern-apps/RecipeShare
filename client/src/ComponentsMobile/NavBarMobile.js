import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { logout } from '../actions/userActions';

import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Dialog,
  Box,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import CookieOutlinedIcon from "@mui/icons-material/CookieOutlined";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import HeaderUserSign from "./HeaderUserSign.js";
import EditCookie from "../pages/User/EditCookie.js";
import AccessibilityDialogMobile from "../pages/Accessibility/AccessibilityDialogMobile.js";
  

function NavBarMobile() {
  const [visible, setVisible] = useState(true);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

const location = useLocation();
const navigate = useNavigate();
const dispatch = useDispatch();

const value =
  location.pathname.startsWith("/books")
    ? 1
    : location.pathname.startsWith("/groups")
    ? 2
    : 0;

  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      const atTop = current < 20;
      const atBottom =
        current + window.innerHeight >= document.documentElement.scrollHeight - 20;

      if (atTop || atBottom) {
        setVisible(true);
      } else if (current > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 const handleNavigation = (newValue) => {
  switch (newValue) {
    case 0:
      navigate("/myrecipes");
      break;
    case 1:
      navigate("/books");
      break;
    case 2:
      navigate("/groups");
      break;
    default:
      break;
  }
};

//logout
   const handleLogout = async () => {
  await dispatch(logout());
  setSettingsOpen(false);
  navigate("/");
};


  return (
    <>

<BottomNavigation
  value={value}
  onChange={(e, newValue) => {
    if (newValue >= 0 && newValue <= 2) {
      handleNavigation(newValue);
    }
  }}
        sx={{
          direction: "rtl",
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1300,

          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 260ms cubic-bezier(.4,0,.2,1)",

          backgroundColor: "#fff",
          borderTop: "1px solid #ECECEC",
          boxShadow: "0 -4px 18px rgba(0,0,0,0.08)",
          height: 70,

          display: "flex",
          alignItems: "center",

          "& .MuiBottomNavigationAction-root": {
            color: "#7A7A7A",
            flex: 1,
            maxWidth: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          },

          "& .MuiBottomNavigationAction-root.Mui-selected": {
            color: "#1976D2",
            transform: "scale(1.05)",
          },

          "& .MuiSvgIcon-root": {
            fontSize: 28,
          },

          "& .MuiBottomNavigationAction-label": {
            fontSize: "0.72rem",
            fontWeight: 600,
            marginTop: "2px",
          },
        }}
      >
        <BottomNavigationAction
          label="מתכונים"
          icon={<RestaurantMenuOutlinedIcon />}
        />

        <BottomNavigationAction
          label="ספרים"
          icon={<MenuBookOutlinedIcon />}
        />

        <BottomNavigationAction
          label="קבוצות"
          icon={<GroupsOutlinedIcon />}
        />

        {/* SETTINGS */}
     <BottomNavigationAction
  value={-1}
  label="הגדרות"
  icon={<SettingsOutlinedIcon />}
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setSettingsOpen(true);
  }}
/>
      </BottomNavigation>

      {/* SETTINGS DIALOG */}
<Dialog
  open={settingsOpen}
  onClose={() => setSettingsOpen(false)}
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: 4,
      direction: "rtl",
      background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%)",
      padding: 1,
    },
  }}
>
  <Box sx={{ p: 2 }}>
    
    <List sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>

      {/* 🔵 Accessibility */}
      <ListItemButton
        onClick={() => setAccessibilityOpen(true)}
        sx={{
          border: "1px solid rgba(25,118,210,0.15)",
          borderRadius: 3,
          padding: "10px 12px",
          backgroundColor: "#fff",
          justifyContent: "flex-end",
          gap: 1.5,
          transition: "0.2s",
          "&:hover": {
            backgroundColor: "rgba(25,118,210,0.06)",
            transform: "translateY(-1px)",
          },
        }}
      >
        <AccessibilityNewOutlinedIcon sx={{ color: "#1976D2" }} />
        <ListItemText
          primary="נגישות"
          sx={{
            textAlign: "right",
            "& .MuiTypography-root": {
              fontWeight: 600,
            },
          }}
        />
      </ListItemButton>

      {/* 🍪 Cookies */}
      <ListItemButton
        onClick={() => setCookieOpen(true)}
        sx={{
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 3,
          padding: "10px 12px",
          justifyContent: "flex-end",
          gap: 1.5,
          backgroundColor: "#fff",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.04)",
          },
        }}
      >
        <CookieOutlinedIcon sx={{ color: "#F4A261" }} />
        <ListItemText
          primary="עוגיות"
          sx={{
            textAlign: "right",
            "& .MuiTypography-root": {
              fontWeight: 600,
            },
          }}
        />
      </ListItemButton>

      {/* 🔐 Privacy */}
      <ListItemButton
        sx={{
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 3,
          padding: "10px 12px",
          justifyContent: "flex-end",
          gap: 1.5,
          backgroundColor: "#fff",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.04)",
          },
        }}
      >
        <PrivacyTipOutlinedIcon sx={{ color: "#6D5BD0" }} />
        <ListItemText
          primary="מדיניות פרטיות"
          sx={{
            textAlign: "right",
            "& .MuiTypography-root": {
              fontWeight: 600,
            },
          }}
        />
      </ListItemButton>

      {/* 🔥 LOGIN BLOCK */}
<Box
  sx={{
    mt: 2,
    p: 2,
    borderRadius: 3,
    border: "1px dashed rgba(0,0,0,0.2)",
    backgroundColor: "#fafafa",
  }}
>
  {user?._id ? (
    <Button
      onClick={handleLogout}
      variant="outlined"
      color="error"
      sx={{
        width: "100%",
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: 3,
        border: "2px solid #D32F2F",
        py: 1,
        fontSize: "1.05rem",
        color: "#D32F2F",
        backgroundColor: "#fff",
        transition: "all .25s ease",
        "&:hover": {
          background: "linear-gradient(135deg,#ef5350,#d32f2f)",
          color: "#fff",
          transform: "translateY(-1px)",
          boxShadow: "0 8px 20px rgba(211,47,47,.25)",
        },
      }}
    >
      התנתקות
    </Button>
  ) : (
<HeaderUserSign
  setSettingsOpen={setSettingsOpen}
/>  )}
</Box>
    </List>
  </Box>
</Dialog>

      {/* ACCESSIBILITY */}
      <AccessibilityDialogMobile
        open={accessibilityOpen}
        onClose={() => setAccessibilityOpen(false)}
      />

      {/* COOKIE */}
      <Dialog
        open={cookieOpen}
        onClose={() => setCookieOpen(false)}
        fullWidth
      >
        <EditCookie currentUser={user} onClose={() => setCookieOpen(false)} />
      </Dialog>
    </>
  );
}

export default NavBarMobile;