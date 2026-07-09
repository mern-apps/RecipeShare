import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupSmallDesign from './GroupSmallDesign.js';

import { fetchBookById } from '../../../actions/bookPageActions.js';
import { setpagemode } from '../../../actions/bookPageActions.js';
const GroupsList1 = ({ items = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGroupPageClick = (task) => {
    dispatch(setpagemode("view"));
    dispatch(fetchBookById(task._id));
    navigate(`/book/${task._id}`);
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
    width: 220,
    height: 320,
    mx: "auto",
    background: "#fff",
    border: "1px solid #d4d4d4",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    mt: 2,

    cursor: "pointer",

    transition: "all .25s ease",

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 10px 24px rgba(0,0,0,0.14)",
    },
  }}
>
      <GroupSmallDesign item={task?.recipes?.[0]} />
  </Box>
    </Grid>
  ))}
</Grid>
  );
};

export default GroupsList1;
