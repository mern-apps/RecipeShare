import React, { useState,useEffect } from 'react';
import { Grid } from '@mui/material';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { forwardwardpaginationGroupsListPage} from '../../actions/groupactions.js';
import { backwardpaginationGroupsListPage} from '../../actions/groupactions.js';
import { getallgroups} from '../../actions/groupactions.js';

import Headergroup from  './Headergroup.js';
import GroupForm from '../GroupForm/GroupForm.js';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogContent } from '@mui/material';
import { setpagemode,currentGroupNull } from '../../actions/groupactions.js';
import { newformID } from '../../actions/bookPageActions.js';

  const GroupsList = ({ }) => {

     const dispatch = useDispatch();
     
        useEffect(() => {
           dispatch(newformID(null));
         }, []);

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
  <Grid item sx={{ marginRight:5 }}>
            <Button
            id="newgroup-button"
            component={Link}
            to="/new-group"
            aria-label="הוסף קבוצה חדש"
            title="הוסף קבוצה חדש (Alt+N)"
            role="link"
            variant="contained"
            onClick={() => {
    dispatch(currentGroupNull(null));
    dispatch(setpagemode("new"));
  }}
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
            הוסף קבוצה חדשה
            </Button>
        </Grid>

        <Grid item>
                                <h1 style={{ color: '#1e60d6', fontSize: '40px', fontFamily: 'Kroshe Hebrew, sans-serif', fontWeight: 'bold', marginRight: '10px' }}>
                                    כל הקבוצות שלך
                                </h1>
                              </Grid>


                        </Grid>

                      


      <Grid item container direction="row" alignItems="center" justifyContent="flex-end" style={{  }}>


      </Grid>

      <Grid item style={{ marginTop: '20px' }}>
         <Headergroup
          items={items}
          currentpage={currentpage}
          countallgroups={countitems}
          handleForwardClick={handleForwardClick}
          handleBackClick={handleBackClick}
        />
      </Grid>

      

    </Grid>
  );
};

export default GroupsList;

