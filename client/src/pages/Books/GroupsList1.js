import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupSmallDesign from '../../Components/SmallCards/GroupSmallDesign.js';
import RecipeSub10 from '../BookPageEdit/ProjectList/RecipeSmallDesign/RecipeSub10.js';

import { fetchBookById } from '../../actions/bookPageActions';
import { setpagemode } from '../../actions/bookPageActions.js';
import { motion } from "framer-motion"; 


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
      sx={{
        mt: 2,
        width: "100%",
        display: { xs: "none", sm: "flex" }, // ❌ no mobile
      }}
    >
      {/* Left */}
      <Grid item sm={2} md={3} />

      {/* Center (YOUR CODE) */}
      <Grid item sm={8} md={6}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {items.map((task) => (
            <Box key={task._id}>
              <motion.div
                onClick={() => handleGroupPageClick(task)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  cursor: "pointer",
                  width: "92%",
                  maxWidth: 420,
                }}
              >
                <GroupSmallDesign item={task?.recipes?.[0]} />
              </motion.div>
            </Box>
          ))}
        </Box>
      </Grid>

      {/* Right */}
      <Grid item sm={2} md={3} />
    </Grid>
  );
};

export default GroupsList1;