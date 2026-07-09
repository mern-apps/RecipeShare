import React, { useState,useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupSmallDesign from '../../../Components/SmallCards/GroupSmallDesign.js';
import RecipeSub10 from '../../BookPageEdit/ProjectList/RecipeSmallDesign/RecipeSub10.js';

import { fetchBookById } from '../../../actions/bookPageActions';
import { setpagemode } from '../../../actions/bookPageActions.js';
  const GroupsList1 = ({ items,chosenBook,setChosenBook}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGroupPageClick = (task) => {
  setChosenBook(task);

  };


  if (!items.length) return null;

return (
   <Grid container>
  <Grid item xs={12}>
    <Grid
      container
      style={{ display: "flex", justifyContent: "flex-end" }}
      spacing={0}
    >
      {items.map((task) => (
        <Grid
          item
          key={task._id}
          style={{ marginBottom: "6px", marginRight: "30px" }}
        >
          {/* Wrapper */}
          <div
            style={{
              position: "relative",
              cursor: "pointer",
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
            }}
          >
            {/* Selection indicator */}
            {chosenBook?._id === task._id && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#6B4BCC",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  zIndex: 10,
                  boxShadow: "0 6px 16px rgba(107,75,204,0.35)",
                }}
              >
                ✓
              </div>
            )}

            {/* Main clickable item */}
            <div onClick={() => handleGroupPageClick(task)}>
                    <GroupSmallDesign item={task?.recipes?.[0]} />
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  </Grid>
</Grid>
  );
};


export default GroupsList1;