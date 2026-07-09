import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { addrecipefromlist } from '../../../actions/bookEditPageActions.js';

import { currentrecipe } from '../../../actions/recipeNewForm.js';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Snackbar, Alert } from '@mui/material';


const RecipeSmallDesign = ({ task }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const bookRecipeSmallDesign = useSelector(state => state.currentproject.currentproject);
  const book10 = useSelector(state => state.currentproject.currentproject);
  const [alreadyAssigned, setAlreadyAssigned] = useState(false);
const [openSnackbar, setOpenSnackbar] = useState(false);



        const assignedTask = (task) => {
        let isProjectAssigned = false;
if (book10?.recipes?.length > 0) {
      isProjectAssigned = book10?.recipes?.some(recipe => recipe.book === task._id);
    }
       if (isProjectAssigned) {
      setAlreadyAssigned(true);
    setOpenSnackbar(true);

      return;
        } else {
          const data = { taskID: task._id, bookID: book10._id };
           dispatch(addrecipefromlist(data));
                                console.log('action - yes :');
                   setAlreadyAssigned(false);
          }
      };



return (
<Box
  sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
      }}
    >
      {/* ICONS ON LEFT */}
    
      {/* CARD */}
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

    </CardContent>
<Snackbar
  open={openSnackbar}
  autoHideDuration={1600}
  onClose={() => setOpenSnackbar(false)}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <Box
    sx={{
      background: 'linear-gradient(135deg, #6B7CFF 0%, #9A4DFF 100%)',
      color: 'white',
      px: 3,
      py: 1.2,
      borderRadius: '14px',
      fontWeight: 400,
      fontSize: '1.2rem',
      boxShadow: '0 6px 22px rgba(120, 90, 255, 0.45)',
      backdropFilter: 'blur(10px)',
      transform: 'translateZ(2px)',
      direction: 'rtl',
      letterSpacing: '0.3px'
    }}
  >
המתכון כבר נמצא בספר 
 </Box>
</Snackbar>
  </Card>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >


    <Button
          variant="outlined"
          sx={{
            color: '#4CAF50',
            borderColor: '#4CAF50',
            '&:hover': {
              borderColor: '#45a049',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
            },
            textTransform: 'none',
            borderRadius: '8px',
          }}
          startIcon={<AddIcon />}
          onClick={() => assignedTask(task)}
        >
          הוספה לספר
        </Button>
      
      </Box>

    </Box>
  );
};

export default RecipeSmallDesign;