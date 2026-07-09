import React, { useState,useEffect } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


import { getallBooks} from '../../actions/recipespage.js';
import { getallrecipesbook} from '../../actions/recipespage.js';
import { sendbackwardpaginationactionbook} from '../../actions/recipespage.js';
import { sendforwardpaginationactionbook} from '../../actions/recipespage.js';


import Header from '../AllRecipes/Template/Header.js';

  const BooksRecipes = ({ 
    activeCategories,
    activeTags,
    filtercategories,
    filtertags,
  }) => {

//to update (it all of one group) id


    const dispatch = useDispatch();

    const countallrecipes = useSelector(state => state.recipespage.countallrecipesbook);
    const allrecipes = useSelector(state => state.recipespage.allrecipesbook);
    const Tagsdata = useSelector(state => state.recipespage.allbooks);

    const [cuisine, setCuisine] = useState(Tagsdata);
    const [screenCuisine, setScreenCuisine] = useState(Tagsdata.slice(0, 4));
    const [startIndex, setStartIndex] = useState(0);

    const  token  = useSelector((state) => state.auth.token);

    const [activeBook, setActiveBook] = useState(0);

    const [items, setItems] = useState(allrecipes);
    const [countitems, setCountitems] = useState(countallrecipes);

    //const [currentpagination, setCurrentpagination] = useState(1001);
    const [currentpage, setCurrentpage] = useState(1);
    const [tempPagination, setTempPagination] = useState(1);

        // ♿ Accessibility
      const localaccessibilitySettings = useSelector((state) => state.auth.accessibility);
      const [accessibilityData, setAccessibilityData] = useState(localaccessibilitySettings);
    
      useEffect(() => {
        if (user && user.accessibility) {
          setAccessibilityData(user.accessibility);
        } else {
          setAccessibilityData(localaccessibilitySettings);
        }
      }, [user, localaccessibilitySettings]);
    
      const adjustedFontSize = (size) => `${(size * (accessibilityData?.fontSizeAdjustments || 100)) / 100}rem`;
      const adjustedLineHeight = (defaultValue) => defaultValue * (accessibilityData?.lineSpacing || 1);
      const adjustedWordSpacing = (defaultValue) => defaultValue * (accessibilityData?.wordSpacing || 1);
      const adjustedLetterSpacing = (defaultValue) => defaultValue * (accessibilityData?.letterSpacing || 1);
    
    // Keyboard shortcuts (for demo)
      useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.altKey) {
            switch (event.key.toUpperCase()) {
              case 'P': // Alt+P → New Book
                event.preventDefault();
                document.getElementById('newproject-button')?.click();
                break;
              default:
                break;
            }
          }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, []);



    useEffect(() => {
      dispatch(getallBooks());
    }, []); 


    useEffect(() => {
      setCuisine(Tagsdata);
      }, [Tagsdata]); 

     //getall first time or change cuisine/Filter
    useEffect(() => {
      if (filtercategories && cuisine && cuisine.length > 0) {  // Check if cuisine exists and has values
        const activeCuisineid = cuisine[activeBook]?._id;
       const combinedFilters = {
                  activeCategories,
                activeTags,
                  activeCuisineid,
                  currentpage: 1,
                  action: "all",
                };
          dispatch(getallrecipesbook(combinedFilters,countallrecipes));
          setCurrentpage(1);
          setTempPagination(1);
        }

        }, [activeCategories, activeTags,cuisine,activeBook,dispatch]);  


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




    //


    const handleLeftClick = () => {
      if (startIndex > 0) {
        setActiveBook(prevActiveBook => prevActiveBook - 1);
        const newIndex = startIndex - 1;
        setStartIndex(newIndex);
        setScreenCuisine(cuisine.slice(newIndex, newIndex + 4));
      }
    };
  
    const handleRightClick = () => {
      if (startIndex + 4 < cuisine.length) {
        setActiveBook(prevActiveBook => prevActiveBook + 1);
        const newIndex = startIndex + 1;
        setStartIndex(newIndex);
        setScreenCuisine(cuisine.slice(newIndex, newIndex + 4));
      }
    };
  
    const handleCategoryClick = (index) => {
      setActiveBook(index + startIndex);
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
          dispatch(getallrecipesbook(combinedFilters,countallrecipes));
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
          dispatch(getallrecipesbook(combinedFilters,countallrecipes));
    setCurrentpage(prevPage => prevPage + 1);
  };

    return (
    <Grid container direction="column" style={{textAlign: 'right', padding: '10px' }}>

                         <Grid item container direction="row" alignItems="center" justifyContent="flex-end" style={{ marginTop: '20px' }}>
                                <Grid item sx={{ marginRight:5 }}>
                                          <Button
                                          id="newproject-button"
                                          component={Link}
                                          to="/newproject"
                                          aria-label="הוסף ספר חדש"
                                          title="הוסף ספר חדש (Alt+P)"
                                          role="link"
                                          variant="contained"
                                          sx={{
                                            borderRadius: 3,
                                            fontSize: adjustedFontSize(1.2),
                                            lineHeight: adjustedLineHeight(1.3),
                                            letterSpacing: adjustedLetterSpacing(0.05),
                                            wordSpacing: adjustedWordSpacing(0.02),
                                            padding: '10px 22px',
                                            background: 'linear-gradient(135deg, #6B4BCC, #8C70FF)',
                                            color: '#fff',
                                            boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                              transform: 'translateY(-2px)',
                                              boxShadow: '0 10px 28px rgba(0,0,0,0.3)',
                                              background: 'linear-gradient(135deg, #5839B5, #755EFF)',
                                              border: '1px solid #fff',
                                            },
                                            '&:focus-visible': {
                                              outline: '3px solid #FF6347',
                                              outlineOffset: '3px',
                                            },
                                          }}
                                        >
                                          הוסף ספר חדש
                                        </Button>
                                      </Grid>
                                     <Grid item>
                                <h1 style={{ color: '#1e60d6', fontSize: '40px', fontFamily: 'Kroshe Hebrew, sans-serif', fontWeight: 'bold', marginRight: '10px' }}>
ספרי מתכונים </h1>
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
                            src={getTemplateImage(category.image)} 
                            alt={category.title} 
                             style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} // Keep image in the rounded rectangle shape
                           />
                         </div>
                         <p style={{ fontSize: 20, marginTop: 10, textAlign: 'center', color: category.active ? '#1e60d6' : '#333' }}>
                           {category.title}
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
