import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const BlockPageGroups = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: 'rtl',

      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          textAlign: 'center',
          backgroundColor: '#ffffff',
          p: 6,
          borderRadius: 5,
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        }}
      >
        <ConstructionIcon sx={{ fontSize: 80, color: '#f57c00', mb: 3 }} />

        <Typography variant="h4" fontWeight="700" gutterBottom>
עמוד זה יעלה בקרוב, תנסו עוד כמה ימים , כרגע עדיין ממתינים לכמות מספקת של משתמשים        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
בנתיים תכינ/י את הפרופיל שלך        </Typography>


      </Box>
    </Container>
  );
};

export default BlockPageGroups;
