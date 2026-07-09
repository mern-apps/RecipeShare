import React, { useState,useEffect } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


import { getallrecipesCuisine} from '../../../actions/recipespage.js';
import { sendbackwardpaginationactioncuisine} from '../../../actions/recipespage.js';
import { sendforwardpaginationactioncuisine} from '../../../actions/recipespage.js';


//import { sendbackwardpaginationactionbook} from '../../actions/recipespage.js';
//import { sendforwardpaginationactionbook} from '../../actions/recipespage.js';
import { getallbooksgroup} from '../../../actions/recipespage.js';
import { getallgroups} from '../../../actions/recipespage.js';

import Header from '../../AllRecipes/Template/Header.js';
import GroupBookRecipes from './GroupBookRecipes.js';


  const GroupsRecipes = ({ 
    activeCategories,
    activeTags,
    filtercategories,
    filtertags,
  }) => {


    const dispatch = useDispatch();

    const  token  = useSelector((state) => state.auth.token);

//grouops
    const allgroups = useSelector(state => state.recipespage.allgroups);
    const [cuisine, setCuisine] = useState(allgroups);

    const [screenCuisine, setScreenCuisine] = useState(allgroups.slice(0, 4));
    const [numgroups, setnumgroups] = useState(4);

    const [startIndex, setStartIndex] = useState(0);
    const [activeGroup, setActiveGroup] = useState(null);

    const allrecipes = useSelector(state => state.recipespage.allrecipesgroup);
    const countallrecipes = useSelector(state => state.recipespage.countallrecipesgroup);
  
    const [typegroup, setTypegroup] = useState("group");

    const [items, setItems] = useState(allrecipes);
    const [countitems, setCountitems] = useState(countallrecipes);
    const [currentpage, setCurrentpage] = useState(1);
    const [tempPagination, setTempPagination] = useState(1);


//booksgroup
    const allbooksgroup = useSelector(state => state.recipespage.allbooksgroup);

    useEffect(() => {
      dispatch(getallgroups(token));
    }, []);

    useEffect(() => {
      setCuisine(allgroups);
    }, [allgroups]); 

     //getall first time or change cuisine/Filter
    useEffect(() => {
      

      if (filtercategories && cuisine && cuisine.length > 0) {
        const activeCuisineid = cuisine[0]._id;
        setActiveGroup(activeCuisineid);
          const combinedFilters = {
                           activeCategories,
                         activeTags,
                           activeCuisineid,
                           currentpage: 1,
                           action: "all",
                         };
                   dispatch(getallbooksandrecipesgroup(combinedFilters,countallrecipes));
                   setCurrentpage(1);
                   setTempPagination(1);
                 }
         
                 }, [activeCategories, activeTags,cuisine,dispatch]);  

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
        const currentIndex = cuisine.findIndex((item) => item._id === activeGroup);

        const newIndex = startIndex - 1;
        setStartIndex(newIndex);
        setScreenCuisine(cuisine.slice(newIndex, newIndex + numgroups));
        setActiveGroup(cuisine[currentIndex - 1]._id);

      }
    };
  
    const handleRightClick = () => {
      if (startIndex + numgroups < cuisine.length) {
        const currentIndex = cuisine.findIndex((item) => item._id === activeGroup);

        const newIndex = startIndex + 1;
        setStartIndex(newIndex);
        setScreenCuisine(cuisine.slice(newIndex, newIndex + numgroups));
        setActiveGroup(cuisine[currentIndex + 1]._id);

      }
    };
  

    const handleCategoryClick = (category) => {
      setActiveGroup(category._id); 
          const combinedFilters = {
             filtercategories: [...filtercategories],
             filtertags: [...filtertags],
              activeCuisineid:category._id
                };
                dispatch(getallbooksgroup(category._id,token));
                dispatch(getallrecipesCuisine(typegroup,combinedFilters,token));
            setCurrentpage(1);
            setTempPagination(1);
    };


   const handleBackClick = () => {
    setTempPagination(prevTemp => prevTemp - 1);
        const combinedFilters = {
    filtercategories: [...filtercategories],
    filtertags: [...filtertags],
    activeGroup,
      };
      dispatch(sendbackwardpaginationactioncuisine(typegroup,combinedFilters,currentpage,countallrecipes, token));
      setCurrentpage(prevPage => prevPage - 1);

  };
  
  const handleForwardClick = () => {
    setTempPagination(prevTemp => prevTemp + 1);
          const combinedFilters = {
      filtercategories: [...filtercategories],
      filtertags: [...filtertags],
      activeGroup,
    };
    dispatch(sendforwardpaginationactioncuisine(typegroup,combinedFilters,currentpage,countallrecipes,token));
    setCurrentpage(prevPage => prevPage + 1);

  };

    return (
    <Grid container direction="column" style={{textAlign: 'right', padding: '10px' }}>

                         <Grid item container direction="row" alignItems="center" justifyContent="flex-end" style={{ marginTop: '20px' }}>
                              <Grid item>
                                <h1 style={{ color: '#1e60d6', fontSize: '80px', fontFamily: 'Kroshe Hebrew, sans-serif', fontWeight: 'bold', marginRight: '10px' }}>
                                  קבוצות
                                </h1>
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
            onClick={() => handleCategoryClick(category)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out',
              transform: category._id === activeGroup?._id ? 'scale(1.1)' : 'scale(1)',
            }}
          >
             <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0px',
                boxShadow: category._id === activeGroup?._id ? '0 4px 15px rgba(0, 0, 0, 0.2)' : 'none',
                overflow: 'hidden',
                backgroundColor: category._id === activeGroup?._id ? '#f0f0f0' : 'white',
              }}
            >
           {activeGroup && category._id === activeGroup._id && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    borderRadius: '10px',
                    boxSizing: 'border-box',
                  }}
                ></div>
              )}
              
              <img 
                            src={getTemplateImagegroup(category.image)} 
                            alt={category.title} 
                             style={{ width: '50%', height: '50%', borderRadius: '20px' }} // Keep image in the rounded rectangle shape
                           />
               <div
                style={{
                  bottom: 0,
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  fontSize: '40px',
                }}
              >
                {category.title}
              </div>
            </div>
          </Grid>
        ))}
  
  <Grid item style={{ display: 'flex', alignItems: 'center' }}>
  <button
          onClick={handleRightClick}
          disabled={startIndex + numgroups >= cuisine.length}
          style={{
            background: 'transparent',
            color: startIndex + numgroups >= cuisine.length ? '#ccc' : '#1e60d6', // Light grey if disabled, blue if enabled
            border: `2px solid ${startIndex + numgroups >= cuisine.length ? '#ccc' : '#1e60d6'}`,
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

                        <Grid item style={{ marginTop: '0px' }}>
                          <GroupBookRecipes
                             groups={allbooksgroup}
                             activeCategories={activeCategories}
                             activeTags={activeTags}
                             filtercategories={filtercategories}
                             filtertags={filtertags}
                             getTemplateImage={getTemplateImage}
                             user={user}

                         />
                        </Grid>

    </Grid>
  );
};

export default GroupsRecipes;
