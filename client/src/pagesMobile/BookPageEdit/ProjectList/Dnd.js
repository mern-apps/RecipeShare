import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Box, Paper, Typography,IconButton, Grid } from '@mui/material';
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { setpagemode } from '../../../actions/bookPageActions.js';


import MainRecipeSmallDesign from './RecipeSmallDesign/MainRecipeSmallDesign.js';
import RecipeSmallDesign from '../../../ComponentsMobile/SmallCards/RecipeSmallDesign.js';

import { dnd } from '../../../actions/bookEditPageActions.js';


const Dnd = ({
  handleItemDisplayClick,
  pagemode,
}) => {


    

    const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const  {user}  = useSelector((state) => state.auth);
    const book = useSelector(state => state.currentproject.currentproject);

    const [itemsbook, setItemsbook] = useState(book?.recipes || []);
    
     useEffect(() => {
  setItemsbook(book?.recipes || []);
}, [book]);



    const handleMove = (fromIndex, toIndex) => {
  if (toIndex < 0 || toIndex >= itemsbook.length - 1) return;
  // keep your original logic (1-based indexing)
  const sourceIndex = fromIndex + 1;
  const destinationIndex = toIndex + 1;

  dispatch(dnd(sourceIndex, destinationIndex, book._id));
};

  useEffect(() => {
    const firstItem = itemsbook[0];
  }, [itemsbook]);

    const styles = {
      projectImage: {
        width: '200',
        height: '255px',
      },
        recipeImage: {
          width: '255px',
          height: '185px',
        },
      };

  
return (
  <Grid
    container
    direction="column"
    sx={{
    }}
  >

 <Grid
                        container
                        direction="column"
                        alignItems="center"

     >
<MainRecipeSmallDesign
  task={book?.recipes?.[0]}
  pagemode={pagemode}
/>
                                    </Grid>


    {/* Drag & Drop */}
    <Grid container spacing={2} sx={{ mt: 1 }}>
  {(itemsbook || []).slice(1).map((item, index) => {
    const realIndex = index; // index in sliced array
    const canMoveUp = realIndex > 0;
    const canMoveDown = realIndex < itemsbook.slice(1).length - 1;

return (
  <Grid item xs={12} key={item._id}>
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        width: "100%",
        position: "relative",

        // 🔥 IMPORTANT: prevents overlap with floating arrows
        pr: 6,
      }}
    >
      {/* 🔥 MOVE BUTTONS */}
      <Grid
        sx={{
          position: "absolute", // ❗ CRITICAL FIX (was missing)
          right: 1,
          top: "50%",
          transform: "translateY(-50%)",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.3,

          // 🔥 ellipse frame (modern floating control)
          background: "rgba(25, 118, 210, 0.08)",
          border: "1px solid rgba(25, 118, 210, 0.35)",
          borderRadius: "999px",
          padding: "6px 4px",

          backdropFilter: "blur(6px)",
          boxShadow: "0 4px 12px rgba(25, 118, 210, 0.15)",

          zIndex: 2,
        }}
      >
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleMove(realIndex, realIndex - 1);
          }}
          disabled={!canMoveUp}
          sx={{
            color: "#1976D2",
            padding: "4px",
            transition: "0.2s ease",
          }}
        >
          <ArrowUpwardIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleMove(realIndex, realIndex + 1);
          }}
          disabled={!canMoveDown}
          sx={{
            color: "#1976D2",
            padding: "4px",
        
            transition: "0.2s ease",
          }}
        >
          <ArrowDownwardIcon fontSize="small" />
        </IconButton>
      </Grid>

      {/* 🔥 YOUR ITEM */}
      <MainRecipeSmallDesign task={item} pagemode={pagemode} />

      <Typography
        variant="caption"
        sx={{
          mt: 0.5,
          direction: "rtl",
          fontWeight: 600,
          fontSize: "1.1rem",
          textAlign: "center",
          ml: 7,
        }}
      >
        דף מס {realIndex + 1}
      </Typography>
    </Grid>
  </Grid>
    );
  })}
</Grid>
  </Grid>
);

};

export default Dnd;
