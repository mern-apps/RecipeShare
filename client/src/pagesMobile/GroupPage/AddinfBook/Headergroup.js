import React, { useEffect } from 'react';
import { Grid, Box,Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import GroupsList1 from './GroupsList1'; 

const Headergroup = ({ 
    items, 
    currentpage, 
    countallgroups, 
    handleForwardClick, 
    handleBackClick, 
      chosenBook,
  setChosenBook
  }) => {


   

    if (!items || items.length === 0) {
        return null; // Return null to render nothing if the condition fails
      }

   return (
<Box
  sx={{
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    gap: "12px",
  }}
>
    {countallgroups > 12 && (
      <Box
        sx={{
          mt: 3,
          width: "100%",
          maxWidth: "388px",
          borderRadius: "8px",
          backgroundColor: "#F5F5F5",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            backgroundColor: "white",
            color:
              currentpage * 12 < countallgroups
                ? "#004080"
                : "#b0b0b0",
            border: "1px solid #d3d3d3",
          }}
          onClick={handleForwardClick}
          disabled={currentpage * 12 >= countallgroups}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            הבא
          </Typography>
        </Button>

        <Typography
          variant="body1"
          sx={{
            color: "#004080",
            fontWeight: "bold",
            textAlign: "center",
            px: 1,
            lineHeight: 1.5,
          }}
        >
          מציג ספרים {((currentpage - 1) * 12) + 1}-
          {((currentpage - 1) * 12) + items.length}
          {" "}מתוך {countallgroups}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "100%",
            backgroundColor: "white",
            color:
              currentpage > 1
                ? "#004080"
                : "#b0b0b0",
            border: "1px solid #d3d3d3",
          }}
          onClick={currentpage > 1 ? handleBackClick : undefined}
          disabled={currentpage <= 1}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            הקודם
          </Typography>
        </Button>
      </Box>
    )}

    <Box
      sx={{
        width: "100%",
      }}
    >
      <GroupsList1
        items={items}
        chosenBook={chosenBook}
        setChosenBook={setChosenBook}
      />
    </Box>
  </Box>
);
};

export default Headergroup;