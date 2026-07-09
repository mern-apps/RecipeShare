import React, { useState, useRef ,useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Typography,Button, Divider } from "@mui/material";
import { ToggleButton } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
// Import your components
import GroupInfo from "./GroupInfo";
import MainAllRecipes from "./AddinfRecipe/MainAllRecipes.js";
import MainAllBooks from "./AddinfBook/MainAllBooks.js";
import MainAllRecipesGroup from "./Recipes/MainAllRecipesGroup.js";
import AllBooks from "./Books/Allbooks.js";
import AllUsers from "./Users/AllUsers.js";

import { fetchGroupById } from '../../actions/groupactions.js';
//GROUPPAGE
import { getallrecipesgroupfilter } from '../../actions/grouppageactions.js';

import { useParams } from 'react-router-dom';
import { setfiltercategories } from '../../actions/recipespage.js';
import { setfiltertags } from '../../actions/recipespage.js';

import { newformID } from '../../actions/bookPageActions.js';


const GroupPage = () => {
  // ------------------- Redux State -------------------
     const dispatch = useDispatch();

     useEffect(() => {
  dispatch(newformID(null));
}, []);

    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
   const isLogOut = useSelector((state) => state.auth.islogout);
const [showUsers, setShowUsers] = useState(false);

  const currentGroup = useSelector(state => state.grouppage.currentgroup);
  const usersList = useSelector(state => state.grouppage.userslist);
  const countAllUsers = useSelector(state => state.grouppage.countallusers);

  const booksList = useSelector(state => state.grouppage.bookslist);
  const countAllBooks = useSelector(state => state.grouppage.countallbooks);

  const allRecipesGroup = useSelector(state => state.grouppage.allrecipesgroup);
  const countAllrecipesGroup = useSelector(state => state.grouppage.countallrecipesgroup);

  const [recipesListOpen, setRecipesListOpen] = useState(false);
  const [booksListOpen, setBooksListOpen] = useState(false);

  const [chosenRecipe, setChosenRecipe] = useState(null);
  const [chosenBook, setChosenBook] = useState(null);

  // ------------------- Filter State -------------------

  const filtercategories = useSelector(state => state.recipespage.filtercategories);
  const filtertags = useSelector(state => state.recipespage.filtertags);

const activeCategories = useMemo(
  () => filtercategories.filter(c => c.active).map(c => c.description),
  [filtercategories]
);

const activeTags = useMemo(
  () => filtertags.filter(t => t.active).map(t => t.description),
  [filtertags]
);



  useEffect(() => {
  if (!id) return;
  if (!currentGroup?._id) {
    dispatch(fetchGroupById(id));
    return;
  }
  if (currentGroup._id !== id) {
    dispatch(fetchGroupById(id));
            console.log("fetchGroupById START");

  }
}, [id, currentGroup?._id, dispatch]);

const handleButtonClickcategorytest = (categoryDescription) => {
  const updatedFiltercategories = filtercategories.map(category =>
    category.description === categoryDescription
      ? { ...category, active: !category.active } 
      : category
  );
  dispatch(setfiltercategories(updatedFiltercategories));
};

const handleButtonClicktagtest = (tagDescription) => {
  const updatedFiltertags = filtertags.map(tag =>
    tag.description === tagDescription
      ? { ...tag, active: !tag.active } 
      : tag
  );
  dispatch(setfiltertags(updatedFiltertags));
};

  return (
    <Grid container spacing={3} sx={{ }}>

      {/* ================= LEFT COLUMN ================= */}
      <Grid item xs={12} md={2}>
        {/* Reserved for future widgets */}
      </Grid>

      {/* ================= CENTER COLUMN ================= */}
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Always visible */}
          <GroupInfo
            item={currentGroup}
            showUsers={showUsers}
            setShowUsers={setShowUsers}
          />

          {recipesListOpen ? (
            /* ================= ADD RECIPES MODE ================= */
            <Box
              sx={{
                animation: "fadeIn 0.35s ease",
              }}
            >
              <MainAllRecipes
                setRecipesListOpen={setRecipesListOpen}
                chosenRecipe={chosenRecipe}
                setChosenRecipe={setChosenRecipe}
              />
            </Box>
          ) 
          : booksListOpen ? (
  /* ================= BOOKS MODE ================= */
  <Box sx={{ animation: "fadeIn 0.35s ease" }}>
      <MainAllBooks
                setBooksListOpen={setBooksListOpen}
                chosenBook={chosenBook}
                setChosenBook={setChosenBook}
              />
  </Box>
)
: (
  
            /* ================= NORMAL VIEW MODE ================= */
            <Box
              sx={{
                animation: "fadeIn 0.35s ease",
              }}
            >
                            <Divider sx={{ my: 1 }} />

      <MainAllRecipesGroup
                setRecipesListOpen={setRecipesListOpen}
              />
              <Divider sx={{ my: 1 }} />
  <AllBooks
                setBooksListOpen={setBooksListOpen}

              />
            </Box>
          )}
        </Box>
      </Grid>

      {/* ================= RIGHT SIDEBAR ================= */}
      <Grid item xs={12} md={2}>
        <Box
          sx={{
            height: "100%",
            transform: showUsers
              ? "translateX(0)"
              : "translateX(120%)",
            opacity: showUsers ? 1 : 0,
            transition: "all 0.35s ease-in-out",
            pointerEvents: showUsers ? "auto" : "none",
          }}
        >
          {showUsers && <AllUsers />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default GroupPage;