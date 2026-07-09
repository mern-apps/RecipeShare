import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Dialog from '@mui/material/Dialog';

import RecipeSub1 from './RecipeSub1';
import RecipeSub2 from './RecipeSub2';

import { setrecipe2 } from '../../../../actions/bookEditPageActions.js';
import { removerecipefrombook } from '../../../../actions/bookEditPageActions.js';

import { currentrecipe } from '../../../../actions/recipeNewForm.js';
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

const RecipeSmallDesign = ({ task }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const bookRecipeSmallDesign = useSelector(state => state.currentproject.currentproject);

  const [dialogOpen, setDialogOpen] = useState(false);


const handleEdit = () => {
  const types = task?.type || [];
  const isType1 = types.some(t => t >= 1 && t < 2);
  const isType2 = types.some(t => t >= 2 && t < 3);
  if (isType1) {
    dispatch(currentrecipe(task));
    navigate(`/recipe/${task._id}`);
  } else if (isType2) {
    dispatch(setrecipe2(task));
    navigate('/newpage2');
  }
};

  const handleDelete = () => {
    if (!bookRecipeSmallDesign?._id) return;
    const data = { taskID: task._id, bookID: bookRecipeSmallDesign._id };
    dispatch(removerecipefrombook(data));
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
      

<Card
  sx={{
    width: 210 * 1.2,
    height: (task?.type || []).some(t => Math.floor(t) === 1)
      ? 297 * 0.7
      : 297 * 0.9,

          borderRadius: 3,
          boxShadow: 3,
          transition: '0.3s',
          direction: 'rtl',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            boxShadow: 5,
            transform: 'translateY(-2px) scale(1.02)',
          },
        }}
      >
        {/* CONTENT */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
 {(task?.type || []).some(t => t >= 2 && t < 3) ? (
    <RecipeSub2 task={task} />
  ) : (
    <RecipeSub1 task={task} />
  )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecipeSmallDesign;