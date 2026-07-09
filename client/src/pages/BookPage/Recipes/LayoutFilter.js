// FilterSearch.js
import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Grid,Button, ToggleButton,Typography, ToggleButtonGroup } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";

import { setpagemode } from '../../../actions/bookPageActions.js';

const LayoutFilter = ({ activeCategories, filtercategories, handleButtonClickcategorytest, activeTags, filtertags, handleButtonClicktagtest }) => {
        const dispatch = useDispatch();
        const { user } = useSelector((state) => state.auth);
       const currentProject = useSelector(state => state.currentproject.currentproject);

      const countAllrecipesBook = React.useMemo(() => {
return currentProject?.recipes?.filter(
  (recipe) => (recipe?.type || []).some(t => t >= 1 && t < 2)
).length || 0;
}, [currentProject]);

      const editGroupBtn = {
  px: 2.5,
  py: 1,
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "1.1rem",
  color: "#fff",
  background: "linear-gradient(135deg,#1e3a8a,#3b82f6)", // vibrant blue gradient
  boxShadow: "0 6px 18px rgba(30,58,138,0.35)",
  transition: "all .22s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 28px rgba(30,58,138,0.45)",
  },
};

 const handleEditClick = () => {
    dispatch(setpagemode("edit1"));
  };

    return (

          <Grid container direction="column" style={{textAlign: 'right', padding: '10px' }}>
                               <Grid item container direction="row" alignItems="center" justifyContent="flex-end" >
  <Grid item sx={{ marginRight:5 }}>
     <Button
        startIcon={<EditIcon />}
        onClick={handleEditClick}
        sx={editGroupBtn}
      >
        עריכת מתכונים בספר
      </Button>
        </Grid>

     <Grid item sx={{ textAlign: "right", mr: 3 }}>

  </Grid>

     <Grid item sx={{ textAlign: "right", mr: 3 }}>
    <Typography
      variant="h3"
      fontWeight={800}
      sx={{
        color: "#1e60d6",
        fontFamily: "Kroshe Hebrew, sans-serif",
        lineHeight: 1.2,
      }}
    >
 מתכונים בספר
    </Typography>
  </Grid>


                        </Grid>

<Grid item><Typography variant="h4" sx={{ mt: 2.5, mr: 3, mb: 1, color: '#1E3A8A', fontWeight: 'bold' }}>פילטרים וחיפוש</Typography></Grid>


      {/* קטגוריות */}
<Grid item><Typography variant="h5" sx={{ mt: 1, mr: 3, mb: 0.5, color: '#1E3A8A', fontWeight: 'bold' }}>קטגוריות</Typography></Grid>

      <Grid item style={{ marginRight: '10px', marginBottom: '15px' }}>
        <ToggleButtonGroup
          value={activeCategories.map(category => category.description)}
          onChange={() => {}}
          aria-label="filter categories"
        >
          {filtercategories.map((category, index) => (
            <ToggleButton
              key={index}
              value={category.description}
              onClick={() => handleButtonClickcategorytest(category.description)}
              style={{
                backgroundColor: category.active ? '#1976D2' : '#E0E0E0',
                color: category.active ? 'white' : 'black',
                borderRadius: '15px',
                padding: '4px 12px',
                marginRight: '8px',
                fontSize: '14px',
              }}
            >
              {category.description}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>

      {/* תגיות */}
<Grid item><Typography variant="h5" sx={{ mt: 1, mr: 3, mb: 0.5, color: '#1E3A8A', fontWeight: 'bold' }}>תגיות</Typography></Grid>


      <Grid item style={{ marginRight: '10px' }}>
        <ToggleButtonGroup
          value={activeTags.map(tag => tag.description)}
          onChange={() => {}}
          aria-label="filter tags"
        >
          {filtertags.map((tag, index) => (
            <ToggleButton
              key={index}
              value={tag.description}
              onClick={() => handleButtonClicktagtest(tag.description)}
              style={{
                backgroundColor: tag.active ? '#1976D2' : '#E0E0E0',
                color: tag.active ? 'white' : 'black',
                borderRadius: '15px',
                padding: '4px 12px',
                marginRight: '8px',
                fontSize: '14px',
              }}
            >
              {tag.description}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default LayoutFilter;
