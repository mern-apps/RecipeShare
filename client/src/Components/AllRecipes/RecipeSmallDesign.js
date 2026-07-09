import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material';



const RecipeSmallDesign = ({ task }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const [openSnackbar, setOpenSnackbar] = useState(false);

return (
  <Card
    sx={{
      width: 270,
      height: 280,
      borderRadius: 3,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 3,
      transition: '0.3s',
      direction: 'rtl',
      cursor: 'pointer',
      '&:hover': {
        boxShadow: 5,
        transform: 'translateY(-2px) scale(1.02)',
      },
    }}
  >
    {/* IMAGE */}
    <CardMedia
      component="img"
      height="180"
      image={task.image}
      alt={task.title}
      sx={{
        objectFit: 'cover',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
    />

    {/* CONTENT */}
    <CardContent
      sx={{
        flexGrow: 1,
        display: 'grid',
        gridTemplateColumns: '1fr auto',  // text wide, icons auto
        alignItems: 'center',
      }}
    >
      {/* TITLE + AUTHOR (Hebrew aligned right) */}
     <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    overflow: 'hidden',     // <— important
  }}
>
  <Typography
    variant="subtitle1"
    fontWeight="bold"
    sx={{
      textAlign: 'right',
      whiteSpace: 'nowrap',   // single line
      overflow: 'hidden',     // hide extra
      textOverflow: 'ellipsis', // add …
      direction: 'rtl',
      width: '100%',
      fontSize: '1.2rem', 
    }}
  >
    {task.title}
  </Typography>

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
      {/* ICONS (left side visually) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        
      </Box>
    </CardContent>

  </Card>
);
};

export default RecipeSmallDesign;