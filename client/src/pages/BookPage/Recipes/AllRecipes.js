
import React, { useState, useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getallrecipesbookfilter,forwardwardpaginationRecipesbookpage,backwardpaginationRecipesbookpage} from '../../../actions/bookPageActions.js';
import { currentrecipe } from '../../../actions/recipeNewForm.js';
import { setpagemode } from '../../../actions/recipeNewForm.js';

import Header from  './Header.js';


  const AllRecipes = ({ 
    activeCategories,
    activeTags,
    setSelectedItemdisplay,
  }) => {

    const dispatch = useDispatch();

        const { user } = useSelector((state) => state.auth);

  const currentBook111 = useSelector(state => state.currentproject.currentproject);

const recipes =
  currentBook111?.recipes?.filter(item =>
    (item?.type || []).some(t => t < 10)
  ) ?? [];
  const countallrecipes = recipes.length;


const filteredRecipes = useMemo(() => {
  return recipes.filter(recipe => {
    const types = recipe?.type || [];
   if (types.some(t => t >= 2 && t < 3)) {
  return true;
}

    const categoryMatch =
      !activeCategories || activeCategories.length === 0
        ? true
        : activeCategories.includes(recipe.selectedCategories);

    const tagMatch =
      !activeTags || activeTags.length === 0
        ? true
        : (recipe.selectedTags || []).some(tag =>
            activeTags.includes(tag)
          );

    return categoryMatch && tagMatch;
  });
}, [recipes, activeCategories, activeTags]);




const [countitems, setCountitems] = useState(recipes.length);

    const [currentpage, setCurrentpage] = useState(1);

const items = useMemo(() => {
  const startIndex = (currentpage - 1) * 12;
  return filteredRecipes.slice(startIndex, startIndex + 12);
}, [currentpage, filteredRecipes]);



useEffect(() => {
  console.log("AllRecipes items:", items);
}, [items]);


  const handleBackClick = () => {
  setCurrentpage(prev => prev - 1);
  };
  
  const handleForwardClick = () => {
  setCurrentpage(prev => prev + 1);
  };


    return (
    <Grid container direction="column" style={{textAlign: 'right', padding: '10px' }}>
                   
      <Grid item container direction="row" alignItems="center" justifyContent="flex-end" style={{  }}>

      </Grid>

      <Grid item style={{ marginTop: '20px' }}>
                  <Header
                  items={items}
                  currentpage={currentpage}
                  countallrecipes={countitems}
                  handleForwardClick={handleForwardClick}
                  handleBackClick={handleBackClick}
                  setSelectedItemdisplay={setSelectedItemdisplay}

                />

      </Grid>

    </Grid>
  );
};

export default AllRecipes;

