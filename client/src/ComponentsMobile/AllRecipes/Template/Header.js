import React, { useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import RecipeList from './RecipeList'; 

const Header = ({ 
    items, 
    currentpage, 
    countallrecipes, 
    handleForwardClick, 
    handleBackClick, 
    activeCategories,
    activeTags,
  }) => {


     if (!items || items.length === 0) {
        return null; // Return null to render nothing if the condition fails
      }

   return (
  <Grid
    container
    direction="column"
    sx={{
      alignItems: "flex-end",
      justifyContent: "flex-end",
      p: 1,
    }}
  >
    {/* PAGINATION */}
    <Grid item container justifyContent="center" sx={{ mb: 1 }}>
      {countallrecipes > 12 && (
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            mt: 3,
            backgroundColor: "#F5F5F5",
            width: "100%",
            maxWidth: 380,
            mx: "auto",
            borderRadius: 2,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            px: 1,
            py: 1,
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {/* NEXT */}
          <Grid item>
            <Button
              variant="contained"
              onClick={handleForwardClick}
              disabled={(currentpage * 12) >= countallrecipes}
              sx={{
                backgroundColor:
                  (currentpage * 12) < countallrecipes ? "white" : "white",
                color:
                  (currentpage * 12) < countallrecipes
                    ? "#004080"
                    : "#b0b0b0",
                border: "1px solid #d3d3d3",
                minWidth: 70,
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>הבא</Typography>
            </Button>
          </Grid>

          {/* TEXT */}
          <Grid item>
            <Typography
              variant="body2"
              sx={{
                color: "#004080",
                mx: 2,
                fontWeight: "bold",
                whiteSpace: "nowrap",
              }}
            >
              מציג מתכונים {((currentpage - 1) * 12) + 1}-
              {(((currentpage - 1) * 12) + 1 + items.length - 1)} מתוך{" "}
              {countallrecipes}
            </Typography>
          </Grid>

          {/* PREVIOUS */}
          <Grid item>
            <Button
              variant="contained"
              onClick={currentpage > 1 ? handleBackClick : undefined}
              disabled={currentpage <= 1}
              sx={{
                backgroundColor: currentpage > 1 ? "white" : "white",
                color: currentpage > 1 ? "#004080" : "#b0b0b0",
                border: "1px solid #d3d3d3",
                minWidth: 70,
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>הקודם</Typography>
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>

    {/* LIST */}
    <Grid item container justifyContent="center">
      <Grid item>
        <RecipeList
          items={items}
          activeCategories={activeCategories}
          activeTags={activeTags}
        />
      </Grid>
    </Grid>
  </Grid>
);
};

export default Header;
