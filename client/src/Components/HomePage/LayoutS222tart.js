import React, { useState,useEffect } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getallrecipesbest } from '../../actions/recipespage.js';

import Header from  '../Myrecipes/Template/Header.js';

  const LayoutStart = ({ 
    user,
    activeCategories,
    activeTags,
    filtercategories,
    filtertags
  }) => {

   const dispatch = useDispatch();

   const groupbest = useSelector(state => state.recipespage.groupbest);
    const allrecipes = useSelector(state => state.recipespage.allrecipesbest);
    //??????
    const countallrecipes = useSelector(state => state.recipespage.countallrecipesbest);
    const  token  = useSelector((state) => state.auth.token);

    const [items, setItems] = useState(allrecipes);
    const [countitems, setCountitems] = useState(countallrecipes);

    //const [currentpagination, setCurrentpagination] = useState(1001);
    const [currentpage, setCurrentpage] = useState(1);
    const [tempPagination, setTempPagination] = useState(1);



   

  useEffect(() => {
          const activeCuisineid = cuisine.find(item => item.active)?.id;
                const combinedFilters = {
        activeCategories,
      activeTags,
        activeCuisineid,
        currentpage: 1,
        action: "all",
      };
            dispatch(getallrecipesbest(combinedFilters,countallrecipes));
            setCurrentpage(1);
            setTempPagination(1);
        }, [activeCategories, activeTags, dispatch]); 


    useEffect(() => {
      setCountitems(countallrecipes);
      }, [countallrecipes]); 

    
      useEffect(() => {
        if (allrecipes && allrecipes.length > 0) { // Ensure allrecipes exists and has elements
          if (currentpage > 1) {
            setTempPagination(2);
          } else {
            setItems(allrecipes.slice(0, 12));
            setTempPagination(1);
          }
        }
      }, [allrecipes]);


      useEffect(() => {
        if (allrecipes && allrecipes.length > 0) { // Ensure allrecipes exists and has elements
          if (tempPagination === 1) {
            setItems(allrecipes.slice(0, 12));
          } else if (tempPagination === 2) {
            setItems(allrecipes.slice(12, 24));
          } else {
            setItems(allrecipes.slice(24, 36));
          }
        }
      }, [tempPagination]);



   const handleBackClick = () => {
    const activeCuisineid = cuisine.find(item => item.active)?.id;
    setTempPagination(prevTemp => prevTemp - 1);
const combinedFilters = {
      activeCategories,
    activeTags,
        activeCuisineid,
      currentpage,
      action: "back",
    };
          dispatch(getallrecipesbest(combinedFilters,countallrecipes));
      setCurrentpage(prevPage => prevPage - 1);

  };
  
  const handleForwardClick = () => {
    const activeCuisineid = cuisine.find(item => item.active)?.id;
    setTempPagination(prevTemp => prevTemp + 1);
          const combinedFilters = {
      activeCategories,
    activeTags,
      activeCuisineid,
      currentpage,
      action: "forward",
    };
          dispatch(getallrecipesbest(combinedFilters,countallrecipes));
    setCurrentpage(prevPage => prevPage + 1);

  };



    
    return (
    <Grid container direction="column" style={{textAlign: 'right', padding: '10px' }}>

                         <Grid item container direction="row" alignItems="center" justifyContent="flex-end" style={{ marginTop: '20px' }}>
                              <Grid item>
                                <h1 style={{ color: '#1e60d6', fontSize: '40px', fontFamily: 'Kroshe Hebrew, sans-serif', fontWeight: 'bold', marginRight: '10px' }}>
                                  BEST  
                                </h1>
                              </Grid>
                        </Grid>

                      


      <Grid item container direction="row" alignItems="center" justifyContent="flex-end" style={{  }}>


      </Grid>

      <Grid item style={{ marginTop: '20px' }}>
        <Header
          items={items}
          currentpage={currentpage}
          countallrecipes={countitems}
          handleForwardClick={handleForwardClick}
          handleBackClick={handleBackClick}
          activeCategories={activeCategories}
          activeTags={activeTags}
          user={user}
        />
      </Grid>

    </Grid>
  );
};

export default LayoutStart;
