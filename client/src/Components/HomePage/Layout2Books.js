import React, { useState,useEffect } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import { getallrecipesCuisine} from '../../actions/recipespage.js';
import { sendbackwardpaginationactioncuisine} from '../../actions/recipespage.js';
import { sendforwardpaginationactioncuisine} from '../../actions/recipespage.js';

import Header from '../Myrecipes/Template/Header.js';

  const BooksRecipes = ({ 
    user,
    activeCategories,
    activeTags,
    filtercategories,
    filtertags
  }) => {

//to update (it all of one group) id

const Tagsdata = [
  { description: 'ללא גלוטן', active: true,id:'66cb62e67a101e6438ddeca2',imageUrl: 'https://images.unsplash.com/photo-1712746784705-4cb040aec3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzcyNTR8MHwxfHNlYXJjaHwxMXx8U3RhcnRlcnN8ZW58MHx8fHwxNzI0MzM3OTkxfDA&ixlib=rb-4.0.3&q=80&w=400' },
  { description: 'חריף', active: false,id:'111111', imageUrl: 'https://images.unsplash.com/photo-1625862220431-f8d70c6addda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzcyNTR8MHwxfHNlYXJjaHwzfHxNYWluJTIwQ291cnNlfGVufDB8fHx8MTcyNDMzODY1OHww&ixlib=rb-4.0.3&q=80&w=400'},
  { description: 'אסייתי', active: false,id:'555555', imageUrl: 'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzcyNTR8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMHJlY2lwZXxlbnwwfHx8fDE3MjQzMzg5MjV8MA&ixlib=rb-4.0.3&q=80&w=400'}
];

    const dispatch = useDispatch();

    const countallrecipes = useSelector(state => state.recipespage.countallrecipestag);
    const allrecipes = useSelector(state => state.recipespage.allrecipestag);

    const [cuisine, setCuisine] = useState(Tagsdata);
    const [screenCuisine, setScreenCuisine] = useState(Tagsdata.slice(0, 4));
    const [startIndex, setStartIndex] = useState(0);
    const [type, setType] = useState("tags");

    const  token  = useSelector((state) => state.auth.token);

    const [items, setItems] = useState(allrecipes);
    const [countitems, setCountitems] = useState(countallrecipes);

    //const [currentpagination, setCurrentpagination] = useState(1001);
    const [currentpage, setCurrentpage] = useState(1);
    const [tempPagination, setTempPagination] = useState(1);


     //getall first time or change cuisine/Filter
    useEffect(() => {
      console.log('tag', filtercategories);

      if (filtercategories) {
        const activeCuisineid = cuisine.find(item => item.active)?.id;
        const combinedFilters = {
           filtercategories: [...filtercategories],
           filtertags: [...filtertags],
            activeCuisineid,
              };
              console.log('getallrecipesCategory', activeCuisineid);

        //  dispatch(getallrecipesCuisine(type,combinedFilters,token));

          setCurrentpage(1);
          setTempPagination(1);
        }

        }, [filtertags, filtercategories,cuisine]);  


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


    //modal
    const [open, setOpen] = useState(false);
    const [modalTaskCuisine, setModalTaskCuisine] = useState(null);
    const handleOpen = (task) => {
      setModalTaskCuisine(task);
      setOpen(true);

    };
    const handleClose = () => {
      setOpen(false);
      setModalTaskCuisine(null);
    };

    //


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
    };




   const handleBackClick = () => {
    const activeCuisineid = cuisine.find(item => item.active)?.id;
    setTempPagination(prevTemp => prevTemp - 1);
        const combinedFilters = {
    filtercategories: [...filtercategories],
    filtertags: [...filtertags],
    activeCuisineid,
      };
      dispatch(sendbackwardpaginationactioncuisine(combinedFilters,currentpage,countallrecipes, token));
      setCurrentpage(prevPage => prevPage - 1);

  };
  
  const handleForwardClick = () => {
    const activeCuisineid = cuisine.find(item => item.active)?.id;
    setTempPagination(prevTemp => prevTemp + 1);
          const combinedFilters = {
      filtercategories: [...filtercategories],
      filtertags: [...filtertags],
      activeCuisineid,
    };
    dispatch(sendforwardpaginationactioncuisine(combinedFilters,currentpage,countallrecipes,token));
    setCurrentpage(prevPage => prevPage + 1);

  };

    return (
    <Grid container direction="column" style={{textAlign: 'right', padding: '10px' }}>

                         <Grid item container direction="row" alignItems="center" justifyContent="flex-end" style={{ marginTop: '20px' }}>
                              <Grid item>
                                <h1 style={{ color: '#1e60d6', fontSize: '40px', fontFamily: 'Kroshe Hebrew, sans-serif', fontWeight: 'bold', marginRight: '10px' }}>
מתכונים לפי תגיות                                </h1>
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
                           transition: 'transform 0.3s ease-in-out', // Smooth transition
                           transform: category.active ? 'scale(1.05)' : 'scale(1)', // Slight scale up on active
                         }}
                       >
                         <div
                           style={{
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             width: 120,
                             height: 160, // Adjusted height for a rounded rectangle
                             borderRadius: '20px', // Rounded corners
                             border: category.active ? '4px solid #1e60d6' : '2px solid #ddd', // Thicker border when active
                             boxShadow: category.active ? '0 6px 18px rgba(30, 96, 214, 0.3)' : '0 4px 10px rgba(0, 0, 0, 0.1)', // Softer shadow effect
                             background: category.active ? 'linear-gradient(135deg, #f0f0f0, #e0e7ff)' : 'white', // Gradient background for active
                             position: 'relative',
                             overflow: 'hidden',
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
                                 borderRadius: '20px',
                                 border: '3px solid #FFD700', // Gold outline when active
                                 boxSizing: 'border-box',
                               }}
                             ></div>
                           )}
                           <img 
                             src={category.imageUrl} 
                             alt={category.description} 
                             style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} // Keep image in the rounded rectangle shape
                           />
                         </div>
                         <p style={{ fontSize: 20, marginTop: 10, textAlign: 'center', color: category.active ? '#1e60d6' : '#333' }}>
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
                            user={user}
                          />
                        </Grid>

    </Grid>
  );
};

export default BooksRecipes;
