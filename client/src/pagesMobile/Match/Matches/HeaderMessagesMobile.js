import React, { useState, useEffect } from 'react'; 
import { Paper, Grid, Button, Typography, Switch, FormControlLabel, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MessageAreaMobile from './MessageAreaMobile'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the reverse icon

const HeaderMessagesMobile = ({ 
    servermessages,
    selectedMatch,
    items, 
    currentpage, 
    countallgroups, 
    handleForwardClick, 
    handleBackClick, 
    setShowMatches,
}) => {
    const [inputheader, setInputheader] = useState(false);
    const [header, setHeader] = useState(false);
    
    useEffect(() => {}, []);

  

    // Handle the reverse button click to setShowMatches to true
    const handleReverseClick = () => {
        setShowMatches(true);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#F5F5F5', // Light Grey background
                color: '#333333', // Dark Grey text for readability
                borderRadius: 2,
              }}
        >
            {inputheader && (
                <Grid container justifyContent="flex-end" sx={{ marginBottom: 2 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={header}
                                onChange={() => setHeader((prev) => !prev)}
                                color="primary"
                                sx={{
                                    '& .MuiSwitch-track': {
                                        backgroundColor: '#0D47A1',
                                    },
                                    '& .Mui-checked': {
                                        color: '#0D47A1',
                                    },
                                    '& .Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: '#0D47A1',
                                    },
                                }}
                            />
                        }
                        label={
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#0D47A1',
                                    fontWeight: 'bold',
                                    fontSize: { xs: '0.9rem', sm: '1rem' },
                                }}
                            >
                                הצג הודעות
                            </Typography>
                        }
                    />
                </Grid>
            )}

            <Grid container direction="column" justifyContent="flex-end" alignItems="flex-end">
                <Grid item container justifyContent="flex-end" alignItems="center" sx={{ marginBottom: '10px' }}>
                    {header && items && items.length > 0 && (
                        <Grid container alignItems="center" justifyContent="flex-start" sx={{ marginRight: '12px' }}>
                            {/* Reverse Button to setShowMatches to true */}
                            <Grid item>
                                <IconButton
                                    color="primary"
                                    onClick={handleReverseClick}
                                    sx={{
                                        fontSize: '30px',
                                        color: '#004080',
                                    }}
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                            </Grid>

                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: (currentpage * 12) < countallgroups ? 'white' : 'white',
                                        color: (currentpage * 12) < countallgroups ? '#004080' : '#b0b0b0',
                                        border: '1px solid #d3d3d3',
                                        fontSize: { xs: '0.8rem', sm: '1rem' },
                                        padding: { xs: '6px 12px', sm: '8px 16px' },
                                    }}
                                    onClick={handleForwardClick}
                                    disabled={(currentpage * 12) >= countallgroups}
                                >
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        הבא
                                    </Typography>
                                </Button>
                            </Grid>

                            <Grid item>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#004080',
                                        marginLeft: '20px',
                                        marginRight: '20px',
                                        fontWeight: 'bold',
                                        fontSize: { xs: '0.8rem', sm: '1rem' },
                                    }}
                                >
                                    מציג הודעות {((currentpage - 1) * 12) + 1}-
                                    {(((currentpage - 1) * 12) + 1 + items.length - 1)} מתוך {countallgroups}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        backgroundColor: currentpage > 1 ? 'white' : 'white',
                                        color: currentpage > 1 ? '#004080' : '#b0b0b0',
                                        border: '1px solid #d3d3d3',
                                        fontSize: { xs: '0.8rem', sm: '1rem' },
                                        padding: { xs: '6px 12px', sm: '8px 16px' },
                                    }}
                                    onClick={currentpage > 1 ? handleBackClick : undefined}
                                    disabled={currentpage <= 1}
                                >
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        הקודם
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Grid>

                        <Grid
  container
  sx={{
    flex: 1,
    backgroundColor: 'yellow',
    borderRadius: 2,
    overflow: 'hidden',
    width: '98%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Centers content vertically
  }}
>
  <Grid item xs={12}>
                    <MessageAreaMobile selectedMatch={selectedMatch} items={items} />
  </Grid>
</Grid>
            </Grid>
        </Paper>
    );
};

export default HeaderMessagesMobile;
