import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { Button, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { getallrecipesCuisine} from '../../actions/recipespage.js';
import { sendbackwardpaginationactioncuisine} from '../../actions/recipespage.js';
import { sendforwardpaginationactioncuisine} from '../../actions/recipespage.js';
import { getallrecipesbest } from '../../actions/recipespage.js';

import Header from '../AllRecipes/Template/Header.js';

import it from "../../assets/flags/it.png";
import inFlag from "../../assets/flags/in.png";
import jp from "../../assets/flags/jp.png";
import th from "../../assets/flags/th.png";


  const Cuisine = ({ 
    activeCategories,
    activeTags,
    filtercategories,
    filtertags
  }) => {

    const flagMap = {
  it,
  in: inFlag,
  jp,
  th,
};

    const dispatch = useDispatch();


    const groupcuisine = useSelector(state => state.recipespage.groupcuisine);
    
    const allrecipes = useSelector(state => state.recipespage.allrecipescuisine);
    const countallrecipes = useSelector(state => state.recipespage.countallrecipescuisine);

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
  <Grid
    container
    direction="column"
    sx={{
      textAlign: "right",
    }}
  >
    {/* TITLE */}
    <Grid
      item
      container
      direction="column"
      alignItems="flex-end"
    >
      <Grid item>
        <h1
          style={{
            color: "#1e60d6",
            fontSize: "28px",
            fontFamily: "Kroshe Hebrew, sans-serif",
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          מתכונים לפי ארצות
        </h1>
      </Grid>
    </Grid>

    {/* CAROUSEL */}
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{
        mt: 2,
        flexWrap: "nowrap",
        overflowX: "auto",
        px: 1,
      }}
    >
      {/* LEFT BUTTON */}
      <Grid item sx={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={handleLeftClick}
          disabled={startIndex === 0}
          style={{
            background: "transparent",
            color: startIndex === 0 ? "#ccc" : "#1e60d6",
            border: `2px solid ${
              startIndex === 0 ? "#ccc" : "#1e60d6"
            }`,
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &lt;
        </button>
      </Grid>

      {/* ITEMS */}
      {screenCuisine.map((category, index) => (
        <Grid
          item
          key={index}
          onClick={() => handleCategoryClick(index)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            transition: "transform 0.3s ease-in-out",
            transform: category.active ? "scale(1.05)" : "scale(1)",
          }}
        >
          {/* CIRCLE */}
          <Box
            sx={{
              width: 40,
    height: 40,
    borderRadius: "8px",
              border: category.active
                ? "3px solid #1e60d6"
                : "2px solid #ddd",
              boxShadow: category.active
                ? "0 4px 15px rgba(0,0,0,0.2)"
                : "none",
              overflow: "hidden",
              backgroundColor: category.active ? "#f0f0f0" : "white",
              position: "relative",
            }}
          >

 <img
  src={flagMap[category.countryCode]}
  alt={category.description}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }}
/>
          </Box>

          {/* LABEL */}
          <p
            style={{
              fontSize: 19,
              marginTop: 5,
              textAlign: "center",
            }}
          >
            {category.description}
          </p>
        </Grid>
      ))}

      {/* RIGHT BUTTON */}
      <Grid item sx={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={handleRightClick}
          disabled={startIndex + 4 >= cuisine.length}
          style={{
            background: "transparent",
            color:
              startIndex + 4 >= cuisine.length ? "#ccc" : "#1e60d6",
            border: `2px solid ${
              startIndex + 4 >= cuisine.length ? "#ccc" : "#1e60d6"
            }`,
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &gt;
        </button>
      </Grid>
    </Grid>

    {/* HEADER */}
    <Grid item sx={{ mt: 2 }}>
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

export default Cuisine;
