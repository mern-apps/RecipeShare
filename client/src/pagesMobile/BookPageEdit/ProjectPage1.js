import React, { useState, useRef  ,useEffect } from 'react';
import { Link } from 'react-router-dom';
//import './Dnd.css'; // Import the CSS file
import Modal from 'react-modal';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Container,Grid, Paper, Button, Typography } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';


import ItemDisplayrouter from './ItemDisplay/ItemDisplayrouter.js';



import { addrecipefromlist } from '../../actions/bookEditPageActions.js';
import { removerecipefrombook } from '../../actions/bookEditPageActions.js';
import { setpagemode } from '../../actions/bookPageActions.js';
    import { newformID } from '../../actions/bookPageActions.js';


import Dnd from './ProjectList/Dnd.js';
import MainAllRecipes from  './/AllRecipes/MainAllRecipes.js';

const ProjectPage1 = ({ allowEdit, pagemode }) => {
    const dispatch = useDispatch();

       const  {user}  = useSelector((state) => state.auth);

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


      useEffect(() => {
          dispatch(newformID(null));
        }, []);
        
    const navigate = useNavigate();

    const book = useSelector(state => state.currentproject.currentproject);
    const countAllrecipesBook = useSelector(
      state =>
        state.currentproject.currentproject?.recipes?.filter(r =>
          (r?.type || []).some(t => Math.floor(t) === 1)
        ).length || 0
    );


//to update recipe page- - update currentclientpagination+countallrecipes in reducer, actions..
  const [selectedItemdisplay, setSelectedItemdisplay] = useState(null);
  const handleItemDisplayClick = (item) => {
    setSelectedItemdisplay(item);
  };

    const handleEditClick = () => dispatch(setpagemode("edit"));
  

 return (
    <Grid
      container
      spacing={2}
      sx={{
        direction: "rtl",
        padding: 2,
      }}
    >

      {/* Add new recipe to book— MainAllRecipes */}
{allowEdit && pagemode === "edit1" && (
  <Box
    sx={{
      position: "fixed",
      inset: 0,
      width: "100%",
      height: "100dvh",
      display: "flex",
      flexDirection: "column",
      background:
        "linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)",
      overflow: "hidden",
      zIndex: 1000,
    }}
  >
    <Box
      sx={{
        px: 2,
        pt: 2,
        pb: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Kroshe Hebrew, sans-serif",
          fontWeight: 800,
          color: "#1e60d6",
          textAlign: "right",
          fontSize: "2.5rem",
          letterSpacing: "-0.02em",
        }}
      >
        המתכונים שלך
      </Typography>

     <Button
  onClick={() => dispatch(setpagemode("view"))}
  startIcon={<CloseIcon />}
        sx={{
                      borderRadius: 3,
                      fontSize: adjustedFontSize(1.1),
                      lineHeight: adjustedLineHeight(1),
                      letterSpacing: adjustedLetterSpacing(0.05),
                      wordSpacing: adjustedWordSpacing(0.02),
                      padding: '8px 18px',
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
  חזור לספר
</Button>
    </Box>

    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        px: 1.5,
        py: 1,
        WebkitOverflowScrolling: "touch",

        "&::-webkit-scrollbar": {
          display: "none",
        },

        scrollbarWidth: "none",
      }}
    >
      <MainAllRecipes
        handleItemDisplayClick={handleItemDisplayClick}
      />
    </Box>
  </Box>
)}

{pagemode !== "edit1" && (

                                  <Grid
                                    item
                                    xs={12}
                                    container
                                    direction="column"
                                    sx={{
                                    }}
                                  >

                                    <Grid
                                      item
                                      xs
                                    >
                                    <Dnd
                              handleItemDisplayClick={handleItemDisplayClick}
                              pagemode={pagemode}
                            />
                                    </Grid>
                                  </Grid>
     )}

  
    </Grid>
  );
};

export default ProjectPage1;