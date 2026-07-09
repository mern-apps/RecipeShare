import React, { useState,useEffect } from 'react';
import { Grid} from '@mui/material';



import { useSelector, useDispatch } from 'react-redux';

import { sendforwardpaginationactionfavorite} from '../../../actions/recipespage.js';
import { sendbackwardpaginationactionfavorite} from '../../../actions/recipespage.js';

import { getallrecipesfavorite } from '../../../actions/recipespage.js';

import Header from  '../Template/Header.js';

  const AllrecipesFavorite = ({ 
    activeCategories,
    activeTags,
    filtercategories,
    filtertags
  }) => {

    const dispatch = useDispatch();

    const allrecipes = useSelector(state => state.recipespage.allrecipesfavorite);
    //const currentclientpagination = useSelector(state => state.recipespage.currentclientpaginationfavorite);
    const countallrecipes = useSelector(state => state.recipespage.countallrecipesfavorite);
    const  token  = useSelector((state) => state.auth.token);

    const [items, setItems] = useState(allrecipes);
    const [countitems, setCountitems] = useState(countallrecipes);

    //const [currentpagination, setCurrentpagination] = useState(1001);
    const [currentpage, setCurrentpage] = useState(1);
    const [tempPagination, setTempPagination] = useState(1);


            useEffect(() => {
                  const activeCuisineid = 111;
                const combinedFilters = {
                  activeCategories,
                activeTags,
                  activeCuisineid,
                  currentpage: 1,
                  action: "all",
                };
                      dispatch(getallrecipesfavorite(combinedFilters,countallrecipes));
                      setCurrentpage(1);
                      setTempPagination(1);
                  }, [activeCategories, activeTags, dispatch]); 


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



  const handleBackClick = () => {
              const activeCuisineid = 111;
     setTempPagination(prevTemp => prevTemp - 1);
     const combinedFilters = {
        activeCategories,
      activeTags,
          activeCuisineid,
        currentpage,
        action: "back",
      };
            dispatch(getallrecipesfavorite(combinedFilters,countallrecipes));
        setCurrentpage(prevPage => prevPage - 1);
  
    };
    
    const handleForwardClick = () => {
              const activeCuisineid = 111;
      setTempPagination(prevTemp => prevTemp + 1);
            const combinedFilters = {
        activeCategories,
      activeTags,
        activeCuisineid,
        currentpage,
        action: "forward",
      };
            dispatch(getallrecipesfavorite(combinedFilters,countallrecipes));
      setCurrentpage(prevPage => prevPage + 1);
    };


    return (
    <Grid container direction="column" style={{textAlign: 'right', padding: '10px' }}>

                         <Grid item container direction="row" alignItems="center" justifyContent="flex-end" style={{ marginTop: '20px' }}>
                              <Grid item>
                                <h1 style={{ color: '#1e60d6', fontSize: '40px', fontFamily: 'Kroshe Hebrew, sans-serif', fontWeight: 'bold', marginRight: '10px' }}>
                                  מתכונים מועדפים שלך
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
        />
      </Grid>

    </Grid>
  );
};

export default AllrecipesFavorite;
