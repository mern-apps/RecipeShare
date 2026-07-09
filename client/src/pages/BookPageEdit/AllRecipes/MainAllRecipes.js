import React, { useState, useRef ,useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { useLocation } from "react-router-dom";

import {
  Grid,
  Stack,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Link } from 'react-router-dom';

import EditIcon from "@mui/icons-material/Edit";


import { currentrecipe } from '../../../actions/recipeNewForm.js';
import { setpagemode } from '../../../actions/recipeNewForm.js';
import { previouspage } from '../../../actions/recipeNewForm.js';


import BooksList from "./BooksList/BooksList.js";
import GroupsList from "./GroupsList/GroupsList.js";
import LayoutFilter from "./LayoutFilter";
import AllRecipes from "./AllRecipes";

import { editbookrecipessectionfetchRecipesGroupById,editbookrecipessectionfetchRecipesBookById,editbookrecipessectionfetchRecipes } from "../../../actions/bookEditPageActions.js";


import { reduxEditBookRecipeSectionBookID } from "../../../actions/bookEditPageActions.js";
import { reduxEditBookRecipeSectionGroupID } from "../../../actions/bookEditPageActions.js";

import { setfiltercategories } from '../../../actions/recipespage.js';
import { setfiltertags } from '../../../actions/recipespage.js';

const MainAllRecipes = ({ handleItemDisplayClick }) => {
  const dispatch = useDispatch();

        const { user } = useSelector((state) => state.auth);

  const location = useLocation();


  // redux – selected entities only
  const editBookrecipesSection = useSelector((state) => state.currentproject.editBookrecipesSection || {});
  const { bookObject,bookId, groupObject ,groupId,bookallrecipes,bookcountallrecipes,groupallrecipes,groupcountallrecipes,allrecipes,countallrecipes} = editBookrecipesSection;

  const [otherBookUI, setOtherBookUI] = useState(null);
    const [onceOtherBook, setOnceOtherBook] = useState(0);
  const [otherGroupUI, setOtherGroupUI] = useState(null);
    const [onceOtherGroup, setOnceOtherGroup] = useState(0);

      const book = useSelector(state => state.currentproject.currentproject);
    const allbooks = useSelector(state => state.projects.allprojects);
    const countallbooks = useSelector(state => state.projects.allprojectscount);
    const allgroups = useSelector(state => state.groups.allgroups);
    const countallgroups = useSelector(state => state.groups.countallgroups);


  const [relevantRecipes, setRelevantRecipes] = useState([]); // starts as empty array
const [relevantCount, setRelevantCount] = useState(0);


  // ui state
const [selectedOption, setSelectedOption] = useState("recipes");
  const [chooserecipe, setChooserecipe] = useState(false);

const [open, setOpen] = useState(false);

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

  // ---------------- Filters ----------------
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

  if (selectedOption === "books") {

if (allbooks?.length === 2 && onceOtherBook < 1) {
  const otherBook = allbooks.find(
    (b) => b._id !== book?._id
  );
  if (otherBook && bookId !== otherBook._id) {
    dispatch(reduxEditBookRecipeSectionBookID(otherBook._id));
    setOnceOtherBook(prev => prev + 1);
  }
  }
    if (bookId) {
      setOpen(false); 
            if (!bookObject || bookId !== bookObject._id) {
              dispatch(editbookrecipessectionfetchRecipesBookById(bookId));
            }
            else {
          }
      setRelevantRecipes(bookallrecipes || []);
      setRelevantCount(bookcountallrecipes || 0);

    } else {
      setOpen(true);
    }

  }

  if (selectedOption === "groups") {

if (allgroups?.length === 1 && onceOtherBook < 1) {
      const onlyGroup = allgroups[0];
  if (onlyGroup && groupId !== onlyGroup._id) {
    dispatch(reduxEditBookRecipeSectionGroupID(onlyGroup._id));
    setOnceOtherGroup(prev => prev + 1);
  }
  }
    if (groupId) {
      setOpen(false);
       if (!groupObject || groupId !== groupObject._id) {
        dispatch(editbookrecipessectionfetchRecipesGroupById(groupId));
      } 
      else {
    setRelevantRecipes(groupallrecipes || []);
      setRelevantCount(groupcountallrecipes || 0);
        }
       } else {
      setOpen(true); 
    }
  }
if (selectedOption === "recipes") {
  if (!chooserecipe) {
    setOpen(false);
    dispatch(editbookrecipessectionfetchRecipes());
    setChooserecipe(true);
    } else {
    setRelevantRecipes(allrecipes || []);
    setRelevantCount(countallrecipes || 0);
    console.log("editBookrecipesSection for recipes:", editBookrecipesSection);
}
  }

}, [selectedOption, editBookrecipesSection]);

const firstRenderRef = useRef(true);

useEffect(() => {
  // Avoid running on first render
  if (firstRenderRef.current) {
    firstRenderRef.current = false;
    return;
  }
  // Now run only on open changes (not first mount)
  if (!open && selectedOption === "books") {
    if (!bookId) {
      setSelectedOption("recipes");
    }
  }
 if (!open && selectedOption === "groups") {
    if (!groupId) {
      setSelectedOption("recipes");
    }
  }

}, [open]);

  // ---------------- Handlers ----------------
  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };


   const handleFiltercategories = (categoryDescription) => {
    const updatedFiltercategories = filtercategories.map(category =>
      category.description === categoryDescription
        ? { ...category, active: !category.active } // יצירת אובייקט חדש
        : category
    );
    dispatch(setfiltercategories(updatedFiltercategories));
  };
  
  const handleFiltertags = (tagDescription) => {
    const updatedFiltertags = filtertags.map(tag =>
      tag.description === tagDescription
        ? { ...tag, active: !tag.active } // יצירת אובייקט חדש
        : tag
    );
    dispatch(setfiltertags(updatedFiltertags));
  };

  const showRadioGroup =
  countallbooks > 1 || countallgroups > 0;

  return (
    <>
      <Grid container direction="column" spacing={2}>

      <Grid item style={{ marginRight: '10px', marginBottom: '15px' }}>

         <Button
                    id="newrecipe-button"
                    component={Link}
                    to="/new-recipe"
                    aria-label="הוסף מתכון חדש"
                    title="הוסף מתכון חדש (Alt+N)"
                    role="link"
                    variant="contained"
                    onClick={() => {
            dispatch(currentrecipe(null));
            dispatch(setpagemode("new"));
dispatch(previouspage(location.pathname + location.search))
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
                    הוסף מתכון חדש
                  </Button>
      </Grid>

        <Grid item>
          <Stack spacing={1} sx={{ maxWidth: 420 }}>
        {showRadioGroup && (

      <RadioGroup
  value={selectedOption}
  onChange={(e) => handleRadioChange(e.target.value)}
>
  <FormControlLabel
    value="recipes"
    control={<Radio />}
    label="המתכונים שלי"
    sx={{ "& .MuiFormControlLabel-label": { fontSize: "1.3rem", fontWeight: 600 } }}
  />

    {countallbooks > 1 && (
  <FormControlLabel
    value="books"
    control={<Radio />}
    label="ספרי מתכונים"
    sx={{ "& .MuiFormControlLabel-label": { fontSize: "1.3rem", fontWeight: 600 } }}
  />
  )}

    {countallgroups > 0 && (
  <FormControlLabel
    value="groups"
    control={<Radio />}
    label="קבוצות"
    sx={{ "& .MuiFormControlLabel-label": { fontSize: "1.3rem", fontWeight: 600 } }}
  />
   )}
</RadioGroup>
)}


            {/* 📚 Book */}
            {selectedOption === "books" && (
              <TextField
                label="ספר נבחר"
                value={bookObject?.title || ""}
                placeholder="בחר ספר מתכונים"
                fullWidth
                InputProps={{
                  readOnly: true,
                endAdornment:
        countallbooks > 2 ? (
          <InputAdornment position="end">
            <IconButton onClick={() => setOpen(true)}>
              <EditIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
    }}
              />
            )}

            {/* 👥 Group */}
            {selectedOption === "groups" && (
              <TextField
                label="קבוצה נבחרת"
                value={groupObject?.title || ""}
                placeholder="בחר קבוצה"
                fullWidth
                InputProps={{
                  readOnly: true,
                 endAdornment:
        countallgroups > 1 ? (
          <InputAdornment position="end">
            <IconButton onClick={() => setOpen(true)}>
              <EditIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
    }}
              />
            )}
          </Stack>
        </Grid>

<Grid item >
          <LayoutFilter
            activeCategories={activeCategories}
            filtercategories={filtercategories}
            handleFiltercategories={handleFiltercategories}
            activeTags={activeTags}
            filtertags={filtertags}
            handleFiltertags={handleFiltertags}
          />
        </Grid>

<Grid item sx={{ mt: 5 }}>
        <AllRecipes
            activeCategories={activeCategories}
            activeTags={activeTags}
            selectedOption={selectedOption}
            chooserecipe={chooserecipe}
            handleItemDisplayClick={handleItemDisplayClick}
            allrecipes={relevantRecipes} 
  countallrecipes={relevantCount}
          />
        </Grid>
      </Grid>

      {/* 🔹 Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 800 }}>
          {selectedOption === "books" ? "בחירת ספר" : "בחירת קבוצה"}
        </DialogTitle>

        <DialogContent>
          {selectedOption === "books" && (
              <BooksList setOpen={setOpen} />
          )}

          {selectedOption === "groups" && (
             <GroupsList setOpen={setOpen} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MainAllRecipes;
