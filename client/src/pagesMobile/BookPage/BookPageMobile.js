import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Typography, Divider } from "@mui/material";
import { ToggleButton } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
// Import your components
import BookInfo from "./BookInfo";
import LayoutFilter from "./Recipes/LayoutFilter";
import AllRecipes from "./Recipes/AllRecipes";
import ItemDisplayrouter from './ItemDisplay/ItemDisplayrouter.js';

import { fetchBookById } from '../../actions/bookPageActions.js';

import { setfiltercategories } from '../../actions/recipespage.js';
import { setfiltertags } from '../../actions/recipespage.js';

import { useParams } from 'react-router-dom';
    import { newformID } from '../../actions/bookPageActions.js';

const BookPageMobile = () => {
  // ------------------- Redux State -------------------
     const dispatch = useDispatch();

       useEffect(() => {
               dispatch(newformID(null));
             }, []);


    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
   const isLogOut = useSelector((state) => state.auth.islogout);

  const currentBook = useSelector(state => state.currentproject.currentproject);
      const [selectedItemdisplay, setSelectedItemdisplay] = useState(null);


  // ------------------- Filter State -------------------
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeTags, setActiveTags] = useState([]);

  const filtercategories = useSelector(state => state.recipespage.filtercategories);
  const filtertags = useSelector(state => state.recipespage.filtertags);


  

  useEffect(() => {
  if (!id) return;
  if (!currentBook?._id) {
    dispatch(fetchBookById(id));
    return;
  }
  if (currentBook._id !== id) {
    dispatch(fetchBookById(id));
  }

  if (
    currentBook?.recipes?.length > 1 &&
    !selectedItemdisplay
  ) {
    setSelectedItemdisplay(currentBook.recipes[1]);
  }

}, [id, currentBook?._id,dispatch]);

  useEffect(() => {
    setActiveCategories(filtercategories.filter(category => category.active));
  }, [filtercategories]);

  useEffect(() => {
    setActiveTags(filtertags.filter(tag => tag.active));
  }, [filtertags]);

  // ------------------- Handlers -------------------
const handleButtonClickcategorytest = (categoryDescription) => {
  const updatedFiltercategories = filtercategories.map(category =>
    category.description === categoryDescription
      ? { ...category, active: !category.active } // יצירת אובייקט חדש
      : category
  );
  dispatch(setfiltercategories(updatedFiltercategories));
};

const handleButtonClicktagtest = (tagDescription) => {
  const updatedFiltertags = filtertags.map(tag =>
    tag.description === tagDescription
      ? { ...tag, active: !tag.active } // יצירת אובייקט חדש
      : tag
  );
  dispatch(setfiltertags(updatedFiltertags));
};



  return (
    <Grid container direction="column" spacing={2} sx={{ p: 1 }}>

      {/* ---------- TOP : BOOK INFO ---------- */}
      <Grid item>
        <BookInfo item={currentBook} />
      </Grid>

      <Grid item>
        <Divider />
      </Grid>

      {/* ---------- BOTTOM : 2 COLUMNS ---------- */}
      <Grid
        item
        container
        spacing={2}
        sx={{ height: "calc(100vh - 220px)" }} // adjust if needed
      >

        <Grid
          item
          xs={12}
          md={2}
        >
        </Grid>

        {/* ---------- LEFT SIDE : ITEM DISPLAY ---------- */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            overflowY: "auto",
            textAlign: "right",
            borderRight: "1px solid #eee",
            pr: 2,
          }}
        >
          {selectedItemdisplay && (
            <ItemDisplayrouter item={selectedItemdisplay} />
          )}
        </Grid>

        {/* ---------- RIGHT SIDE : FILTER + RECIPES ---------- */}
      <Grid
  item
  xs={12}
  md={4}
  sx={{
    overflowY: "auto",
    display: "flex",
    justifyContent: "center", // center horizontally
  }}
>
  <Box
    sx={{
      width: "100%",
      maxWidth: "700px", // controls centered width
    }}
  >
          <LayoutFilter
            activeCategories={activeCategories}
            filtercategories={filtercategories}
            handleButtonClickcategorytest={handleButtonClickcategorytest}
            activeTags={activeTags}
            filtertags={filtertags}
            handleButtonClicktagtest={handleButtonClicktagtest}
          />

          <Box sx={{ mt: 3 }}>
            <AllRecipes
              activeCategories={activeCategories}
              activeTags={activeTags}
              setSelectedItemdisplay={setSelectedItemdisplay}
            />
          </Box>
                    </Box>

        </Grid>

    <Grid
          item
          xs={12}
          md={1}
        >
        </Grid>

      </Grid>
    </Grid>
  );
};

export default BookPageMobile;