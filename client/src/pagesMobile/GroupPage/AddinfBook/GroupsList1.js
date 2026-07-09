import React, { useState,useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupSmallDesign from '../../../ComponentsMobile/SmallCards/GroupSmallDesign.js';

import RecipeSub10 from '../../../pages/BookPageEdit/ProjectList/RecipeSmallDesign/RecipeSub10.js';

import { fetchBookById } from '../../../actions/bookPageActions.js';
import { setpagemode } from '../../../actions/bookPageActions.js';
  const GroupsList1 = ({ items,chosenBook,setChosenBook}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGroupPageClick = (task) => {
  setChosenBook(task);

  };


  if (!items.length) return null;
return (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
    }}
  >
    {items.map((task) => (
      <Box
        key={task._id}
        onClick={() => handleGroupPageClick(task)}
        sx={{
          position: "relative",
          cursor: "pointer",
          mb: "6px",
          transform:
            chosenBook?._id === task._id
              ? "scale(1.03)"
              : "scale(1)",

          transition: "all 0.25s ease",

          borderRadius: "16px",

          border:
            chosenBook?._id === task._id
              ? "2px solid #6B4BCC"
              : "1px solid #e5e7eb",

          boxShadow:
            chosenBook?._id === task._id
              ? "0 12px 28px rgba(107,75,204,0.22)"
              : "0 4px 12px rgba(0,0,0,0.06)",

          overflow: "hidden",

          // 👇 indicator בלי Box נוסף
          "&::after": chosenBook?._id === task._id
            ? {
                content: '"✓"',
                position: "absolute",
                top: 10,
                right: 10,
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "#6B4BCC",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 700,
                boxShadow: "0 6px 16px rgba(107,75,204,0.35)",
              }
            : {},
        }}
      >
        <GroupSmallDesign item={task?.recipes?.[0]} />
      </Box>
    ))}
  </Box>
);
};


export default GroupsList1;




