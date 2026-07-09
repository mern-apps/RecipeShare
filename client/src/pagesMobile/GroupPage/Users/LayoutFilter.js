// FilterSearch.js
import React from 'react';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';

const LayoutFilter = ({ activeCategories, filtercategories, handleButtonClickcategorytest, activeTags, filtertags, handleButtonClicktagtest }) => {
  return (
    <Grid container direction="column" style={{textAlign: 'right', padding: '10px' }}>
      {/* פילטרים וחיפוש */}
      <Grid item>
        <h1 style={{ margin: '0px 30px 25px 0px', color: '#1e60d6' }}>פילטרים וחיפוש</h1>
      </Grid>

      {/* קטגוריות */}
      <Grid item>
        <h3 style={{ margin: '0px 10px 5px 0px', color: '#1e60d6' }}>קטגוריות</h3>
      </Grid>
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
      <Grid item>
        <h3 style={{ margin: '0px 10px 5px 0px', color: '#1e60d6' }}>תגיות</h3>
      </Grid>
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
