// RecipeSub1.js
import React from 'react';
import { Box, Typography, CardMedia } from '@mui/material';

const RecipeSub1 = ({ task }) => {
  if (!task) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        overflow: 'hidden', // important to hide overflow text
      }}
    >
      {/* IMAGE */}
   <CardMedia
        component="img"
        image={task.image}
        alt={task.title}
        sx={{
    width: "100%",               // full width
    height: "30%",               // height = 28% of width → matches 2500x700 ratio
    objectFit: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    mb: 1,
  }}
      />

      {/* Title */}
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{
          textAlign: 'right',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          direction: 'rtl',
          width: '100%',
          fontSize: '1.2rem',
        }}
      >
        {task.title}
      </Typography>

      {/* Author */}
      {task.author && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textAlign: 'right',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            direction: 'rtl',
            width: '100%',
            fontSize: '1.05rem',
          }}
        >
          {task.author}
        </Typography>
      )}
    </Box>
  );
};

export default RecipeSub1;
