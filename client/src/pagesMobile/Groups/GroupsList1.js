import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupSmallDesign from '../../ComponentsMobile/SmallCards/GroupSmallDesign.js';
import { fetchGroupById } from '../../actions/groupactions';
import { setpagemode } from '../../actions/grouppageactions.js';
import { motion } from "framer-motion";

const GroupsList1 = ({ items = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGroupPageClick = (task) => {
    dispatch(setpagemode("view"));
    dispatch(fetchGroupById(task._id));
    navigate(`/group/${task._id}`);
  };

  if (!items.length) return null;

   return (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      mt:2,
    }}
  >
    {items.map((task) => (
      <Box
        key={task._id}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center", // 👈 קריטי
        }}
      >
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
          <GroupSmallDesign item={task} />
        </motion.div>
      </Box>
    ))}
  </Box>
);
};

export default GroupsList1;