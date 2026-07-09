import React, { useState, useRef  ,useEffect } from 'react';
import { Link } from 'react-router-dom';
//import './Dnd.css'; // Import the CSS file
import Modal from 'react-modal';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useParams } from 'react-router-dom';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import ItemDisplayrouter from './ItemDisplay/ItemDisplayrouter.js';

import Box from '@mui/material/Box';
import { Container,Grid, Paper, Button, Typography } from '@mui/material';

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addrecipefromlist } from '../../actions/bookEditPageActions.js';
import { removerecipefrombook } from '../../actions/bookEditPageActions.js';
import { setpagemode } from '../../actions/bookPageActions.js';

import EditIcon from '@mui/icons-material/Edit';

import Dnd from './ProjectList/Dnd.js';

import MainAllRecipes from  '../BookPageEdit/AllRecipes/MainAllRecipes.js';
    import { newformID } from '../../actions/bookPageActions.js';

const ProjectPage1 = ({ allowEdit, pagemode }) => {
    const dispatch = useDispatch();

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

    const  {user}  = useSelector((state) => state.auth);

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
        backgroundColor: "white",
        padding: 2,
        height: "100vh",
      }}
    >

      {/* RIGHT COLUMN — MainAllRecipes (30%) */}
{allowEdit && pagemode === "edit1" && (
      <Grid
        item
        xs={12}
        md={3.6}
        container
        direction="column"
        sx={{
          border: "1px solid #dcdcdc",
          borderRadius: 2,
         
        }}
      >
  <Grid
  item
  sx={{
    p: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>
  <Typography
    variant="h3"
    sx={{
      fontFamily: "Kroshe Hebrew, sans-serif",
      fontWeight: "bold",
      color: "#1e60d6",
      textAlign: "right",
    }}
  >
    המתכונים שלך
  </Typography>

<IconButton
onClick={() => dispatch(setpagemode("view"))}
sx={{
  width: 42,
  height: 42,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #38bdf8, #6366f1)", // תכלת → סגול
  color: "white",
  boxShadow: "0 6px 14px rgba(99, 102, 241, 0.25)",
  border: "1px solid rgba(255,255,255,0.6)",
  transition: "all 0.25s ease",

  "&:hover": {
    transform: "scale(1.12)",
    boxShadow: "0 10px 22px rgba(56, 189, 248, 0.35)",
    background: "linear-gradient(135deg, #60a5fa, #818cf8)",
  },

  "&:active": {
    transform: "scale(0.95)",
  },
}}
>
  <CloseIcon sx={{ fontSize: 20, color: "white", fontWeight: "bold" }} />
</IconButton>
</Grid>

       <Grid
  item
  xs
  sx={{
    overflowY: "auto",
    p: 1,
    width: "100%",      // הכרחי
    boxSizing: "border-box" // מחשב paddings בתוך הרוחב
  }}
>
          <MainAllRecipes handleItemDisplayClick={handleItemDisplayClick} />
        </Grid>
      </Grid>
   )}

      {/* MIDDLE COLUMN — DnD (30%) */}
      <Grid
        item
        xs={12}
        md={3.6}
        container
        direction="column"
        sx={{
          border: "1px solid #dcdcdc",
          borderRadius: 2,
        
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

      {/* LEFT COLUMN — ItemDisplayrouter (40%) */}
      <Grid
        item
        xs={12}
        md={4.8}
        container
        direction="column"
        sx={{
          border: "1px solid #A9A9A9",
          borderRadius: 2,
        
        }}
      >
        <Grid
          item
          xs
          sx={{
           
            textAlign: "right",
          }}
        >
          {selectedItemdisplay && (
<ItemDisplayrouter item={selectedItemdisplay} imageRecipeDisplay={null} scale={0.8} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectPage1;