import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupSmallDesign from './GroupSmallDesign.js';
import { reduxEditBookRecipeSectionGroupID } from "../../../../actions/bookEditPageActions.js";


const GroupsList1 = ({ items = [],setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

     const editBookrecipesSection = useSelector((state) => state.currentproject.editBookrecipesSection || {});
     const { bookId ,groupId} = editBookrecipesSection;

   const handleGroupPageClick = (task) => {
  if (task._id === groupId) {
    setOpen(false);
  } else {
    dispatch(reduxEditBookRecipeSectionGroupID(task._id));
  }
};


  if (!items.length) return null;

  return (
<Grid
  container
  direction="row"
  flexWrap="wrap"
  spacing={10}        // moderate spacing between items
  justifyContent="flex-end"
  sx={{ px: 15, mt: 4 }}
>
  {items.map((task) => (
    <Grid
      item
      key={task._id}
      sx={{ flex: '0 1 calc(25% - 16px)' }} // 4 items per row, adjust as needed
    >
      <Box
        onClick={() => handleGroupPageClick(task)}
        sx={{
          width: '100%',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': { transform: 'translateY(-3px)' },
        }}
      >
        <GroupSmallDesign task={task} />
      </Box>
    </Grid>
  ))}
</Grid>
  );
};

export default GroupsList1;
