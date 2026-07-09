import React, { useState } from 'react';
import { styled } from '@mui/system';
import Easy from '../pictures/easypic.png';

import { useSelector, useDispatch } from 'react-redux';
import { deleteallrecipes } from '../actions/homepageaction.js';
import { deleteallprojects } from '../actions/homepageaction.js';
import { handledeleteAllgroups } from '../actions/homepageaction.js';


const CategorySection = styled('div')({
  marginBottom: '20px',
  '& h3': {
    fontSize: '1.5rem',
    margin: '0 0 10px',
  },
  '& .item-container': {
    display: 'flex',
    overflowX: 'auto',
    gap: '10px',
    whiteSpace: 'nowrap',
    direction: 'rtl',
  },
});

const Homepage = () => {

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const predefinedCategories = ['עיקריות', 'ראשונות', 'קינוחים'];

  const HomepageContainer = styled('div')({
    direction: 'rtl',
    top: 0,
    padding: 20,
    margin: '0 40px 0 auto', // Adjust the right margin as needed
  
  });

  const handleDeleteAllRecipes = (token) => {
    dispatch(deleteallrecipes(token)); 
  };

  const handleDeleteAllProjects = (token) => {
    dispatch(deleteallprojects(token)); 
  };
  const handleDeleteAllGroups = (token) => {
    dispatch(handledeleteAllgroups(token)); 
  };

    return (
    <HomepageContainer>

    <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                    <div style={{  }}>
                        <h2>Home page</h2>
                    </div>
                    <div style={{  }}>
                            <CategorySection>
                            
                          </CategorySection>
                          <button onClick={() => handleDeleteAllRecipes(token)}>Delete All Recipes</button>
                          <button onClick={() => handleDeleteAllProjects(token)}>Delete All projects</button>
                          <button onClick={() => handleDeleteAllGroups(token)}>Delete All groups</button>

                    </div>

    </div>
    </HomepageContainer>

  );
};

export default Homepage;







  



