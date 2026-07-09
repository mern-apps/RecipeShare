import React, { useEffect } from 'react';
import { Paper, Grid, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MatchListMobile from './MatchListMobile';

const HeaderMatchesMobile = ({ 
  items, 
  currentpage, 
  countallgroups, 
  handleForwardClick, 
  handleBackClick, 
  handleMatchSelect,
  selectedMatch,
}) => {

  useEffect(() => {}, []);

  if (!items || items.length === 0) {
    return null; // Return null to render nothing if the condition fails
  }

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
      <Box sx={{ padding: 2, textAlign: 'center', borderBottom: '1px solid #FFFFFF33' }}>
        <Typography variant="h6" fontWeight="bold">
          ההתאמות שלך
        </Typography>
      </Box>

      <Grid container direction="column" justifyContent="flex-end" alignItems="center">
        <Grid item container justifyContent="space-between" alignItems="center" sx={{ mb: 2, width: '100%', px: 2 }}>
          {items.length > 12 && (
            <Grid container justifyContent="space-between" alignItems="center" sx={{
              backgroundColor: '#F5F5F5',
              borderRadius: 2,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              width: '100%',
              maxWidth: '100%',
              py: 1
            }}>
              <Grid item xs={5}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{
                    backgroundColor: (currentpage * 12) < countallgroups ? 'white' : 'white', 
                    color: (currentpage * 12) < countallgroups ? '#004080' : '#b0b0b0',
                    border: '1px solid #d3d3d3',
                    width: '100%',
                  }}     
                  onClick={handleForwardClick}
                  disabled={(currentpage * 12) >= countallgroups}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>הבא</Typography>
                </Button>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#004080', 
                    fontWeight: 'bold'
                  }}
                >
                  מציג קבוצות {((currentpage - 1) * 12) + 1} - {(((currentpage - 1) * 12) + 1 + items.length - 1)} מתוך {countallgroups}
                </Typography>
              </Grid>

              <Grid item xs={5}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{
                    backgroundColor: currentpage > 1 ? 'white' : 'white', 
                    color: currentpage > 1 ? '#004080' : '#b0b0b0',
                    border: '1px solid #d3d3d3',
                    width: '100%',
                  }} 
                  onClick={currentpage > 1 ? handleBackClick : undefined}
                  disabled={currentpage <= 1}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>הקודם</Typography>
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid item sx={{ display: 'flex', justifyContent: 'center', width: '100%', padding: 1 }}>
          <MatchListMobile
            Matchedlist={items}
            selectedMatch={selectedMatch}
            onMatchSelect={handleMatchSelect}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HeaderMatchesMobile;
