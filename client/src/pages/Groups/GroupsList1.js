import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupSmallDesign from '../../Components/SmallCards/GroupSmallDesign.js';
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
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: 4,
    width: "100%",
  }}
>
  {items.map((task) => (
    <motion.div
      key={task._id}
      onClick={() => handleGroupPageClick(task)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      style={{
        cursor: "pointer",
        flex: "0 0 auto",
      }}
    >
      <GroupSmallDesign item={task} />
    </motion.div>
  ))}
</Box>
  );
};

export default GroupsList1;
