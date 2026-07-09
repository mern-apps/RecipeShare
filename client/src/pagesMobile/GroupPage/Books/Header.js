import React, { useEffect } from 'react';
import { Grid, Button,Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import GroupsList1 from './GroupsList1'; 

const Header = ({
  items,
  currentpage,
  countallrecipes,
  handleForwardClick,
  handleBackClick,
}) => {


     if (!items || items.length === 0) {
        return null; // Return null to render nothing if the condition fails
      }

   return (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      direction: "rtl",
    }}
  >
    {/* ================= PAGINATION ================= */}
    {countallrecipes > 12 && (
      <Box
        sx={{
          mt: 3,
          mb: 2,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            px: 2,
            py: 1,
            borderRadius: 2,
            backgroundColor: "#F5F5F5",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            flexWrap: "wrap",
            maxWidth: "100%",
          }}
        >
          {/* NEXT */}
          <Button
            variant="contained"
            onClick={handleForwardClick}
            disabled={(currentpage * 12) >= countallrecipes}
            sx={{
              backgroundColor: "white",
              color:
                (currentpage * 12) < countallrecipes ? "#004080" : "#b0b0b0",
              border: "1px solid #d3d3d3",
              fontWeight: "bold",
              minWidth: "unset",
              px: 2,
            }}
          >
            הבא
          </Button>

          {/* TEXT */}
          <Box
            sx={{
              color: "#004080",
              fontWeight: "bold",
              fontSize: "0.95rem",
              textAlign: "center",
            }}
          >
            מציג מתכונים {((currentpage - 1) * 12) + 1}-
            {(((currentpage - 1) * 12) + 1 + items.length - 1)} מתוך {countallrecipes}
          </Box>

          {/* BACK */}
          <Button
            variant="contained"
            onClick={currentpage > 1 ? handleBackClick : undefined}
            disabled={currentpage <= 1}
            sx={{
              backgroundColor: "white",
              color: currentpage > 1 ? "#004080" : "#b0b0b0",
              border: "1px solid #d3d3d3",
              fontWeight: "bold",
              minWidth: "unset",
              px: 2,
            }}
          >
            הקודם
          </Button>
        </Box>
      </Box>
    )}

    {/* ================= LIST ================= */}
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <GroupsList1 items={items} />
    </Box>
  </Box>
);
};

export default Header;
