import React, { useState,useEffect } from 'react';
import { Grid } from '@mui/material';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { forwardwardpaginationGroupsListPage} from '../../../../actions/groupactions.js';
import { backwardpaginationGroupsListPage} from '../../../../actions/groupactions.js';
import { getallgroups} from '../../../../actions/groupactions.js';

import Headergroup from  "./Headergroup.js";
import GroupForm from '../../../GroupForm/GroupFormMobile.js';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogContent } from '@mui/material';
import { setpagemode,currentGroupNull } from '../../../../actions/groupactions.js';
  const GroupsList = ({setOpen }) => {

     const dispatch = useDispatch();
    const  {user}  = useSelector((state) => state.auth);
    const allgroups = useSelector(state => state.groups.allgroups);
    const countallgroups = useSelector(state => state.groups.countallgroups);
////

    const [items, setItems] = useState(allgroups);
    const [countitems, setCountitems] = useState(countallgroups);

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
          case 'N': // Alt+N → New group
            event.preventDefault();
            document.getElementById('newgroup-button')?.click();
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
        dispatch(getallgroups());
        setCurrentpage(1);
        setTempPagination(1);
      }, []); 


  useEffect(() => {
      setCountitems(countallgroups);
      }, [countallgroups]); 

    
    useEffect(() => {
      if (currentpage > 1) {
        setTempPagination(2);
      } else {
        setItems(allgroups.slice(0, 12));
        setTempPagination(1);
      }
    }, [allgroups]);


    useEffect(() => {
        if (tempPagination === 1) {
          setItems(allgroups.slice(0, 12));
        }   else if (tempPagination === 2) {
          setItems(allgroups.slice(12, 24));
        }
        else {
          setItems(allgroups.slice(24, 36));
        }

    }, [tempPagination]);



  const handleBackClick = () => {
    setTempPagination(prevTemp => prevTemp - 1);
      dispatch(backwardpaginationGroupsListPage(currentpage,countallgroups));
      setCurrentpage(prevPage => prevPage - 1);
  };
  
  const handleForwardClick = () => {
    setTempPagination(prevTemp => prevTemp + 1);
    dispatch(forwardwardpaginationGroupsListPage(currentpage,countallgroups));
    setCurrentpage(prevPage => prevPage + 1);
  };


    return (
    <Grid container direction="column" style={{textAlign: 'right', padding: '10px' }}>

                         <Grid item container direction="row" alignItems="center" justifyContent="flex-end" style={{ marginTop: '20px' }}>


        <Grid item>
                                <h1 style={{ color: '#1e60d6', fontSize: '40px', fontFamily: 'Kroshe Hebrew, sans-serif', fontWeight: 'bold', marginRight: '10px' }}>
                                    כל הקבוצות שלך
                                </h1>
                              </Grid>


                        </Grid>

      <Grid item style={{ marginTop: '20px' }}>
         <Headergroup
          items={items}
          currentpage={currentpage}
          countallgroups={countitems}
          handleForwardClick={handleForwardClick}
          handleBackClick={handleBackClick}
           setOpen={setOpen}

        />
      </Grid>

      

    </Grid>
  );
};

export default GroupsList;

