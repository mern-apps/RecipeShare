import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupSmallDesign from './GroupSmallDesign.js';
import { reduxEditBookRecipeSectionBookID } from "../../../../actions/bookEditPageActions.js";


const GroupsList1 = ({ items = [] ,setOpen  }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

      const book = useSelector(state => state.currentproject.currentproject);
    const editBookrecipesSection = useSelector((state) => state.currentproject.editBookrecipesSection || {});
    const { bookId ,groupId} = editBookrecipesSection;
    
  const handleGroupPageClick = (task) => {
   if (task._id === bookId) {
        setOpen(false);
      } else {
        dispatch(reduxEditBookRecipeSectionBookID(task._id));
      }
    };

  
  if (!items.length) return null;

  return (
    <Grid
      container
      direction="row"
      flexWrap="wrap"
      spacing={10}
      justifyContent="flex-end"
      sx={{ px: 15, mt: 4 }}
    >
      {items.map((task) => {
        const isCurrentBook = book?._id === task._id;

        return (
          <Grid
            item
            key={task._id}
            sx={{ flex: '0 1 calc(25% - 16px)' }}
          >
            <Box
              onClick={
                !isCurrentBook
                  ? () => handleGroupPageClick(task)
                  : undefined
              }
              sx={{
                width: '100%',
                position: 'relative',
                cursor: isCurrentBook ? 'default' : 'pointer',
                transition: 'transform 0.2s ease-in-out',
                ...(isCurrentBook
                  ? {}
                  : {
                      '&:hover': {
                        transform: 'translateY(-3px)',
                      },
                    }),
              }}
            >
              {isCurrentBook && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 2,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '12px',
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: 'rgba(25,118,210,0.9)',
                    color: '#fff',
                  }}
                >
                  ספר נוכחי
                </Box>
              )}

              <GroupSmallDesign task={task} />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default GroupsList1;