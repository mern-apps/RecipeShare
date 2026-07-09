import React, { useState,useEffect } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { getallrecipesbest } from '../../actions/recipespage.js';



import Header from '../AllRecipes/Template/Header.js';

  const Best = ({ 
    activeCategories,
    activeTags,
    filtercategories,
    filtertags
  }) => {

    const dispatch = useDispatch();


    const groupcuisine = useSelector(state => state.recipespage.groupbest);
    
    const countallrecipes = useSelector(state => state.recipespage.countallrecipesbest);
    const allrecipes = useSelector(state => state.recipespage.allrecipesbest);


    const [cuisine, setCuisine] = useState(groupcuisine);
    const [screenCuisine, setScreenCuisine] = useState(groupcuisine.slice(0, 4));
    const [startIndex, setStartIndex] = useState(0);

    const [items, setItems] = useState(allrecipes);
    const [countitems, setCountitems] = useState(countallrecipes);

    //const [currentpagination, setCurrentpagination] = useState(1001);
    const [currentpage, setCurrentpage] = useState(1);
    const [tempPagination, setTempPagination] = useState(1);


     //getall first time or change cuisine/Filter
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
      }, [activeCategories, activeTags,cuisine, dispatch]); 


      useEffect(() => {
        setCountitems(countallrecipes);
        }, [countallrecipes]); 

        useEffect(() => {
            if (currentpage > 1) {
              setTempPagination(2);
            } else {
              setItems(allrecipes.slice(0, 12));
              setTempPagination(1);
            }

            console.log(
    allrecipes.map((r) => ({
      id: r._id,
      title: r.title,
      type: r.type,
    }))
  );

          }, [allrecipes]);

          useEffect(() => {
            if (tempPagination === 1) {
              setItems(allrecipes.slice(0, 12));
            }   else if (tempPagination === 2) {
              setItems(allrecipes.slice(12, 24));
            }
            else {
              setItems(allrecipes.slice(24, 36));
            }
    
        }, [tempPagination]);

        useEffect(() => {
            setScreenCuisine(cuisine.slice(startIndex, startIndex + 4));
          }, [cuisine, startIndex]);


    const handleLeftClick = () => {
      if (startIndex > 0) {
        const newIndex = startIndex - 1;
        setStartIndex(newIndex);
        setScreenCuisine(cuisine.slice(newIndex, newIndex + 4));
      }
    };
  
    const handleRightClick = () => {
      if (startIndex + 4 < cuisine.length) {
        const newIndex = startIndex + 1;
        setStartIndex(newIndex);
        setScreenCuisine(cuisine.slice(newIndex, newIndex + 4));
      }
    };
  
    const handleCategoryClick = (index) => {
      const updatedCategories = cuisine.map((category, idx) => ({
        ...category,
        active: idx === index + startIndex,
      }));
      setCuisine(updatedCategories);
      console.log("Before update:", cuisine);
  console.log("After update:", updatedCategories);
    };




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
המתכונים הטובים ביותר                                </h1>
                              </Grid>
         <Grid container spacing={3} justifyContent="center">
                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                        <button
                            onClick={handleLeftClick}
                            disabled={startIndex === 0}
                            style={{
                              background: 'transparent',
                              color: startIndex === 0 ? '#ccc' : '#1e60d6', // Light grey if disabled, blue if enabled
                              border: `2px solid ${startIndex === 0 ? '#ccc' : '#1e60d6'}`,
                              borderRadius: '50%',
                              width: '50px',
                              height: '50px',
                              fontSize: '20px',
                              boxShadow: 'none',
                              transition: 'color 0.3s ease, border-color 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            &lt;
                          </button>
                        </Grid>
  
                        {screenCuisine.map((category, index) => (
    <Grid
      item
      key={index}
      onClick={() => handleCategoryClick(index)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        marginRight: 20,
        marginBottom: 20,
        transition: 'transform 0.3s ease-in-out',  // Add smooth transition
        transform: category.active ? 'scale(1.1)' : 'scale(1)', // Scale up on active
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 100,
          height: 100,
          borderRadius: '50%',
          border: category.active ? '4px solid #1e60d6' : '2px solid #ddd', // Thicker border when active
          boxShadow: category.active ? '0 4px 15px rgba(0, 0, 0, 0.2)' : 'none', // Shadow effect when active
          overflow: 'hidden', // Ensure the image doesn't overflow the circle
          backgroundColor: category.active ? '#f0f0f0' : 'white',
          position: 'relative',
        }}
      >
        {category.active && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '3px solid #FFD700', // Gold frame when active
              boxSizing: 'border-box',
            }}
          ></div>
        )}
        <img 
          src={category.imageUrl} 
          alt={category.description} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Image covers the whole circle
        />
      </div>
      <p style={{ fontSize: 24, marginTop: 5, textAlign: 'center' }}>
        {category.description}
      </p>
    </Grid>
  ))}
  
  <Grid item style={{ display: 'flex', alignItems: 'center' }}>
  <button
          onClick={handleRightClick}
          disabled={startIndex + 4 >= cuisine.length}
          style={{
            background: 'transparent',
            color: startIndex + 4 >= cuisine.length ? '#ccc' : '#1e60d6', // Light grey if disabled, blue if enabled
            border: `2px solid ${startIndex + 4 >= cuisine.length ? '#ccc' : '#1e60d6'}`,
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            boxShadow: 'none',
            transition: 'color 0.3s ease, border-color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          &gt;
        </button>
      </Grid>

      </Grid>
                        </Grid>

                        <Grid item style={{ marginTop: '0px' }}>
                          <Header
                            items={items}
                            currentpage={currentpage}
                            countallrecipes={countitems}
                            handleForwardClick={handleForwardClick}
                            handleBackClick={handleBackClick}
                            activeCategories={activeCategories}
                            activeTags={activeTags}
                          />
                        </Grid>

    </Grid>
  );
};

export default Best;
