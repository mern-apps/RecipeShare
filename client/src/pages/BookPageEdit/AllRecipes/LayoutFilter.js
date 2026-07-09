// FilterSearch.js
import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Grid,Button, ToggleButton,Typography, ToggleButtonGroup } from '@mui/material';

import { currentrecipe } from '../../../actions/recipeNewForm.js';
import { setpagemode } from '../../../actions/recipeNewForm.js';


const LayoutFilter = ({ activeCategories, filtercategories, handleFiltercategories, activeTags, filtertags, handleFiltertags }) => {
        const dispatch = useDispatch();
        const { user } = useSelector((state) => state.auth);
        const countAllrecipesGroup = useSelector(state => state.grouppage.countallrecipesgroup);
       
        // ♿ Accessibility
      const localaccessibilitySettings = useSelector((state) => state.auth.accessibility);
      const [accessibilityData, setAccessibilityData] = useState(localaccessibilitySettings);
    
      useEffect(() => {
        if (user && user.accessibility) {
          setAccessibilityData(user.accessibility);
        } else {
          setAccessibilityData(localaccessibilitySettings);
        }
      }, [user, localaccessibilitySettings]);
    
      const adjustedFontSize = (size) => `${(size * (accessibilityData?.fontSizeAdjustments || 100)) / 100}rem`;
      const adjustedLineHeight = (defaultValue) => defaultValue * (accessibilityData?.lineSpacing || 1);
      const adjustedWordSpacing = (defaultValue) => defaultValue * (accessibilityData?.wordSpacing || 1);
      const adjustedLetterSpacing = (defaultValue) => defaultValue * (accessibilityData?.letterSpacing || 1);

    return (

          <Grid container direction="column" style={{textAlign: 'right', padding: '5px' }}>


<Grid item><Typography variant="h4" sx={{ mt: 1, mr: 3, mb: 1, color: '#1E3A8A', fontWeight: 'bold' }}>פילטרים וחיפוש</Typography></Grid>


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
              onClick={() => handleFiltercategories(category.description)}
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
    sx={{
      display: "flex",
      flexWrap: "wrap",  // allows multiple lines
      gap: 1              // spacing between buttons
    }}
  >
    {filtertags.map((tag, index) => (
      <ToggleButton
        key={index}
        value={tag.description}
        onClick={() => handleFiltertags(tag.description)}
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
