import React, { useEffect } from 'react';
import { Grid,Box, Button, Typography } from '@mui/material';
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
  chosenRecipe,
  setChosenRecipe
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
      textAlign: "right",
    }}
  >
    {/* ================= PAGINATION ================= */}
    {countallrecipes > 12 && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          mt: 3,
          px: 1,
          py: 1.5,
          backgroundColor: "#F5F5F5",
          borderRadius: 2,
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* NEXT BUTTON */}
        <Button
          variant="contained"
          onClick={handleForwardClick}
          disabled={(currentpage * 12) >= countallrecipes}
          sx={{
            backgroundColor:
              (currentpage * 12) < countallrecipes ? "white" : "white",
            color:
              (currentpage * 12) < countallrecipes ? "#004080" : "#b0b0b0",
            border: "1px solid #d3d3d3",
            minWidth: 70,
          }}
        >
          הבא
        </Button>

        {/* TEXT */}
        <Box sx={{ mx: 2, textAlign: "center", flex: 1 }}>
          <Typography
            sx={{
              color: "#004080",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            מציג מתכונים {((currentpage - 1) * 12) + 1}-
            {(((currentpage - 1) * 12) + items.length)} מתוך {countallrecipes}
          </Typography>
        </Box>

        {/* BACK BUTTON */}
        <Button
          variant="contained"
          onClick={handleBackClick}
          disabled={currentpage <= 1}
          sx={{
            backgroundColor: "white",
            color: currentpage > 1 ? "#004080" : "#b0b0b0",
            border: "1px solid #d3d3d3",
            minWidth: 70,
          }}
        >
          הקודם
        </Button>
      </Box>
    )}

    {/* ================= LIST ================= */}
    <Box
      sx={{
        width: "100%",
        mt: 2,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
       <RecipeList
          items={items}
          activeCategories={activeCategories}
          activeTags={activeTags}
          chosenRecipe={chosenRecipe}
          setChosenRecipe={setChosenRecipe}
        />
    </Box>
  </Box>
);

};

export default Header;

