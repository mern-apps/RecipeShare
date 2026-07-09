import React, { useState } from 'react';
import { Grid } from '@mui/material';
import RecipeSmallDesign from '../../Components/RecipeSmallDesign';
import { RecipeDisplay} from '../Myrecipes/RecipeDisplay.js';
import { useSelector } from 'react-redux';

const Layout1 = ({ items, activeCategories, activeTags}) => {

  const  {user}  = useSelector((state) => state.auth);
  const  token  = useSelector((state) => state.auth.token);

  const [open, setOpen] = useState(false);
  const [modalTask, setModalTask] = useState(null);
  const handleOpen = (task) => {
    setModalTask(task);
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
    setModalTask(null);
  };

  return (
    <Grid container>

          <Grid item xs={12} md={12}>

          {modalTask &&(
   <RecipeDisplay
   open={open}
   handleClose={handleClose}
   item={modalTask}
   token={token}
 />
      )}

          <Grid container style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }} spacing={0}>
          {activeCategories.length === 0 && activeTags.length === 0
            ? items.map((task, index) => (
              <Grid
              item
              key={task._id}
              style={{marginRight: '30px' }}
              onClick={() => handleOpen(task)}

            >
                <RecipeSmallDesign task={task} />
                </Grid>
              ))
              : activeCategories.length > 0 && activeTags.length === 0
              ? items
              .filter(task =>
                activeCategories.some(activeCategory => activeCategory.description === task.selectedCategories)
              )
                  .map((task) => (
                    <Grid
                    item
                    key={task._id}
                    style={{ marginBottom: '6px', marginRight: '30px' }}
                    onClick={() => handleOpen(task)}

                  >                    <RecipeSmallDesign task={task} />
                  </Grid>
                  ))
                  : activeTags.length > 0 && activeCategories.length === 0
                  ? items
                      .filter(task =>
                        (task.selectedTags || []).some(tag =>
                          (activeTags || []).some(activeTag => activeTag.description === tag)
                        )
                      )
                      .map((task) => (
                        <Grid
                        item
                        key={task._id}
                        style={{ marginBottom: '6px', marginRight: '30px' }}
                        onClick={() => handleOpen(task)}

                      >                        <RecipeSmallDesign task={task} />
                      </Grid>
                      ))
                  : items
                  .filter(task =>
                    activeCategories.some(activeCategory => activeCategory.description === task.selectedCategories)
                  )
                      .filter(task =>
                        (task.selectedTags || []).some(tag =>
                          (activeTags || []).some(activeTag => activeTag.description === tag)
                        )
                      )
                      .map((task) => (
                        <Grid
                        item
                        key={task._id}
                        style={{ marginBottom: '6px', marginRight: '30px' }}
                        onClick={() => handleOpen(task)}

                      >                    <RecipeSmallDesign task={task} />
                  </Grid>
                      ))}
        </Grid>
      </Grid>

      </Grid>
  );
};


export default Layout1;
