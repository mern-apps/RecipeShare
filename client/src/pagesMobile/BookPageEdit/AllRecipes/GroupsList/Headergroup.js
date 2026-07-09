import React, { useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import GroupsList1 from "./GroupsList1";

const Headergroup = ({ 
    items, 
    currentpage, 
    countallgroups, 
    handleForwardClick, 
    handleBackClick, 
        setOpen,
  }) => {


    useEffect(() => {
    }, []);

    if (!items || items.length === 0) {
        return null; // Return null to render nothing if the condition fails
      }

    return (
<Grid container direction="column" alignItems="center">
 

 {countallgroups > 12 && (
                                            <Grid
                                        item
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
                                                                backgroundColor: (currentpage * 12) < countallgroups ? 'white' : 'white', 
                                                                color: (currentpage * 12) < countallgroups ? '#004080' : '#b0b0b0',
                                                                border: '1px solid #d3d3d3'
                                                            }}     
                                                            onClick={handleForwardClick}
                                                            disabled={(currentpage * 12) >= countallgroups}
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
                                                            מציג קבוצות {((currentpage - 1) * 12) + 1}-
                                                            {(((currentpage - 1) * 12) + 1 + items.length - 1)} מתוך {countallgroups}
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

                          <Grid item container>
                                 <GroupsList1 items={items} setOpen={setOpen} />
                         </Grid>
            
  </Grid>
);
};

export default Headergroup;
