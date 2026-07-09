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
        <Grid container direction="column" justifyContent="flex-end" alignItems="flex-end">
        <Grid item container justifyContent="flex-end" alignItems="center" style={{marginBottom: '10px'}}>
 {countallrecipes > 12 && (
                                            <Grid 
                                            container 
                                            direction="row" 
                                            alignItems="center" 
                                            justifyContent="center" 
                                            style={{ 
                                                marginTop: '24px', 
                                                backgroundColor: '#F5F5F5',
                                                maxWidth: '388px',
                                                marginLeft: '24px',
                                                marginRight: '20px',
                                                borderRadius: '8px',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                                            }}
                                            >
                                                        <Grid item>
                                                            <Button 
                                                            variant="contained" 
                                                            color="primary" 
                                                            style={{
                                                                backgroundColor: (currentpage * 12) < countallrecipes ? 'white' : 'white', 
                                                                color: (currentpage * 12) < countallrecipes ? '#004080' : '#b0b0b0',
                                                                border: '1px solid #d3d3d3'
                                                            }}     
                                                            onClick={handleForwardClick}
                                                            disabled={(currentpage * 12) >= countallrecipes}
                                                            >
                                                            <Typography style={{ fontWeight: 'bold' }}>
                                                                הבא
                                                            </Typography>
                                                            </Button>
                                                        </Grid>

                                                        <Grid item>
                                                            <Typography 
                                                            variant="body1" 
                                                            style={{ 
                                                                color: '#004080', 
                                                                marginLeft: '20px', 
                                                                marginRight: '20px',
                                                                fontWeight: 'bold'
                                                            }}
                                                            >
                                                            מציג מתכונים {((currentpage - 1) * 12) + 1}-
                                                            {(((currentpage - 1) * 12) + 1 + items.length - 1)} מתוך {countallrecipes}
                                                            </Typography>
                                                        </Grid>

                                                            <Grid item>
                                                                <Button 
                                                                variant="contained" 
                                                                color="primary" 
                                                                style={{
                                                                    backgroundColor: currentpage > 1 ? 'white' : 'white', 
                                                                    color: currentpage > 1 ? '#004080' : '#b0b0b0',
                                                                    border: '1px solid #d3d3d3'
                                                                }} 
                                                                onClick={currentpage > 1 ? handleBackClick : undefined}
                                                                disabled={currentpage <= 1}
                                                                >
                                                                <Typography style={{ fontWeight: 'bold' }}>
                                                                    הקודם
                                                                </Typography>
                                                                </Button>
                                                </Grid>
                                            </Grid>
                            )}
                        </Grid>

                        <Grid item container justifyContent="flex-end" style={{ marginBottom: '10px' }}>
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
