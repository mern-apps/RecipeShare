// Layout1Header.js
import React from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Layout1Header = ({ items, currentpage, countallrecipes, handleForwardClick, handleBackClick }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end',maxHeight: '70px',marginBottom: '10px',
 }}>
            <Grid style={{ marginTop: '28px' }}>
                <Button
                variant="contained"
                color="primary" 
                style={{ backgroundColor: 'white', color: '#004080'}} 
                component={Link}  
                to="/newrecipe"
                >
                <Typography style={{ fontWeight: 'bold' }}>
                    הוסף מתכון
                </Typography>                      
                </Button>
            </Grid>

      {items.length > 0 && (
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
                        marginRight: '100px',
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

                <Grid style={{ marginBottom: '0px', marginTop: '0', maxWidth: '320px' }}>
           <h1 style={{ color: '#1e60d6', fontSize: '40px', fontFamily: 'Kroshe Hebrew, sans-serif', fontWeight: 'bold',marginRight: '20px',marginTop: '20px'}}> כל המתכונים שלך</h1>
                </Grid>
    </div>
  );
};

export default Layout1Header;
