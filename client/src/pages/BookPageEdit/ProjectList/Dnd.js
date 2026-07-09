import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Box, Paper, Typography, Grid } from '@mui/material';
import { setpagemode } from '../../../actions/bookPageActions.js';


import MainRecipeSmallDesign from './RecipeSmallDesign/MainRecipeSmallDesign.js';
import RecipeSmallDesign from '../../../Components/SmallCards/RecipeSmallDesign.js';

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

    const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) {
      return;
    }

    const sourceIndex = source.index + 1 ;
    const destinationIndex = destination.index +1 ;
    dispatch(dnd(sourceIndex,destinationIndex,book._id));

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
      width: "100%",
      height: "100%",
      backgroundColor: "white",
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
    <Grid item xs sx={{ overflowY: "auto" }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="itemList">
          {(provided) => (
            <Grid
              container
              spacing={2}
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ mt: 1 }}
            >
{(itemsbook || []).slice(1).map((item, index) => (
                  <Draggable
                  key={item._id}
                  draggableId={item._id}
                  index={index}
                >
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        cursor: "grab",
                      }}
                    >
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        sx={{ width: "100%" }}
                        onClick={() => handleItemDisplayClick(item)}
                      >
                        <RecipeSmallDesign task={item} />

                        <Typography
                          variant="caption"
                          sx={{
                            mt: 0.5,
                            direction: "rtl",
                            color: "text.secondary",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            textAlign: "center",
                            ml: 7,
                          }}
                        >
                          דף מס {index + 1}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </Grid>
  </Grid>
);

};

export default Dnd;
